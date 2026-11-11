// Shared data for Bramble & Bay Riding Academy (Wiltshire).
// Warm, homey English countryside palette: Cream (#FAF6EE), Soft White (#FFFFFF),
// Warm Stone Grey (#5F665E), and Heritage Meadow Green (#2D5A43).

export const academy = {
  name: 'Bramble & Bay',
  fullName: 'Bramble & Bay Riding Academy',
  strapline: 'Riding lessons & hacking in the Pewsey Vale',
  addressLine1: 'Bramble Farm, Woodborough Lane',
  addressLine2: 'Pewsey, Wiltshire',
  postcode: 'SN9 5PX',
  phoneDisplay: '01672 851 440',
  phoneHref: '+441672851440',
  email: 'yard@brambleandbay.co.uk',
  instagramHandle: '@brambleandbay',
  instagramUrl: 'https://instagram.com',
  facebookHandle: 'Bramble & Bay Riding Academy',
  facebookUrl: 'https://facebook.com',
  established: '1998',
  accreditation: 'British Horse Society Approved Centre · Fellow & Stage 4 Coaches',
  mapQuery: 'Pewsey, Wiltshire, SN9'
};

export const openingHours = [
  { days: 'Tuesday – Friday', hours: '8.30am – 8.00pm' },
  { days: 'Saturday', hours: '8.00am – 5.00pm' },
  { days: 'Sunday', hours: '8.30am – 4.00pm' },
  { days: 'Monday', hours: 'Closed (Horse rest & schooling day)' }
];

export const navLinks = [
  { name: 'Lessons', path: '/demo/equestrian/lessons' },
  { name: 'Horses', path: '/demo/equestrian/horses' },
  { name: 'The Yard', path: '/demo/equestrian/facilities' },
  { name: 'FAQs', path: '/demo/equestrian/faqs' },
  { name: 'Contact', path: '/demo/equestrian/contact' }
];

// Cohesive 3-color family: Cream & White, Warm Stone Grey, and Heritage Meadow Green.
export const palette = {
  cream: '#FAF6EE',
  paper: '#FFFFFF',
  ink: '#1E2822',
  green: '#2D5A43',
  greenSoft: '#E8F0EB',
  grey: '#5F665E',
  rose: '#2D5A43',
  gold: '#5F665E',
  meadow: '#2D5A43',
  sky: '#3A6B52',
  lilac: '#5F665E',
  line: '#E2DDD2'
};

export const pastel = {
  blush: '#FAF6EE',
  sand: '#FAF6EE',
  mist: '#E8F0EB',
  sage: '#E8F0EB',
  lilac: '#FAF6EE',
  cream: '#FAF6EE'
};

export const cardWashes = [
  'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(232,240,235,0.55) 100%)',
  'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(250,246,238,0.85) 100%)',
  'linear-gradient(180deg, rgba(232,240,235,0.6) 0%, rgba(255,255,255,0.85) 100%)',
  'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(232,240,235,0.55) 100%)',
  'linear-gradient(180deg, rgba(250,246,238,0.85) 0%, rgba(255,255,255,0.85) 100%)'
];

export const bandWash =
  'linear-gradient(180deg, rgba(250,246,238,0) 0%, rgba(232,240,235,0.45) 50%, rgba(250,246,238,0) 100%)';

export const headerWash =
  'radial-gradient(60% 50% at 50% 0%, rgba(45,90,67,0.07) 0%, rgba(250,246,238,0) 75%)';

