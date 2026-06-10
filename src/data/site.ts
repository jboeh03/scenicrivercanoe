// Real business data sourced from scenicrivercanoe.com + public listings.

export const business = {
  name: 'Scenic River Canoe Excursions',
  short: 'Scenic River',
  tagline: 'The only National Wild & Scenic River in the tri-state.',
  river: 'Little Miami River',
  city: 'Cincinnati, Ohio',
  address: '4595 Round Bottom Rd, Cincinnati, OH 45244',
  phone: '513-576-9000',
  phoneHref: 'tel:+15135769000',
  smsHref: 'sms:+15135769000',
  email: 'jake@scenicrivercanoe.com',
  rating: 4.7,
  reviewCount: 1329,
  seasonOpens: 'May 16',
  facebook: 'https://www.facebook.com/ScenicRiverCanoeExcursions',
  instagram: 'https://www.instagram.com/scenicrivercanoe/',
  // Daily operating window (last bus ~3pm); used by the live "open now" chat.
  hoursOpen: 9,
  hoursClose: 15,
  // Coordinates of the livery (Round Bottom Rd) for live weather.
  lat: 39.126,
  lon: -84.355,
  // USGS gauge: Little Miami River at Milford, OH
  usgsSite: '03245500',
} as const

export type Trip = {
  id: string
  name: string
  miles: number
  hours: string
  blurb: string
  level: 'Easy' | 'Easy–Moderate'
  highlight?: string
  popular?: boolean
  image: string
}

export const trips: Trip[] = [
  {
    id: 'short',
    name: 'The Short Trip',
    miles: 2,
    hours: '1–1.5 hrs',
    blurb: 'A gentle first taste of the river. Perfect for young families and first-timers.',
    level: 'Easy',
    image: '/photos/IMG_1572.jpeg',
  },
  {
    id: 'mid',
    name: "Fletcher's Mid Trip",
    miles: 6,
    hours: '2–3 hrs',
    blurb:
      'Our signature run. Glide past wooded banks and pull over at Little Miami Brewing Co. halfway down.',
    level: 'Easy–Moderate',
    highlight: 'Brewery stop',
    popular: true,
    image: '/photos/IMG_1574.jpeg',
  },
  {
    id: 'long',
    name: 'The Long Trip',
    miles: 9,
    hours: '3.5–4.5 hrs',
    blurb: 'A full day on the water for groups and seasoned paddlers chasing the quiet stretches.',
    level: 'Easy–Moderate',
    image: '/photos/IMG_1573.jpeg',
  },
]

export const pricing = {
  perPerson: 40,
  weekendSurcharge: 5,
}

export type Badge = {
  id: string
  name: string
  icon: string
  desc: string
  earned: boolean
}

export const badges: Badge[] = [
  { id: 'first', name: 'First Launch', icon: '🛶', desc: 'Complete your first trip', earned: true },
  { id: 'brewery', name: 'Brewery Bound', icon: '🍺', desc: 'Stop at Little Miami Brewing', earned: true },
  { id: 'eagle', name: 'Eagle Eye', icon: '🦅', desc: 'Spot a bald eagle on the river', earned: true },
  { id: 'ninemile', name: 'Long Hauler', icon: '🏞️', desc: 'Finish the 9-mile run', earned: false },
  { id: 'dawn', name: 'Dawn Patrol', icon: '🌅', desc: 'Launch before 9am', earned: false },
  { id: 'century', name: 'Century Club', icon: '💯', desc: 'Paddle 100 river-miles', earned: false },
]

export type LeaderRow = { rank: number; name: string; miles: number; trips: number; you?: boolean }

export const leaderboard: LeaderRow[] = [
  { rank: 1, name: 'Marcy R.', miles: 142, trips: 19 },
  { rank: 2, name: 'The Donnellys', miles: 128, trips: 16 },
  { rank: 3, name: 'Kyle T.', miles: 97, trips: 12 },
  { rank: 4, name: 'You', miles: 84, trips: 11, you: true },
  { rank: 5, name: 'Priya & Sam', miles: 76, trips: 9 },
]

// Points along the river journey for the interactive map (normalized 0..1 along the route).
export type MapMarker = {
  id: string
  label: string
  kind: 'put-in' | 'take-out' | 'brewery' | 'wildlife'
  t: number
}

