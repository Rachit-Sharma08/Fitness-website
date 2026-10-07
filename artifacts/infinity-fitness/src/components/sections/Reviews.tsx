import React, { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useInView } from 'framer-motion';
import { Reveal } from '../ui/reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { homeReviews, AVG_RATING, REVIEW_COUNT } from '@/lib/reviews';

export const Reviews = () => {
  const doubledReviews = [...homeReviews, ...homeReviews];
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { margin: '80px 0px' });

  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute -top-10 -left-10 text-[20rem] text-secondary/30 font-serif leading-none select-none pointer-events-none z-0">
        "
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Reveal direction="right">
              <p className="text-primary font-display tracking-widest uppercase text-sm mb-2">Real Results</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase text-foreground mb-6">
                Word On The <span className="text-primary">Street</span>
              </h2>

              <div className="flex items-center gap-4 mb-8 bg-card border border-border p-6 rounded-sm w-fit">
                <div className="text-5xl font-display font-bold text-foreground">
                  <AnimatedCounter to={AVG_RATING} decimals={1} duration={1.4} />
                </div>
                <div>
                  <div className="flex gap-1 mb-1 text-primary">
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star fill="currentColor" size={20} />
                    <Star size={20} />
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                    <AnimatedCounter to={REVIEW_COUNT} suffix="+ Google Reviews" duration={1.2} />
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-8">
                Don't just take our word for it. Hear from the people who put in the work every single day on our floor.
              </p>

              <a
                href="https://search.google.com/local/writereview?placeid=ChIJT49w3aY1DzkRb5j5Z4H2QzM"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-sm font-display font-bold uppercase tracking-wider transition-colors"
              >
                Leave a Review
              </a>
            </Reveal>
          </div>

          {/* Auto-scrolling reviews loop */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>

              {/* Scroll track */}
              <div ref={trackRef} className="flex gap-6 w-max animate-marquee"
                style={{
                  animationPlayState: inView ? 'running' : 'paused',
                }}>
                {doubledReviews.map((review, index) => (
                  <div key={index} className="w-[340px] flex-shrink-0">
                    <div className="bg-card border border-border p-8 rounded-sm relative group hover:border-primary/50 transition-colors h-full"
                      style={{ minHeight: '260px' }}>
                      <Quote className="absolute top-6 right-6 text-secondary w-10 h-10 group-hover:text-primary/20 transition-colors" />

                      <div className="flex gap-1 mb-6 text-primary">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} fill="currentColor" size={16} />
                        ))}
                      </div>

                      <p className="text-muted-foreground mb-8 relative z-10 italic">
                        "{review.review}"
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-foreground font-display uppercase tracking-wide font-bold">{review.name}</p>
                          <span className="text-xs text-muted-foreground">
                            {review.tag === 'Google Review' ? `Google Review · ${review.date}` : review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};