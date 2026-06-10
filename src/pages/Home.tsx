import { Hero } from '@/sections/Hero'
import { Conditions } from '@/sections/Conditions'
import { Trips } from '@/sections/Trips'
import { Gallery } from '@/sections/Gallery'
import { About } from '@/sections/About'
import { Reviews } from '@/sections/Reviews'
import { Rewards } from '@/sections/Rewards'
import { Concierge } from '@/sections/Concierge'
import { Booking } from '@/sections/Booking'
import { Faqs } from '@/sections/Faqs'
import { Footer } from '@/sections/Footer'

export function Home() {
  return (
    <main>
      <Hero />
      <Conditions />
      <Trips />
      <Gallery />
      <About />
      <Reviews />
      <Rewards />
      <Concierge />
      <Booking />
      <Faqs />
      <Footer />
    </main>
  )
}
