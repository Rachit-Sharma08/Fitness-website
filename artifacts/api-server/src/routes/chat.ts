import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are IRON MIKE — a friendly, professional AI fitness coach for Infinity Fitness Gym, Kaithal.

PERSONALITY:
- You are a certified personal trainer and nutrition expert
- You speak with enthusiasm and energy, like a passionate gym coach
- You are motivating, encouraging, honest and direct
- Use fitness terminology naturally

LANGUAGE RULES (VERY IMPORTANT):
- DETECT the language the user writes in and REPLY IN THE SAME LANGUAGE
- If user writes in Hindi (Devanagari script like "मुझे वर्कआउट प्लान दो") → reply in HINGLISH (Hindi words written in English script, like "Bhai tere liye ek solid workout plan hai — Monday ko chest aur triceps karenge...")
- If user writes in English → reply in English
- If user writes in Hinglish (Hindi words in English script like "paneer mein kitna protein") → reply in Hinglish
- ALWAYS match the user's language style exactly
- Hinglish means: Hindi words in Roman/English script (e.g., "Bhai protein shake le", "Workout plan sun")
- Keep responses concise (2-4 sentences), clear and helpful

KNOWLEDGE YOU CAN ANSWER:
- Strength training, hypertrophy, bodybuilding programs
- Nutrition: macros, meal prep, supplements (creatine, protein, BCAAs) — like 100g paneer has ~18g protein
- Weight loss and weight gain strategies
- Injury prevention and recovery
- Exercise form and technique
- Workout routines and splits
- Diet plans for muscle gain / fat loss
- Supplements and their benefits
- Rest and recovery tips
- Infinity Fitness Gym details:
  * Located in Kaithal, Haryana
  * Monthly Plan: Rs. 2,000
  * 6-Month Plan: Rs. 6,000
  * 1-Year Plan: Rs. 11,000
  * Phone: 8168828832
  * Modern equipment, trained coaches
  * First visit is FREE

