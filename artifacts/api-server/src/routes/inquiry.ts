import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const GYM_EMAIL = "rachitsharma9990888@gmail.com";
const GYM_PHONE_DISPLAY = "81688 28832";
const GYM_PHONE_TEL = "+918168828832";
const GYM_WHATSAPP = "https://wa.me/918168828832";
const GYM_ADDRESS =
  "Kaithal - Dhand Rd, Opp. Maharaja Palace, Rishi Nagar, Kaithal, Haryana 136027";

// Free trial kitne din ka hai — owner/customer kam kare to bas yahan badlo (ek jagah).
const FREE_TRIAL_DAYS = 7;

const RESEND_API_URL = "https://api.resend.com/emails";
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// ── Email delivery — Brevo HTTP API (primary) + Resend (fallback) ──
// Render free plan par SMTP (Gmail 465/587) OUTBOUND BLOCK hai — isliye pure
// HTTP email APIs hi use hote hain (Render par chalte hain).
// Brevo: HTTP API, free 300 emails/day, kisi bhi recipient ko bhej sakta hai
//        (sender email Brevo me verify karna hota hai). Ye customer auto-reply
//        ke liye MAIN provider hai.
// Resend: fallback. Free plan par onboarding@resend.dev se SIRF owner email
//         (digitalguru99908@gmail.com) jaata hai; customer ko nahi. Isliye
//         sirf owner notification ka backup.

const BREVO_SENDER_NAME = "Infinity Fitness Gym";
// Sender email jo Brevo me verified hai. Free plan par aap yehi verify karte ho.
const BREVO_SENDER_EMAIL = process.env["BREVO_SENDER_EMAIL"] || GYM_EMAIL;

const brevoSender = async (options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  const apiKey = process.env["BREVO_API_KEY"];
  if (!apiKey) {
    throw new Error("BREVO_API_KEY secret is not set");
  }
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
      to: [{ email: options.to }],
      subject: options.subject,
      htmlContent: options.html,
    }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Brevo API error ${response.status}: ${text}`);
  }
};

const resendSender = async (options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    throw new Error("RESEND_API_KEY secret is not set");
  }
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Infinity Fitness Gym <onboarding@resend.dev>",
      to: [options.to],
      subject: options.subject,
      html: options.html,
    }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Resend API error ${response.status}: ${text}`);
  }
};

