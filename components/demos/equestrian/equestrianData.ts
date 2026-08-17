// Shared details for the riding academy demo, so every page quotes the same
// prices, horses, hours and address. One edit here changes the whole site —
// which is the point we are demonstrating.
//
// Copy is deliberately short. Every line here has to earn its place on a page:
// one clear thought each, no second sentence restating the first.

export const academy = {
  name: 'Bramble & Bay',
  fullName: 'Bramble & Bay Riding Academy',
  strapline: 'Riding lessons in the Pewsey Vale',
  addressLine1: 'Bramble Farm, Woodborough Lane',
  addressLine2: 'Pewsey, Wiltshire',
  postcode: 'SN9 5PX',
  phoneDisplay: '01672 851 440',
  phoneHref: '+441672851440',
  email: 'yard@brambleandbay.co.uk',
  established: '1998',
  accreditation: 'British Horse Society approved centre',
  mapQuery: 'Pewsey, Wiltshire, SN9'
};

export const openingHours = [
  { days: 'Tuesday – Friday', hours: '9.00am – 8.00pm' },
  { days: 'Saturday', hours: '8.30am – 5.00pm' },
  { days: 'Sunday', hours: '9.00am – 4.00pm' },
  { days: 'Monday', hours: 'Closed (yard day)' }
];

export const navLinks = [
  { name: 'Lessons', path: '/demo/equestrian/lessons' },
  { name: 'Horses', path: '/demo/equestrian/horses' },
  { name: 'The yard', path: '/demo/equestrian/facilities' },
  { name: "FAQ's", path: '/demo/equestrian/faqs' },
  { name: 'Contact', path: '/demo/equestrian/contact' }
];

// The full-strength palette. Used for ink, links, small marks and icons — never
// as a flat panel of colour.
export const palette = {
  cream: '#FFFAF3',
  paper: '#FFFFFF',
  ink: '#1E2A22',
  rose: '#E4577A',
  gold: '#F2B23E',
  meadow: '#2F7D5B',
  sky: '#79C0E0',
  lilac: '#B489D8',
  line: '#EADFD1'
};

// The pale end of the same palette — watercolour, not poster paint. Every tinted
// surface on the site is one of these blended into cream, which is what stops a
// row of cards reading as four coloured boxes.
export const pastel = {
  blush: '#FBEFF2',
  sand: '#FBF3E5',
  mist: '#ECF3F7',
  sage: '#EDF3EC',
  lilac: '#F3F0F8',
  cream: '#FFFCF7'
};

// Panel washes. Two tints either side of cream, laid on the diagonal, so
// adjacent cards bleed into one another instead of standing apart.
export const cardWashes = [
  `linear-gradient(152deg, ${pastel.blush} 0%, ${pastel.cream} 52%, ${pastel.mist} 100%)`,
  `linear-gradient(152deg, ${pastel.sand} 0%, ${pastel.cream} 52%, ${pastel.lilac} 100%)`,
  `linear-gradient(152deg, ${pastel.mist} 0%, ${pastel.cream} 52%, ${pastel.sage} 100%)`,
  `linear-gradient(152deg, ${pastel.sage} 0%, ${pastel.cream} 52%, ${pastel.sand} 100%)`,
  `linear-gradient(152deg, ${pastel.lilac} 0%, ${pastel.cream} 52%, ${pastel.blush} 100%)`
];

// A wide, soft band for sections that need to sit apart from the cream page.
export const bandWash =
  `linear-gradient(180deg, ${palette.cream} 0%, ${pastel.mist} 22%, ${pastel.cream} 62%, ${pastel.sand} 100%)`;

// The big diffuse washes behind page headings. Low opacity, wide radii, four
// colours — it reads as light through a window rather than a coloured block.
export const headerWash =
  'radial-gradient(58% 52% at 8% 0%, rgba(228,87,122,0.11) 0%, rgba(255,250,243,0) 72%), ' +
  'radial-gradient(52% 48% at 92% 6%, rgba(121,192,224,0.14) 0%, rgba(255,250,243,0) 72%), ' +
  'radial-gradient(48% 44% at 62% 96%, rgba(242,178,62,0.12) 0%, rgba(255,250,243,0) 74%), ' +
  'radial-gradient(36% 34% at 26% 84%, rgba(180,137,216,0.10) 0%, rgba(255,250,243,0) 74%)';

export interface Lesson {
  id: string;
  name: string;
  duration: string;
  price: string;
  who: string;
  detail: string;
  accent: string;
}

