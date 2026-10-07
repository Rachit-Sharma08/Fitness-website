import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUpItem } from '@/lib/animation';
import { gymPhotos } from '@/lib/gymPhotos';
import { usePageTitle } from '@/lib/usePageTitle';
import { useForceReducedMotion } from '@/lib/motion';

const videos = [
  { src: '/gallery-video-1.mp4', caption: 'Infinity Fitness Gym Reel' },
  { src: '/client-review.mp4', caption: 'Client Review' },
  { src: '/comeback.mp4', caption: 'Comeback Story', poster: '/comeback-story-thumb.png' },
  { src: '/infinity.mp4', caption: 'Infinity Fitness' },
  { src: '/gallery-video-2.mp4', caption: 'Best Gym in Kaithal' },
];

const images = gymPhotos.map((p) => ({
  src: p.src,
  alt: p.alt,
  caption: p.caption,
  width: p.width,
  height: p.height,
}));

export function Gallery() {
  usePageTitle('/gallery');
  const [videoLightbox, setVideoLightbox] = useState<number | null>(null);
  const [imageLightbox, setImageLightbox] = useState<number | null>(null);
  const [lbPlaying, setLbPlaying] = useState(false);
  const [lbMuted, setLbMuted] = useState(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useForceReducedMotion();

  // Video lightbox controls
  const openVideoLightbox = useCallback((i: number) => {
    setVideoLightbox(i);
    setLbPlaying(false);
    setLbMuted(false);
  }, []);

  const closeVideoLightbox = useCallback(() => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
      lightboxVideoRef.current.currentTime = 0;
    }
    setVideoLightbox(null);
    setLbPlaying(false);
  }, []);

  const toggleLbPlay = useCallback(() => {
    const vid = lightboxVideoRef.current;
    if (!vid) return;
    if (lbPlaying) {
      vid.pause();
      setLbPlaying(false);
    } else {
      vid.muted = false;
      setLbMuted(false);
      vid.play();
      setLbPlaying(true);
    }
  }, [lbPlaying]);

  const toggleLbMute = useCallback(() => {
    const vid = lightboxVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setLbMuted(vid.muted);
  }, []);

  // Sequence playback: ek video khatam → agla apne aap chalu
  const playNextVideo = useCallback(() => {
    setVideoLightbox(i => (i === null ? null : (i + 1) % videos.length));
  }, []);

  const playPrevVideo = useCallback(() => {
    setVideoLightbox(i => (i === null ? null : (i - 1 + videos.length) % videos.length));
  }, []);

  // Auto play when video lightbox opens — sound ke saath try karo,
  // browser block kare to muted fallback
  useEffect(() => {
    if (videoLightbox !== null && lightboxVideoRef.current) {
      const vid = lightboxVideoRef.current;
      vid.muted = false;
      setLbMuted(false);
      const playPromise = vid.play();
      if (playPromise) {
        playPromise.then(() => {
          setLbPlaying(true);
        }).catch(() => {
          vid.muted = true;
          setLbMuted(true);
          vid.play().then(() => setLbPlaying(true)).catch(() => setLbPlaying(false));
        });
      }
    }
  }, [videoLightbox]);

  // Keyboard controls for video lightbox
  useEffect(() => {
    if (videoLightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideoLightbox();
      if (e.key === ' ') { e.preventDefault(); toggleLbPlay(); }
      if (e.key === 'm' || e.key === 'M') toggleLbMute();
      if (e.key === 'ArrowRight') playNextVideo();
      if (e.key === 'ArrowLeft') playPrevVideo();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [videoLightbox, closeVideoLightbox, toggleLbPlay, toggleLbMute, playNextVideo, playPrevVideo]);

  // Image lightbox
  const openImageLightbox = (i: number) => setImageLightbox(i);
  const closeImageLightbox = () => setImageLightbox(null);
  const prevImage = () => setImageLightbox(i => i === null ? null : (i - 1 + images.length) % images.length);
  const nextImage = () => setImageLightbox(i => i === null ? null : (i + 1) % images.length);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative h-[50svh] min-h-[400px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={images[0].src} alt={images[0].alt} width={images[0].width} height={images[0].height} className="w-full h-full object-cover opacity-60" style={{ objectPosition: gymPhotos[0].objectPosition ?? 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-white mb-4">
              Inside <span className="text-primary text-glow">Infinity</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
              Your future home. Come see it.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Videos first - click to open in lightbox */}
      <section className="py-6 md:py-12">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-foreground mb-6 border-l-4 border-primary pl-4">
            Gym Reels
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative overflow-hidden bg-card cursor-pointer rounded-sm"
                style={{ aspectRatio: '9/16' }}
                onClick={() => openVideoLightbox(i)}
                whileHover={prefersReduced ? {} : { scale: 1.02, transition: { duration: 0.3 } }}
                whileTap={prefersReduced ? {} : { scale: 0.95, transition: { duration: 0.12 } }}
              >
                <video
                  src={video.src}
                  poster={video.poster}
                  className="w-full h-full object-cover"
                  aria-label={`${video.caption} — Infinity Fitness Gym Kaithal`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                {/* Play hint — sirf hover par */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                {/* Minimal caption — sirf hover par */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-white/90 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-center">
                    {video.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-6 md:py-12">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-foreground mb-6 border-l-4 border-primary pl-4">
            Photos
          </h2>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '100px' }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                className="group relative overflow-hidden bg-card cursor-pointer rounded-sm"
                style={{ aspectRatio: '3/4' }}
                onClick={() => openImageLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-active:bg-black/40 transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-primary/40 rounded-sm pointer-events-none transition-all duration-300" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center p-3 sm:p-4 bg-gradient-to-t from-black/0 via-transparent to-transparent pb-[20%] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                  <p className="text-white text-[11px] sm:text-xs font-display font-bold uppercase tracking-[0.2em] text-center px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internal CTA */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors group">
              Contact Us for Details <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {videoLightbox !== null && (
          <motion.div
            key="video-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
            onClick={closeVideoLightbox}
          >
            {/* Close */}
            <button className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition-colors p-2" onClick={closeVideoLightbox}>
              <X className="w-8 h-8" />
            </button>

            {/* Video */}
            <div className="relative max-h-[85vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
              <video
                ref={lightboxVideoRef}
                key={videoLightbox}
                src={videos[videoLightbox].src}
                poster={videos[videoLightbox].poster}
                className="max-h-[85vh] max-w-[90vw] rounded-sm shadow-2xl"
                aria-label={`${videos[videoLightbox].caption} — Infinity Fitness Gym Kaithal video`}
                playsInline
                muted={lbMuted}
                onClick={toggleLbPlay}
                onEnded={playNextVideo}
              />

              {/* Play/Pause button overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-opacity duration-300 ${lbPlaying ? 'opacity-0' : 'opacity-100'}`}>
                  <Play className="w-9 h-9 text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Controls bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLbPlay}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    {lbPlaying ? <Pause className="w-5 h-5 text-white" fill="white" /> : <Play className="w-5 h-5 text-white ml-0.5" fill="white" />}
                  </button>
                  <button
                    onClick={toggleLbMute}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    {lbMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                  </button>
                </div>
                {/* Sequence navigation */}
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs font-bold tracking-widest mr-1">
                    {videoLightbox + 1} / {videos.length}
                  </span>
                  <button
                    onClick={playPrevVideo}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
                    aria-label="Previous video"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={playNextVideo}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all"
                    aria-label="Next video"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div className="absolute top-4 left-4">
                <span className="font-display font-bold uppercase tracking-widest text-white/80 text-sm border-l-2 border-primary pl-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-sm">
                  {videos[videoLightbox].caption}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {imageLightbox !== null && (
          <motion.div
            key="image-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeImageLightbox}
          >
            <button className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2" onClick={closeImageLightbox}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-4 z-10 text-white/70 hover:text-white transition-colors p-2" onClick={e => { e.stopPropagation(); prevImage(); }}>
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.img
              key={imageLightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              src={images[imageLightbox].src}
              alt={images[imageLightbox].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button className="absolute right-4 z-10 text-white/70 hover:text-white transition-colors p-2" onClick={e => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="font-display font-bold uppercase tracking-widest text-white/80 text-sm border-l-2 border-primary pl-3">
                {images[imageLightbox].caption}
              </span>
              <span className="text-white/40 text-sm ml-4">{imageLightbox + 1} / {images.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