export const mapMarkers: MapMarker[] = [
  { id: 'putin', label: 'Put-in · Mt. Carmel', kind: 'put-in', t: 0.04 },
  { id: 'heron', label: 'Heron rookery', kind: 'wildlife', t: 0.22 },
  { id: 'brewery', label: 'Little Miami Brewing Co.', kind: 'brewery', t: 0.5 },
  { id: 'eagle', label: 'Eagle nest bend', kind: 'wildlife', t: 0.72 },
  { id: 'takeout', label: 'Take-out · shuttle pickup', kind: 'take-out', t: 0.96 },
]

// Real Little Miami River photography (CC-licensed stand-ins; swap with Scenic
// River's own Instagram/Facebook shots before the pitch — drop into /public/photos).
export type Photo = { src: string; caption: string; credit: string; tall?: boolean }

export const gallery: Photo[] = [
  { src: '/photos/IMG_1573.jpeg', caption: 'A summer day on the Little Miami', credit: 'Scenic River Canoe Excursions', tall: true },
  { src: '/photos/IMG_1574.jpeg', caption: 'Boats out, ready to launch', credit: 'Scenic River Canoe Excursions' },
  { src: '/photos/IMG_1571.jpeg', caption: 'Good times on the water', credit: 'Scenic River Canoe Excursions' },
  { src: '/photos/IMG_1572.jpeg', caption: 'Little paddlers, big adventures', credit: 'Scenic River Canoe Excursions', tall: true },
  { src: '/photos/IMG_1570.jpeg', caption: 'Groups & parties welcome', credit: 'Scenic River Canoe Excursions' },
  { src: '/photos/IMG_1576.png', caption: 'The Little Miami, mapped', credit: 'Scenic River Canoe Excursions', tall: true },
]

// FAQs — verbatim from scenicrivercanoe.com/faqs (condensed answers).
export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: 'What should I bring?',
    a: 'Old water shoes (not flip-flops), sunblock, plenty of water, snacks, a hat and sunglasses, and garbage bags. Bring a dry container for phones and valuables — we sell waterproof storage too. Scenic River isn’t responsible for lost, stolen, or misplaced items.',
  },
  {
    q: 'Are children permitted?',
    a: 'Participants must be at least 5 years old and weigh 50+ lbs. Kids 5–15 must be accompanied by a parent or legal guardian. Ages 16–17 may paddle independently with a signed parental waiver.',
  },
  {
    q: 'What kind of boats do you rent?',
    a: 'Canoes, tandem kayaks, and single kayaks (ages 10 & up). Single kayaks are rated up to 275 lbs, tandems up to 450 lbs, and canoes up to 500 lbs.',
  },
  {
    q: 'What is your cancellation / refund policy?',
    a: 'Cancel at least 12 hours before your reservation for a full refund. Cancel 2–12 hours before and you’ll receive a gift-card credit. Within 2 hours, no refund or credit. If we cancel for weather, you get a full refund or credit.',
  },
  {
    q: 'Do your trips end where we parked?',
    a: 'Yes. All trips end at our lot — 4595 Round Bottom Rd. You check in, grab life jackets, then ride the bus upriver to the put-in and float back to your vehicle.',
  },
  {
    q: 'How often do the buses run?',
    a: 'Buses run continuously, with departures every 15–20 minutes throughout the day until 3pm.',
  },
  {
    q: 'Are there rapids on your stretch?',
    a: 'Yes — and they’re a ton of fun! The Little Miami is a Class I river and generally beginner-friendly. Higher water can restrict some boats or ages; check our live conditions and Facebook for the day.',
  },
  {
    q: 'Are coolers permitted?',
    a: 'Yes, as long as they fit on the boat. No Styrofoam coolers (an environmental hazard) and no glass bottles.',
  },
  {
    q: 'Are dogs or pets permitted?',
    a: 'No — pets are no longer allowed for safety and liability reasons. Service animals can’t ride the river but may stay with a non-paddling member of your party if properly restrained.',
  },
  {
    q: 'Do you ever close during the season?',
    a: 'Yes — if it’s too cold or the river is too high. Our live River Today status and Facebook page have the day’s operating status.',
  },
  {
    q: 'Can I bring my own boat and use your shuttle?',
    a: 'No. Due to bus transportation state regulations and insurance liability, we don’t transport privately owned watercraft. There are several public access points nearby on the river.',
  },
  {
    q: 'When are your busiest times?',
    a: 'The most popular window is 11am–2pm, and weekends are busier. Arrive early or come on a weekday for a quieter float.',
  },
]

