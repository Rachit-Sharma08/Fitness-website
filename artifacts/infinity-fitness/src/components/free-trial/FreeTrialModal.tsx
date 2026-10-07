import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Dumbbell } from 'lucide-react';
import { API_BASE } from '@/lib/apiBase';
import { FREE_TRIAL_DAYS, FREE_TRIAL_LABEL } from '@/lib/siteConfig';

type Status = 'idle' | 'sending' | 'submitted' | 'error';

export function FreeTrialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const reset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setStatus('idle');
    setErrorMsg('');
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          plan: `Free Trial - ${FREE_TRIAL_DAYS} days`,
          message: `Free trial booking request (${FREE_TRIAL_DAYS} days). Customer showed interest in the free trial.`,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((json as { error?: string }).error || 'Something went wrong.');
      }
      setStatus('submitted');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdrop}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Free trial booking"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-md bg-[#0b0b0b] border border-white/10 rounded-2xl shadow-2xl"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              {status === 'submitted' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="p-8 md:p-10 text-center flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 13, delay: 0.15 }}
                    className="mb-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#25D366]" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold uppercase text-white mb-2">
                    Trial Booked!
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Thanks{name ? `, ${name.split(/\s+/)[0]}` : ''}!
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Your {FREE_TRIAL_LABEL} is confirmed. We will call you within 24 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 bg-primary text-black px-8 py-3 font-display font-bold uppercase tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="p-8 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-11 h-11 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold uppercase text-white leading-tight">
                        Book Your Free Trial
                      </h3>
                      <p className="text-xs text-muted-foreground">{FREE_TRIAL_LABEL}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="ft-name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Name</label>
                      <input
                        id="ft-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-background border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="ft-phone" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Phone Number</label>
                      <input
                        id="ft-phone"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        title="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-background border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div>
                      <label htmlFor="ft-email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Email (optional)</label>
                      <input
                        id="ft-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="mt-4 text-red-400 text-sm font-medium border border-red-400/30 bg-red-400/10 px-4 py-3 rounded-sm">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-6 w-full bg-gold text-gold-foreground py-4 font-display font-bold uppercase tracking-wider hover:bg-gold/90 transition-colors rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Booking...
                      </>
                    ) : (
                      <>Book Free Trial</>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    We will confirm your booking right away.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