export const lessons: Lesson[] = [
  {
    id: 'little-buds',
    name: 'Little Buds lead-rein',
    duration: '30 minutes',
    price: '£26',
    who: 'Ages 4 – 7',
    detail: 'One pony, one child, one of us walking beside you the whole way.',
    accent: palette.rose
  },
  {
    id: 'beginner-group',
    name: 'Beginner group lesson',
    duration: '45 minutes',
    price: '£34',
    who: 'Four riders maximum',
    detail: 'Steering, stopping, rising trot. Nobody spends it waiting their turn.',
    accent: palette.gold
  },
  {
    id: 'improvers',
    name: 'Improvers group',
    duration: '1 hour',
    price: '£42',
    who: 'Confident in canter',
    detail: 'Flatwork, poles and grids in the indoor school.',
    accent: palette.meadow
  },
  {
    id: 'private',
    name: 'Private lesson',
    duration: '45 minutes',
    price: '£58',
    who: 'Any level',
    detail: 'The fastest way to fix the one thing that has been bothering you.',
    accent: palette.sky
  },
  {
    id: 'semi-private',
    name: 'Semi-private, two riders',
    duration: '45 minutes',
    price: '£40 each',
    who: 'Friends or family',
    detail: 'Nearly a private lesson, shared with someone you already ride with.',
    accent: palette.lilac
  },
  {
    id: 'dressage',
    name: 'Flatwork & dressage clinic',
    duration: '1 hour',
    price: '£48',
    who: 'Improvers upward',
    detail: 'Round circles, smooth transitions, a test sheet to take home.',
    accent: palette.meadow
  },
  {
    id: 'jumping',
    name: 'Jumping clinic',
    duration: '1 hour',
    price: '£52',
    who: 'Jumping 60cm+',
    detail: 'Related distances, full courses, and an honest verdict afterwards.',
    accent: palette.rose
  },
  {
    id: 'hack',
    name: 'Downland hack',
    duration: '90 minutes',
    price: '£62',
    who: 'Walk, trot and canter out',
    detail: 'Straight off the yard onto four hundred acres of chalk downland.',
    accent: palette.sky
  },
  {
    id: 'returners',
    name: 'Adult returners course',
    duration: '4 × 45 minutes',
    price: '£120',
    who: 'Rode years ago',
    detail: 'Four weeks, same coach, same horse. For anyone who misses it.',
    accent: palette.gold
  },
  {
    id: 'own-a-pony',
    name: 'Own-a-pony morning',
    duration: '3 hours',
    price: '£75',
    who: 'Ages 8 – 14',
    detail: 'Grooming, mucking out, a lesson and a hot chocolate.',
    accent: palette.lilac
  }
];

export const lessonIncludes = [
  'Hats, body protectors and boots, fitted and lent free',
  'A written note of what you worked on',
  'The same coach and the same horse each week',
  'A heated viewing room for whoever brought you'
];

// The five things taught here, in five words. It replaced a paragraph.
export const disciplines = ['Lead-rein', 'Groups', 'Flatwork', 'Jumping', 'Hacking'];

export interface Horse {
  name: string;
  height: string;
  breed: string;
  age: string;
  colour: string;
  bestFor: string;
  character: string;
  photo: string;
}

