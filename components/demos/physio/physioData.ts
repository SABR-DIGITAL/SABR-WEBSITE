// Shared clinical data for Pulteney Physiotherapy (UK) — 3 South West & Cotswolds clinics,
// comprehensive physiotherapy & rehabilitation services, interactive pain-relief explorer, and team.

export const clinic = {
  name: 'Pulteney Physiotherapy',
  shortName: 'Pulteney',
  strapline: 'Chartered Physiotherapy & Rehabilitation Clinics · United Kingdom',
  addressLine1: '12 Argyle Street',
  addressLine2: 'Bath',
  postcode: 'BA2 4BQ',
  phoneDisplay: '01225 447 210',
  phoneHref: '+441225447210',
  email: 'hello@pulteneyphysio.co.uk',
  established: '2012'
};

export const images = {
  hero: '/images/projects/physio-preview.webp',
  handsOn: '/src/assets/images/pulteney_manual_therapy_1793904530315.webp',
  assessment: '/src/assets/images/pulteney_hand_workplace_1793904533245.webp',
  studio: '/src/assets/images/pulteney_sports_rehab_1793904531567.webp',
  care: '/src/assets/images/pulteney_hydro_balance_1793904533484.webp',
  hydro: '/src/assets/images/pulteney_hydro_balance_1793904533484.webp',
  sports: '/src/assets/images/pulteney_sports_rehab_1793904531567.webp',
  hand: '/src/assets/images/pulteney_hand_workplace_1793904533245.webp'
};

export interface UkLocation {
  id: string;
  city: string;
  clinicName: string;
  region: string;
  address: string;
  postcode: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  hours: string;
  saturdayHours: string;
  leadPhysio: string;
  parkingAndAccess: string;
  facilities: string[];
  image: string;
  coordinatesLabel: string;
}

export const ukLocations: UkLocation[] = [
  {
    id: 'bath',
    city: 'Bath',
    clinicName: 'Bath — Pulteney Bridge Clinic',
    region: 'Somerset',
    address: '12 Argyle Street, Bath',
    postcode: 'BA2 4BQ',
    phoneDisplay: '01225 447 210',
    phoneHref: '+441225447210',
    email: 'bath@pulteneyphysio.co.uk',
    hours: 'Mon – Thu: 7:30am – 7:30pm · Fri: 7:30am – 5:30pm',
    saturdayHours: 'Saturday: 8:00am – 1:30pm',
    leadPhysio: 'Rachel Whitcombe, MSc MCSP',
    parkingAndAccess: 'Step-free ground floor access · 5 mins walk from Bath Spa station · Podium car park 4 mins away',
    facilities: ['4 Private Treatment Suites', 'Heated Hydrotherapy Pool', 'Rehabilitation Gym Studio'],
    image: '/src/assets/images/pulteney_hero_rehab_1793904528479.webp',
    coordinatesLabel: '51.3837° N, 2.3568° W'
  },
  {
    id: 'bristol',
    city: 'Bristol',
    clinicName: 'Bristol — Clifton Village Clinic',
    region: 'Bristol',
    address: '24 Princess Victoria Street, Clifton',
    postcode: 'BS8 4BU',
    phoneDisplay: '0117 325 8410',
    phoneHref: '+441173258410',
    email: 'bristol@pulteneyphysio.co.uk',
    hours: 'Mon – Thu: 7:30am – 8:00pm · Fri: 7:30am – 6:00pm',
    saturdayHours: 'Saturday: 8:30am – 2:00pm',
    leadPhysio: 'Daniel Osei, BSc MCSP',
    parkingAndAccess: 'Ground-floor consulting rooms · Clifton Down station 8 mins · Pay & display bays outside',
    facilities: ['Biomechanical Running Lab', 'Strength & Conditioning Bay', 'Sports Injury Clinic'],
    image: '/src/assets/images/pulteney_sports_rehab_1793904531567.webp',
    coordinatesLabel: '51.4553° N, 2.6179° W'
  },
  {
    id: 'cheltenham',
    city: 'Cheltenham',
    clinicName: 'Cheltenham — Montpellier Clinic',
    region: 'Gloucestershire',
    address: '8 Montpellier Walk, Cheltenham',
    postcode: 'GL50 1SD',
    phoneDisplay: '01242 581 920',
    phoneHref: '+441242581920',
    email: 'cheltenham@pulteneyphysio.co.uk',
    hours: 'Mon – Thu: 8:00am – 7:00pm · Fri: 8:00am – 5:00pm',
    saturdayHours: 'Saturday: 8:30am – 1:00pm',
    leadPhysio: 'Priya Raman, BSc MCSP',
    parkingAndAccess: 'Dedicated patient parking at rear · Level access throughout · Montpellier Gardens opposite',
    facilities: ['Hand & Upper Limb Suite', 'Balance & Vestibular Studio', 'Clinical Pilates & Rehab Room'],
    image: '/src/assets/images/pulteney_manual_therapy_1793904530315.webp',
    coordinatesLabel: '51.8962° N, 2.0811° W'
  }
];