// Verified equestrian photography where every key matches its visual subject:
export const images = {
  // Rider in white breeches & tall boots cantering in a white-fenced outdoor sand arena
  hero: '/images/projects/equestrian-preview.webp',
  // Coach and young rider grooming/tacking up a chestnut horse in wooden stables
  lesson: 'https://images.unsplash.com/photo-1607273225241-035d579b8452?auto=format&fit=crop&q=80&w=1400',
  // Sunlit American barn aisle with loosebox stalls on both sides and a horse standing in the corridor
  stables: 'https://images.unsplash.com/photo-1576692192914-9abed71b3ef9?auto=format&fit=crop&q=80&w=1400',
  // Horses standing together inside a timber barn looking over the rails
  barn: 'https://images.unsplash.com/photo-1566392785474-926a4c6257b5?auto=format&fit=crop&q=80&w=1400',
  // Two riders in helmets and breeches schooling side by side in the outdoor sand arena
  arena: 'https://images.unsplash.com/photo-1696866614151-5254858f603f?auto=format&fit=crop&q=80&w=1400',
  // Horses out across open misty countryside pasture & chalk hills
  hacking: 'https://images.unsplash.com/photo-1598362042346-70c59713811f?auto=format&fit=crop&q=80&w=1600',
  // Grey horse cantering across open green turf
  meadow: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=1600',
  // Chestnut horse grazing on open downland grass
  blossom: 'https://images.unsplash.com/photo-1534773728080-33d31da27ae5?auto=format&fit=crop&q=80&w=1400',
  // Young child on a grey pony being led on a lead-rein by a handler
  leadRein: 'https://images.unsplash.com/photo-1743851612756-9aeb50658ce8?auto=format&fit=crop&q=80&w=1400',
  // Children walking toward a grey pony in the paddock
  children: 'https://images.unsplash.com/photo-1676504848820-e1488d13c261?auto=format&fit=crop&q=80&w=1400',
  // Horse and rider in English competition jacket clearing a white showjump fence on grass
  jumping: 'https://images.unsplash.com/photo-1559295928-6964f905e9c7?auto=format&fit=crop&q=80&w=1400',
  // Close-up of a dark bay horse clearing red-and-white showjumping poles
  jumpingTwo: 'https://images.unsplash.com/photo-1574695272842-52dfdb7989d0?auto=format&fit=crop&q=80&w=1400',
  // Saddles and leather tack on racks in the tack room
  tackRoom: 'https://images.unsplash.com/photo-1682636109270-93cb7b720716?auto=format&fit=crop&q=80&w=1400',
  // Rider standing with her horse in the barn doorway looking out at the arena
  bond: 'https://images.unsplash.com/photo-1508343919546-4a5792fee935?auto=format&fit=crop&q=80&w=1400',
  sunset: 'https://images.unsplash.com/photo-1598362042346-70c59713811f?auto=format&fit=crop&q=80&w=1600',
  flatwork: 'https://images.unsplash.com/photo-1511746687876-42cb762f6ac1?auto=format&fit=crop&q=80&w=1400'
};

export interface Lesson {
  id: string;
  name: string;
  category: 'Foundations & Children' | 'Flatwork & Private' | 'Jumping & Clinics' | 'Downland Hacking';
  duration: string;
  who: string;
  setting: string;
  detail: string;
  highlights: string[];
  photo: string;
  accent: string;
}

