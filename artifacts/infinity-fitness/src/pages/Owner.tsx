import React from 'react';
import { Link } from 'wouter';
import { motion, type Variants } from 'framer-motion';
import { Phone, Instagram, Award, Users, Dumbbell, Heart, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { usePageTitle } from '@/lib/usePageTitle';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const stats = [
  { icon: Dumbbell, label: 'Years in Fitness', value: '10+' },
  { icon: Users, label: 'Members Trained', value: '500+' },
  { icon: Award, label: 'Certifications', value: '3+' },
  { icon: Heart, label: 'Lives Changed', value: '1000+' },
];

const values = [
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

export function Owner() {
  usePageTitle('/owner');
  return (
    <div className="flex flex-col pt-20">

      {/* Hero Section */}
      <header className="relative min-h-[60svh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0800]" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FF6B00 0, #FF6B00 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Orange glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Meet The Founder
          </motion.p>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl uppercase text-white leading-none mb-6"
          >
            The Man Behind<br />
            <span className="text-primary">Infinity Fitness</span>
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed"
          >
            Passion, discipline, and a mission to transform Kaithal — one member at a time.
          </motion.p>
        </div>
      </header>

      {/* Owner Profile Section */}
      <section className="py-20 px-4 bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Photo placeholder */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="relative"
          >
            <div className="aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 overflow-hidden relative">
              {/* Placeholder graphic */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                  <span className="font-display text-5xl font-bold text-primary">IF</span>
                </div>
                <p className="text-muted-foreground text-sm text-center px-6">
                  Owner photo coming soon
                </p>
              </div>
              {/* Orange corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary" />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-6 -right-4 lg:right-0 bg-primary text-black font-display font-bold px-6 py-4 shadow-2xl">
              <p className="text-3xl leading-none">10+</p>
              <p className="text-xs uppercase tracking-widest mt-1">Years Experience</p>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="space-y-6 pt-8 lg:pt-0"
          >
            <div>
              <p className="text-primary font-semibold uppercase tracking-[0.25em] text-sm mb-2">Owner &amp; Head Trainer</p>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase mb-1">
                [Owner Name]
              </h2>
              <p className="text-muted-foreground text-sm">Infinity Fitness Gym, Kaithal</p>
            </div>

            <div className="w-16 h-1 bg-primary" />

            <p className="text-muted-foreground leading-relaxed text-lg">
              With over a decade of hands-on experience in fitness and personal training, the founder of Infinity Fitness Gym turned a simple passion for health into Kaithal's most trusted fitness community. Starting from humble beginnings, the vision was always clear — bring world-class training to everyday people at a price that never excludes anyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Infinity Fitness stands as proof that dedication beats expensive memberships. Every program, every piece of equipment, and every interaction on the gym floor reflects a single belief: <span className="text-white font-medium">anyone can transform, if they have the right environment and the right guide.</span>
            </p>

            {/* Contact buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="tel:8168828832"
                className="flex items-center gap-2 bg-primary text-black font-display font-bold uppercase tracking-wider px-6 py-3 hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href="https://wa.me/918168828832"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-[#25D366] text-[#25D366] font-display font-bold uppercase tracking-wider px-6 py-3 hover:bg-[#25D366]/10 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/infinityfitnessgyms"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-white/20 text-white font-display font-bold uppercase tracking-wider px-6 py-3 hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-black/60 mx-auto mb-3" />
              <p className="font-display font-bold text-4xl text-black leading-none">{stat.value}</p>
              <p className="text-black/70 text-sm uppercase tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values / Philosophy */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-3">What We Stand For</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="bg-[#111] border border-white/5 p-8 hover:border-primary/30 transition-colors group"
              >
                <div className="w-8 h-1 bg-primary mb-6 group-hover:w-16 transition-all duration-300" />
                <h3 className="font-display font-bold text-xl text-white uppercase mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal CTA */}
      <section className="py-16 px-4 bg-[#050505]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/about" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              Learn More About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              Get In Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0a0a0a] via-[#1a0800] to-[#0a0a0a] border-t border-white/5">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase leading-tight">
            Train With The Best<br />
            <span className="text-primary">In Kaithal</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Come visit us — meet the team, see the facility, and take the first step toward your transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href="tel:8168828832"
              className="flex items-center justify-center gap-2 bg-primary text-black font-display font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary/90 transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <a
              href="https://wa.me/918168828832"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-primary/40 text-white font-display font-bold uppercase tracking-wider px-8 py-4 hover:border-primary hover:text-primary transition-colors text-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