export const openingHours = [
  { days: 'Monday – Thursday', hours: '7:30am – 7:30pm' },
  { days: 'Friday', hours: '7:30am – 5:30pm' },
  { days: 'Saturday', hours: '8:00am – 1:30pm' },
  { days: 'Sunday', hours: 'Closed' }
];

export const navLinks = [
  { name: 'Treatments', path: '/demo/physio/prices' },
  { name: 'Clinics & Team', path: '/demo/physio/team' },
  { name: 'Patient Info', path: '/demo/physio/faq' },
  { name: 'Locations & Book', path: '/demo/physio/contact' }
];

export interface ServiceOffering {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  image: string;
  duration: string;
  price: string;
}

export const coreServices: ServiceOffering[] = [
  {
    id: 'chartered-physio',
    number: '01',
    title: 'Chartered Physiotherapy',
    category: 'Musculoskeletal & Spinal Care',
    shortDesc: 'Hands-on joint mobilisation, soft-tissue release, and tailored movement plans to resolve back, neck, and joint pain at its root.',
    fullDesc: 'Every course of care begins with a thorough 50-minute diagnostic assessment. We combine gentle manual therapy with progressive strength loading so you recover quickly and stay pain-free long term.',
    highlights: ['50-minute 1-to-1 initial assessment', 'Spinal & peripheral joint mobilisation', 'Written recovery plan & video exercises'],
    image: '/src/assets/images/pulteney_manual_therapy_1793904530315.webp',
    duration: '50 mins initial / 30 mins follow-up',
    price: '£68'
  },
  {
    id: 'sports-rehab',
    number: '02',
    title: 'Sports Injury Rehabilitation',
    category: 'Performance & Return to Play',
    shortDesc: 'Biomechanical gait analysis, tendon loading programmes, and sport-specific conditioning for runners, cyclists, rugby, and club athletes.',
    fullDesc: 'Used by club and county athletes across Bath, Bristol, and Cheltenham. We test force symmetry, movement mechanics, and tissue capacity inside our rehab gym so you return to sport stronger than before.',
    highlights: ['Video running & gait biomechanics', 'ACL, meniscus & tendon rehabilitation', 'Objective return-to-sport testing'],
    image: '/src/assets/images/pulteney_sports_rehab_1793904531567.webp',
    duration: '50 minutes',
    price: '£74'
  },
  {
    id: 'hydrotherapy',
    number: '03',
    title: 'Hydrotherapy & Aquatic Rehab',
    category: 'Low-Impact Recovery',
    shortDesc: 'Guided rehabilitation in our 34°C heated indoor therapy pool — ideal after hip, knee, or spinal surgery when land movement is painful.',
    fullDesc: 'Warm water buoyancy reduces joint weight-bearing by up to 80%, allowing early gait re-education, gentle range-of-motion recovery, and confidence building immediately after orthopaedic surgery.',
    highlights: ['34°C warm therapeutic pool in Bath', 'Post-operative hip & knee replacement rehab', '1-to-1 chartered physiotherapist in water'],
    image: '/src/assets/images/pulteney_hydro_balance_1793904533484.webp',
    duration: '45 minutes',
    price: '£78'
  },
  {
    id: 'balance-rehab',
    number: '04',
    title: 'Balance & AgeWell Rehab',
    category: 'Stability, Vestibular & Active Ageing',
    shortDesc: 'Specialist balance retraining, vestibular physiotherapy for vertigo, and progressive strength programmes to keep older adults confident and independent.',
    fullDesc: 'Our AgeWell & Balance programme addresses dizziness (BPPV), unsteadiness, and post-fall confidence through targeted vestibular manoeuvres, proprioceptive training, and functional strength.',
    highlights: ['Vestibular & Epley manoeuvre treatment', 'Falls prevention & postural stability', 'Small-group AgeWell studio sessions'],
    image: '/src/assets/images/pulteney_hero_rehab_1793904528479.webp',
    duration: '45 minutes',
    price: '£64'
  },
  {
    id: 'hand-therapy',
    number: '05',
    title: 'Hand & Upper Limb Therapy',
    category: 'Wrist, Elbow, Shoulder & Splinting',
    shortDesc: 'Dedicated rehabilitation for carpal tunnel, tendon repairs, fractures, tennis elbow, and rotator cuff conditions with custom thermoplastic splinting.',
    fullDesc: 'Fine motor recovery requires specialist precision. We work closely with South West orthopaedic hand and shoulder surgeons to restore grip strength, dexterity, and pain-free reach.',
    highlights: ['Custom splint fabrication & fitting', 'Fracture, tendon & nerve recovery', 'Rotator cuff & frozen shoulder care'],
    image: '/src/assets/images/pulteney_hand_workplace_1793904533245.webp',
    duration: '45 minutes',
    price: '£68'
  },
  {
    id: 'workplace-rehab',
    number: '06',
    title: 'Workplace & Occupational Health',
    category: 'Corporate & Ergonomic Solutions',
    shortDesc: 'Comprehensive UK workplace physiotherapy, DSE ergonomic assessments, functional capacity evaluations, and phased return-to-work plans.',
    fullDesc: 'Partnering with employers across the West of England to prevent musculoskeletal absence, conduct on-site workstation assessments, and rehabilitate staff safely back into active roles.',
    highlights: ['HSE-compliant DSE & ergonomic audits', 'Functional Capacity Evaluations (FCE)', 'On-site injury prevention workshops'],
    image: '/src/assets/images/pulteney_manual_therapy_1793904530315.webp',
    duration: 'Bespoke / Clinic or On-Site',
    price: '£85'
  }
];

