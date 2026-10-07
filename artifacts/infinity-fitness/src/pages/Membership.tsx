import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';
import { ArrowRight, ChevronDown, ClipboardCheck, Dumbbell, Zap } from 'lucide-react';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';
import { gymPhotos } from '@/lib/gymPhotos';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import { FREE_TRIAL_DAYS } from '@/lib/siteConfig';
import { usePageTitle } from '@/lib/usePageTitle';

const faqs = [
  {
    q: "Can I freeze my membership?",
    a: "Yes, you can freeze your membership once per term for up to 30 days due to medical reasons, travel, or personal emergencies."
  },
  {
    q: "Is there a joining fee?",
    a: "No joining fee, ever. We believe in transparent pricing. You only pay the membership amount."
  },
  {
    q: "Can I try before joining?",
    a: "Absolutely. Visit us any day during off-peak hours for a free tour of the facility."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept Cash, UPI (Google Pay, PhonePe, Paytm), and direct bank transfers."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade from monthly to 6-month or yearly anytime. We will simply adjust the price difference."
  }
];

const joinSteps = [
  {
    icon: Dumbbell,
    title: `${FREE_TRIAL_DAYS}-Day Free Trial`,
    desc: `Visit the gym first, then decide. The first ${FREE_TRIAL_DAYS} days are absolutely free.`,
  },
  {
    icon: ClipboardCheck,
    title: 'Choose Your Plan',
    desc: 'Monthly, 6-month or yearly — pick whatever suits your budget and goals.',
  },
  {
    icon: Zap,
    title: 'Start Working Out',
    desc: 'Get full access from day one. Learn the right form from a trainer and begin your journey.',
  },
];

