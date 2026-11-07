export interface SpaSuite {
  id: string;
  name: string;
  category: 'rooms' | 'cottages' | 'chalet' | 'villas';
  tagline: string;
  pricePerNight: number;
  sizeSqm: number;
  capacity: string;
  heroImage: string;
  gallery: string[];
  description: string;
  amenities: string[];
  features: { label: string; value: string }[];
}

export interface DiningVenue {
  id: string;
  name: string;
  cuisine: string;
  hours: string;
  description: string;
  image: string;
  signatureDish: string;
  dressCode: string;
  highlights: string[];
}

export interface SpaTreatment {
  id: string;
  name: string;
  category: 'Massages' | 'Hydrotherapy' | 'Facials' | 'Rituals' | 'Sauna';
  duration: string;
  price: number;
  description: string;
  image: string;
  includes: string[];
}

export interface ActivityItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  tags: string[];
}

export const SPA_DATA = {
  brand: {
    name: 'VERDANT',
    subname: 'RELAX PARK & THERMAL SPA',
    tagline: 'Nature is not a place to visit. It is home.',
    phone: '+44 (0) 20 7946 0912',
    email: 'concierge@verdantrelaxpark.co.uk',
    address: 'Pine Valley Woods, Wiltshire, SP4 7DX, United Kingdom',
    coordinates: '51.1342° N, 1.7892° W'
  },

  suites: [
    {
      id: 'pine-cottage',
      name: 'PINE GLASS COTTAGE',
      category: 'cottages',
      tagline: 'Quiet woodland seclusion framed by floor-to-ceiling panoramic glass.',
      pricePerNight: 490,
      sizeSqm: 68,
      capacity: '2 Adults · 1 Child',
      heroImage: '/src/assets/images/verdant_pine_cottage_1793919178058.webp',
      gallery: [
        '/src/assets/images/verdant_pine_cottage_1793919178058.webp',
        '/src/assets/images/verdant_forest_suite_1793919180207.webp'
      ],
      description:
        'Freestanding timber and glass cottage with a private cedar sauna, wood-burning fireplace, and recessed deck overlooking ancient pine woodland.',
      amenities: [
        'Private Cedar Sauna',
        'Wood-Burning Fireplace',
        'Heated Stone Flooring',
        'Full Thermal Spa Access'
      ],
      features: [
        { label: 'Living Area', value: '68 m²' },
        { label: 'Bed', value: 'Super King' },
        { label: 'Outlook', value: '180° Pine Canopy' },
        { label: 'Terrace', value: '24 m² Private Deck' }
      ]
    },
    {
      id: 'forest-room',
      name: 'SUPERIOR FOREST SUITE',
      category: 'rooms',
      tagline: 'Warm natural cedar interiors opening onto a private woodland balcony.',
      pricePerNight: 320,
      sizeSqm: 42,
      capacity: '2 Adults',
      heroImage: '/src/assets/images/verdant_forest_suite_1793919180207.webp',
      gallery: [
        '/src/assets/images/verdant_forest_suite_1793919180207.webp',
        '/src/assets/images/verdant_pine_cottage_1793919178058.webp'
      ],
      description:
        'Set within the main lodge with a west-facing woodland balcony, rainfall stone shower, and direct heated walkway access to the thermal pools.',
      amenities: [
        'Walk-In Rainfall Shower',
        'Private Woodland Balcony',
        'Organic Linen Bedding',
        'Full Thermal Spa Access'
      ],
      features: [
        { label: 'Living Area', value: '42 m²' },
        { label: 'Bed', value: 'King Size' },
        { label: 'Outlook', value: 'Pine Valley' },
        { label: 'Location', value: 'Main Sanctuary Lodge' }
      ]
    },
    {
      id: 'lake-chalet',
      name: 'LAKESIDE CHALET DUPLEX',
      category: 'chalet',
      tagline: 'Two-storey timber residence on the water with a 38°C cedar hot tub.',
      pricePerNight: 780,
      sizeSqm: 115,
      capacity: '4 Adults · 2 Children',
      heroImage: '/src/assets/images/verdant_lake_chalet_1793919181022.webp',
      gallery: [
        '/src/assets/images/verdant_lake_chalet_1793919181022.webp',
        '/src/assets/images/verdant_forest_suite_1793919180207.webp'
      ],
      description:
        'Positioned directly on the sanctuary lakefront with a steaming outdoor cedar hot tub, open-plan fireplace lounge, and two master suites.',
      amenities: [
        '38°C Outdoor Cedar Hot Tub',
        'Private Lakefront Deck',
        'Two En-Suite King Bedrooms',
        'Open Wood Fireplace'
      ],
      features: [
        { label: 'Living Area', value: '115 m²' },
        { label: 'Bedrooms', value: 'Two Master Suites' },
        { label: 'Outlook', value: 'Sanctuary Lakefront' },
        { label: 'Bathrooms', value: 'Two En-Suite Spa Baths' }
      ]
    },
    {
      id: 'forest-villa',
      name: 'GRAND PRESIDENTIAL VILLA',
      category: 'villas',
      tagline: 'Secluded 240 m² woodland estate with a private 12m heated infinity pool.',
      pricePerNight: 1450,
      sizeSqm: 240,
      capacity: '6 Adults · 4 Children',
      heroImage: '/src/assets/images/verdant_forest_villa_1793919208723.webp',
      gallery: [
        '/src/assets/images/verdant_forest_villa_1793919208723.webp',
        '/src/assets/images/verdant_forest_suite_1793919180207.webp'
      ],
      description:
        'Complete privacy deep within the pine reserve. Features a 12-metre heated outdoor pool, detached cedar sauna pavilion, three master suites, and 24-hour host.',
      amenities: [
        '12m Heated Infinity Pool',
        'Private Sauna Pavilion',
        '24-Hour Residence Host',
        'In-Villa Private Dining'
      ],
      features: [
        { label: 'Living Area', value: '240 m²' },
        { label: 'Bedrooms', value: 'Three Master Suites' },
        { label: 'Outlook', value: 'Deep Pine Reserve' },
        { label: 'Pool', value: '12m Heated Private Pool' }
      ]
    }
  ] as SpaSuite[],

  diningVenues: [
    {
      id: 'food-forest',
      name: 'FOOD & FOREST',
      cuisine: 'Seasonal Woodland & Heritage British Dining',
      hours: '07:30 – 23:00',
      description:
        'Our signature restaurant cantilevered above the forest floor, celebrating wild woodland mushrooms, estate game, and organic garden produce.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=90&w=2400',
      signatureDish: 'Roast Wiltshire Venison Loin with Wild Morels & Pine Jus',
      dressCode: 'Smart Casual',
      highlights: ['Seven-Course Tasting Menu', '850-Bin Wine Cellar', 'Forest View Terrace']
    },
    {
      id: 'pich-fire',
      name: 'THE HEARTH WOOD-FIRE KITCHEN',
      cuisine: 'Open-Flame Cooking & Dry-Aged Cuts',
      hours: '12:00 – 22:30',
      description:
        'An intimate dark-timber dining room centred around an open birchwood fire, serving dry-aged British steaks, whole roasted sea bass, and stone-baked flatbreads.',
      image: '/src/assets/images/verdant_hearth_kitchen_1793919209436.webp',
      signatureDish: '45-Day Dry-Aged Ribeye Roasted Over Birch Embers',
      dressCode: 'Relaxed Evening',
      highlights: ['Open Birchwood Hearth', 'Stone-Baked Sourdough', 'Smoked Botanical Cocktails']
    },
    {
      id: 'pool-bar',
      name: 'THERMAL POOL TERRACE',
      cuisine: 'Cold-Pressed Juices, Light Plates & Champagne',
      hours: '09:00 – 21:00',
      description:
        'Set directly beside our 34°C outdoor geothermal pool. Serving fresh coastal seafood, crisp salads, botanical tonics, and chilled champagne.',
      image: '/src/assets/images/verdant_thermal_pool_1793919176502.webp',
      signatureDish: 'Hand-Dived Scallop Ceviche with Citrus & Pine Needle Spritz',
      dressCode: 'Spa Attire Welcome',
      highlights: ['Heated Poolside Loungers', 'Cold-Pressed Tonics', 'Afternoon Champagne']
    },
    {
      id: 'phyto-bar',
      name: 'BOTANICAL TEA LOUNGE',
      cuisine: 'Whole-Leaf Infusions, Raw Honey & Broths',
      hours: '08:00 – 20:00',
      description:
        'A quiet, cedar-lined lounge serving wild-harvested herbal infusions from our estate gardens, raw Wiltshire heather honey, and restorative broths.',
      image: '/src/assets/images/verdant_tea_lounge_1793919210634.webp',
      signatureDish: 'Estate Pine Needle, Chamomile & Wild Heather Honey Infusion',
      dressCode: 'Spa Robes Welcome',
      highlights: ['Bespoke Herbal Blending', 'Raw Estate Honey', 'Quiet Forest Outlook']
    }
  ] as DiningVenue[],

  treatments: [
    {
      id: 'nordic-stone',
      name: 'NORDIC BASALT HOT STONE RITUAL',
      category: 'Rituals',
      duration: '90 Minutes',
      price: 185,
      description:
        'Smooth volcanic river stones warmed in organic pine and cedarwood oils are used in long, unhurried strokes to melt away deep muscular tension.',
      image: '/src/assets/images/verdant_hot_stone_1793919211791.webp',
      includes: ['Full-Body Basalt Stone Massage', 'Warm Pine & Cedarwood Oils', 'Heated Linen Compress']
    },
    {
      id: 'thermal-hydro',
      name: 'THERMAL STEAM & MINERAL SOAK',
      category: 'Hydrotherapy',
      duration: '75 Minutes',
      price: 150,
      description:
        'A restorative contrast ritual pairing aromatic birch-leaf cedar steam and a sea-salt polish with a private 36°C magnesium spring bath.',
      image: '/src/assets/images/verdant_cedar_sauna_1793919246321.webp',
      includes: ['Aromatic Cedar & Birch Steam', 'Eucalyptus Sea-Salt Polish', 'Private Magnesium Mineral Bath']
    },
    {
      id: 'phyto-facial',
      name: 'BOTANICAL CELLULAR RADIANCE FACIAL',
      category: 'Facials',
      duration: '60 Minutes',
      price: 140,
      description:
        'Organic woodland botanical extracts and hyaluronic hydration paired with lymphatic sculpting massage to restore clarity and natural tone.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=90&w=2400',
      includes: ['Botanical Enzyme Resurfacing', 'Lymphatic Facial Sculpting', 'Cooling Crystal Globe Finish']
    },
    {
      id: 'deep-release',
      name: 'DEEP WOODLAND RESTORATIVE MASSAGE',
      category: 'Massages',
      duration: '75 Minutes',
      price: 165,
      description:
        'Focused deep-tissue bodywork using warm arnica, juniper berry, and sweet birch balm to release shoulder and lumbar tightness.',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=90&w=2400',
      includes: ['Targeted Deep-Tissue Release', 'Warm Arnica & Juniper Balm', 'Heated Neck & Shoulder Wrap']
    }
  ] as SpaTreatment[],

  activities: [
    {
      id: 'horse-riding',
      number: '01',
      title: 'FOREST EQUESTRIAN TRAILS',
      subtitle: 'Unhurried morning and dusk rides across 180 acres of private pine woodland.',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=90&w=2400',
      description:
        'Explore soft woodland bridleways and lakeside meadows alongside our resident instructors on calm, well-schooled Irish Sport and Friesian horses.',
      tags: ['Private Guided Rides', 'All Riding Abilities', 'Sunrise & Dusk']
    },
    {
      id: 'thermal-pools',
      number: '02',
      title: 'HEATED PANORAMA POOLS',
      subtitle: 'Year-round 34°C outdoor mineral waters framed by towering evergreens.',
      image: '/src/assets/images/verdant_thermal_pool_1793919176502.webp',
      description:
        'Our 25-metre outdoor slate infinity pool is naturally heated to 34°C throughout the year, complete with hydro-massage jets and heated stone loungers.',
      tags: ['34°C Year-Round', 'Mineral Spring Water', 'Heated Loungers']
    },
    {
      id: 'e-bikes',
      number: '03',
      title: 'ELECTRIC FOREST BICYCLES',
      subtitle: 'Silent all-terrain electric bicycles for exploring 45 km of woodland trails.',
      image: '/src/assets/images/verdant_forest_ebikes_1793919214449.webp',
      description:
        'Complimentary carbon electric mountain bikes with mapped scenic routes through the surrounding Wiltshire pine reserve and lakeside viewpoints.',
      tags: ['Complimentary for Guests', 'Mapped Scenic Trails', 'Picnic Hampers']
    },
    {
      id: 'yoga-pavilion',
      number: '04',
      title: 'GLASS YOGA PAVILION',
      subtitle: 'Morning movement, breathwork, and evening sound baths surrounded by trees.',
      image: '/src/assets/images/verdant_yoga_pavilion_1793919215496.webp',
      description:
        'Practise daily guided yoga, restorative stretching, and acoustic sound meditation inside our heated 360-degree glass pavilion overlooking the forest.',
      tags: ['Daily Morning & Dusk', 'Private Tuition', 'Equipment Provided']
    },
    {
      id: 'tennis-sport',
      number: '05',
      title: 'WOODLAND CLAY TENNIS COURTS',
      subtitle: 'Two championship red clay courts sheltered beneath the pine canopy.',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=90&w=2400',
      description:
        'Play on tournament-grade European red clay courts surrounded by quiet woodland, with complimentary racquets, fresh balls, and private coaching.',
      tags: ['European Red Clay', 'Complimentary Equipment', 'Private Coaching']
    }
  ] as ActivityItem[]
};