export const fees = [
  {
    name: 'Initial Physiotherapy Assessment',
    duration: '50 minutes',
    price: '£68',
    detail: 'A full clinical history, hands-on orthopaedic examination, and movement testing, followed by day-one treatment and a clear written recovery plan.'
  },
  {
    name: 'Follow-Up Physiotherapy Session',
    duration: '30 minutes',
    price: '£52',
    detail: 'Hands-on manual therapy, joint mobilisation, and progressive advancement of your strength and rehabilitation programme.'
  },
  {
    name: 'Sports Rehab & Biomechanics Session',
    duration: '50 minutes',
    price: '£74',
    detail: 'Extended gym-based rehabilitation, video running/movement analysis, and strength testing for sporting injuries.'
  },
  {
    name: 'Hydrotherapy Pool Session',
    duration: '45 minutes',
    price: '£78',
    detail: 'One-to-one guided aquatic rehabilitation in our heated 34°C therapy pool for post-surgical or arthritic joints.'
  },
  {
    name: 'Hand Therapy & Custom Splinting',
    duration: '45 minutes',
    price: '£68',
    detail: 'Specialist wrist, hand, and elbow assessment including scar management, dexterity retraining, and splint adjustments.'
  },
  {
    name: 'Complimentary 15-Min Injury Screen',
    duration: '15 minutes',
    price: 'Free',
    detail: 'Not sure if physiotherapy is right for your ache or injury? Meet a chartered physio for a 15-minute screen and honest advice.'
  }
];

export interface PainArea {
  id: string;
  region: string;
  subtitle: string;
  commonCauses: string[];
  howWeHelp: string;
  recommendedService: string;
  typicalRecovery: string;
}