export const horses: Horse[] = [
  {
    name: 'Poppy',
    height: '12.2hh',
    breed: 'Welsh Section B',
    age: '14 years',
    colour: 'Bright bay',
    bestFor: 'Lead-rein and first lessons',
    character: 'Four hundred children taught to trot, and never once in a hurry.',
    photo: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Marmalade',
    height: '13hh',
    breed: 'Dartmoor cross',
    age: '11 years',
    colour: 'Chestnut',
    bestFor: 'Beginner groups',
    character: 'Cheerful, opinionated about gates, completely honest over a pole.',
    photo: 'https://images.unsplash.com/photo-1604429287879-6bc7a7572048?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Bluebell',
    height: '15.1hh',
    breed: 'Connemara',
    age: '13 years',
    colour: 'Dapple grey',
    bestFor: 'Improvers and flatwork',
    character: 'Gives you a beautiful shoulder-in the moment you ask correctly.',
    photo: 'https://images.unsplash.com/photo-1552908768-910f4cd7b201?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Hawthorn',
    height: '16hh',
    breed: 'Irish Sport Horse',
    age: '10 years',
    colour: 'Dark bay',
    bestFor: 'Jumping clinics',
    character: 'Thorn to his friends. Has never stopped at anything in his life.',
    photo: 'https://images.unsplash.com/photo-1545780699-605328d5e41b?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Clover',
    height: '14.2hh',
    breed: 'New Forest',
    age: '16 years',
    colour: 'Dun',
    bestFor: 'Hacking out',
    character: 'Knows every track on the downs. Unbothered by tractors or dogs.',
    photo: 'https://images.unsplash.com/photo-1680230955909-c0be7faa4bde?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Sorrel',
    height: '15.3hh',
    breed: 'Thoroughbred cross',
    age: '9 years',
    colour: 'Liver chestnut',
    bestFor: 'Adult private lessons',
    character: 'Sharp, elegant and forward. Ask for her if you have ridden before.',
    photo: 'https://images.unsplash.com/photo-1654693519854-175cee0fa7d6?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Juniper',
    height: '16.2hh',
    breed: 'Dutch Warmblood',
    age: '12 years',
    colour: 'Black',
    bestFor: 'Dressage clinics',
    character: 'Came from an affiliated yard and still expects to be ridden properly.',
    photo: 'https://images.unsplash.com/photo-1727036545577-c83cd920277b?auto=format&fit=crop&q=65&w=900'
  },
  {
    name: 'Pip',
    height: '11.2hh',
    breed: 'Shetland cross',
    age: '19 years',
    colour: 'Piebald',
    bestFor: 'Own-a-pony mornings',
    character: 'Semi-retired, fully in charge. Does the parties and the photographs.',
    photo: 'https://images.unsplash.com/photo-1463748465553-80db1e6ff830?auto=format&fit=crop&q=65&w=900'
  }
];

export interface Coach {
  name: string;
  role: string;
  focus: string;
  bio: string;
}

export const coaches: Coach[] = [
  {
    name: 'Rosie Ashcombe',
    role: 'Principal · BHS Accredited Professional Coach',
    focus: 'Nervous riders and adult returners',
    bio: `Started the academy with four ponies and a borrowed field in ${academy.established}. Still teaches most Saturdays.`
  },
  {
    name: 'Tom Neave',
    role: 'Senior Coach · BHS Stage 4',
    focus: 'Jumping and competition prep',
    bio: 'Evented to Novice level. Takes the jumping clinics and runs the summer camps.'
  },
  {
    name: 'Amara Ellis',
    role: 'Coach · BHS Stage 3',
    focus: 'Children and lead-rein',
    bio: 'Came through the academy herself, from Little Buds at six to coaching at twenty-three.'
  },
  {
    name: 'Fen Marlow',
    role: 'Yard Manager',
    focus: 'Welfare, feed, farrier and vet',
    bio: 'Here before anybody else, and knows what all twenty-two had for breakfast.'
  }
];

export const facilities = [
  {
    title: '60m × 25m floodlit arena',
    detail: 'Waxed sand and fibre. Floodlit until 8pm, so winter lessons still run.'
  },
  {
    title: '40m × 20m indoor school',
    detail: 'Mirrors down the long side. Rain has never stopped a lesson here.'
  },
  {
    title: 'Grass jumping paddock',
    detail: 'Eighteen fences from cross-poles to 1.05m, plus cross-country schooling.'
  },
  {
    title: '400 acres of hacking',
    detail: 'Chalk downland and bridleways straight off the yard. No roadwork.'
  },
  {
    title: 'Heated viewing room',
    detail: 'Sofas, a window onto the school, decent coffee and wifi.'
  },
  {
    title: 'Tack room & kit to borrow',
    detail: 'Hats, body protectors and boots in every size, fitted at no charge.'
  }
];

export const testimonials = [
  {
    // The short line is what the home page shows. The full quote is here for
    // anywhere with room for it.
    short: 'Eight lessons in and she talks about nothing else.',
    quote:
      'Mia was terrified of anything bigger than a labrador. Eight lessons later she is cantering round the indoor school and talking about nothing else.',
    name: 'Hannah W.',
    detail: 'Little Buds, then beginner group'
  },
  {
    short: 'Back on a horse at forty-three, and nobody made me feel silly.',
    quote:
      'I last rode when I was fifteen. The returners course put me back on a horse without once making me feel like an idiot for asking.',
    name: 'David P.',
    detail: 'Adult returners course'
  },
  {
    short: 'Tom fixed my distances in one session.',
    quote:
      'The jumping clinics have transformed my mare. Tom fixed my distances in one session after two years of guessing.',
    name: 'Ellie R.',
    detail: 'Jumping clinic, own horse'
  }
];