export const lessons: Lesson[] = [
  {
    id: 'little-buds',
    name: 'Little Buds Lead-Rein',
    category: 'Foundations & Children',
    duration: '30 minutes',
    who: 'Ages 4 – 7 · One-to-one handler',
    setting: 'Quiet Arena & Paddock Track',
    detail: 'One gentle native pony, one child, and a dedicated coach walking beside them from mounting block to dismount.',
    highlights: ['Dedicated handler beside the pony', 'Balance games & first rising trot', 'Grooming & patting in the barn afterwards'],
    photo: images.leadRein,
    accent: palette.green
  },
  {
    id: 'beginner-group',
    name: 'Foundation Group Lesson',
    category: 'Foundations & Children',
    duration: '45 minutes',
    who: 'Four riders maximum',
    setting: '40m × 20m All-Weather School',
    detail: 'Independent steering, quiet hands, balanced rising trot, and school figures — with only four riders so nobody waits in a long line.',
    highlights: ['Capped at 4 riders per group', 'Off the lead-rein at your own pace', 'Same pony & coach each week'],
    photo: images.arena,
    accent: palette.green
  },
  {
    id: 'own-a-pony',
    name: 'Horsemanship & Stable Morning',
    category: 'Foundations & Children',
    duration: '3 hours',
    who: 'Ages 8 – 14 · Small groups',
    setting: 'The American Barn & Arenas',
    detail: 'Hands-on stable management, brushing, picking out feet, learning how a bridle and saddle fit, followed by a ridden lesson and hot chocolate.',
    highlights: ['Grooming & tacking up in the barn', '45-minute ridden arena session', 'Ideal confidence builder for young riders'],
    photo: images.lesson,
    accent: palette.green
  },
  {
    id: 'private',
    name: 'Private Classical Lesson',
    category: 'Flatwork & Private',
    duration: '45 minutes',
    who: 'All levels · One-to-one tuition',
    setting: 'Indoor or Floodlit Outdoor Arena',
    detail: 'Undivided coaching tailored to your seat, posture, and partnership — the calmest, most direct way to progress.',
    highlights: ['1-to-1 with a senior BHS coach', 'Matched to one of 22 schoolmasters', 'Written coaching notes after every ride'],
    photo: images.hero,
    accent: palette.green
  },
  {
    id: 'semi-private',
    name: 'Shared Private Lesson',
    category: 'Flatwork & Private',
    duration: '45 minutes',
    who: 'Two riders of matched ability',
    setting: 'Indoor or Floodlit Outdoor Arena',
    detail: 'All the quiet focus of a private session, shared with a friend, partner, or family member who rides at a similar stage.',
    highlights: ['Two riders only in the arena', 'Ideal for parents & children or friends', 'Flexible midweek & weekend slots'],
    photo: images.arena,
    accent: palette.green
  },
  {
    id: 'returners',
    name: 'Adult Returners Course',
    category: 'Flatwork & Private',
    duration: '4 × 45 minutes',
    who: 'Adults returning to the saddle',
    setting: 'Quiet Midweek Sessions',
    detail: 'Four unhurried weeks with the same coach and the same schoolmaster, designed for riders coming back after years out of the saddle.',
    highlights: ['Four weekly sessions on the same horse', 'Rebuilds core balance & quiet confidence', 'Zero pressure, warm midweek atmosphere'],
    photo: images.bond,
    accent: palette.green
  },
  {
    id: 'improvers',
    name: 'Improvers Flatwork & Poles',
    category: 'Flatwork & Private',
    duration: '60 minutes',
    who: 'Confident in walk, trot & canter',
    setting: '60m × 25m Floodlit Arena',
    detail: 'Rhythm, suppleness, leg-yield, and raised trotting poles to establish an elastic contact and balanced canter transitions.',
    highlights: ['Lateral suppleness & pole exercises', 'Maximum 4 riders in the 60m arena', 'Schoolmasters trained to Novice/Elementary'],
    photo: images.hero,
    accent: palette.green
  },
  {
    id: 'dressage',
    name: 'Flatwork & Dressage Clinic',
    category: 'Jumping & Clinics',
    duration: '60 minutes',
    who: 'Improvers to affiliated riders',
    setting: 'Mirrored Dressage School',
    detail: 'Shoulder-in, travers, medium paces, and accurate test riding on schoolmasters — or bring your own horse for competition preparation.',
    highlights: ['Full long-side training mirrors', 'Schoolmasters or bring your own horse', 'Take-home test sheet & feedback'],
    photo: images.meadow,
    accent: palette.green
  },
  {
    id: 'jumping',
    name: 'Showjumping & Gridwork Clinic',
    category: 'Jumping & Clinics',
    duration: '60 minutes',
    who: 'Jumping 60cm to 1.05m',
    setting: 'Grass Paddock & Waxed Arena',
    detail: 'Gymnastic grids, related distances, dog-legs, and full course riding led by Senior Coach Tom Neave.',
    highlights: ['Course walk & stride adjustment', 'Full BS-standard showjumps & fillers', 'Available on our jumpers or your own horse'],
    photo: images.jumping,
    accent: palette.green
  },
  {
    id: 'hack',
    name: 'Chalk Downland Hack',
    category: 'Downland Hacking',
    duration: '90 minutes',
    who: 'Balanced in walk, trot & canter',
    setting: '400 Acres of Private Downland',
    detail: 'Step straight out of the yard gate onto four hundred acres of ancient Wiltshire chalk turf — zero roadwork, long grass tracks, and views across the Pewsey Vale.',
    highlights: ['Direct bridleway access with no roads', 'Accompanied by a senior yard guide', 'Steady walks or open hilltop canters'],
    photo: images.hacking,
    accent: palette.green
  }
];