// The actual 2023 liability waiver (Participant Release of Liability & Assumption of Risk).
export const waiver = {
  title: 'Participant Release of Liability & Assumption of Risk',
  org: 'Scenic River Canoe Excursions',
  intro:
    'In consideration of being allowed to participate in any way in the program, related events and activities, I the undersigned acknowledge, appreciate, and agree that:',
  clauses: [
    'The risk of injury from the activities involved in this program is significant, including the potential for permanent paralysis and death.',
    'I KNOWINGLY AND FREELY ASSUME ALL SUCH RISKS, both known and unknown, EVEN IF ARISING FROM THE NEGLIGENCE OF THE RELEASEES or others, and assume full responsibility for my participation.',
    'I willingly agree to comply with the terms and conditions for participation. If I observe any unusual significant hazard, I will remove myself and bring it to the attention of the nearest official immediately.',
    'I, for myself and on behalf of my heirs, assigns, personal representatives and next of kin, HEREBY RELEASE, INDEMNIFY, AND HOLD HARMLESS SCENIC RIVER CANOE EXCURSIONS, its officers, officials, agents and/or employees, other participants, and owners/lessors of premises (RELEASEES), from any and all claims, demands, losses, and liability arising out of or related to any INJURY, DISABILITY, OR DEATH I may suffer, or loss or damage to person or property, WHETHER ARISING FROM THE NEGLIGENCE OF THE RELEASEES OR OTHERWISE, to the fullest extent permitted by law.',
    'A late fee of $20.00 per boat per half hour is enforced after 7:00pm daily. A fee of $600.00 is assigned per damaged or lost canoe or kayak. A fee of $25.00 is assigned per damaged or lost paddle or life preserver.',
    'Due to insurance and liability complications, Scenic River Canoe Excursions prohibits dogs and all pets.',
  ],
  acknowledgement:
    'I HAVE READ THIS RELEASE OF LIABILITY AND ASSUMPTION OF RISK AGREEMENT, FULLY UNDERSTAND ITS TERMS, UNDERSTAND THAT I HAVE GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING IT, AND SIGN IT FREELY AND VOLUNTARILY.',
  minorNote:
    'Paddlers under 18 require a parent/guardian to consent and sign, releasing and indemnifying the Releasees for the minor’s participation, plus an emergency phone number.',
}

// Store — swag + a used-gear marketplace (the "Gear Locker").
export type Product = { id: string; name: string; price: number; tag?: string; emoji: string }

export const swag: Product[] = [
  { id: 'tee', name: 'Wild & Scenic Tee', price: 26, emoji: '👕', tag: 'Bestseller' },
  { id: 'hat', name: 'River Trucker Hat', price: 24, emoji: '🧢' },
  { id: 'pouch', name: 'Waterproof Phone Pouch', price: 18, emoji: '📱', tag: 'Bring it on the river' },
  { id: 'koozie', name: 'Floating Koozie 2-pack', price: 12, emoji: '🥤' },
  { id: 'sticker', name: 'Sticker Pack', price: 8, emoji: '✨' },
  { id: 'bottle', name: 'Insulated Bottle', price: 28, emoji: '🍶' },
  { id: 'towel', name: 'Quick-Dry Towel', price: 22, emoji: '🏖️' },
  { id: 'gift', name: 'Gift Card', price: 50, emoji: '🎁', tag: 'Any amount' },
]

export type UsedGear = {
  id: string
  name: string
  price: number
  condition: 'Like new' | 'Good' | 'Well-loved'
  detail: string
  emoji: string
}

export const usedGear: UsedGear[] = [
  { id: 'g1', name: 'Single Kayak — 10ft', price: 240, condition: 'Good', detail: 'Retired rental, stable & beginner-friendly. Paddle included.', emoji: '🛶' },
  { id: 'g2', name: 'Tandem Kayak — 12ft', price: 380, condition: 'Well-loved', detail: 'Two-seater, great for couples. Some scuffs, fully river-ready.', emoji: '🛶' },
  { id: 'g3', name: 'Aluminum Canoe — 16ft', price: 425, condition: 'Good', detail: 'Classic hull, hauls gear and kids. Two paddles included.', emoji: '🛶' },
  { id: 'g4', name: 'Youth PFD Bundle (x4)', price: 60, condition: 'Like new', detail: 'Coast Guard-approved kids’ life jackets, barely used.', emoji: '🦺' },
]
