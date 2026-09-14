import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';
import { ArrowRight, Phone, Dumbbell, HeartPulse, TrendingUp, Flame, Leaf, Zap, Clock, BadgeCheck, GraduationCap, MapPin, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { HeroVideoCarousel } from '@/components/HeroVideoCarousel';
import { HeroPhotoStrip } from '@/components/HeroPhotoStrip';
import { Reviews } from '@/components/sections/Reviews';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import { FREE_TRIAL_DAYS } from '@/lib/siteConfig';
import { useFreeTrialModal } from '@/components/free-trial/FreeTrialProvider';
import { usePageTitle } from '@/lib/usePageTitle';

const homeServices = [
  { icon: Dumbbell, title: "Strength Training", desc: "Free weights, machines & powerlifting section — everything for heavy lifting." },
  { icon: HeartPulse, title: "Cardio", desc: "Treadmills, cycles & a functional zone for endurance and stamina building." },
  { icon: TrendingUp, title: "Weight Gain", desc: "Lean muscle gain programs with guided nutrition & trainer support." },
  { icon: Flame, title: "Weight Loss", desc: "Fat-loss plans with HIIT, diet guidance and regular progress tracking." },
  { icon: Leaf, title: "Yoga", desc: "Morning yoga sessions for flexibility, posture and a peaceful mind." },
  { icon: Zap, title: "Modern Equipment", desc: "New imported machines — modern, well-maintained and ready for serious lifters." },
];

const faqs = [
  {
    q: "Is Infinity Fitness the best gym in Kaithal?",
    a: "Infinity Fitness Gym is one of the top-rated gyms in Kaithal. With a 4.2-star rating from 40+ Google reviews, modern equipment, trained coaches and a serious workout crowd — it is consistently rated highly in the Rishi Nagar area of Kaithal."
  },
  {
    q: "How much are the gym fees — monthly charges in Kaithal?",
    a: `₹2,000/month, ₹6,000 for 6 months, ₹11,000/year. No joining fee, no hidden charges — completely transparent pricing. You can also upgrade anytime.`
  },
  {
    q: "Is there a free trial?",
    a: `Yes — the first ${FREE_TRIAL_DAYS} days are completely free. Visit the gym, try a workout and then decide.`
  },
  {
    q: "Where is the gym located — address?",
    a: "Infinity Fitness Gym — Kaithal–Dhand Rd, Opp. Maharaja Palace, Rishi Nagar, Kaithal, Haryana 136027. Easily accessible from Kurukshetra, Karnal, Hisar, Cheeka and all nearby areas in Kaithal district. Search 'Infinity Fitness Gym Kaithal' on Google Maps."
  },
  {
    q: "What are the timings?",
    a: "Open every day — from 5 AM to 11 PM, all 7 days. Morning hours (5–8 AM) have relatively less crowd."
  },
  {
    q: "What programs are available?",
    a: "Strength training, cardio, weight loss, weight gain, yoga and personal training — for beginners to advanced, with personal trainer guidance."
  },
];

export function Home() {
  usePageTitle('/');
  const prefersReduced = useForceReducedMotion();
  const { openFreeTrial } = useFreeTrialModal();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 lg:pt-24">
        {/* Video background */}
        <HeroVideoCarousel />

        {/* Hero content — 2-column on desktop, stacked on mobile */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── LEFT: SEO heading + CTAs ── */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
              {/* SEO: primary keyword (gym name + city) h1 me, secondary keywords subtitle me */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-3xl sm:text-6xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-5 leading-tight">
                  Infinity Fitness Gym Kaithal
                  <span className="block mt-2 text-xl sm:text-3xl md:text-4xl text-gold text-glow normal-case tracking-[0.15em]">
                    Transform Your Body
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              >
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 font-medium">
                  Looking for the best gym in Kaithal? Infinity Fitness is Kaithal's top-rated
                  fitness center for strength training, cardio, weight loss, weight
                  gain, yoga &amp; personal training — real equipment, real results,
                  real people. Open 7 days till 11 PM in Rishi Nagar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <motion.div
                  whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
                >
                  <Link
                    href="/membership"
                    className="btn-shine inline-flex items-center justify-center bg-gold text-gold-foreground px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-gold/90 transition-colors group"
                    style={{ boxShadow: '0 0 30px hsl(38 91% 55% / 0.3)' }}
                  >
                    <span className="skew-x-[10deg] flex items-center gap-2">
                      Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
                >
                  <a
                    href="tel:8168828832"
                    className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-white/20 transition-colors group"
                  >
                    <span className="skew-x-[10deg] flex items-center gap-2">
                      <Phone className="w-5 h-5" /> Call Now
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* ── RIGHT: Photo collage strip ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="flex-shrink-0 w-full lg:w-auto flex justify-center"
            >
              <HeroPhotoStrip />
            </motion.div>

          </div>
        </div>
      </header>

      {/* About Snippet */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
        <div className="absolute -left-40 top-20 w-80 h-80 bg-primary/5 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider">
              More Than Just A <span className="text-primary">Gym in Kaithal</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Infinity Fitness isn't a corporate chain where you're just a number. It's a neighborhood fitness center in Kaithal, Rishi Nagar — built for those who take their goals seriously. We provide the heavy iron, the modern machines, and the intense atmosphere you need to push past your limits. If you're searching for a gym near you in Kaithal that delivers real results, this is it.
            </p>
            <div>
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
                More About Our Gym <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us — confirmed facts strip */}
      <section className="py-16 border-b border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider">
              Why Members <span className="text-primary">Choose Us</span>
            </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Kaithal's best fitness center — known for delivering real results to its members.
              </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Clock, title: "Open Every Day", desc: "5 AM – 11 PM · Open 7 days a week.", href: "/contact" },
              { icon: BadgeCheck, title: `${FREE_TRIAL_DAYS}-Day Free Trial`, desc: `First ${FREE_TRIAL_DAYS} days absolutely free.`, modal: true },
              { icon: GraduationCap, title: "Trained Coaches", desc: "Personal training & nutrition guidance at every step.", href: "/services" },
              { icon: MapPin, title: "Rishi Nagar, Kaithal", desc: "Dhand Rd, Opp. Maharaja Palace — serving Kaithal & nearby villages.", external: "https://www.google.com/maps/search/Infinity+Fitness+Gym,+Rishi+Nagar,+Kaithal" },
            ].map((item, i) => {
              const card = (
                <motion.div
                  className="group bg-card border border-white/5 p-6 md:p-8 h-full flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors"
                  whileHover={prefersReduced ? {} : {
                    y: -4,
                    boxShadow: '0 6px 24px rgba(255,106,0,0.14)',
                    transition: { duration: 0.22 },
                  }}
                  whileTap={prefersReduced ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors group-hover:box-glow">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-wide text-base md:text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
              if (item.modal) {
                return (
                  <button key={i} onClick={openFreeTrial} className="block w-full h-full text-left cursor-pointer">
                    {card}
                  </button>
                );
              }
              if (item.external) {
                return (
                  <a key={i} href={item.external} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {card}
                  </a>
                );
              }
              return (
                <Link key={i} href={item.href as string} className="block h-full">
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
                Our <span className="text-primary">Programs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Training programs in Kaithal for every goal — strength, cardio, weight loss, weight gain, yoga and more. Whatever you want to achieve, we have the tools and the expertise to get you there.
              </p>
            </div>
            <Link href="/services" className="shrink-0 flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              See All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Stagger container — replaces per-item delay: i * 0.1 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {homeServices.map((service) => (
              <motion.div key={service.title} variants={fadeUpItem}>
                <motion.div
                  className="bg-card border border-white/5 p-6 md:p-8 hover:border-primary/50 transition-colors group flex flex-col items-center text-center gap-4 h-full"
                  whileHover={prefersReduced ? {} : {
                    y: -4,
                    boxShadow: '0 6px 24px rgba(139,92,246,0.14)',
                    transition: { duration: 0.22 },
                  }}
                  whileTap={prefersReduced ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors group-hover:box-glow">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-wide text-lg md:text-xl">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Member Reviews */}
      <Reviews />

      {/* FAQ — SEO long-tail keywords */}
      <section className="py-24 bg-[#080808] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4">
              Gym in Kaithal &middot; Popular Questions
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider">
              Frequently Asked <span className="text-primary">Questions</span> — Gym in Kaithal
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-card border border-white/5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-base md:text-lg font-bold uppercase font-display tracking-wide text-white group-hover:text-primary transition-colors">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/20 via-primary to-accent relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <Link
                href="/membership"
                className="inline-flex items-center justify-center bg-gold text-gold-foreground px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-gold/90 transition-colors shadow-2xl group"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <a
                href="tel:8168828832"
                className="inline-flex items-center justify-center bg-transparent border-2 border-black text-black px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-black/10 transition-colors group"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Call Now
                </span>
              </a>
            </motion.div>
            <motion.div
              whileHover={prefersReduced ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.1 } }}
            >
              <a
                href="https://wa.me/918168828832?text=Hi!%20I%20want%20to%20join%20Infinity%20Fitness%20Gym.%20Please%20send%20me%20the%20membership%20details."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-black/85 text-white px-8 py-4 font-display font-bold text-xl uppercase tracking-wider skew-x-[-10deg] hover:bg-black transition-colors group shadow-xl"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" /> WhatsApp Us
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