export const lessonIncludes = [
  'Hats, body protectors, and boots fitted and borrowed with our compliments',
  'A written note from your coach after every lesson so you can track your progress',
  'The same coach and the same horse each week so a real partnership can grow',
  'Fresh coffee and a warm sofa in the viewing gallery for whoever brought you'
];

export const disciplines = ['Lead-Rein', 'Flatwork', 'Dressage', 'Showjumping', 'Downland Hacking'];

export interface Horse {
  name: string;
  height: string;
  breed: string;
  bloodline: string;
  age: string;
  colour: string;
  discipline: string;
  schooling: string;
  bestFor: string;
  character: string;
  temperament: string;
  quirk: string;
  matchTags: ('first-time' | 'returners' | 'dressage' | 'jumping')[];
  photo: string;
}

export const horses: Horse[] = [
  {
    name: 'Poppy',
    height: '12.2hh',
    breed: 'Welsh Section B',
    bloodline: 'By Hilin Glyndwr',
    age: '14 yrs',
    colour: 'Dapple Grey',
    discipline: 'Lead-Rein & First Ridden',
    schooling: 'Voice transitions & poles',
    bestFor: 'Lead-rein & first lessons',
    character: 'Four hundred children taught to trot, and never once in a hurry.',
    temperament: '10/10 Steady · Voice-trained',
    quirk: 'Rests her chin on the mounting block while waiting for small riders.',
    matchTags: ['first-time', 'jumping'],
    photo: 'https://images.unsplash.com/photo-1676504848820-e1488d13c261?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Marmalade',
    height: '13.1hh',
    breed: 'Dartmoor Cross',
    bloodline: 'Devonshire native lines',
    age: '11 yrs',
    colour: 'Chestnut',
    discipline: 'Junior Flatwork & Poles',
    schooling: 'Balanced canter & 65cm fences',
    bestFor: 'Foundation groups & young riders',
    character: 'Cheerful, sure-footed, and completely honest into a cross-pole.',
    temperament: 'Kind & rhythmic · Loves polework',
    quirk: 'Nickers softly whenever the tack room kettle clicks on.',
    matchTags: ['first-time', 'jumping'],
    photo: 'https://images.unsplash.com/photo-1534773728080-33d31da27ae5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Bluebell',
    height: '15.1hh',
    breed: 'Connemara',
    bloodline: 'By I Love You Melody',
    age: '13 yrs',
    colour: 'Grey',
    discipline: 'Classical Flatwork & Lateral Work',
    schooling: 'Shoulder-in, travers & counter-canter',
    bestFor: 'Improvers & adult flatwork',
    character: 'Gives you a textbook shoulder-in the moment you ask with a quiet leg.',
    temperament: 'Supple, forgiving & balanced',
    quirk: 'Loves having her forehead scratched after untacking in the barn.',
    matchTags: ['returners', 'dressage'],
    photo: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Hawthorn',
    height: '16.1hh',
    breed: 'Irish Sport Horse',
    bloodline: 'By Cruising × Clover Hill',
    age: '10 yrs',
    colour: 'Dark Bay',
    discipline: 'Showjumping & Gridwork',
    schooling: 'Affiliated to 1.10m & BE100',
    bestFor: 'Showjumping clinics',
    character: 'Thorn to his friends — bold, scopey, and locks onto a fence from three strides out.',
    temperament: 'Athletic, honest & Adjustable',
    quirk: 'Watches the grass jumping paddock from his top door all morning.',
    matchTags: ['jumping'],
    photo: 'https://images.unsplash.com/photo-1559295928-6964f905e9c7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Clover',
    height: '14.2hh',
    breed: 'New Forest',
    bloodline: 'Peveril forest lines',
    age: '16 yrs',
    colour: 'Golden Dun',
    discipline: 'Downland Hacking & Returners',
    schooling: 'Open-country pace control',
    bestFor: 'Downland hacks & returning adults',
    character: 'Knows every chalk ridge on the downs and looks after her rider in every gait.',
    temperament: 'Unflappable in open country',
    quirk: 'Stops at the top of Pewsey Hill so her rider can admire the view.',
    matchTags: ['first-time', 'returners'],
    photo: 'https://images.unsplash.com/photo-1680230955909-c0be7faa4bde?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Sorrel',
    height: '15.3hh',
    breed: 'Thoroughbred Cross',
    bloodline: 'By Catherston Liberator',
    age: '9 yrs',
    colour: 'Liver Chestnut',
    discipline: 'Private Equitation & Dressage',
    schooling: 'Medium paces & lateral work',
    bestFor: 'Adult private tuition',
    character: 'Light off the leg, elegant in the bridle, and a joy for riders who have ridden before.',
    temperament: 'Responsive & elastic contact',
    quirk: 'Adores warm bran mash after a winter afternoon dressage lesson.',
    matchTags: ['returners', 'dressage'],
    photo: 'https://images.unsplash.com/photo-1604429287879-6bc7a7572048?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Juniper',
    height: '16.2hh',
    breed: 'Dutch Warmblood',
    bloodline: 'By Jazz (KWPN) × Ferro',
    age: '12 yrs',
    colour: 'Dark Bay',
    discipline: 'Affiliated Dressage Schoolmaster',
    schooling: 'Advanced Medium & half-pass',
    bestFor: 'Dressage clinics',
    character: 'Joined us from an affiliated dressage yard and teaches the true feel of self-carriage.',
    temperament: 'True uphill schoolmaster',
    quirk: 'Polite gentleman who stands stock-still while his plaits are done.',
    matchTags: ['dressage'],
    photo: 'https://images.unsplash.com/photo-1511746687876-42cb762f6ac1?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'Pip',
    height: '11.2hh',
    breed: 'Welsh Mountain Pony',
    bloodline: 'Native pony lines',
    age: '19 yrs',
    colour: 'Grey',
    discipline: 'Horsemanship & First Ponies',
    schooling: 'Grooming & lead-rein walk/trot',
    bestFor: 'Stable mornings & youngest riders',
    character: 'Quietly in charge of the bottom yard since 2011 and patient for hours of brushing.',
    temperament: 'Gentle pocket schoolmaster',
    quirk: 'Can untie a haynet knot in under thirty seconds if nobody is looking.',
    matchTags: ['first-time'],
    photo: 'https://images.unsplash.com/photo-1743851612756-9aeb50658ce8?auto=format&fit=crop&q=80&w=1200'
  }
];