export const painAreas: PainArea[] = [
  {
    id: 'back-spine',
    region: 'Lower Back & Sciatica',
    subtitle: 'Disc irritation, facet joint stiffness, postural ache & sciatic nerve pain',
    commonCauses: ['Acute disc bulge or trapped nerve', 'Facet joint locking & muscle spasm', 'Desk-related lumbar stiffness', 'Sacroiliac joint (SIJ) dysfunction'],
    howWeHelp: 'We settle acute spasm with gentle spinal mobilisation and targeted decompression, then build deep core and hip endurance so your spine is supported during everyday lifting, sitting, and sport.',
    recommendedService: 'Chartered Physiotherapy',
    typicalRecovery: '4 – 6 sessions'
  },
  {
    id: 'neck-shoulder',
    region: 'Neck & Shoulder',
    subtitle: 'Rotator cuff pain, frozen shoulder, cervicogenic headaches & wry neck',
    commonCauses: ['Rotator cuff tendinopathy or impingement', 'Adhesive capsulitis (frozen shoulder)', 'Tension headaches & cervical stiffness', 'Post-clavicle or shoulder surgery'],
    howWeHelp: 'Hands-on cervical and thoracic mobilisation paired with progressive scapular and rotator cuff strengthening to restore pain-free overhead reach and restful sleep.',
    recommendedService: 'Chartered Physiotherapy & Upper Limb Care',
    typicalRecovery: '4 – 8 sessions'
  },
  {
    id: 'knee-hip',
    region: 'Knee & Hip',
    subtitle: 'Runner’s knee, osteoarthritis, ligament sprains & joint replacements',
    commonCauses: ['Patellofemoral pain & iliotibial band syndrome', 'ACL, MCL or meniscal cartilage injury', 'Total hip or knee replacement recovery', 'Gluteal tendinopathy & hip bursitis'],
    howWeHelp: 'From early hydrotherapy pool walking after surgery to single-leg biomechanical strength testing in our rehab gym, we restore smooth, confident load-bearing.',
    recommendedService: 'Sports Rehab & Hydrotherapy',
    typicalRecovery: '5 – 8 sessions'
  },
  {
    id: 'foot-ankle',
    region: 'Foot, Ankle & Running',
    subtitle: 'Achilles tendinopathy, plantar fasciitis, ankle sprains & shin splints',
    commonCauses: ['Mid-portion or insertional Achilles pain', 'Plantar heel pain & morning stiffness', 'Recurrent lateral ankle instability', 'Medial tibial stress (shin splints)'],
    howWeHelp: 'We combine video treadmill gait analysis with heavy-slow tendon loading protocols and balance retraining to resolve stubborn lower-limb injuries.',
    recommendedService: 'Sports Injury Rehabilitation',
    typicalRecovery: '4 – 6 sessions'
  },
  {
    id: 'wrist-hand',
    region: 'Wrist, Hand & Elbow',
    subtitle: 'Tennis elbow, carpal tunnel, wrist fractures & tendon rehabilitation',
    commonCauses: ['Lateral epicondylitis (tennis/golfer’s elbow)', 'Post-fracture wrist stiffness', 'Carpal tunnel & repetitive strain (RSI)', 'Thumb base arthritis & trigger finger'],
    howWeHelp: 'Targeted soft-tissue release, neural gliding, custom supportive splinting, and graduated grip-strength loading designed by our upper-limb specialists.',
    recommendedService: 'Hand & Upper Limb Therapy',
    typicalRecovery: '3 – 6 sessions'
  },
  {
    id: 'balance-vestibular',
    region: 'Balance, Vertigo & Post-Op',
    subtitle: 'BPPV dizziness, unsteadiness, falls prevention & active ageing',
    commonCauses: ['Benign Paroxysmal Positional Vertigo (BPPV)', 'Reduced balance confidence after a fall', 'Deconditioning after hospital stay', 'Neurological or vestibular weakness'],
    howWeHelp: 'Gentle repositioning manoeuvres (such as the Epley manoeuvre) often clear positional vertigo in 1–2 visits, while our AgeWell studio builds lasting leg strength and stability.',
    recommendedService: 'Balance & AgeWell Rehab',
    typicalRecovery: '2 – 6 sessions'
  }
];

