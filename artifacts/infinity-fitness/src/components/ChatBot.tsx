import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { X, Send, Volume2, VolumeX, Minus, Sparkles } from 'lucide-react';
import { API_BASE } from '@/lib/apiBase';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MSG: ChatMessage = {
  role: 'assistant',
  content: "Hey! I'm your AI Fitness Coach. Ask me anything about workouts, diet, supplements, or gym plans!",
};

const QUICK_ACTIONS = [
  { icon: '💪', label: 'Workout Plan', query: 'Give me a workout plan' },
  { icon: '🍎', label: 'Diet & Nutrition', query: 'What should I eat for muscle gain?' },
  { icon: '🧴', label: 'Supplements', query: 'Which supplements should I take?' },
  { icon: '❓', label: 'Ask Anything', query: '' },
];

function AvatarSVG({ size = 'normal' }: { size?: 'small' | 'normal' }) {
  const s = size === 'small' ? 32 : 56;
  const fontSize = size === 'small' ? 20 : 36;
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6a00" />
          <stop offset="100%" stopColor="#ff3d00" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#bg-${size})`} />
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <text x="50" y="58" textAnchor="middle" dominantBaseline="central" fontSize={fontSize}>💪</text>
    </svg>
  );
}

// Magnetic button — follows cursor slightly in hover zone, springs back on leave
function MagneticButton({ children, className, onClick, disabled, ariaLabel, strength = 0.35 }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  strength?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// 3D tilt card — rotates toward cursor on hover
function TiltCard({ children, className, maxTilt = 10, onClick, disabled }: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * maxTilt);
    rx.set(-py * maxTilt);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.03, z: 20 }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

const HINGLISH_WORDS = [
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
];

const detectLang = (text: string): string => {
  // Devanagari script → definitely Hindi
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  // Roman script → look for known Hindi/Hinglish words (word-boundary match)
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  const hasHinglish = words.some((w) => HINGLISH_WORDS.includes(w));
  return hasHinglish ? 'hi' : 'en';
};

