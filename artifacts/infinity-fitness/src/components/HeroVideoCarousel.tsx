import React, { useEffect, useRef } from 'react';
import { useVideoPauseOnHidden } from '@/lib/useVideoPauseOnHidden';

export function HeroVideoCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoPauseOnHidden(videoRef);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Autoplay ke liye video ko muted rakhna zaroori hai nhi to browser block
    // kar deta hai. Force karke bhi muted + loop set karo.
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;
    vid.loop = true;
    vid.playsInline = true;
    vid.setAttribute('autoplay', '');
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');

    // Autoplay block hone par user ke pehle interaction par retry karo
    const retry = () => {
      vid.play().catch(() => {});
    };

    const tryPlay = () => {
      const p = vid.play();
      if (p !== undefined) {
        p.catch(() => {
          document.addEventListener('pointerdown', retry, { once: true });
          document.addEventListener('keydown', retry, { once: true });
        });
      }
    };

    if (vid.readyState >= 2) {
      tryPlay();
    } else {
      vid.addEventListener('loadeddata', tryPlay, { once: true });
      vid.addEventListener('canplay', tryPlay, { once: true });
    }

    // Perf: video hero scroll se bahar jaate hi pause (decode loop tabhi chale
    // jab user use dekh raha ho), wapas dikhe to resume.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.muted = true;
          const p = vid.play();
          if (p !== undefined) p.catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(vid);
    return () => {
      io.disconnect();
      document.removeEventListener('pointerdown', retry);
      document.removeEventListener('keydown', retry);
      vid.pause();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/infinity.mp4"
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Infinity Fitness Gym training montage background video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate"
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