// Preload and pre-decode all Equestrian photographs at module load so every page and photo renders with 0ms delay
const preloadedEquestrianImages: HTMLImageElement[] = [];
if (typeof window !== 'undefined') {
  const uniqueUrls = Array.from(
    new Set([
      ...Object.values(images),
      ...horses.map((h) => h.photo)
    ])
  );
  uniqueUrls.forEach((src, idx) => {
    const img = new Image();
    img.decoding = idx < 6 ? 'sync' : 'async';
    if (idx < 4) {
      (img as any).fetchPriority = 'high';
    }
    img.src = src;
    img.decode?.().catch(() => {});
    preloadedEquestrianImages.push(img);
  });
}

export interface Coach {
  name: string;
  role: string;
  focus: string;
  bio: string;
  softSpot: string;
  quote: string;
}

export const coaches: Coach[] = [
  {
    name: 'Rosie Ashcombe',
    role: 'Principal · BHS Accredited Professional Coach',
    focus: 'Classical seat, nervous riders & adult returners',
    bio: `Founded Bramble & Bay in ${academy.established} with four native ponies and a single sand paddock. Still teaches in the school five days a week.`,
    softSpot: 'Usually found hacking Clover across the ridge at 7am.',
    quote: '“A quiet seat and a soft hand will take you further than any gadget.”'
  },
  {
    name: 'Tom Neave',
    role: 'Senior Coach · BHS Stage 4 Senior Coach',
    focus: 'Showjumping clinics, gridwork & eventing preparation',
    bio: 'Produced horses to Intermediate eventing before settling in the Pewsey Vale. Leads our jumping clinics and course-walk sessions.',
    softSpot: 'Schooled Hawthorn from a four-year-old in Ireland.',
    quote: '“Find the rhythm on the turn and the fence takes care of itself.”'
  },
  {
    name: 'Amara Ellis',
    role: 'Equitation Coach · BHS Stage 3',
    focus: 'Young riders, lead-rein & foundation flatwork',
    bio: 'First rode Poppy here at age six and qualified through every BHS stage on the yard. Known for calm, patient teaching.',
    softSpot: 'Keeps a pocket of mint treats specifically for Poppy & Pip.',
    quote: '“Children learn fastest when they feel proud of their pony first.”'
  },
  {
    name: 'Fen Marlow',
    role: 'Yard & Welfare Manager',
    focus: 'Equine nutrition, turnout, saddlery fitting & veterinary care',
    bio: 'On the yard before dawn every morning overseeing our twenty-two horses, their individual forage plans, and saddle checks.',
    softSpot: 'Knows every horse’s hoof print and breakfast mash recipe by heart.',
    quote: '“Happy horses who live out in settled herds make the kindest teachers.”'
  }
];