// These live on their own page now, so the price list is a price list.
export const faqs = [
  {
    q: 'I have never sat on a horse. Where do I start?',
    a: 'A beginner group lesson if you are an adult, Little Buds lead-rein if you are under seven. Both assume you know nothing at all.'
  },
  {
    q: 'What should I wear for a first lesson?',
    a: 'Long trousers without a thick seam, and boots or trainers with a small heel. We lend the hat, body protector and boots.'
  },
  {
    q: 'Is there a weight limit?',
    a: 'Fifteen stone, set by the horses rather than by us. Ring the yard and we will tell you honestly which horse would suit.'
  },
  {
    q: 'Can we watch?',
    a: 'Yes, and we would rather you did. The viewing room looks straight onto the indoor school.'
  },
  {
    q: 'What happens if the weather is bad?',
    a: 'Lessons move to the indoor school. We only cancel for lightning or ice, and then your slot moves at no cost.'
  },
  {
    q: 'Do you take my own horse?',
    a: 'For clinics and private lessons, yes. Bring current flu and tetanus records and arrive twenty minutes early.'
  },
  {
    q: 'How do I pay, and can I cancel?',
    a: 'Card or cash on the day, nothing online. Twenty-four hours notice and we move the slot for free.'
  },
  {
    q: 'Do you run holiday courses?',
    a: 'Own-a-pony mornings every school holiday, and a summer camp in August. Both book out early.'
  }
];

export const images = {
  hero: 'https://images.unsplash.com/photo-1511746687876-42cb762f6ac1?auto=format&fit=crop&q=65&w=1600',
  lesson: 'https://images.unsplash.com/photo-1607273225241-035d579b8452?auto=format&fit=crop&q=65&w=1200',
  stables: 'https://images.unsplash.com/photo-1576692192914-9abed71b3ef9?auto=format&fit=crop&q=65&w=1200',
  meadow: 'https://images.unsplash.com/photo-1686866694468-0d452973ce7c?auto=format&fit=crop&q=65&w=1600',
  blossom: 'https://images.unsplash.com/photo-1591531424171-b49ab93f517a?auto=format&fit=crop&q=65&w=1200',
  children: 'https://images.unsplash.com/photo-1676504848820-e1488d13c261?auto=format&fit=crop&q=65&w=1200',
  leadRein: 'https://images.unsplash.com/photo-1743851612756-9aeb50658ce8?auto=format&fit=crop&q=65&w=1200',
  jumping: 'https://images.unsplash.com/photo-1559295928-6964f905e9c7?auto=format&fit=crop&q=65&w=1200',
  jumpingTwo: 'https://images.unsplash.com/photo-1574695272842-52dfdb7989d0?auto=format&fit=crop&q=65&w=1200',
  hacking: 'https://images.unsplash.com/photo-1696866614151-5254858f603f?auto=format&fit=crop&q=65&w=1200',
  tackRoom: 'https://images.unsplash.com/photo-1682636109270-93cb7b720716?auto=format&fit=crop&q=65&w=1200',
  bond: 'https://images.unsplash.com/photo-1508343919546-4a5792fee935?auto=format&fit=crop&q=65&w=1200',
  sunset: 'https://images.unsplash.com/photo-1598362042346-70c59713811f?auto=format&fit=crop&q=65&w=1600',
  arena: 'https://images.unsplash.com/photo-1583455401055-b84c5b9b32cd?auto=format&fit=crop&q=65&w=1200',
  flatwork: 'https://images.unsplash.com/photo-1631364918274-0e7159557db2?auto=format&fit=crop&q=65&w=1200',
  barn: 'https://images.unsplash.com/photo-1566392785474-926a4c6257b5?auto=format&fit=crop&q=65&w=1200'
};

// The photographs that scroll along the gallery strip on the home page.
export const galleryStrip = [
  { src: images.leadRein, alt: 'A child on a pony being led in the arena' },
  { src: images.blossom, alt: 'Pink and white wildflowers in the paddock hedge' },
  { src: images.jumping, alt: 'A horse and rider jumping a white fence' },
  { src: images.stables, alt: 'A horse looking out between two stable doors' },
  { src: images.meadow, alt: 'Wildflower meadow on the edge of the downs' },
  { src: images.hacking, alt: 'Two riders hacking out along a bridleway' },
  { src: images.bond, alt: 'A rider with her arms around a horse' },
  { src: images.arena, alt: 'A rider schooling in the outdoor arena' }
];