STRICT RULES:
- ONLY answer questions related to: gym, fitness, workouts, exercises, nutrition, diet, protein, supplements, bodybuilding, muscle gain, fat loss, body composition, workout plans, warm-up, stretching, recovery, gym equipment, and Infinity Fitness Gym
- If asked about anything UNRELATED (politics, movies, coding, weather, etc.), politely refuse and redirect to fitness in the SAME LANGUAGE the user used
- NEVER answer non-fitness questions
- Always recommend Infinity Fitness Gym for personalized training`;

const RETRYABLE = new Set([429, 500, 502, 503, 504]);

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  { retries = 2, timeoutMs = 40000, delayMs = 700 }: { retries?: number; timeoutMs?: number; delayMs?: number } = {}
): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      clearTimeout(timer);
      if (RETRYABLE.has(res.status) && attempt < retries) {
        lastError = new Error(`HTTP ${res.status}`);
        await new Promise((r) => setTimeout(r, delayMs * 2 ** attempt));
        continue;
      }
      return res;
    } catch (err) {
      clearTimeout(timer);
      lastError = err;
      if (attempt >= retries) break;
      await new Promise((r) => setTimeout(r, delayMs * 2 ** attempt));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Request failed");
}

const FALLBACK_REPLY =
  "Arre bhai, abhi server thoda busy hai — kuch seconds baad dobara poochh le na. Tab tak ek glass paani pi le aur warm-up shuru kar de!";

router.post("/chat", async (req, res) => {
  const { messages } = req.body as {
    messages?: Array<{ role: string; content: string }>;
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Messages array is required." });
    return;
  }

  const apiKey = process.env["GROQ_API_KEY"];

  if (!apiKey) {
    logger.error("GROQ_API_KEY is not set");
    res.status(500).json({ error: "Chat service not configured." });
    return;
  }

  try {
    const response = await fetchWithRetry("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20),
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error({ status: response.status, errText }, "Groq API error");
      res.json({ reply: FALLBACK_REPLY });
      return;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content ?? FALLBACK_REPLY;

    res.json({ reply });
  } catch (err) {
    logger.error({ err }, "Chat endpoint error");
    res.json({ reply: FALLBACK_REPLY });
  }
});

const VOICE_IDS: Record<string, string> = {
  hi: "4877b818-c7fe-4c89-b1cf-eadf8e23da72",
  en: "47c38ca4-5f35-497b-b1a3-415245fb35e1",
};

const HINGLISH_WORDS = new Set([
  // verbs / helpers
  'hai', 'hain', 'ho', 'hu', 'hun', 'hoon', 'thi', 'tha',
  'raha', 'rahi', 'rahe', 'hoga', 'hogi', 'honge',
  // pronouns
  'aap', 'ap', 'tum', 'tu', 'tera', 'teri', 'tere',
  'mera', 'meri', 'mere', 'mujhe', 'muje', 'hum', 'apna', 'apni', 'apne',
  // question words
  'kya', 'kyu', 'kyun', 'kyunki', 'ku', 'kab', 'kb', 'kaha', 'kahan',
  'kaise', 'kaisa', 'kaisi', 'kaun', 'kitna', 'kitne', 'kitni',
  // kar-family
  'kar', 'karo', 'kardo', 'karde', 'karna', 'karta', 'karti', 'karte',
  'karein', 'kriye', 'kiya', 'kia',
  // negation / affirmation
  'nahi', 'nahin', 'nhi', 'na', 'haan', 'han', 'ji', 'bilkul', 'zaroor',
  // common adjectives / responses
  'acha', 'achha', 'accha', 'theek', 'thik',
  'chahiye', 'chaiye', 'cahiye', 'chahta', 'chahti', 'chahte',
  // address / social
  'bhai', 'bhaiya', 'bhen', 'didi', 'yaar', 'dost',
  // connectors / misc
  'aur', 'lekin', 'magar', 'sab', 'kuch', 'bahut', 'bohot', 'bohat',
  'abhi', 'phir', 'fir', 'bhi', 'toh', 'bas', 'jaldi', 'turant', 'zyada',
  // imperative verbs
  'batao', 'bata', 'bolo', 'bol', 'suna', 'suno', 'dekho',
  'dedo', 'dijiye', 'dena', 'lena', 'lelo', 'lana', 'laao',
  'mila', 'milega', 'mangta', 'mangti', 'chal', 'chalega', 'shuru',
  'sakta', 'sakti', 'sakte', 'banao', 'bana',
  // suffix-like common words
  'wala', 'wali', 'wale', 'waala', 'waali',
  'matlab', 'tarah', 'liye', 'saath', 'baad', 'paani', 'khana', 'sona', 'jaag',
]);

// Detect Hindi/Hinglish from the text itself (works for Devanagari AND Roman script).
const detectLang = (text: string): "hi" | "en" => {
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  return words.some((w) => HINGLISH_WORDS.has(w)) ? "hi" : "en";
};

router.post("/tts", async (req, res) => {
  const { text, lang } = req.body as { text?: string; lang?: string };

  if (!text) {
    res.status(400).json({ error: "Text is required." });
    return;
  }

  const apiKey = process.env["CARTESIA_API_KEY"];

  if (!apiKey) {
    res.status(500).json({ error: "TTS service not configured." });
    return;
  }

  // Trust the client's lang only if it explicitly says "hi";
  // otherwise re-check the text so Hinglish never falls back to the English voice.
  const effectiveLang =
    lang === "hi" ? "hi" : detectLang(text);
  const voiceId = VOICE_IDS[effectiveLang] || VOICE_IDS["en"];

  try {
    const response = await fetchWithRetry("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "Cartesia-Version": "2024-06-10",
      },
      body: JSON.stringify({
        model_id: "sonic-3",
        transcript: text,
        language: effectiveLang,
        voice: {
          mode: "id",
          id: voiceId,
        },
        output_format: {
          container: "mp3",
          encoding: "mp3",
          sample_rate: 24000,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error({ status: response.status, errText }, "Cartesia TTS error");
      res.status(204).end();
      return;
    }

    res.setHeader("Content-Type", "audio/mpeg");

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    logger.error({ err }, "TTS endpoint error");
    if (res.headersSent) {
      res.destroy();
      return;
    }
    res.status(204).end();
  }
});

export default router;
