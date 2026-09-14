import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';
import { Link } from 'wouter';
import { ArrowRight, ShieldCheck, Dumbbell, Sparkles, Users, Phone, Instagram, Award, Heart } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';
import { gymPhotos } from '@/lib/gymPhotos';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { usePageTitle } from '@/lib/usePageTitle';

/** Used for single-item entrance animations where custom delay is still appropriate */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const ownerStats = [
  { icon: Dumbbell, label: 'Years in Fitness',  numericValue: 10,   suffix: '+' },
  { icon: Users,   label: 'Members Trained',    numericValue: 500,  suffix: '+' },
  { icon: Award,   label: 'Certifications',     numericValue: 3,    suffix: '+' },
  { icon: Heart,   label: 'Lives Changed',      numericValue: 1000, suffix: '+' },
];

const ownerValues = [
  {
    title: 'Commitment to Community',
    desc: 'Every member is treated like family. No judgment, no ego — just hard work and mutual respect.',
  },
  {
    title: 'Results-First Approach',
    desc: 'Programs are built around real goals: weight loss, muscle gain, endurance, or simply feeling better.',
  },
  {
    title: 'Affordable for Everyone',
    desc: 'Quality fitness should not be a luxury. Infinity Fitness was built to be accessible to every person in Kaithal.',
  },
  {
    title: 'Hands-On Guidance',
    desc: 'The owner is present on the floor daily — personally ensuring every member trains safely and effectively.',
  },
];

