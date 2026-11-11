import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  Coffee,
  Flower2,
  Utensils,
  Heart,
  Leaf,
  Wheat,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  Clock
} from 'lucide-react';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';
import { useCafeGlide, CAFE_GLIDE_STYLES } from './useCafeGlide';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tags: string[];
  badge?: string;
}

interface MenuCategory {
  id: string;
  roman: string;
  shortLabel: string;
  name: string;
  subtitle: string;
  note: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'coffee-espresso',
    roman: 'I',
    shortLabel: 'House Espresso',
    name: 'House Espresso & Brews',
    subtitle: 'Small-Batch Roast · Estate Dairy & Oat',
    note: 'All espresso drinks are pulled as a double shot using our seasonal Brazilian & Ethiopian house blend.',
    icon: <Coffee size={15} />,
    items: [
      {
        name: 'Velvet Flat White',
        desc: 'Double house espresso folded into velvety textured micro-foam.',
        price: '£3.80',
        tags: ['V', 'GF'],
        badge: 'House Signature'
      },
      {
        name: 'Single Origin Pour-Over (V60)',
        desc: 'Hand-poured seasonal filter with notes of jasmine, bergamot, and stone fruit.',
        price: '£4.50',
        tags: ['VG', 'GF']
      },
      {
        name: 'Madagascar Vanilla Bean Latte',
        desc: 'House syrup infused with real split vanilla pods and steamed organic milk.',
        price: '£4.20',
        tags: ['V', 'GF']
      },
      {
        name: 'Salted Honey Cortado',
        desc: 'Equal parts rich espresso and warm milk, finished with Cotswold wildflower honey.',
        price: '£3.90',
        tags: ['V', 'GF']
      },
      {
        name: 'Artisanal Ceremonial Matcha',
        desc: 'First-harvest Uji matcha whisked to order with oat or whole estate milk.',
        price: '£4.40',
        tags: ['VG', 'GF']
      },
      {
        name: 'Valrhona 70% Hot Chocolate',
        desc: 'Melted dark couverture chocolate ganache steamed with creamy milk and sea salt.',
        price: '£4.30',
        tags: ['V', 'GF']
      }
    ]
  },
  {
    id: 'morning-bakery',
    roman: 'II',
    shortLabel: 'Morning Bakery',
    name: 'Morning Bakery & Viennoiserie',
    subtitle: 'From the Stone Oven · From 8:00 AM',
    note: 'Laminated over three days using cultured Normandy butter and organic stoneground flour.',
    icon: <Flower2 size={15} />,
    items: [
      {
        name: 'Twice-Baked Almond Frangipane',
        desc: 'Flaky croissant soaked in orange blossom syrup, filled with roasted almond cream.',
        price: '£4.40',
        tags: ['V'],
        badge: 'Warm from 8am'
      },
      {
        name: 'Cardamom & Brown Butter Knot',
        desc: 'Soft brioche dough braided with freshly ground green cardamom and pearl sugar.',
        price: '£4.10',
        tags: ['V']
      },
      {
        name: 'Rose & Pistachio Pain Suisse',
        desc: 'Crisp pastry filled with vanilla bean custard and crushed Bronte pistachios.',
        price: '£4.60',
        tags: ['V']
      },
      {
        name: 'Lemon & Pistachio Polenta Cake',
        desc: 'Moist olive oil and citrus crumb topped with candied Amalfi lemon zest.',
        price: '£3.90',
        tags: ['V', 'GF']
      },
      {
        name: 'The Hearth Sea-Salt Brownie',
        desc: 'Warm Valrhona dark chocolate square with a fudgy centre and Cornish sea salt.',
        price: '£3.80',
        tags: ['V']
      },
      {
        name: 'Warm Buttermilk Scone',
        desc: 'Served with Somerset clotted cream and house-made strawberry & rosewater jam.',
        price: '£4.80',
        tags: ['V']
      }
    ]
  },
  {
    id: 'brunch-plates',
    roman: 'III',
    shortLabel: 'Brunch Table',
    name: 'All-Day Brunch Table',
    subtitle: 'Served Until 3:30 PM · Pasture-Raised Eggs',
    note: 'Our sourdough is naturally leavened for 36 hours and baked each morning in our hearth.',
    icon: <Utensils size={15} />,
    items: [
      {
        name: 'Crushed Avocado & Poached Eggs',
        desc: 'Toasted country sourdough, Burford Brown eggs, pickled chilli, lime, and garden herbs.',
        price: '£10.50',
        tags: ['V'],
        badge: 'Chef Selection'
      },
      {
        name: 'Spiced Garden Shakshuka',
        desc: 'Slow-simmered plum tomatoes, roasted red peppers, baked eggs, whipped feta, and warm flatbread.',
        price: '£12.00',
        tags: ['V']
      },
      {
        name: 'Brioche French Toast',
        desc: 'Caramelised thick-cut brioche, compote of seasonal berries, whipped mascarpone, and pure maple.',
        price: '£11.50',
        tags: ['V']
      },
      {
        name: 'Wild Mushroom & Truffle Tartine',
        desc: 'Sautéed woodland mushrooms, thyme, aged Comté, and poached egg on grilled sourdough.',
        price: '£12.50',
        tags: ['V']
      },
      {
        name: 'Severn & Wye Smoked Salmon Plate',
        desc: 'Soft scrambled eggs, dill crème fraîche, caper berries, and charred lemon on seeded rye.',
        price: '£13.50',
        tags: []
      },
      {
        name: 'Warm Roasted Squash & Halloumi Bowl',
        desc: 'Herbed quinoa, pomegranate, toasted pumpkin seeds, tahini drizzle, and grilled halloumi.',
        price: '£11.80',
        tags: ['V', 'GF']
      }
    ]
  },
  {
    id: 'botanical-teas',
    roman: 'IV',
    shortLabel: 'Botanical Teas',
    name: 'Botanical Infusions & Loose Leaf',
    subtitle: 'Whole-Leaf Botanicals · Cast-Iron Service',
    note: 'Steeped to temperature with filtered spring water; complimentary hot water refills on request.',
    icon: <Leaf size={15} />,
    items: [
      {
        name: 'Organic Earl Grey Blue',
        desc: 'Hand-picked estate black tea scented with cold-pressed Calabrian bergamot and cornflower petals.',
        price: '£3.60',
        tags: ['VG', 'GF']
      },
      {
        name: 'Wild Cotswold Garden Mint',
        desc: 'Freshly picked spearmint and peppermint leaves with a touch of local blossom honey.',
        price: '£3.80',
        tags: ['V', 'GF']
      },
      {
        name: 'Rose Bud & Lychee White Tea',
        desc: 'Delicate silver needle white tea infused with Damascus rosebuds and sweet lychee.',
        price: '£4.20',
        tags: ['VG', 'GF']
      },
      {
        name: 'Chamomile, Lavender & Oatstraw',
        desc: 'A soothing caffeine-free infusion crafted for slow, quiet afternoons.',
        price: '£3.90',
        tags: ['VG', 'GF']
      }
    ]
  }
];

const CafeMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  useCafeGlide(activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleCategories =
    activeCategory === 'all'
      ? MENU_CATEGORIES
      : MENU_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF6F0] font-sans text-[#3D312A] selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <CafeNavbar />

      {/* WARM LUXURY EDITORIAL HEADER */}
      <header className="pt-36 md:pt-44 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6 cafe-glide-up">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#FFFDF9] border border-[#DFD1C0] text-[#8C5E4C] shadow-sm">
            <Clock size={13} className="text-[#A4715E]" />
            <span className="text-[10px] font-black uppercase tracking-[0.38em]">
              Baked Fresh Daily · Served 8am – 5pm
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-black text-[#2E241E] tracking-tight leading-[0.95]">
            The Hearth <span className="text-[#A4715E] italic font-normal">Carte du Jour</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6E5A4F] max-w-2xl mx-auto leading-relaxed font-medium italic">
            Simple, comforting plates made from scratch each morning using stoneground flour from local mills, pasture-raised eggs, and small-batch roasted espresso.
          </p>

          {/* LUXURY ARCHITECTURAL COURSE SELECTOR */}
          <div className="pt-6 max-w-4xl mx-auto">
            <div className="bg-[#FFFDF9] border border-[#DFD1C0] rounded-[2rem] p-2 sm:p-3 shadow-[0_20px_50px_rgba(74,64,58,0.06)]">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`group relative flex flex-col items-center justify-center py-3.5 px-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#2E241E] text-[#FAF6F0] shadow-md'
                      : 'bg-transparent text-[#3D312A] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.35em] mb-1 ${
                      activeCategory === 'all' ? 'text-[#E8C5B8]' : 'text-[#A4715E]'
                    }`}
                  >
                    Index · 00
                  </span>
                  <span className="font-serif text-base sm:text-[17px] font-bold tracking-tight">
                    Complete Menu
                  </span>
                </button>

                {MENU_CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group relative flex flex-col items-center justify-center py-3.5 px-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-[#2E241E] text-[#FAF6F0] shadow-md'
                          : 'bg-transparent text-[#3D312A] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.35em] mb-1 ${
                          isSelected ? 'text-[#E8C5B8]' : 'text-[#A4715E]'
                        }`}
                      >
                        Course · {cat.roman}
                      </span>
                      <span className="font-serif text-base sm:text-[17px] font-bold tracking-tight">
                        {cat.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WARM LUXURY TACTILE MENU SHEET */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-28">
        <div className="bg-[#FFFDF9] rounded-[2.75rem] sm:rounded-[3.5rem] border border-[#DFD1C0] shadow-[0_30px_80px_rgba(74,64,58,0.08)] p-3 sm:p-5">
          <div className="border border-[#EDE2D5] rounded-[2.25rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-16 space-y-20">
            {visibleCategories.map((cat, idx) => (
              <section
                key={cat.id}
                id={cat.id}
                className={`${idx > 0 ? 'pt-16 border-t border-[#ECE2D6]' : ''}`}
              >
                {/* Luxury Editorial Course Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-7 border-b border-[#F2E9DE]">
                  <div className="space-y-2.5 cafe-glide-left">
                    <div className="inline-flex items-center gap-3 text-[#A4715E]">
                      <span className="font-serif italic text-sm font-bold text-[#8C5E4C]">
                        Course {cat.roman}
                      </span>
                      <span className="w-6 h-px bg-[#D8C5B4]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.35em]">
                        {cat.subtitle}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-bold text-[#2E241E] tracking-tight leading-none">
                      {cat.name}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7B665A] italic max-w-sm leading-relaxed md:text-right cafe-glide-right">
                    &ldquo;{cat.note}&rdquo;
                  </p>
                </div>

                {/* Refined 2-Column Dish Grid — Zero Overlap Between Dish Names & Prices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-6 sm:gap-y-9">
                  {cat.items.map((item, j) => {
                    const isLeftCol = j % 2 === 0;
                    return (
                      <div
                        key={j}
                        className={`${
                          isLeftCol ? 'cafe-glide-left' : 'cafe-glide-right'
                        } group p-3 sm:p-4 -mx-2 sm:-mx-4 rounded-2xl hover:bg-[#FAF6F0]/90 transition-colors flex flex-col justify-between gap-2 min-w-0`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-baseline justify-between gap-3 sm:gap-4">
                            <h3 className="font-serif text-[17px] sm:text-xl md:text-[21px] font-bold text-[#2E241E] group-hover:text-[#A4715E] transition-colors leading-snug min-w-0">
                              {item.name}
                            </h3>
                            <span
                              aria-hidden="true"
                              className="hidden sm:block flex-1 border-b border-dotted border-[#D8C7B6] mb-1.5 min-w-[16px]"
                            />
                            <span className="font-serif text-[17px] sm:text-xl font-bold text-[#8C5E4C] shrink-0 tabular-nums ml-auto">
                              {item.price}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-[#6E5A4F] italic leading-relaxed mt-1.5">
                            {item.desc}
                          </p>
                        </div>

                        {(item.badge || item.tags.length > 0) && (
                          <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {item.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EAE2] border border-[#E2CFC2] text-[#8C5E4C] text-[9px] font-black uppercase tracking-[0.22em]">
                                {item.badge}
                              </span>
                            )}
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[9px] font-black text-[#A4715E]/80 uppercase tracking-[0.25em]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Dietary Key Bar */}
            <div className="pt-10 border-t border-[#ECE2D6] flex flex-wrap items-center justify-between gap-6 text-[#6E5A4F] cafe-glide-up">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Leaf size={14} className="text-[#A4715E]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Vegetarian (V)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wheat size={14} className="text-[#A4715E]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Plant-Based (VG)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#A4715E]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Gluten-Free (GF)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#A4715E]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Organic Local Dairy &amp; Oat</span>
                </div>
              </div>
              <span className="text-xs italic text-[#8C7568]">
                Discretionary 10% service charge for table service.
              </span>
            </div>
          </div>
        </div>

        {/* WARM & COZY KITCHEN CARE + RESERVATION CARD */}
        <div className="mt-14 bg-[#F3EAE0] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-14 border border-[#E2D3C1] flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 max-w-2xl cafe-glide-left">
            <div className="w-14 h-14 rounded-2xl bg-[#FFFDF9] border border-[#A4715E]/20 flex items-center justify-center text-[#A4715E] shrink-0 shadow-sm">
              <Heart size={24} />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D312A]">
                Warmth &amp; Kitchen Care
              </h3>
              <p className="text-sm sm:text-base text-[#6E5A4F] italic leading-relaxed">
                Every dish is prepared fresh in our open kitchen. Because we bake with nuts, sesame, dairy, and stoneground wheat daily, please let your server know of any allergies and we will happily guide you.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0 cafe-glide-right">
            <Link
              to="/demo/cafe/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A4715E] hover:bg-[#3D312A] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-md"
            >
              <Calendar size={15} />
              <span>Reserve a Table</span>
            </Link>
            <Link
              to="/demo/cafe/locations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFFDF9] border border-[#A4715E]/25 hover:border-[#3D312A] text-[#3D312A] rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all"
            >
              <MapPin size={15} />
              <span>Our Houses</span>
            </Link>
          </div>
        </div>
      </main>

      <CafeFooter />
      <style>{CAFE_GLIDE_STYLES}</style>
    </div>
  );
};

export default CafeMenu;
