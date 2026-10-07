// Proxy: browser -> Vercel (same-origin) -> Render backend.
// Origin header forward NAHI hota, isliye backend CORS check me koi dikkat nahi.
// chat = JSON, tts = binary audio (arrayBuffer se safe), inquiry/healthz = JSON.
const BACKEND = "https://infinity-fitness-api.onrender.com";
const ALLOWED = new Set(["/api/chat", "/api/tts", "/api/inquiry", "/api/healthz"]);

export const config = { maxDuration: 60 };

interface Req {
  method?: string;
  url?: string;
  body?: unknown;
}
interface Res {
  status: (code: number) => Res;
  setHeader: (k: string, v: string) => void;
  send: (b: unknown) => void;
  json: (o: unknown) => void;
}

export default async function handler(req: Req, res: Res) {
  const path = (req.url || "").split("?")[0];
  if (!ALLOWED.has(path)) {
    res.status(404).json({ error: "not found" });
    return;
  }
  const method = (req.method || "GET").toUpperCase();
  const init: { method: string; headers: Record<string, string>; body?: string } = {
    method,
    headers: { "content-type": "application/json" },
  };
  if (method !== "GET" && method !== "HEAD" && req.body !== undefined) {
    init.body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  }
  try {
    const up = await fetch(BACKEND + req.url, init);
    const buf = Buffer.from(await up.arrayBuffer());
    res.status(up.status);
    res.setHeader("content-type", up.headers.get("content-type") || "application/json");
    res.send(buf);
  } catch {
    res.status(502).json({ error: "backend unreachable" });
  }
}
