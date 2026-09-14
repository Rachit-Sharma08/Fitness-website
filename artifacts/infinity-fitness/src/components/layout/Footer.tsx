import React from 'react';
import { Link } from 'wouter';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground font-display font-bold text-lg skew-x-[-10deg]">
                I/
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                INFINITY FITNESS
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Real equipment, real results, real people. Built for the community of Kaithal to grind it out and transform their lives.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/918168828832" target="_blank" rel="noreferrer" aria-label="Chat with Infinity Fitness Gym on WhatsApp" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#25D366] hover:text-white transition-colors">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/infinityfitnessgyms" target="_blank" rel="noreferrer" aria-label="Follow Infinity Fitness Gym on Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display font-bold text-xl uppercase tracking-wider mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Membership', href: '/membership' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Member Reviews', href: '/testimonials' },
                { name: 'Our Story', href: '/owner' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-primary/50 text-xs">▶</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-xl uppercase tracking-wider mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Kaithal - Dhand Rd, Opp. Maharaja Palace, Rishi Nagar, Kaithal, Haryana 136027</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:8168828832" className="text-muted-foreground hover:text-primary transition-colors">81688 28832</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-display font-bold text-xl uppercase tracking-wider mb-6 text-white">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted-foreground">Monday - Saturday</span>
                <span className="text-white font-medium">Open - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-white font-medium">Open - 11:00 PM</span>
              </li>
              <li className="flex justify-between pt-2">
                <span className="text-primary font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Busiest Hours
                </span>
                <span className="text-primary font-medium">6:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Areas We Serve — SEO: key nearby areas crawlable in natural text */}
        <div className="border-t border-white/5 pt-10 pb-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">Areas We Serve</h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-3xl mx-auto">
              Members join us from Kaithal and nearby areas including Kurukshetra, Karnal, Hisar, and Cheeka. We're conveniently located in Rishi Nagar — just a short drive for anyone in the district.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Infinity Fitness Gym. All rights reserved.
          </p>
          <div className="text-muted-foreground text-sm flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
