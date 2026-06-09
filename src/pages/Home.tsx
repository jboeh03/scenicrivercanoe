import { Hero } from '@/sections/Hero'
import { Conditions } from '@/sections/Conditions'
import { Trips } from '@/sections/Trips'
import { Gallery } from '@/sections/Gallery'
import { Rewards } from '@/sections/Rewards'
import { Concierge } from '@/sections/Concierge'
import { Booking } from '@/sections/Booking'
import { Faqs } from '@/sections/Faqs'
import { Footer } from '@/sections/Footer'

export function Home() {
  return (
    <>
      <Hero />
      <Conditions />
      <Trips />
      <Gallery />
      <Rewards />
      <Concierge />
      <Booking />
      <Faqs />
      <Footer />
    </>
  )
}
