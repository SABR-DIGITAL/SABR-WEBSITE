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
      tagline: 'Submerged in pine serenity with panoramic floor-to-ceiling glass.',
      pricePerNight: 490,
      sizeSqm: 68,
      capacity: '2 Adults · 1 Child',
      heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200'
      ],
      description:
        'Architect-designed freestanding timber cottage with private Finnish cedar sauna, wood-burning stove, heated natural stone flooring and a sunken outdoor forest terrace overlooking ancient larch trees.',
      amenities: [
        'Private Cedar Sauna',
        'Nordic Wood Fireplace',
        'Heated Slate Floor',
        'King Sized Organic Bedding',
        'Complimentary Thermal Spa Access',
        'Artisanal Forest Phyto-Bar'
      ],
      features: [
        { label: 'Living Area', value: '68 m²' },
        { label: 'Bed Type', value: 'Custom Super King' },
        { label: 'View', value: '180° Pine Reserve' },
        { label: 'Terrace', value: 'Private 24m² Deck' }
      ]
    },
    {
      id: 'forest-room',
      name: 'SUPERIOR FOREST SUITE',
      category: 'rooms',
      tagline: 'Quiet minimalist sanctuary with textured natural woods and forest terrace.',
      pricePerNight: 320,
      sizeSqm: 42,
      capacity: '2 Adults',
      heroImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
      ],
      description:
        'Located in the main architectural lodge with private sunset balcony, acoustic soundproofing, rain shower with organic herb amenities and direct heated skywalk access to the thermal pool zone.',
      amenities: [
        'Rainforest Walk-in Shower',
        'Balcony with Forest Chaise',
        'Pillow Menu & Aromatherapy',
        'Bose Acoustic Sound System',
        'Daily Morning Herbal Elixir'
      ],
      features: [
        { label: 'Living Area', value: '42 m²' },
        { label: 'Bed Type', value: 'King Orthopedic' },
        { label: 'View', value: 'Courtyard & Pine Valley' },
        { label: 'Floor', value: 'Level 2 Lodge' }
      ]
    },
    {
      id: 'lake-chalet',
      name: 'LAKESIDE CHALET DUPLEX',
      category: 'chalet',
      tagline: 'Two-story luxury timber chalet with heated outdoor hydro plunge pool.',
      pricePerNight: 780,
      sizeSqm: 115,
      capacity: '4 Adults · 2 Children',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'
      ],
      description:
        'A masterwork of contemporary alpine architecture sitting right by the private park lake. Includes private 38°C outdoor cedar hot tub, custom granite kitchen island, dual master suites and private pier.',
      amenities: [
        'Private 38°C Cedar Hot Tub',
        'Panoramic Lakefront Deck',
        'Two King En-Suite Bedrooms',
        'Dedicated Sommelier Service',
        'Wood Fireplace & Timber Lounge'
      ],
      features: [
        { label: 'Living Area', value: '115 m²' },
        { label: 'Bed Type', value: '2 × Master King' },
        { label: 'View', value: 'Private Lakefront' },
        { label: 'Bathrooms', value: '2.5 Spa Baths' }
      ]
    },
    {
      id: 'forest-villa',
      name: 'GRAND PRESIDENTIAL VILLA',
      category: 'villas',
      tagline: 'Secluded 240m² forest estate with private heated infinity pool and private chef.',
      pricePerNight: 1450,
      sizeSqm: 240,
      capacity: '6 Adults · 4 Children',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200'
      ],
      description:
        'Ultimate seclusion hidden deep in the private pine woods. Features an exclusive 12-meter heated infinity pool, private sauna pavilion, 3 master suites, personal butler, and custom culinary tasting experiences in-villa.',
      amenities: [
        'Private 12m Heated Pool',
        'Detached Sauna Pavilion',
        '24/7 Dedicated Butler',
        'In-Villa Chef Experience',
        'Helipad Transfer Access'
      ],
      features: [
        { label: 'Living Area', value: '240 m²' },
        { label: 'Bed Type', value: '3 × Master Suites' },
        { label: 'View', value: 'Deep Pine Reserve' },
        { label: 'Pool', value: 'Private 12m Heated' }
      ]
    }
  ] as SpaSuite[],

  diningVenues: [
    {
      id: 'food-forest',
      name: 'FOOD & FOREST',
      cuisine: 'Modern Nordic & Foraged Wild Gastronomy',
      hours: '07:30 – 23:00',
      description:
        'Our signature glasshouse restaurant cantilevered over the pine forest. Dishes are created around wild ingredients, smoked woodland game, organic garden vegetables and seasonal British heritage produce.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
      signatureDish: 'Smoked Venison Loin with Fermented Pine Glaze & Wild Morel Ragout',
      dressCode: 'Smart Casual',
      highlights: ['8-Course Chef Degustation', 'Sommelier Cellar with 850+ Bottles', 'Forest View Terrace']
    },
    {
      id: 'pich-fire',
      name: 'PICH WOOD-FIRE KITCHEN',
      cuisine: 'Charcoal Hearth & Open Flame Steaks',
      hours: '12:00 – 22:30',
      description:
        'An intimate dark-timber hearth restaurant centered around an open beechwood and birch fire. Prime dry-aged steaks, wood-oven flatbreads, roasted sea bass, and ember-roasted orchard fruits.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200',
      signatureDish: '45-Day Dry Aged Côte de Bœuf over Smoked Birch Embers',
      dressCode: 'Resort Casual',
      highlights: ['Open Charcoal Hearth', 'Artisanal Sourdough Oven', 'Craft Cocktails by the Fire']
    },
    {
      id: 'pool-bar',
      name: 'THERMAL POOL BAR',
      cuisine: 'Fresh Cold-Pressed Elixirs, Crudo & Cocktails',
      hours: '09:00 – 21:00',
      description:
        'Swim up or recline on heated loungers right by our 34°C outdoor thermal mineral pool. Serving fresh botanical mocktails, ice infusions, citrus crudos, and chilled champagne.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200',
      signatureDish: 'Yellowfin Tuna Tartare with Yuzu & Handcrafted Forest Pine Spritz',
      dressCode: 'Spa Robes Welcomed',
      highlights: ['Swim-up Bar Seating', 'Immunity Boost Shots', 'Warm Towel Service']
    },
    {
      id: 'phyto-bar',
      name: 'PHYTO HERBAL LOUNGE',
      cuisine: 'Herbal Infusions, Healing Broths & Botanical Tonics',
      hours: '08:00 – 20:00',
      description:
        'A tranquil cedar-scented tea lounge curated with organic medicinal herbs harvested directly from our botanical park, healing mountain honey, and revitalizing adaptogenic blends.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
      signatureDish: 'Ceremonial Matcha & Pine Needle Anti-Oxidant Elixir',
      dressCode: 'Relaxed',
      highlights: ['Custom Herbal Blending', 'Local Raw Honey Flight', 'Silent Reading Nook']
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
        'Heated volcanic river stones glide with warm organic pine and cedarwood oils to dissolve deep muscle tension and recalibrate the central nervous system.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000',
      includes: ['Full body basalt stone therapy', 'Aromatherapeutic pine oil mist', 'Herbal hot compress finish']
    },
    {
      id: 'thermal-hydro',
      name: 'MINERAL HYDRO-BANYA & HERBAL STEAM',
      category: 'Hydrotherapy',
      duration: '75 Minutes',
      price: 150,
      description:
        'Traditional thermal steam chamber with oak and birch venik whisking, followed by ice fountain immersion and magnesium thermal jet soak.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
      includes: ['Oak whisking session', 'Eucalyptus salt body scrub', 'Thermal magnesium hydrotherapy']
    },
    {
      id: 'phyto-facial',
      name: 'BOTANICAL CELLULAR GLOW FACIAL',
      category: 'Facials',
      duration: '60 Minutes',
      price: 140,
      description:
        'A targeted lifting and brightening facial combining wild lingonberry enzymes, hyaluronic infusions and cryo-sculpting globes.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000',
      includes: ['Wild berry enzyme peel', 'Lymphatic face sculpting', 'Cryo oxygen infusion']
    },
    {
      id: 'deep-release',
      name: 'DEEP PINE THERAPEUTIC MASSAGE',
      category: 'Massages',
      duration: '75 Minutes',
      price: 165,
      description:
        'Customized firm pressure massage utilizing acupressure and arnica pine balm to relieve chronic tightness from travel and posture.',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1000',
      includes: ['Trigger point therapy', 'Arnica and juniper oil', 'Warm neck and lumbar wrap']
    }
  ] as SpaTreatment[],

  activities: [
    {
      id: 'horse-riding',
      number: '01',
      title: 'FOREST EQUESTRIAN TRAILS',
      subtitle: 'Gentle morning rides through 180 acres of ancient pine forest and lakefront.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
      description: 'Experience the serenity of the reserve with experienced equine guides on purebred Friesian and Irish Sport horses.',
      tags: ['Guided Ride', 'Beginner to Advanced', 'Sunrise & Sunset']
    },
    {
      id: 'thermal-pools',
      number: '02',
      title: 'HEATED PANORAMA POOLS',
      subtitle: '34°C year-round thermal pool with heated loungers surrounded by falling snow or summer sun.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200',
      description: 'A 25-meter heated open-air infinity pool seamlessly integrated into the natural forest landscape.',
      tags: ['34°C Year-Round', 'Hydro Jets', 'Ambient Music']
    },
    {
      id: 'e-bikes',
      number: '03',
      title: 'ELECTRIC FOREST BICYCLES',
      subtitle: 'Custom all-terrain e-bikes with mapped GPS trails across the surrounding national park.',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1200',
      description: 'Explore 45km of designated woodland bike routes at your own leisurely pace with trailside picnic hampers available.',
      tags: ['Complimentary for Guests', 'All-Terrain', 'Picnic Packages']
    },
    {
      id: 'yoga-pavilion',
      number: '04',
      title: 'GLASS YOGA PAVILION',
      subtitle: 'Daily morning vinyasa and evening sound baths enclosed by 360-degree glass.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
      description: 'Find inner clarity with guided breathwork, sound healing with Tibetan singing bowls, and restorative yoga.',
      tags: ['Daily Sessions', 'Mats & Blocks Provided', 'Private Sessions']
    },
    {
      id: 'tennis-sport',
      number: '05',
      title: 'TABLE TENNIS & LAWN TENNIS',
      subtitle: 'Tournament-grade clay tennis court and forest recreation pavilion.',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1200',
      description: 'Enjoy a friendly match under the filtered forest sunlight with high-grade rackets and balls provided by the concierge.',
      tags: ['Clay Courts', 'Equipment Included', 'Coaching Available']
    }
  ] as ActivityItem[]
};
