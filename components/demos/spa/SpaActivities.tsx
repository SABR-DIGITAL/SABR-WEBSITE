import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useSearchParams } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  Compass, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Trees,
  Bike,
  Activity,
  Heart
} from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA, ActivityItem } from './spaData';

const motion = framerMotion as any;

export const SpaActivities: React.FC = () => {
  const [searchParams] = useSearchParams();
  const actParam = searchParams.get('act');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string>(actParam || 'all');
  const [enquirySent, setEnquirySent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (actParam) {
      const match = SPA_DATA.activities.find(a => a.id.includes(actParam));
      if (match) setSelectedActivity(match.id);
    }
  }, [actParam]);

  const activitiesDetailed = [
    {
      id: 'equestrian',
      num: '01',
      title: 'FOREST EQUESTRIAN TRAILS',
      category: 'Equestrian',
      duration: '90 – 120 MIN',
      schedule: 'Daily at 08:30 & 16:30',
      difficulty: 'All Levels (Beginner to Advanced)',
      heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=800'
      ],
      tagline: 'Quiet canters through 180 acres of private pine forest and lakeside meadows.',
      description: 'Ride purebred Friesian and Irish Sport horses along untouched forest bridleways. Led by licensed master equestrians with custom leather saddles, safety gear, and post-ride champagne picnics under the canopy.',
      features: [
        'Private Stable Tour & Grooming Ritual',
        'Tailored Canter & Trot Pace by Skill',
        'Sunset Champagne Lakeside Halt',
        'High-Grade Helmets & Boots Provided'
      ]
    },
    {
      id: 'thermal-pools',
      num: '02',
      title: 'HEATED PANORAMA POOLS',
      category: 'Hydrotherapy',
      duration: 'Unlimited Access for Guests',
      schedule: '07:00 – 22:00 Daily',
      difficulty: 'Leisure & Recovery',
      heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800'
      ],
      tagline: '34°C geothermal mineral waters surrounded by pristine evergreen canopy.',
      description: 'A 25-meter heated outdoor pool crafted from volcanic slate and surrounded by heated loungers. Enriched with natural magnesium and sulphur minerals that soothe muscular fatigue and improve circulation.',
      features: [
        '34°C Geothermal Hydro Jets',
        'Underwater Ambient Acoustic Audio',
        'Swim-Up Phyto-Bar Service',
        'Heated Towel & Cashmere Robe Service'
      ]
    },
    {
      id: 'ebikes',
      num: '03',
      title: 'ELECTRIC FOREST BICYCLES',
      category: 'Exploration',
      duration: 'Self-Paced or Guided Tour',
      schedule: 'Available 08:00 – 19:00',
      difficulty: 'Moderate / Leisure',
      heroImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=800'
      ],
      tagline: 'Silent electric mountain bikes with integrated satellite trail navigation.',
      description: 'Glide effortlessly across 24 kilometers of custom groomed gravel paths. Stop at panoramic lookout decks overlooking the Wiltshire Valley with complimentary artisan backpacks containing espresso and energy snacks.',
      features: [
        'Specialized Turbo Levo Carbon E-Bikes',
        'Garmin GPS Navigation with Curated Routes',
        'Emergency Concierge Radio Dispatch',
        'Custom Leather Panniers & Tool Kit'
      ]
    },
    {
      id: 'yoga',
      num: '04',
      title: 'GLASSHOUSE YOGA & BREATHWORK',
      category: 'Mindfulness',
      duration: '60 MIN Sessions',
      schedule: 'Sunrise 07:30 · Sunset 18:00',
      difficulty: 'All Levels (Props Provided)',
      heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'
      ],
      tagline: '360° forest views, cedar aroma therapy, and Tibetan sound healing bowls.',
      description: 'Practice inside our custom architectural glass pavilion suspended above the forest floor. Led by master yogis specializing in Ashtanga flow, Yin restorative stretching, and Pranayama diaphragmatic breathwork.',
      features: [
        'Floor-to-Ceiling Pine Vista Glasshouse',
        'Organic Cork Mats & Merino Wool Blankets',
        'Live Tibetan Singing Bowls Sound Bath',
        'Herbal Phyto-Tea Elixir Upon Departure'
      ]
    },
    {
      id: 'tennis',
      num: '05',
      title: 'FOREST CLAY TENNIS COURTS',
      category: 'Sport',
      duration: '60 – 90 MIN Bookings',
      schedule: '08:00 – 20:00 Daily',
      difficulty: 'Recreational to Tournament',
      heroImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1200',
      gallery: [
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800'
      ],
      tagline: 'Championship red clay courts sheltered by towering 60-foot pines.',
      description: 'Two tournament-grade European red clay courts engineered for optimal bounce and low joint impact. Private coaching available with LTA certified pros, alongside automated ball machines and racquet stringing.',
      features: [
        'European Imported Red Brick Clay',
        'Babolat Pro Staff & Wilson Clash Racquets',
        'Automated SpinShot Ball Delivery System',
        'Chilled Towels & Electrolyte Service'
      ]
    }
  ];

  const filteredActivities = selectedActivity === 'all'
    ? activitiesDetailed
    : activitiesDetailed.filter(a => a.id.includes(selectedActivity) || selectedActivity.includes(a.id));

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <section className="relative pt-44 pb-24 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            OUTDOOR EXPEDITIONS & WELLNESS
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            ACTIVITIES & RECREATION
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Immerse your body in the rhythms of the forest. From dawn equestrian canters across 180 acres of private pine trails 
            to championship clay tennis and sunset breathwork inside the suspended glasshouse.
          </p>

          {/* FILTER TABS (FLUID EDITORIAL TYPOGRAPHY, NO BOXES) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/10">
            <button
              onClick={() => setSelectedActivity('all')}
              className={`group relative pb-2 text-xs font-mono uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center gap-2 ${
                selectedActivity === 'all'
                  ? 'text-white font-bold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span className={`text-[10px] ${selectedActivity === 'all' ? 'text-emerald-400 font-bold' : 'text-white/20'}`}>
                01
              </span>
              <span>All Activities</span>
              {selectedActivity === 'all' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#1df2a4]" />
              )}
            </button>
            {activitiesDetailed.map((act, idx) => (
              <button
                key={act.id}
                onClick={() => setSelectedActivity(act.id)}
                className={`group relative pb-2 text-xs font-mono uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center gap-2 ${
                  selectedActivity === act.id
                    ? 'text-white font-bold'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                <span className={`text-[10px] ${selectedActivity === act.id ? 'text-emerald-400 font-bold' : 'text-white/20'}`}>
                  0{idx + 2}
                </span>
                <span>{act.title.split(' ')[1] || act.category}</span>
                {selectedActivity === act.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#1df2a4]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES DETAILED SHOWCASE (FLUID ASYMMETRICAL EDITORIAL LAYOUT) */}
      <section className="py-36 md:py-48 px-6 md:px-14 max-w-6xl mx-auto space-y-36">
        {filteredActivities.map((act, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={act.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* IMAGE COLUMN */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative overflow-hidden aspect-[16/11] border border-white/15 shadow-2xl group">
                  <img
                    src={act.heroImage}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white font-mono text-[10px] tracking-widest uppercase text-emerald-300">
                    {act.category} · {act.difficulty}
                  </div>
                </div>
              </div>

              {/* CONTENT COLUMN */}
              <div className={`lg:col-span-6 space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                    <span className="uppercase tracking-[0.3em] font-bold">{act.schedule}</span>
                    <span className="text-white/40 tracking-widest">{act.duration}</span>
                  </div>
                  <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
                    {act.title}
                  </h3>
                  <p className="font-cormorant text-xl italic text-slate-300">
                    "{act.tagline}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {act.description}
                </p>

                {/* REFINED HIGHLIGHTS (CLEAN TYPOGRAPHY, NO GENERIC CHECKMARKS) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {act.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-xs text-white/75 font-mono">
                      <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* ACTION ROW */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
                  >
                    <span>BOOK EXPERIENCE</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* FOOTER */}
      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaActivities;
