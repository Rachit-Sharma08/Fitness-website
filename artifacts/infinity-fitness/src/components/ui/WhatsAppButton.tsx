import React from 'react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const WA_URL =
  'https://wa.me/918168828832?text=' +
  encodeURIComponent('Hi! I want to join Infinity Fitness Gym. Please share the membership details.');

export function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noreferrer"
      className="flex group fixed bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-105 hover:shadow-[#25D366]/50 transition-all duration-300 items-center h-12 md:h-14 bottom-[calc(env(safe-area-inset-bottom,0px)+4rem)] left-4 md:bottom-6 md:left-6 z-50"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center">
        <WhatsAppIcon className="w-[26px] h-[26px] md:hidden" />
        <WhatsAppIcon className="w-[30px] h-[30px] hidden md:block" />
        {/* Ping effect */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-50 animate-ping -z-10" style={{ animationDuration: '2s' }}></span>
      </span>
      {/* Label — hover par slide-out hota hai (mobile par sirf icon hi tap-friendly rahta hai) */}
      <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap font-bold uppercase tracking-wider text-sm group-hover:max-w-[200px] group-hover:pl-5 transition-all duration-300 ease-out">
        Chat with us
      </span>
    </a>
  );
}