export const facilities = [
  {
    index: '01',
    title: 'The American Barn & Twenty-Two Looseboxes',
    subtitle: 'Airy oak-and-steel stabling at the heart of the yard',
    detail:
      'Our main barn houses twenty-two wide looseboxes with deep straw beds, automatic drinkers, and open top doors so the horses can watch the comings and goings of the courtyard. Every rider meets their horse here before a lesson to groom, check stirrups, and unhurriedly tack up.',
    note: 'Heated rug room · Hot wash bays · Individual tack lockers',
    photo: images.stables,
    alt: 'Sunlit American barn aisle with loosebox stalls on both sides and a horse standing calmly in the corridor'
  },
  {
    index: '02',
    title: 'The 60m Outdoor Sand & Fibre Arena',
    subtitle: 'All-weather schooling & evening floodlights',
    detail:
      'Sheltered by mature beech hedging, our main 60m × 25m outdoor school is surfaced with waxed sand and fibre so it rides with the same cushion in August and January. Floodlit until 8.00pm on weeknights for after-work flatwork and pole sessions.',
    note: '60m × 25m waxed surface · Full dressage letters · Floodlit to 8.00pm',
    photo: images.arena,
    alt: 'Two riders schooling side by side in the fenced outdoor sand arena at golden hour'
  },
  {
    index: '03',
    title: 'The Grass Showjumping Paddock',
    subtitle: 'Six acres of old turf & full BS-standard courses',
    detail:
      'From April through October, our jumping clinics and gridwork sessions move out onto six acres of springy chalk turf set with eighteen fences — from welcoming 50cm cross-poles up to 1.05m oxers, water trays, and rustic skinnies.',
    note: '18 turf fences · Gymnastic grids · Course walks with Tom Neave',
    photo: images.jumping,
    alt: 'Horse and rider clearing a white showjump fence on the grass jumping paddock'
  },
  {
    index: '04',
    title: 'Four Hundred Acres of Chalk Downland',
    subtitle: 'Direct bridleway access with zero roadwork',
    detail:
      'Open the back gate of the yard and you step directly onto four hundred acres of private Wiltshire downland and ancient ridgeway turf. No lorries, no country lanes — just wide grass tracks, beech spinneys, and long views over the Pewsey Vale.',
    note: 'Zero roadwork · Escorted hacks · Quiet tracks & open canter stretches',
    photo: images.hacking,
    alt: 'Horses out on the open misty Wiltshire countryside pastures at sunrise'
  },
  {
    index: '05',
    title: 'The Bespoke Tack Room & Boot Library',
    subtitle: 'Custom-fitted saddlery & complimentary rider kit',
    detail:
      'Each of our twenty-two horses is ridden in a saddle fitted specifically to their back by our master saddler every quarter. For visiting riders, we keep a full library of PAS 015 helmets, body protectors, and jodhpur boots ready to borrow at no charge.',
    note: 'Albion & Fairfax saddlery · Complimentary hats & boots · Heated viewing lounge next door',
    photo: images.tackRoom,
    alt: 'Leather saddles and bridles arranged on wooden racks in the tack room'
  }
];

