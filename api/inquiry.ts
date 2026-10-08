// @ts-nocheck -- Vercel function build (root tsconfig ke types yahan apply nahi hote)
// Proxy: browser -> Vercel (same-origin) -> Render backend (CORS fix). Contact/free-trial form.
const BACKEND = "https://infinity-fitness-api-rachit.onrender.com/api/inquiry";

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const init = { method, headers: {} };
  if (method !== "GET" && method !== "HEAD" && req.body !== undefined) {
    init.headers["content-type"] = "application/json";
    init.body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  }
  try {
    const up = await fetch(BACKEND, init);
    const buf = Buffer.from(await up.arrayBuffer());
    res.status(up.status);
    res.setHeader("content-type", up.headers.get("content-type") || "application/json");
    res.send(buf);
  } catch {
    res.status(502).json({ error: "backend unreachable" });
  }
}
