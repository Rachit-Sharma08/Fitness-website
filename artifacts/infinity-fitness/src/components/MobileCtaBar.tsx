import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { OpenStatus } from '@/components/ui/OpenStatus';
import { useFreeTrialModal } from '@/components/free-trial/FreeTrialProvider';
import { GYM_PHONE_DISPLAY, GYM_PHONE_TEL, GYM_WHATSAPP } from '@/lib/siteConfig';

export function MobileCtaBar() {
  const { openFreeTrial } = useFreeTrialModal();

  return (
    <>
      {/* Spacer taaki fixed bar page content ko na dhake */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0c0c0c]/95 border-t border-white/10 cta-bar-safe">
        <div className="grid grid-cols-3 items-stretch h-14">
          <a
            href={`tel:${GYM_PHONE_TEL}`}
            className="flex items-center justify-center gap-1.5 text-primary font-display font-bold uppercase tracking-wide text-[13px]"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
          <button
            onClick={openFreeTrial}
            className="flex items-center justify-center gap-1.5 bg-gold text-gold-foreground font-display font-bold uppercase tracking-wide text-[13px]"
          >
            <CalendarCheck className="w-4 h-4" />
            Free Trial
          </button>
          <a
            href={GYM_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 text-[#25D366] font-display font-bold uppercase tracking-wide text-[13px]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
        <div className="flex items-center justify-center py-1 text-[10px] text-muted-foreground bg-[#080808]">
          <OpenStatus className="text-muted-foreground" /> · {GYM_PHONE_DISPLAY}
        </div>
      </div>
    </>
  );
}
