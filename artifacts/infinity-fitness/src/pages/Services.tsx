import React from 'react';
import { motion } from 'framer-motion';
import { useForceReducedMotion } from '@/lib/motion';
import { Link } from 'wouter';
import { Dumbbell, HeartPulse, TrendingUp, Flame, Leaf, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { GymHeroSlideshow } from '@/components/GymHeroSlideshow';
import { gymPhotos } from '@/lib/gymPhotos';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import { usePageTitle } from '@/lib/usePageTitle';

const programs = [
  {
    id: 'strength',
    title: 'Strength Training',
    icon: Dumbbell,
    description: 'Build raw power and muscle mass with our extensive free weights area. Our Kaithal-based trainers design progressive programs, so whether you are a powerlifter or just starting to lift, we have the iron you need.',
    inclusions: ['Free weights & barbells', 'Multiple power racks', 'Progressive overload tracking']
  },
  {
    id: 'cardio',
    title: 'Cardio',
    icon: HeartPulse,
    description: 'Improve your endurance, cardiovascular health, and stamina. Our cardio zone in Kaithal features top-of-the-line equipment designed to keep your heart rate up.',
    inclusions: ['Treadmills & ellipticals', 'Stationary cycles', 'Rowing machines']
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain',
    icon: TrendingUp,
    description: 'Struggling to put on size? Our specialized bulking programs at Infinity Fitness Kaithal combine heavy lifting protocols with precise nutritional guidance to help you pack on muscle.',
    inclusions: ['Muscle building protocols', 'Nutrition & supplement guidance', 'Hypertrophy focus']
  },
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    icon: Flame,
    description: 'Torch fat and lean out with high-intensity training. We focus on sustainable weight loss through metabolic conditioning and proper diet advice — a proven approach for members across Kaithal.',
    inclusions: ['Fat loss programs', 'HIIT workouts', 'Metabolic conditioning']
  },
  {
    id: 'yoga',
    title: 'Yoga',
    icon: Leaf,
    description: 'Find your center, improve flexibility, and enhance recovery. Our morning yoga sessions in Kaithal are designed to complement your heavy lifting and reduce stress.',
    inclusions: ['Flexibility training', 'Mindfulness & breath work', 'All experience levels']
  },
  {
    id: 'modern-equipment',
    title: 'Modern Equipment',
    icon: Zap,
    description: 'Isolate muscles effectively and train safely with our extensive range of modern pin-loaded machines, cables, and functional training tools — some of the newest equipment available in Kaithal.',
    inclusions: ['Latest selectorized machines', 'Cable crossover stations', 'Functional training area']
  }
];

export function Services() {
  usePageTitle('/services');
  const prefersReduced = useForceReducedMotion();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative h-[80svh] min-h-[520px] flex items-center justify-center pt-20 overflow-hidden">
        <GymHeroSlideshow slides={gymPhotos} startIndex={1} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Our <span className="text-primary text-glow">Programs</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Gym Programs in Kaithal — Training for Every Goal
            </p>
          </motion.div>
        </div>
      </header>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-wider mb-4">
              Training Programs For <span className="text-primary">Every Goal in Kaithal</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              From building muscle to losing fat, our gym in Kaithal has the equipment, the trainers, and the expertise to get you there.
            </p>
          </div>

          {/* staggerContainer replaces per-item delay: i * 0.1 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {programs.map((program) => (
              <motion.div
                key={program.id}
                variants={fadeUpItem}
                whileHover={prefersReduced ? {} : {
                  y: -4,
                  boxShadow: '0 6px 24px rgba(139,92,246,0.18)',
                  transition: { duration: 0.22 },
                }}
                whileTap={prefersReduced ? {} : { scale: 0.98, transition: { duration: 0.1 } }}
                className="bg-card border border-white/5 p-8 flex flex-col hover:border-primary/30 transition-colors group relative overflow-hidden cursor-default"
              >
                {/* Accent glow on hover */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors box-glow">
                    <program.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wider text-white">
                    {program.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed relative z-10 flex-grow">
                  {program.description}
                </p>

                <div className="space-y-3 relative z-10">
                  {program.inclusions.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internal CTA */}
      <section className="pb-24 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/membership" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              Join Now — View Plans <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