// Ek unified sender: Brevo pehle, fail hone par Resend. Return provider naam.
const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}): Promise<string> => {
  try {
    await brevoSender(options);
    return "brevo";
  } catch (brevoErr) {
    logger.warn({ err: brevoErr }, "Brevo failed — trying Resend fallback");
    try {
      await resendSender(options);
      return "resend";
    } catch (resendErr) {
      throw new Error(
        `Both email providers failed. Brevo: ${(brevoErr as Error).message} | Resend: ${(resendErr as Error).message}`,
      );
    }
  }
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

interface Topic {
  keywords: string[];
  title: string;
  html: string;
}

// Customer ke message se common questions detect karke ready-made sahi jawab
const TOPICS: Topic[] = [
  {
    keywords: [
      "fee", "fees", "fess", "price", "prices", "pricing", "rate", "rates",
      "cost", "costs", "charge", "charges", "kitna", "kitne", "kitni",
      "paisa", "paise", "rupees", "membership", "monthly", "yearly",
      "package", "plan", "plans", "6 month", "six month", "1 year",
      "one year", "admission",
    ],
    title: "Membership Fees",
    html: `
      <table style="width:100%; border-collapse:collapse; margin:8px 0;">
        <tr><td style="padding:6px 0; color:#ccc;">Standard Monthly</td><td style="padding:6px 0; color:#FF3C00; font-weight:bold; text-align:right;">&#8377;2,000 / month</td></tr>
        <tr><td style="padding:6px 0; color:#ccc;">6-Month Package</td><td style="padding:6px 0; color:#FF3C00; font-weight:bold; text-align:right;">&#8377;6,000 total <span style="color:#25D366;">(save &#8377;6,000)</span></td></tr>
        <tr><td style="padding:6px 0; color:#ccc;">1-Year Package</td><td style="padding:6px 0; color:#FF3C00; font-weight:bold; text-align:right;">&#8377;11,000 total <span style="color:#25D366;">(~&#8377;917/month)</span></td></tr>
      </table>
      <p style="margin:4px 0 0; color:#aaa; font-size:13px;">No joining fee — you pay only the membership amount. You can upgrade anytime and just pay the difference.</p>
    `,
  },
  {
    keywords: [
      "time", "timing", "timings", "hour", "hours", "open", "opens",
      "close", "closes", "khulta", "khul", "band", "kab", "morning",
      "evening", "night", "schedule", "sunday",
    ],
    title: "Gym Timings",
    html: `<p style="margin:4px 0; color:#ddd;">The gym is open all 7 days — from morning until <b style="color:#FF3C00;">11:00 PM</b>. Evenings 6–9 PM are the busiest hours; off-peak times are much more peaceful.</p>`,
  },
  {
    keywords: [
      "location", "address", "where", "kahan", "kaha", "direction",
      "directions", "reach", "map", "pata", "place", "kidhar",
    ],
    title: "Location",
    html: `<p style="margin:4px 0; color:#ddd;">${GYM_ADDRESS}</p><p style="margin:4px 0; color:#aaa; font-size:13px;">Search &quot;Infinity Fitness Gym Kaithal&quot; on Google Maps and you can reach us easily.</p>`,
  },
  {
    keywords: ["trial", "demo", "tour", "visit", "first visit", "pehli baar"],
    title: "Free Trial",
    html: `<p style="margin:4px 0; color:#ddd;">Aapka <b style="color:#FF3C00;">${FREE_TRIAL_DAYS}-din ka free trial</b> ready hai — kisi bhi off-peak time par aa jao, hum gym ka pura tour karwayenge.</p>`,
  },
  {
    keywords: [
      "payment", "pay", "upi", "paytm", "gpay", "google pay", "phonepe",
      "bank", "transfer", "cash", "card", "emi",
    ],
    title: "Payment Options",
    html: `<p style="margin:4px 0; color:#ddd;">We accept cash, UPI (Google Pay, PhonePe, Paytm) and direct bank transfer.</p>`,
  },
  {
    keywords: ["freeze", "pause", "hold", "break"],
    title: "Membership Freeze",
    html: `<p style="margin:4px 0; color:#ddd;">You can freeze your membership for up to <b style="color:#FF3C00;">30 days</b> once per term (for medical reasons, travel or an emergency).</p>`,
  },
  {
    keywords: [
      "trainer", "trainers", "coach", "coaches", "guidance",
      "personal training", "personal trainer",
    ],
    title: "Trainers",
    html: `<p style="margin:4px 0; color:#ddd;">Certified trainers are on the gym floor every day — they personally look after your form, progress and goals. Personal guidance is included with membership.</p>`,
  },
  {
    keywords: [
      "weight loss", "weight gain", "fat loss", "muscle", "yoga",
      "workout", "program", "programs", "diet",
    ],
    title: "Programs",
    html: `<p style="margin:4px 0; color:#ddd;">Strength Training, Cardio, Weight Gain, Weight Loss, Yoga and Modern Equipment zones — targeted programs for every goal.</p>`,
  },
];

const detectTopics = (message: string): Topic[] => {
  if (!message) return [];
  const normalized = message.toLowerCase();
  return TOPICS.filter((topic) =>
    topic.keywords.some((kw) =>
      new RegExp(`(^|[^a-z])${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`).test(normalized),
    ),
  );
};

const buildOwnerEmailHtml = (data: {
  name: string;
  phone: string;
  email?: string;
  plan?: string;
  message?: string;
}): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #ffffff; border: 1px solid #7c3aed;">
    <h2 style="color: #7c3aed; text-transform: uppercase; letter-spacing: 2px;">New Membership Inquiry</h2>
    <hr style="border-color: #7c3aed; margin: 16px 0;" />
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #aaa; width: 140px; vertical-align: top;">Name</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Phone</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.phone)}</td>
      </tr>
      ${data.email ? `<tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Email</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.email)}</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Preferred Plan</td>
        <td style="padding: 10px 0; font-weight: bold;">${escapeHtml(data.plan || "Not specified")}</td>
      </tr>
      ${
        data.message
          ? `<tr>
        <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Message</td>
        <td style="padding: 10px 0;">${escapeHtml(data.message)}</td>
      </tr>`
          : ""
      }
    </table>
    <hr style="border-color: #333; margin: 16px 0;" />
    <p style="color: #666; font-size: 12px;">Sent from Infinity Fitness Gym website contact form.</p>
  </div>
`;

const buildAutoReplyHtml = (name: string, topics: Topic[]): string => {
  const firstName = name.trim().split(/\s+/)[0] || "there";

  const quickAnswers = topics.length
    ? `
      <div style="background:#141414; border:1px solid #333; border-radius:8px; padding:18px 20px; margin:18px 0;">
        <p style="margin:0 0 6px; color:#FF3C00; font-weight:bold; text-transform:uppercase; letter-spacing:1px; font-size:13px;">Quick Answers</p>
        ${topics.map((t) => `
          <div style="margin-top:12px;">
            <p style="margin:0 0 2px; color:#ffffff; font-weight:bold;">${t.title}</p>
            ${t.html}
          </div>
        `).join("")}
      </div>`
    : "";

  const specificLine = topics.length
    ? `The answer to your question is in the &quot;Quick Answers&quot; section above. If you need anything else, just reply to this email directly.`
    : `Your question has been sent to our team — we will contact you with the right answer within 1–2 days.`;

  return `
  <div style="font-family: Arial, sans-serif; background:#f4f4f5; padding:24px 12px;">
    <div style="max-width:600px; margin:0 auto; background:#0a0a0a; border-radius:10px; overflow:hidden; border:1px solid #262626;">
      <div style="background:linear-gradient(135deg,#FF3C00,#ff7a45); padding:22px 28px;">
        <p style="margin:0; color:#ffffff; font-size:20px; font-weight:bold; letter-spacing:2px;">INFINITY FITNESS</p>
        <p style="margin:2px 0 0; color:rgba(255,255,255,0.85); font-size:12px; letter-spacing:1px;">KAITHAL &middot; TRAIN HARD, STAY HUMBLE</p>
      </div>

      <div style="padding:28px;">
        <p style="margin:0 0 14px; color:#ffffff; font-size:18px; font-weight:bold;">Hello ${escapeHtml(firstName)}! 🙏</p>

        <p style="margin:0 0 12px; color:#dddddd; line-height:1.6;">
          We received your inquiry — <b style="color:#FF3C00;">thank you for reaching out!</b>
          Our team will call you within <b style="color:#ffffff;">24 hours</b> to discuss the details.
        </p>

        ${quickAnswers}

        <p style="margin:0 0 12px; color:#dddddd; line-height:1.6;">${specificLine}</p>

        <p style="margin:0 0 18px; color:#dddddd; line-height:1.6;">
          If you need an instant answer, call or WhatsApp us directly:
          <a href="tel:${GYM_PHONE_TEL}" style="color:#FF3C00; font-weight:bold; text-decoration:none;">${GYM_PHONE_DISPLAY}</a>
        </p>

        <a href="${GYM_WHATSAPP}" style="display:inline-block; background:#25D366; color:#06301a; font-weight:bold; padding:12px 26px; border-radius:6px; text-decoration:none; letter-spacing:1px;">Message Us on WhatsApp</a>

        <hr style="border:none; border-top:1px solid #262626; margin:24px 0;" />

        <p style="margin:0; color:#888888; font-size:12px; line-height:1.7;">
          📍 ${GYM_ADDRESS}<br />
          🕐 Open all 7 days till 11:00 PM<br />
          📞 ${GYM_PHONE_DISPLAY} &nbsp;|&nbsp; ✉️ ${GYM_EMAIL}
        </p>
        <p style="margin:14px 0 0; color:#666666; font-size:11px;">
          You filled in your inquiry on the Infinity Fitness Gym website. Thanks for your query — we will try to contact you as soon as possible!
        </p>
      </div>
    </div>
  </div>
  `;
};

router.post("/inquiry", async (req, res) => {
  const { name, phone, plan, message, email } = req.body as {
    name?: string;
    phone?: string;
    plan?: string;
    message?: string;
    email?: string;
  };

  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const customerEmail = typeof email === "string" ? email.trim() : "";
  if (customerEmail && !EMAIL_RE.test(customerEmail)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

    if (!process.env["BREVO_API_KEY"] && !process.env["RESEND_API_KEY"]) {
    logger.error("No email provider configured (need BREVO_API_KEY or RESEND_API_KEY)");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  const ownerMailOptions = {
    to: GYM_EMAIL,
    subject: `New Inquiry from ${name}`,
    html: buildOwnerEmailHtml({
      name,
      phone,
      email: customerEmail || undefined,
      plan,
      message,
    }),
  };

  // SPEED FIX: client ko TURANT response bhejo — emails background me jaate hain.
  res.json({ success: true });

  // Owner notification: Brevo (preferred) → Resend (fallback).
  sendEmail(ownerMailOptions)
    .then((via) => {
      logger.info({ name, phone, email: customerEmail || null, plan, via }, "Inquiry email sent");
    })
    .catch((err: unknown) => {
      logger.error({ err }, "Failed to send inquiry email (background)");
    });

  if (!customerEmail) {
    logger.info({ name }, "No customer email provided — auto-reply skipped");
    return;
  }

  // ── Customer AUTO-REPLY ──
  // IMPORTANT: Sirf Brevo hi CUSTOMER ke arbitrary email par bhej sakta hai.
  // Resend ke free plan par onboarding@resend.dev se SIRF owner email reach hota
  // hai — customer ko nahi. Isliye auto-reply ke liye BREVO hi use karo.
  const topics = detectTopics(message || "");
  const autoReplyOptions = {
    to: customerEmail,
    subject: `Thanks for your inquiry, ${name.split(/\s+/)[0]}! — Infinity Fitness Gym Kaithal`,
    html: buildAutoReplyHtml(name, topics),
  };

  if (!process.env["BREVO_API_KEY"]) {
    logger.error(
      { to: customerEmail },
      "Customer auto-reply NOT sent — BREVO_API_KEY is not set. Resend cannot reach the customer (free plan only reaches the owner). Configure BREVO_API_KEY (+ BREVO_SENDER_EMAIL) in the Render dashboard to enable auto-reply.",
    );
    return;
  }

  brevoSender(autoReplyOptions)
    .then(() => {
      logger.info(
        { to: customerEmail, topics: topics.map((t) => t.title), via: "brevo" },
        "Customer auto-reply email sent",
      );
    })
    .catch((err: unknown) => {
      logger.error({ err, to: customerEmail }, "Failed to send customer auto-reply (Brevo)");
    });
});


export default router;