export const spotlightSlides = [
  {
    id: 'agestrong',
    tag: 'Active Ageing Programme · UK Clinics',
    headline: 'Be Bold. Be Steady. Move With Confidence.',
    programName: 'AgeWell & Balance Studio',
    description: 'Designed for adults 60+ across Bath, Bristol, and Cheltenham. Small-group physiotherapist-led strength, bone-density loading, and balance classes that keep you hiking, gardening, and independent.',
    ctaLabel: 'Explore AgeWell Rehab',
    ctaPath: '/demo/physio/prices',
    metric: '96% of participants report improved daily balance within 6 weeks',
    image: '/src/assets/images/pulteney_hero_rehab_1793904528479.webp'
  },
  {
    id: 'sports-partners',
    tag: 'Community & Club Partnerships',
    headline: 'Keeping the South West Moving Strong.',
    programName: 'Athletic & Running Partnerships',
    description: 'Official physiotherapy partners to local rowing clubs, rugby sides, and half-marathon runners across Somerset, Bristol, and the Cotswolds — with priority Monday morning injury triage slots.',
    ctaLabel: 'View Sports Rehab',
    ctaPath: '/demo/physio/prices',
    metric: 'Supporting 18+ local sports clubs and 4,200+ runners annually',
    image: '/src/assets/images/pulteney_sports_rehab_1793904531567.webp'
  },
  {
    id: 'workplace-wellbeing',
    tag: 'Corporate & Occupational Health',
    headline: 'Healthier Workplaces, Fewer Lost Days.',
    programName: 'Pulteney Workplace Care (PWCP)',
    description: 'From DSE desk assessments for hybrid teams to functional capacity evaluations and rapid-access staff physiotherapy, we help UK businesses look after their people.',
    ctaLabel: 'Corporate Solutions',
    ctaPath: '/demo/physio/contact',
    metric: 'Trusted by 35+ regional employers across the West of England',
    image: '/src/assets/images/pulteney_hand_workplace_1793904533245.webp'
  }
];

export const team = [
  {
    name: 'Rachel Whitcombe',
    role: 'Clinical Director & Lead Physiotherapist · MSc MCSP HCPC',
    location: 'Bath — Pulteney Bridge Clinic',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=900',
    focus: 'Persistent spinal pain, post-operative knee & hip rehabilitation, hydrotherapy',
    bio: 'Rachel founded Pulteney Physiotherapy in Bath in 2012 after eleven years as an Extended Scope Practitioner in NHS orthopaedics at the Royal United Hospital.'
  },
  {
    name: 'Daniel Osei',
    role: 'Head of Sports Rehab & Clifton Lead · BSc (Hons) MCSP HCPC',
    location: 'Bristol — Clifton Village Clinic',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=900',
    focus: 'Running biomechanics, ACL & tendon rehabilitation, return-to-sport testing',
    bio: 'Daniel spent six seasons pitch-side in Championship rugby before opening our Clifton Village clinic. He leads our video gait lab and athletic return-to-play testing.'
  },
  {
    name: 'Priya Raman',
    role: 'Senior Specialist Physiotherapist & Cheltenham Lead · BSc MCSP HCPC',
    location: 'Cheltenham — Montpellier Clinic',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=900',
    focus: 'Hand & upper limb therapy, shoulder instability, vestibular & balance rehab',
    bio: 'Priya leads our Montpellier clinic in Cheltenham, specialising in upper-limb orthopaedics, custom splinting, and our AgeWell balance and clinical Pilates studios.'
  },
  {
    name: 'Adam Fry',
    role: 'Lead Rehabilitation & Strength Specialist · BSc MCSP HCPC',
    location: 'Bath & Bristol Clinics',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=900',
    focus: 'Late-stage strength conditioning, workplace ergonomics & occupational rehab',
    bio: 'Adam bridges the gap between the treatment couch and full physical confidence, leading our gym rehabilitation programmes and corporate ergonomic assessments.'
  }
];

export const patientTestimonials = [
  {
    quote: 'I had put up with my rotator cuff pain for eighteen months and assumed surgery was inevitable. Six structured sessions with Rachel at the Bath clinic and I am back swimming three mornings a week.',
    name: 'Helen M.',
    condition: 'Shoulder & Rotator Cuff Rehabilitation',
    clinic: 'Bath Clinic',
    rating: 5
  },
  {
    quote: 'Daniel filmed my stride in the Clifton running lab, adjusted my cadence and calf loading, and the Achilles pain that derailed two Bath Half preparations vanished completely.',
    name: 'Chris T.',
    condition: 'Running Biomechanics & Tendon Rehab',
    clinic: 'Bristol Clinic',
    rating: 5
  },
  {
    quote: 'After my knee replacement, starting in the warm hydrotherapy pool before moving into the gym made all the difference. Welcoming reception, zero jargon, and genuinely uplifting people.',
    name: 'Brian K.',
    condition: 'Post-Operative Knee Replacement',
    clinic: 'Bath Clinic',
    rating: 5
  },
  {
    quote: 'Priya treated my wrist fracture at the Montpellier clinic in Cheltenham. Having a custom splint fitted on the spot and clear exercises to follow meant I was back playing piano in five weeks.',
    name: 'Eleanor V.',
    condition: 'Hand & Wrist Fracture Therapy',
    clinic: 'Cheltenham Clinic',
    rating: 5
  }
];