export const testimonials = [
  {
    short: 'Eight sessions in and her confidence is unrecognisable.',
    quote:
      'Mia was hesitant around anything larger than a spaniel. Eight quiet sessions on Poppy later, she is riding rising trot diagonals on her own and asking to come early to groom.',
    name: 'Hannah W.',
    detail: 'Little Buds Lead-Rein & Foundation Group'
  },
  {
    short: 'Back in the saddle after twenty-eight years — calm, unhurried, and welcoming.',
    quote:
      'I last rode at fifteen. The Adult Returners course paired me with Bluebell and rebuilt my balance from the stirrup up without a single rushed instruction.',
    name: 'David P.',
    detail: 'Adult Returners Course'
  },
  {
    short: 'Transformed our rhythm and related distances in a single morning.',
    quote:
      'Having four riders maximum in a clinic changes everything. Tom spotted a slight drift in my outside shoulder over the oxer and fixed two years of hesitation in twenty minutes.',
    name: 'Ellie R.',
    detail: 'Showjumping Clinic'
  }
];

export interface FaqItem {
  category: string;
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    category: 'First Visits & Attire',
    q: 'I have never sat on a horse before. Which session should I choose?',
    a: 'If you are an adult, begin with either a Private Classical Lesson or our Adult Returners Course. For children aged four to seven, start with Little Buds Lead-Rein; children eight and above begin in a small Foundation Group.'
  },
  {
    category: 'First Visits & Attire',
    q: 'What should I wear for my first lesson, and do I need to buy equipment?',
    a: 'Please wear comfortable trousers without a thick inner seam (jodhpurs, breeches, or thick leggings) and a long-sleeved top. Do not buy riding kit beforehand — we fit and lend current PAS 015 riding hats, body protectors, and smooth-soled jodhpur boots at the yard.'
  },
  {
    category: 'First Visits & Attire',
    q: 'How early should we arrive before a lesson begins?',
    a: 'Please arrive fifteen minutes before your first session so Fen or your coach can fit your hat and boots, introduce you to your horse in the barn, and check stirrup lengths unhurriedly before entering the school.'
  },
  {
    category: 'The Horses & Coaching',
    q: 'How do you match riders to specific horses?',
    a: 'We match by rider height, weight, balance, and temperament rather than assigning horses at random. Once you find a partnership that clicks, we keep you with the same horse and coach each week.'
  },
  {
    category: 'The Horses & Coaching',
    q: 'Is there a rider weight limit?',
    a: 'For the welfare and comfort of our horses, our maximum dressed rider weight is 14 stone 7 lbs (92 kg), varying slightly depending on the horse suited to your lesson. Ring the yard and we will advise you warmly and honestly.'
  },
  {
    category: 'The Horses & Coaching',
    q: 'Can I bring my own horse for private tuition or clinics?',
    a: 'Yes. Visiting horses are very welcome for Private Lessons, Flatwork & Dressage, and Showjumping Clinics. Bring a passport showing current equine influenza and tetanus vaccinations and park in the courtyard lorry bay.'
  },
  {
    category: 'Yard Protocol & Weather',
    q: 'What happens if it rains or the weather turns in winter?',
    a: 'Riding continues year-round. In wet or windy weather, sessions take place in our covered indoor school. In the rare event of sheet ice or lightning, we simply move your slot to another day.'
  },
  {
    category: 'Yard Protocol & Weather',
    q: 'May family members watch, and are dogs welcome on the yard?',
    a: 'Spectators are warmly welcomed — our heated viewing gallery looks straight into the school and has sofas, wifi, and fresh coffee. Because ponies move through the courtyard all day, we ask that visiting dogs stay in vehicles.'
  }
];

export const galleryStrip = [
  { src: images.leadRein, alt: 'Young child on a grey pony during a lead-rein lesson' },
  { src: images.jumping, alt: 'Horse and rider clearing a showjumping fence on turf' },
  { src: images.stables, alt: 'Schoolmaster standing in the sunlit American barn aisle' },
  { src: images.arena, alt: 'Two riders schooling in the outdoor sand arena' },
  { src: images.bond, alt: 'Rider greeting her horse in the barn doorway' },
  { src: images.hacking, alt: 'Horses out on the open Wiltshire downland pastures' }
];