export function Membership() {
  usePageTitle('/membership');
  const prefersReduced = useForceReducedMotion();

  // Shared hover/tap for plan cards
  const cardHover = prefersReduced ? {} : {
    y: -6,
    boxShadow: '0 12px 40px rgba(139,92,246,0.2)',
    transition: { duration: 0.25 },
  };
  const cardTap = prefersReduced ? {} : { scale: 0.99, transition: { duration: 0.1 } };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative h-[80svh] min-h-[520px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow slides={gymPhotos} startIndex={3} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Membership <span className="text-primary text-glow">Plans</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Affordable Gym Membership in Kaithal — Start Today
            </p>
          </motion.div>
        </div>
      </header>

      {/* Pricing Section — stagger the 3 cards */}
      <section className="py-24 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4">Flexible Plans</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Gym Membership Plans & <span className="text-primary">Pricing in Kaithal</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              No joining fee, no hidden charges — transparent gym pricing in Kaithal. Pay only for what you use.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >

            {/* Standard Monthly */}
            <motion.div
              variants={fadeUpItem}
              whileHover={cardHover}
              whileTap={cardTap}
              className="bg-card border border-white/10 p-8 flex flex-col h-full rounded-sm"
            >
              <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">Standard Monthly</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-primary font-display text-5xl font-bold">₹2,000</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="h-px w-full bg-white/10 mb-6"></div>
              <ul className="space-y-4 mb-8 flex-grow text-gray-300">
                <li className="flex gap-3">✓ Full gym access</li>
                <li className="flex gap-3">✓ Modern equipment</li>
                <li className="flex gap-3">✓ Locker room access</li>
              </ul>
              <Link href="/contact" className="w-full block text-center bg-gold text-gold-foreground font-display font-bold uppercase py-4 skew-x-[-10deg] hover:bg-gold/90 transition-colors mt-auto group">
                <div className="skew-x-[10deg] flex items-center justify-center gap-2">
                  Join Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* 1-Year Package — elevated: use scale variant */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              whileHover={prefersReduced ? {} : {
                y: -8,
                scale: 1.02,
                boxShadow: '0 16px 50px rgba(139,92,246,0.35)',
                transition: { duration: 0.25 },
              }}
              whileTap={cardTap}
              className="bg-card border-2 border-primary p-10 flex flex-col h-[105%] relative shadow-[0_0_50px_rgba(139,92,246,0.25)] rounded-sm z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-sm font-bold uppercase tracking-widest py-1.5 px-6 whitespace-nowrap shadow-lg">
                Best Value · Most Popular
              </div>
              <h3 className="font-display text-3xl font-bold uppercase text-white mb-2 mt-2">1-Year Package</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-primary font-display text-6xl font-bold text-glow">₹11,000</span>
                <span className="text-muted-foreground">total</span>
              </div>
              <div className="bg-[#25D366]/10 text-[#25D366] font-bold text-sm uppercase px-3 py-1.5 rounded-sm inline-block mb-6 w-fit border border-[#25D366]/20">
                Save ₹13,000 vs monthly
              </div>
              <div className="h-px w-full bg-white/10 mb-6"></div>
              <ul className="space-y-4 mb-8 flex-grow text-gray-200">
                <li className="flex gap-3 font-medium">✓ Full gym access for 12 months</li>
                <li className="flex gap-3 font-medium">✓ Modern equipment</li>
                <li className="flex gap-3 font-medium">✓ Locker room access</li>
                <li className="flex gap-3 font-medium text-primary">✓ Free fitness assessment</li>
                <li className="flex gap-3 font-medium text-primary">✓ Priority support</li>
              </ul>
              <Link
                href="/contact"
                className="btn-shine w-full block text-center bg-gold text-gold-foreground font-display font-bold text-lg uppercase py-5 skew-x-[-10deg] hover:bg-gold/90 transition-colors mt-auto group"
                style={{ boxShadow: '0 0 30px hsl(38 91% 55% / 0.3)' }}
              >
                <div className="skew-x-[10deg] flex items-center justify-center gap-2">
                  Claim Offer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* 6-Month Package */}
            <motion.div
              variants={fadeUpItem}
              whileHover={cardHover}
              whileTap={cardTap}
              className="bg-card border border-white/10 p-8 flex flex-col h-full relative rounded-sm"
            >
              <div className="absolute top-0 right-0 bg-white/10 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl-sm">
                Limited Time Offer
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-white mb-2">6-Month Package</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-primary font-display text-5xl font-bold">₹6,000</span>
                <span className="text-muted-foreground">total</span>
              </div>
              <div className="bg-[#25D366]/10 text-[#25D366] font-bold text-sm uppercase px-3 py-1.5 rounded-sm inline-block mb-6 w-fit border border-[#25D366]/20">
                Save ₹6,000 vs monthly
              </div>
              <div className="h-px w-full bg-white/10 mb-6"></div>
              <ul className="space-y-4 mb-8 flex-grow text-gray-300">
                <li className="flex gap-3">✓ Full gym access for 6 months</li>
                <li className="flex gap-3">✓ Modern equipment</li>
                <li className="flex gap-3">✓ Locker room access</li>
                <li className="flex gap-3">✓ Flexible payment options</li>
              </ul>
              <Link href="/contact" className="w-full block text-center bg-gold text-gold-foreground font-display font-bold uppercase py-4 skew-x-[-10deg] hover:bg-gold/90 transition-colors mt-auto group">
                <div className="skew-x-[10deg] flex items-center justify-center gap-2">
                  Join Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

          </motion.div>

          {/* Savings Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary/10 border border-primary/20 p-6 md:p-8 text-center max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl font-display uppercase font-bold text-white">
              On the 1-Year plan you pay just <span className="text-primary text-glow text-3xl mx-2">₹917/month</span>
              <span className="text-muted-foreground text-lg block sm:inline mt-2 sm:mt-0 sm:ml-2">compared to ₹2,000 on monthly</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Join — 3 Easy Steps */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Join in <span className="text-primary">3 Easy Steps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              No paperwork hassle, no waiting period — come today, start your workout today.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {joinSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUpItem}
                whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.22 } }}
                className="relative bg-card border border-white/10 p-8 rounded-sm overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <span className="absolute -top-3 right-4 font-display text-8xl font-bold text-primary/10 select-none group-hover:text-primary/20 transition-colors" aria-hidden>
                  {i + 1}
                </span>
                <div className="w-14 h-14 rounded-full bg-background border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors">
                  <step.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Gym Membership <span className="text-primary">FAQ — Kaithal</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-card border border-white/5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-lg font-bold uppercase font-display tracking-wide text-white group-hover:text-primary transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-400">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
