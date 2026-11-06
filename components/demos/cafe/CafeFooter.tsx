import React, { useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Coffee, Instagram, Facebook, Mail, CheckCircle2 } from 'lucide-react';

const CafeFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="py-28 bg-[#FDF4F5] border-t border-[#A4715E]/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 mb-20">
          <div className="space-y-6 w-full max-w-md">
            <h2 className="font-serif text-4xl font-bold text-[#4A403A] tracking-tight">Stay in the Loop.</h2>
            <p className="text-[#A4715E]/80 font-medium italic">
              "Join our community of coffee lovers for seasonal menu launches and news from the bakery."
            </p>
            {subscribed ? (
              <div className="flex items-center gap-3 px-6 py-4 bg-white border border-[#A4715E]/25 rounded-2xl text-[#4A403A] font-bold text-sm shadow-sm">
                <CheckCircle2 size={18} className="text-[#A4715E] shrink-0" />
                <span>Welcome to The Hearth — you're on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="bg-white border border-[#A4715E]/20 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#A4715E] text-[#4A403A] transition-all text-sm w-full"
                />
                <button
                  type="submit"
                  className="bg-[#4A403A] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#A4715E] transition-all shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-10">
            <nav aria-label="Cafe Footer Navigation" className="flex flex-wrap gap-6 sm:gap-8">
              {[
                { name: 'Home', path: '/demo/cafe' },
                { name: 'Menu', path: '/demo/cafe/menu' },
                { name: 'Locations', path: '/demo/cafe/locations' },
                { name: 'About', path: '/demo/cafe/about' },
                { name: 'Contact', path: '/demo/cafe/contact' },
                { name: 'Book a Table', path: '/demo/cafe/book' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-[11px] font-black uppercase tracking-[0.25em] text-[#4A403A] hover:text-[#A4715E] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col lg:items-end gap-4">
              <div className="flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white border border-[#A4715E]/15 flex items-center justify-center text-[#A4715E] hover:bg-[#A4715E] hover:text-white transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white border border-[#A4715E]/15 flex items-center justify-center text-[#A4715E] hover:bg-[#A4715E] hover:text-white transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="mailto:hello@thehearth.cafe"
                  aria-label="Email The Hearth"
                  className="w-10 h-10 rounded-full bg-white border border-[#A4715E]/15 flex items-center justify-center text-[#A4715E] hover:bg-[#A4715E] hover:text-white transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
              <div className="lg:text-right flex flex-col gap-1">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A4715E]/60">Direct Contact</p>
                <a
                  href="mailto:hello@thehearth.cafe"
                  className="text-lg font-bold text-[#4A403A] hover:text-[#A4715E] transition-colors"
                >
                  hello@thehearth.cafe
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-[#A4715E]/15">
          <Link to="/demo/cafe" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#A4715E] rounded-full flex items-center justify-center text-white">
              <Coffee size={14} />
            </div>
            <span className="font-serif text-lg font-bold text-[#4A403A] group-hover:text-[#A4715E] transition-colors">
              The Hearth
            </span>
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#A4715E]/50 text-center">
            © 2025 THE HEARTH CAFE | BUILT BY SABR STUDIO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CafeFooter;