export function About() {
  usePageTitle('/about');
  const prefersReduced = useForceReducedMotion();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative h-[80svh] min-h-[520px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow slides={gymPhotos} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Our <span className="text-primary text-glow">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Kaithal's Fitness Center — Built For The People
            </p>
          </motion.div>
        </div>
      </header>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            <p>
              Infinity Fitness Gym in Kaithal wasn't built to be just another place with some treadmills and weights. We set out to create a sanctuary for those who are serious about changing themselves — a fitness center in Rishi Nagar where the iron speaks louder than excuses.
            </p>
            <p>
              Located in the heart of Kaithal on Dhand Road, Rishi Nagar, we've poured our passion into curating a gym environment that fosters raw power and community warmth. Whether you're here for weight loss, muscle gain, personal training, or just find your daily peace through yoga — our doors are open to everyone willing to put in the work. Members travel from Kurukshetra, Karnal, Hisar, Cheeka and nearby areas to train with us.
            </p>
            <p>
              We believe fitness isn't a luxury — it's a necessity. Since opening in Kaithal, Infinity Fitness Gym has helped hundreds of members lose weight, build muscle, and find their confidence. We combine top-tier, modern equipment with affordable gym memberships — when you step into Infinity Fitness, you're not a client; you're family. That's what sets us apart in the community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#050505] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Why Choose <span className="text-primary">Our Gym in Kaithal</span>
            </h2>
          </div>

          {/* staggerContainer replaces per-item delay: i * 0.1 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {[
              {
                icon: ShieldCheck,
                title: "Expert Trainers",
                desc: "Certified professionals who care about your form, progress, and goals as much as you do."
              },
              {
                icon: Dumbbell,
                title: "Modern Equipment",
                desc: "From heavy free weights to the latest cardio machines, we have everything you need."
              },
              {
                icon: Sparkles,
                title: "Clean & Hygienic",
                desc: "Immaculate locker rooms, sanitized equipment, and a fresh environment every single day."
              },
              {
                icon: Users,
                title: "Community Vibe",
                desc: "A supportive, grind-it-out atmosphere where everyone pushes each other to be better."
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUpItem}
                whileHover={prefersReduced ? {} : {
                  y: -4,
                  boxShadow: '0 6px 24px rgba(139,92,246,0.14)',
                  transition: { duration: 0.22 },
                }}
                whileTap={prefersReduced ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                className="bg-card border border-white/5 p-8 text-center group hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold uppercase tracking-wider text-xl mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-3">The Man Behind The Mission</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase">
              Meet Our <span className="text-primary">Founder</span>
            </h2>
          </motion.div>

          {/* Profile grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Photo placeholder */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="relative"
            >
              <div className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-primary">IF</span>
                  </div>
                  <p className="text-muted-foreground text-sm text-center px-6">
                    Owner photo coming soon
                  </p>
                </div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary" />
              </div>
              <div className="absolute -bottom-6 -right-4 lg:right-0 bg-primary text-black font-display font-bold px-6 py-4 shadow-2xl">
                <p className="text-3xl leading-none">10+</p>
                <p className="text-xs uppercase tracking-widest mt-1">Years Experience</p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="space-y-6 pt-8 lg:pt-0"
            >
              <div>
                <p className="text-primary font-semibold uppercase tracking-[0.25em] text-sm mb-2">Owner &amp; Head Trainer</p>
                <h3 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase mb-1">
                  [Owner Name]
                </h3>
                <p className="text-muted-foreground text-sm">Infinity Fitness Gym, Kaithal</p>
              </div>

              <div className="w-16 h-1 bg-primary" />

                <p className="text-muted-foreground leading-relaxed text-lg">
                With over a decade of hands-on experience in fitness and personal training, the founder of Infinity Fitness Gym turned a simple passion for health into Kaithal's most trusted fitness community. Starting from humble beginnings in Rishi Nagar, the vision was always clear — bring world-class training to everyday people in Kaithal at a price that never excludes anyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Infinity Fitness stands as proof that dedication beats expensive memberships. Every program, every piece of equipment, and every interaction on the gym floor reflects a single belief:{' '}
                <span className="text-white font-medium">anyone can transform, if they have the right environment and the right guide.</span>
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.a
                  href="tel:8168828832"
                  whileHover={prefersReduced ? {} : { scale: 1.04, transition: { duration: 0.2 } }}
                  whileTap={prefersReduced ? {} : { scale: 0.97, transition: { duration: 0.1 } }}
                  className="flex items-center gap-2 bg-primary text-black font-display font-bold uppercase tracking-wider px-6 py-3 hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </motion.a>
                <motion.a
                  href="https://wa.me/918168828832"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={prefersReduced ? {} : { scale: 1.04, transition: { duration: 0.2 } }}
                  whileTap={prefersReduced ? {} : { scale: 0.97, transition: { duration: 0.1 } }}
                  className="flex items-center gap-2 border border-[#25D366] text-[#25D366] font-display font-bold uppercase tracking-wider px-6 py-3 hover:bg-[#25D366]/10 transition-colors"
                >
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                  WhatsApp
                </motion.a>
                <motion.a
                  href="https://instagram.com/infinityfitnessgyms"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={prefersReduced ? {} : { scale: 1.04, transition: { duration: 0.2 } }}
                  whileTap={prefersReduced ? {} : { scale: 0.97, transition: { duration: 0.1 } }}
                  className="flex items-center gap-2 border border-white/20 text-white font-display font-bold uppercase tracking-wider px-6 py-3 hover:border-primary hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Stats bar — staggerContainer + AnimatedCounter replaces custom={i * 0.1} + static text */}
          <motion.div
            className="bg-primary py-12 px-4 -mx-4 sm:mx-0 sm:rounded-none grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {ownerStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUpItem}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-black/60 mx-auto mb-3" />
                <p className="font-display font-bold text-4xl text-black leading-none">
                  <AnimatedCounter
                    to={stat.numericValue}
                    suffix={stat.suffix}
                    duration={1.4}
                  />
                </p>
                <p className="text-black/70 text-sm uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Core Values heading */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-3">What We Stand For</p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase">Our Core Values</h3>
          </motion.div>

          {/* Core Values grid — staggerContainer replaces custom={i * 0.1} */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {ownerValues.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUpItem}
                whileHover={prefersReduced ? {} : {
                  y: -3,
                  boxShadow: '0 4px 20px rgba(139,92,246,0.12)',
                  transition: { duration: 0.22 },
                }}
                whileTap={prefersReduced ? {} : { scale: 0.99, transition: { duration: 0.1 } }}
                className="bg-[#111] border border-white/5 p-8 hover:border-primary/30 transition-colors group cursor-default"
              >
                <div className="w-8 h-1 bg-primary mb-6 group-hover:w-16 transition-all duration-300" />
                <h4 className="font-display font-bold text-xl text-white uppercase mb-3">{v.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Internal CTA */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <Link href="/services" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              View Our Programs <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="/membership" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              See Membership Plans <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
