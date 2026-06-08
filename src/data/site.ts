// Real business data sourced from scenicrivercanoe.com + public listings.

export const business = {
  name: 'Scenic River Canoe Excursions',
  short: 'Scenic River',
  tagline: 'The only National Wild & Scenic River in the tri-state.',
  river: 'Little Miami River',
  city: 'Cincinnati, Ohio',
  address: '4575 Mt. Carmel Road, Cincinnati, OH 45244',
  phone: '513-576-9000',
  phoneHref: 'tel:+15135769000',
  email: 'jake@scenicrivercanoe.com',
  rating: 4.7,
  reviewCount: 1329,
  seasonOpens: 'May 16',
  facebook: 'https://www.facebook.com/ScenicRiverCanoeExcursions',
  instagram: 'https://www.instagram.com/scenicrivercanoe/',
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
    image: '/photos/river-nisbet.jpg',
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
    image: '/photos/river-loveland.jpg',
  },
  {
    id: 'long',
    name: 'The Long Trip',
    miles: 9,
    hours: '3.5–4.5 hrs',
    blurb: 'A full day on the water for groups and seasoned paddlers chasing the quiet stretches.',
    level: 'Easy–Moderate',
    image: '/photos/river-obannon.jpg',
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
  { src: '/photos/river-loveland.jpg', caption: 'Paddlers on the Little Miami', credit: 'A. Hemmer / CC BY-SA', tall: true },
  { src: '/photos/river-nisbet.jpg', caption: 'Gravel bars & easy water', credit: 'M. Nguyen / CC BY-SA' },
  { src: '/photos/river-obannon.jpg', caption: 'A quiet bend at O’Bannon Creek', credit: 'M. Nguyen / CC BY-SA' },
  { src: '/photos/river-clifton.jpg', caption: 'Wooded banks, mile after mile', credit: 'M. Kowal / CC BY-SA', tall: true },
  { src: '/photos/river-closeup.jpg', caption: 'Clear shallows you can read', credit: 'M. Nguyen / CC BY-SA' },
  { src: '/photos/river-path.jpg', caption: 'Down to the put-in', credit: 'M. Nguyen / CC BY-SA' },
]