// Play TTS audio progressively via MediaSource MSE so the voice starts hearing
// the moment the first audio bytes arrive (no full-download wait). Returns the
// audio element once playback is initiated, or null to signal a full-blob fallback.
const playStreamingAudio = (
  response: Response,
  signal: AbortSignal,
  onEnd: () => void
): Promise<HTMLAudioElement | null> => {
  const body = response.body;
  if (!body || typeof window === 'undefined' || !('MediaSource' in window) || signal.aborted) {
    return Promise.resolve(null);
  }

  return new Promise<HTMLAudioElement | null>((resolve) => {
    const mime = response.headers.get('Content-Type') || 'audio/mpeg';
    const mediaSource = new MediaSource();
    const objectUrl = URL.createObjectURL(mediaSource);
    const audio = new Audio(objectUrl);
    let settled = false;
    let playbackInitiated = false;
    let completed = false;
    let urlRevoked = false;

    const revokeUrl = () => {
      if (!urlRevoked) {
        urlRevoked = true;
        try { URL.revokeObjectURL(objectUrl); } catch { /* noop */ }
      }
    };
    const resolveOnce = (val: HTMLAudioElement | null, cleanupUrl: boolean) => {
      if (settled) return;
      settled = true;
      if (cleanupUrl) revokeUrl();
      resolve(val);
    };
    const endOnce = () => {
      if (completed) return;
      completed = true;
      onEnd();
    };

    const openTimeout = window.setTimeout(() => {
      if (!playbackInitiated) {
        try { audio.pause(); } catch { /* noop */ }
        resolveOnce(null, true);
      }
    }, 1500);

    mediaSource.addEventListener('sourceopen', () => {
      window.clearTimeout(openTimeout);
      if (settled) return;
      let sourceBuffer: SourceBuffer | null = null;
      try {
        sourceBuffer = mediaSource.addSourceBuffer(mime);
      } catch {
        resolveOnce(null, true);
        return;
      }

      const queue: Uint8Array[] = [];
      let appending = false;

      const pump = () => {
        if (!sourceBuffer || appending || queue.length === 0 || completed) return;
        const chunk = queue.shift()!;
        appending = true;
        try {
          sourceBuffer.appendBuffer(chunk as unknown as Uint8Array<ArrayBuffer>);
        } catch {
          appending = false;
          endOnce();
          revokeUrl();
          return;
        }
        if (!playbackInitiated) {
          playbackInitiated = true;
          resolveOnce(audio, false);
          audio.play().catch(() => { endOnce(); revokeUrl(); });
        }
      };

      sourceBuffer.addEventListener('updateend', () => {
        appending = false;
        pump();
        if (streamEnded && queue.length === 0 && !appending) {
          try { if (mediaSource.readyState === 'open') mediaSource.endOfStream(); } catch { /* noop */ }
        }
      });
      sourceBuffer.addEventListener('error', () => { endOnce(); revokeUrl(); });

      let streamEnded = false;
      (async () => {
        const reader = body.getReader();
        try {
          while (!signal.aborted) {
            const { done, value } = await reader.read();
            if (done) break;
            queue.push(value);
            pump();
          }
        } catch {
          if (signal.aborted) {
            revokeUrl();
            return;
          }
          endOnce();
          revokeUrl();
          return;
        }
        streamEnded = true;
        if (queue.length === 0 && !appending) {
          try { if (mediaSource.readyState === 'open') mediaSource.endOfStream(); } catch { /* noop */ }
        }
      })();
    });

    audio.addEventListener('ended', () => { endOnce(); revokeUrl(); });
    audio.addEventListener('error', () => { revokeUrl(); });
  });
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [ripple, setRipple] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<ChatMessage[]>([WELCOME_MSG]);
  const ttsAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => { messagesEndRef.current = messages; }, [messages]);

  useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target) && fabRef.current && !fabRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const speak = async (text: string, userText?: string) => {
    if (muted || !text) return;
    if (ttsAbortRef.current) ttsAbortRef.current.abort();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; audioRef.current = null; }
    const lang = userText ? detectLang(userText) : 'en';
    const controller = new AbortController();
    ttsAbortRef.current = controller;
    let finished = false;
    const stopSpeaking = () => { if (!finished) { finished = true; setSpeaking(false); } };
    try {
      setSpeaking(true);
      const res = await fetch(`${API_BASE}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) { stopSpeaking(); return; }
      const streamed = await playStreamingAudio(res, controller.signal, stopSpeaking);
      if (streamed) {
        audioRef.current = streamed;
        return;
      }
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      if (controller.signal.aborted) return;
      if (chunks.length === 0) { stopSpeaking(); return; }
      const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { stopSpeaking(); URL.revokeObjectURL(url); };
      audio.onerror = () => { stopSpeaking(); URL.revokeObjectURL(url); };
      try {
        await audio.play();
      } catch {
        stopSpeaking();
        URL.revokeObjectURL(url);
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') stopSpeaking();
    }
  };

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setRipple(r => r + 1);
    const userMsg: ChatMessage = { role: 'user', content: msg };
    const updated = [...messagesEndRef.current, userMsg];
    messagesEndRef.current = updated;
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const reply = data.reply;
      const final = [...updated, { role: 'assistant' as const, content: reply }];
      messagesEndRef.current = final;
      setMessages(final);
      speak(reply, msg);
    } catch {
      const e = [...updated, { role: 'assistant' as const, content: 'Server busy right now, try again!' }];
      messagesEndRef.current = e;
      setMessages(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev && audioRef.current) { audioRef.current.pause(); setSpeaking(false); }
      return !prev;
    });
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* FAB */}
      <motion.div ref={fabRef} className="chatbot-fab fixed right-4 md:right-6 z-50"
        animate={open ? {} : { y: [0, -8, 0] }}
        transition={open ? {} : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <MagneticButton
          onClick={() => { setOpen(!open); setMinimized(false); }}
          ariaLabel="Open AI Fitness Coach"
          className="relative group"
          strength={0.3}
        >
          {/* Animated rings */}
          <div className="absolute -inset-6 rounded-full opacity-30 pointer-events-none" style={{ border: '2px solid #ff6a00', animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite' }} />
          <div className="absolute -inset-4 rounded-full opacity-20 pointer-events-none" style={{ border: '1.5px solid #ff8c33', animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite 0.5s' }} />
          {/* Radial glow (cheap, GPU friendly) */}
          <div className="absolute -inset-3 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.4) 0%, rgba(255,106,0,0.1) 45%, transparent 72%)' }} />
          {/* Glass button with animated gradient ring */}
          <div className="relative w-16 h-16 rounded-full p-[1.5px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ff6a00, #ff3d00, #ff8c33, #ff6a00)',
              backgroundSize: '300% 300%',
              animation: 'gradient-flow 6s ease infinite',
              boxShadow: '0 0 40px rgba(255,106,0,0.35), 0 8px 32px rgba(0,0,0,0.6)',
            }}>
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(22,22,28,0.85), rgba(10,10,14,0.95))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
              <AvatarSVG />
            </div>
          </div>
          {/* Pulse dot */}
          {!open && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full animate-ring-pulse" style={{ background: '#22c55e', border: '2.5px solid #0a0a0a' }}>
              <span className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none" style={{ background: '#22c55e' }} />
            </span>
          )}
          {/* Tooltip */}
          {!open && (
            <motion.div initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-12 right-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(26,26,26,0.6), rgba(10,10,10,0.6))',
                border: '1px solid rgba(255,106,0,0.3)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,106,0,0.15)',
                backdropFilter: 'blur(20px) saturate(150%)',
              }}>
              <span className="mr-1.5">💪</span>AI Fitness Coach
              <div className="absolute -bottom-1 right-6 w-2 h-2 rotate-45"
                style={{ background: 'rgba(10,10,10,0.6)', borderRight: '1px solid rgba(255,106,0,0.3)', borderBottom: '1px solid rgba(255,106,0,0.3)' }} />
            </motion.div>
          )}
        </MagneticButton>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div ref={panelRef}
            initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 20, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0)' }}
            exit={{ opacity: 0, y: 60, scale: 0.8, rotateX: 20, filter: 'blur(12px)' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280, mass: 0.9 }}
            className={`chatbot-panel ${minimized ? 'chatbot-panel--minimized' : ''} chatbot-panel-anchor fixed right-4 md:right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden flex flex-col`}
            style={{
              perspective: '1400px',
            }}
          >
            {/* Rotating conic gradient border */}
            <div className="absolute -inset-[2px] rounded-3xl p-[2px] pointer-events-none overflow-hidden">
              <div className="absolute inset-[-200%] animate-conic-spin"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(255,106,0,0.7), rgba(255,61,0,0.4), transparent 60%, rgba(255,140,51,0.5), transparent 80%)',
                }} />
            </div>

            {/* Glass panel base */}
            <div className="absolute inset-[2px] rounded-[22px]" style={{
              background: 'linear-gradient(165deg, rgba(24,24,30,0.82) 0%, rgba(13,13,18,0.92) 40%, rgba(8,8,12,0.96) 100%)',
              backdropFilter: 'blur(60px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }} />

            {/* Aurora orbs — slow drift */}
            <div className="absolute inset-0 rounded-[22px] overflow-hidden pointer-events-none">
              <div className="absolute top-[-15%] left-[-10%] w-64 h-64 rounded-full opacity-[0.12] animate-aurora" style={{ background: 'radial-gradient(circle, #ff6a00 0%, transparent 70%)' }} />
              <div className="absolute bottom-[-15%] right-[-10%] w-72 h-72 rounded-full opacity-[0.10] animate-aurora" style={{ background: 'radial-gradient(circle, #ff3d00 0%, transparent 70%)', animationDelay: '-5s' }} />

              {/* Floating orbs */}
              <div className="absolute top-[8%] left-[12%] w-28 h-28 rounded-full blur-2xl opacity-[0.06] animate-orb" style={{ background: '#ff6a00', ['--orb-dur' as any]: '7s' }} />
              <div className="absolute bottom-[18%] right-[8%] w-24 h-24 rounded-full blur-2xl opacity-[0.05] animate-orb" style={{ background: '#ff8c33', ['--orb-delay' as any]: '2.5s', ['--orb-dur' as any]: '9s' }} />

              {/* Rising dust particles */}
              {[0,1,2,3,4,5,6,7].map(i => (
                <span key={i} className="absolute bottom-[-10px] w-1 h-1 rounded-full animate-particle pointer-events-none"
                  style={{
                    left: `${8 + i * 12}%`,
                    background: '#ff8c33',
                    ['--rise-dur' as any]: `${6 + i }s`,
                    ['--rise-delay' as any]: `${i * 0.8}s`,
                    ['--drift' as any]: `${i % 2 === 0 ? 14 : -14}px`,
                    opacity: 0,
                  }} />
              ))}
            </div>

            <style>{`
              @keyframes float { 0%,100%{ transform: translateY(0px) scale(1); } 50%{ transform: translateY(-20px) scale(1.1); } }
              @keyframes voiceWave { 0%,100%{ height: 4px; } 50%{ height: 16px; } }
            `}</style>

            {/* Content */}
            <div className="relative flex flex-col h-full">

              {/* Header — animated gradient border bottom */}
              <div className="relative px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,106,0,0.1)' }}>
                <div className="absolute inset-0 animate-gradient-flow opacity-60" style={{ background: 'linear-gradient(120deg, rgba(255,106,0,0.06), rgba(255,61,0,0.04), rgba(255,140,51,0.05), rgba(255,106,0,0.06))', backgroundSize: '300% 300%' }} />
                <div className="relative flex items-center gap-3">
                  {/* Avatar with rotating gradient ring */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 rounded-2xl animate-gradient-flow" style={{
                      background: 'linear-gradient(135deg, #ff6a00, #ff3d00, #ff8c33, #ff6a00)',
                      backgroundSize: '300% 300%',
                      filter: 'blur(6px)',
                      opacity: 0.5,
                    }} />
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(160deg, #1a1a1a, #0d0d0d)',
                        border: '1px solid rgba(255,106,0,0.25)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,106,0,0.15)',
                      }}>
                      <AvatarSVG />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full animate-ring-pulse" style={{ background: '#22c55e', border: '2.5px solid #111' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black uppercase text-sm leading-tight animate-shimmer" style={{
                      letterSpacing: '0.18em',
                      backgroundImage: 'linear-gradient(90deg, #fff 0%, #ff8c33 25%, #ff6a00 50%, #ff8c33 75%, #fff 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}>
                      IRON MIKE
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                      <span className="text-[10px] font-bold tracking-wider" style={{ color: '#22c55e' }}>ONLINE</span>
                      <span className="flex items-center gap-0.5 text-[9px] font-semibold ml-1 px-1.5 py-0.5 rounded-full"
                        style={{ background: 'rgba(255,106,0,0.08)', border: '1px solid rgba(255,106,0,0.15)', color: '#ff8c33' }}>
                        <Sparkles className="w-2.5 h-2.5" /> AI
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold uppercase mt-0.5" style={{ color: 'rgba(255,106,0,0.4)', letterSpacing: '0.12em' }}>
                      AI Fitness Coach
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MagneticButton onClick={toggleMute} ariaLabel="Mute voice" strength={0.25}
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      >
                      <span className="w-full h-full rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{
                          background: muted ? 'rgba(239,68,68,0.12)' : 'rgba(255,106,0,0.08)',
                          border: `1px solid ${muted ? 'rgba(239,68,68,0.2)' : 'rgba(255,106,0,0.12)'}`,
                        }}>
                        {muted ? <VolumeX className="w-3.5 h-3.5" style={{ color: '#ef4444' }} /> : <Volume2 className="w-3.5 h-3.5" style={{ color: '#ff6a00' }} />}
                      </span>
                    </MagneticButton>
                    <MagneticButton onClick={() => setMinimized(!minimized)} ariaLabel="Minimize chat" strength={0.25}
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      >
                      <span className="w-full h-full rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Minus className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                      </span>
                    </MagneticButton>
                    <MagneticButton onClick={() => setOpen(false)} ariaLabel="Close chat" strength={0.25}
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      >
                      <span className="w-full h-full rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-80"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                      </span>
                    </MagneticButton>
                  </div>
                </div>
              </div>

              {!minimized && (
                <>
                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{
                    background: 'transparent',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255,106,0,0.2) transparent',
                  }}>
                    {messages.map((msg, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 18, scale: 0.9, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }}
                        transition={{ duration: 0.4, delay: 0.02, type: 'spring', damping: 22, stiffness: 220 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                          <div className="mr-2.5 flex-shrink-0 mt-1">
                            <div className="relative">
                              <div className="absolute -inset-0.5 rounded-full blur-sm opacity-50 animate-gradient-flow" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff3d00)', backgroundSize: '300% 300%' }} />
                              <div className="relative rounded-full overflow-hidden" style={{ border: '1px solid rgba(255,106,0,0.3)' }}>
                                <AvatarSVG size="small" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed shadow-lg ${
                          msg.role === 'user' ? 'text-white font-medium rounded-2xl rounded-br-lg' : 'text-white/90 rounded-2xl rounded-bl-lg'
                        }`} style={msg.role === 'user' ? {
                          background: 'linear-gradient(135deg, #ff6a00, #ff3d00)',
                          backgroundSize: '300% 300%',
                          boxShadow: '0 6px 24px rgba(255,106,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                          border: '1px solid rgba(255,120,0,0.3)',
                        } : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                          backdropFilter: 'blur(8px)',
                        }}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator — smooth bounce dots */}
                    {loading && (
                      <motion.div initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} className="flex justify-start">
                        <div className="mr-2.5 flex-shrink-0 mt-1"><AvatarSVG size="small" /></div>
                        <div className="px-5 py-4 rounded-2xl rounded-bl-lg flex items-center gap-2" style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          backdropFilter: 'blur(8px)',
                        }}>
                          <div className="flex gap-1.5 items-center h-5">
                            {[0, 1, 2].map(i => (
                              <motion.span key={i} className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #ff6a00, #ff3d00)' }}
                                animate={{ y: [-3, 3, -3], scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />
                            ))}
                          </div>
                          <span className="text-[10px] font-semibold uppercase" style={{ color: 'rgba(255,106,0,0.5)', letterSpacing: '0.12em' }}>Thinking</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Speaking waveform */}
                    {speaking && !loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="mr-2.5 flex-shrink-0 mt-1"><AvatarSVG size="small" /></div>
                        <div className="px-4 py-2.5 rounded-2xl rounded-bl-lg flex items-center gap-3 animate-border-pulse" style={{
                          background: 'rgba(255,106,0,0.06)',
                          border: '1px solid rgba(255,106,0,0.2)',
                          backdropFilter: 'blur(8px)',
                        }}>
                          <div className="flex items-end gap-[3px] h-4">
                            {[0,1,2,3,4].map(i => (
                              <motion.div key={i} className="w-[3px] rounded-full" style={{ background: 'linear-gradient(180deg, #ff8c33, #ff6a00)' }}
                                animate={{ height: ['4px', '16px', '4px'] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }} />
                            ))}
                          </div>
                          <span className="text-[10px] font-semibold uppercase" style={{ color: 'rgba(255,106,0,0.6)', letterSpacing: '0.1em' }}>Speaking</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Actions — 3D tilt cards */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-3 grid grid-cols-2 gap-2 flex-shrink-0">
                      {QUICK_ACTIONS.map((action, i) => (
                        <TiltCard key={i}
                          onClick={() => { if (action.query) send(action.query); }}
                          className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left"
                          maxTilt={8}
                        >
                          <span className="block w-full h-full rounded-xl flex items-center gap-2.5 px-0 py-0 transition-all duration-200"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255,106,0,0.06), rgba(255,106,0,0.02))',
                              border: '1px solid rgba(255,106,0,0.12)',
                              boxShadow: '0 4px 18px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
                              transform: 'translateZ(20px)',
                            }}>
                            <span className="text-base">{action.icon}</span>
                            <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{action.label}</span>
                          </span>
                        </TiltCard>
                      ))}
                    </div>
                  )}

                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex-shrink-0">
                      <div className="text-center py-2 rounded-xl" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,106,0,0.04), transparent)',
                        borderTop: '1px solid rgba(255,106,0,0.07)',
                      }}>
                        <p className="text-[9px] font-bold uppercase animate-shimmer" style={{
                          letterSpacing: '0.3em',
                          backgroundImage: 'linear-gradient(90deg, rgba(255,106,0,0.2), #ff8c33, rgba(255,106,0,0.2))',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}>
                          BUILT TO MAKE YOU STRONGER
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Input with ripple on send */}
                  <div className="px-4 pb-4 pt-2 flex-shrink-0">
                    <div className="flex gap-2 items-center p-1.5 rounded-2xl transition-all duration-300 animate-border-pulse"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,106,0,0.1)',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.25), 0 0 20px rgba(255,106,0,0.03)',
                      }}>
                      <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                        placeholder="Ask about workouts, diet, supplements..."
                        aria-label="Ask the fitness coach"
                        className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 outline-none transition-all duration-200"
                        style={{ caretColor: '#ff6a00' }}
                        onFocus={e => { e.currentTarget.parentElement!.style.borderColor = 'rgba(255,106,0,0.35)'; e.currentTarget.parentElement!.style.boxShadow = 'inset 0 2px 10px rgba(0,0,0,0.25), 0 0 24px rgba(255,106,0,0.1)'; }}
                        onBlur={e => { e.currentTarget.parentElement!.style.borderColor = 'rgba(255,106,0,0.1)'; e.currentTarget.parentElement!.style.boxShadow = 'inset 0 2px 10px rgba(0,0,0,0.25), 0 0 20px rgba(255,106,0,0.03)'; }}
                      />
                      <motion.button onClick={() => send()} disabled={!input.trim() || loading} aria-label="Send message"
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed relative overflow-hidden"
                        style={{
                          background: input.trim() ? 'linear-gradient(135deg, #ff6a00, #ff3d00)' : 'rgba(255,106,0,0.08)',
                          backgroundSize: '300% 300%',
                          boxShadow: input.trim() ? '0 4px 22px rgba(255,106,0,0.35)' : 'none',
                        }}>
                        {ripple > 0 && (
                          <span key={ripple} className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)', animation: 'ripple 0.7s ease-out forwards' }} />
                        )}
                        <Send className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}

              {/* Bottom accent line */}
              <div className="h-[2px] w-full flex-shrink-0 animate-gradient-flow" style={{
                background: 'linear-gradient(90deg, transparent, #ff6a00, #ff3d00, #ff8c33, transparent)',
                backgroundSize: '300% 300%',
                opacity: 0.5,
              }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
