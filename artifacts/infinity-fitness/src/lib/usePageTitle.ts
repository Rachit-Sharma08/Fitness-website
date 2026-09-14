import { useEffect } from 'react';

const SITE_NAME = 'Infinity Fitness Gym';
const LOCATION = 'Kaithal';
const CANONICAL_BASE = 'https://infinity-fitness-gym-woad.vercel.app';

interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: `Best Gym in ${LOCATION} | ${SITE_NAME} | Fitness & Training`,
    description: `${SITE_NAME} — Strength Training, Cardio, Weight Loss, Weight Gain, Yoga & Personal Training in Rishi Nagar. Open till 11 PM daily. Serving Kaithal, Kurukshetra, Karnal, Hisar & nearby areas.`,
  },
  '/about': {
    title: `About ${SITE_NAME} | Best Fitness Center in ${LOCATION}`,
    description: `About ${SITE_NAME} — ${LOCATION}'s trusted fitness center in Rishi Nagar. Our story, mission, and commitment to helping members from Kaithal, Kurukshetra, Karnal, Hisar, Cheeka and nearby villages achieve their fitness goals with affordable plans.`,
  },
  '/services': {
    title: `Gym Services & Training Programs | ${SITE_NAME} ${LOCATION}`,
    description: `Gym programs in ${LOCATION} — Strength Training, Cardio, Weight Loss, Weight Gain, Yoga & Personal Training with modern equipment at Rishi Nagar. Serving Kurukshetra, Karnal, Hisar & nearby areas. Book your free trial today.`,
  },
  '/membership': {
    title: `Gym Membership Plans & Pricing | ${SITE_NAME} ${LOCATION}`,
    description: `Affordable gym membership in ${LOCATION} — ₹2,000/month, ₹6,000 for 6 months, ₹11,000/year. No joining fee, no hidden charges. ${SITE_NAME} offers transparent pricing and a 7-day free trial.`,
  },
  '/gallery': {
    title: `Gym Gallery & Photos | ${SITE_NAME} ${LOCATION}`,
    description: `Take a look inside ${SITE_NAME} — ${LOCATION}'s fitness center in Rishi Nagar with modern equipment, spacious workout floors, cardio zone, powerlifting area and more. See why members love us.`,
  },
  '/testimonials': {
    title: `Member Reviews & Testimonials | ${SITE_NAME} ${LOCATION}`,
    description: `Read real reviews from members of ${SITE_NAME} in ${LOCATION}. Rated 4.2/5 on Google with 40+ reviews. Find out why members call us Kaithal's top fitness center.`,
  },
  '/contact': {
    title: `Contact ${SITE_NAME} | Gym in ${LOCATION}`,
    description: `Contact ${SITE_NAME}, ${LOCATION} — Rishi Nagar, Dhand Rd, 136027. Call +91 81688 28832 for membership, timings & free trial. Open 5 AM–11 PM daily. Serving Kurukshetra, Karnal, Hisar, Cheeka & nearby areas.`,
  },
  '/owner': {
    title: `Our Story | ${SITE_NAME} ${LOCATION}`,
    description: `Meet the owner of ${SITE_NAME} — the man building ${LOCATION}'s strongest fitness community in Rishi Nagar with 10+ years of experience and 500+ members trained.`,
  },
};

function setMetaDescription(description: string): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = description;
}

function setCanonical(path: string): void {
  const href = path === '/' ? CANONICAL_BASE : `${CANONICAL_BASE}${path}`;
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function usePageTitle(path: string): void {
  useEffect(() => {
    const meta = PAGE_META[path];
    if (meta) {
      document.title = meta.title;
      setMetaDescription(meta.description);
      setCanonical(path);
    }
  }, [path]);
}
