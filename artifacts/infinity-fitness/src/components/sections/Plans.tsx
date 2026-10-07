import React from 'react';
import { Check } from 'lucide-react';
import { Reveal } from '../ui/reveal';

const plans = [
  {
    name: "1 Month",
    price: "500",
    period: "/mo",
    features: [
      "Access to all gym equipment",
      "Free locker usage (daily)",
      "Basic guidance from trainers",
      "Access during all open hours"
    ],
    popular: false,
    delay: 0.1
  },
  {
    name: "Annual",
    price: "6,000",
    period: "/yr",
    badge: "Best Value",
    features: [
      "Everything in 1 Month plan",
      "Save ₹1,200 annually",
      "Priority assistance",
      "Diet consultation session",
      "Free Infinity Fitness T-shirt"
    ],
    popular: true,
    delay: 0.2
  },
  {
    name: "3 Months",
    price: "1,200",
    period: "/3mo",
    features: [
      "Everything in 1 Month plan",
      "Discounted monthly rate",
      "Workout plan customized",
      "Progress tracking"
    ],
    popular: false,
    delay: 0.3
  }
];

export const Plans = () => {
  return (
    <section id="plans" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <h3 className="text-primary font-display tracking-widest uppercase text-sm mb-2">No Hidden Fees</h3>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-4">Honest <span className="text-primary">Pricing</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Affordable access to serious equipment. Choose the commitment level that works for you. No contracts, no corporate BS.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={plan.delay} direction="up" className={plan.popular ? "relative z-20" : ""}>
              <div 
                className={`relative rounded-sm border p-8 h-full flex flex-col bg-card transition-all duration-300
                  ${plan.popular 
                    ? 'border-primary shadow-[0_8px_40px_hsl(14_100%_50%/0.15)] md:-mt-8 md:mb-8' 
                    : 'border-border hover:border-primary/30'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-display font-bold uppercase tracking-wider text-xs py-1 px-4 rounded-sm">
                    {plan.badge}
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-display font-bold uppercase text-muted-foreground mb-4">{plan.name}</h3>
                  <div className="flex items-end gap-1 text-foreground">
                    <span className="text-2xl font-bold">₹</span>
                    <span className="text-5xl font-display font-bold leading-none">{plan.price}</span>
                    <span className="text-muted-foreground font-medium mb-1">{plan.period}</span>
                  </div>
                </div>
                
                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={`https://wa.me/918168828832?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.name)}%20plan%20at%20Infinity%20Fitness.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-4 text-center font-display font-bold uppercase tracking-wider rounded-sm transition-all block mt-auto
                    ${plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 box-glow' 
                      : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border'
                    }`}
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
