import React, { useState, useEffect } from 'react';

export interface HeroSlide {
  src: string;
  alt: string;
  /** Optional object-position override (kuch photos me upar ka hissa dikhana ho) */
  objectPosition?: string;
}

interface GymHeroSlideshowProps {
  /** Har page ke slideshow me apni photos pass karta hai */
  slides: HeroSlide[];
  /** Optional: konse slide se shuru ho (0-based) */
  startIndex?: number;
}

export function GymHeroSlideshow({ slides, startIndex = 0 }: GymHeroSlideshowProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 4000);
    return () => clearInterval(timer);
  }, []);

  const current = ((startIndex % slides.length) + tick) % slides.length;

  // Perf: poore slides ek saath layered render nahi karte —
  // sirf current + uske aage/piche (3) render hote hain, crossfade wahi.
  const windowIdx = [
    (current - 1 + slides.length) % slides.length,
    current,
    (current + 1) % slides.length,
  ];

  return (
    <div className="absolute inset-0 z-0">
      {windowIdx.map((i) => (
        <img
          key={i}
          src={slides[i].src}
          alt={slides[i].alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            objectPosition: slides[i].objectPosition ?? 'center',
          }}
          fetchPriority={i === current ? 'high' : 'auto'}
        />
      ))}
      {/* Text readability ke liye darker scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"></div>
    </div>
  );
}