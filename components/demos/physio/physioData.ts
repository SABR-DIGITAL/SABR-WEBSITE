// Shared clinic details for the physiotherapy demo site, so every page
// quotes the same address, hours and fees.

export const clinic = {
  name: 'Pulteney Physiotherapy',
  shortName: 'Pulteney',
  strapline: 'Chartered physiotherapy in Bath',
  addressLine1: '12 Argyle Street',
  addressLine2: 'Bath',
  postcode: 'BA2 4BQ',
  phoneDisplay: '01225 447 210',
  phoneHref: '+441225447210',
  email: 'hello@pulteneyphysio.co.uk',
  established: '2012'
};

export const openingHours = [
  { days: 'Monday – Thursday', hours: '7.30am – 7.30pm' },
  { days: 'Friday', hours: '7.30am – 5.00pm' },
  { days: 'Saturday', hours: '8.00am – 1.00pm' },
  { days: 'Sunday', hours: 'Closed' }
];

export const navLinks = [
  { name: 'Treatments', path: '/demo/physio/prices' },
  { name: 'Our team', path: '/demo/physio/team' },
  { name: 'Questions', path: '/demo/physio/faq' },
  { name: 'Contact', path: '/demo/physio/contact' }
];

export const fees = [
  {
    name: 'Initial assessment',
    duration: '50 minutes',
    price: '£68',
    detail: 'A full history, hands-on examination and movement testing, followed by a written plan you take away with you.'
  },
  {
    name: 'Follow-up treatment',
    duration: '30 minutes',
    price: '£52',
    detail: 'Hands-on treatment, progression of your exercises and a check on how the last fortnight has gone.'
  },
  {
    name: 'Extended treatment',
    duration: '50 minutes',
    price: '£76',
    detail: 'For longstanding or complicated problems that need more time on the couch and in the gym.'
  },
  {
    name: 'Sports massage',
    duration: '60 minutes',
    price: '£62',
    detail: 'Deep soft tissue work, either as part of a rehab plan or in the week before an event.'
  },
  {
    name: 'Rehab studio class',
    duration: '45 minutes',
    price: '£16',
    detail: 'Small groups of six, run by a physiotherapist. You need to have been assessed with us first.'
  },
  {
    name: 'Home visit',
    duration: '60 minutes',
    price: '£95',
    detail: 'Within five miles of the clinic, for anyone who cannot travel comfortably after surgery or injury.'
  }
];

export const images = {
  hero: 'https://images.unsplash.com/photo-1591343395902-1adcb454c4e2?auto=format&fit=crop&q=65&w=1200',
  handsOn: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=65&w=1200',
  assessment: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=65&w=1200',
  studio: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=65&w=1600',
  care: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=65&w=1200'
};

export const team = [
  {
    name: 'Rachel Whitcombe',
    role: 'Clinical Director, MSc MCSP',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=65&w=900',
    focus: 'Persistent back and neck pain, post-operative knees',
    bio: 'Rachel opened the clinic in 2012 after eleven years in the NHS, most of them in orthopaedic outpatients at the RUH. She sees the people others have given up on.'
  },
  {
    name: 'Daniel Osei',
    role: 'Senior Physiotherapist, BSc MCSP',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=65&w=900',
    focus: 'Running injuries, tendon problems, return to sport',
    bio: 'Daniel spent six seasons with a Championship rugby side and still covers Saturday fixtures for two Bath clubs. If you run, he will look at how you run.'
  },
  {
    name: 'Priya Raman',
    role: 'Physiotherapist, BSc MCSP',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=65&w=900',
    focus: 'Shoulders, hypermobility, pre and post-natal',
    bio: 'Priya leads our rehab studio classes and has a particular interest in hypermobility, which is far more common than most people are told.'
  },
  {
    name: 'Adam Fry',
    role: 'Rehabilitation Coach, BSc',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=65&w=900',
    focus: 'Strength work, post-op knees and hips, older adults',
    bio: 'Adam takes over once the pain has settled and builds you back up properly. He is the reason people leave here stronger than they were before the injury.'
  }
];
