import entrance from '@assets/gallery-entrance.webp';
import legpress from '@assets/gallery-legpress.webp';
import muralRack from '@assets/gallery-mural-rack.webp';
import mainFloor from '@assets/gallery-floor.webp';
import spinStudio from '@assets/gallery-spin-studio.webp';
import cableFunctional from '@assets/gallery-cable.webp';
import cardio from '@assets/gallery-cardio.webp';

export interface GymPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  portrait?: boolean;
  /** object-position override — upar wala text/façade visible ho, isliye slight upward */
  objectPosition?: string;
}

export const gymPhotos: GymPhoto[] = [
  {
    src: entrance,
    width: 1182,
    height: 1330,
    portrait: true,
    // Building photo portrait hai — wide hero me object-cover sirf ek vertical slice
    // dikhata hai. 70% = gate/entrance visible (pehle 20% upar se sirf sign dikhta tha).
    objectPosition: '50% 70%',
    alt: 'Infinity Fitness Gym Kaithal - front entrance and building facade',
    caption: 'Front Entrance',
  },
  {
    src: legpress,
    width: 1281,
    height: 1227,
    alt: 'Infinity Fitness Gym Kaithal - strength training area with leg press and bench press machines',
    caption: 'Strength Training Area',
  },
  {
    src: muralRack,
    width: 1086,
    height: 1448,
    portrait: true,
    alt: 'Infinity Fitness Gym Kaithal - workout zone with wall mural and weight rack',
    caption: 'Wall Mural & Weight Rack',
  },
  {
    src: mainFloor,
    width: 1448,
    height: 1086,
    alt: 'Infinity Fitness Gym Kaithal - main workout floor with strength training machines',
    caption: 'Main Workout Floor',
  },
  {
    src: spinStudio,
    width: 1448,
    height: 1086,
    objectPosition: '50% 25%',
    alt: 'Infinity Fitness Gym Kaithal - spin cycling studio',
    caption: 'Spin Cycling Studio',
  },
  {
    src: cableFunctional,
    width: 1448,
    height: 1086,
    alt: 'Infinity Fitness Gym Kaithal - cable machine and functional training area',
    caption: 'Cable & Functional Training',
  },
  {
    src: cardio,
    width: 1448,
    height: 1086,
    alt: 'Infinity Fitness Gym Kaithal - cardio zone with treadmills',
    caption: 'Cardio Zone - Treadmills',
  },
];