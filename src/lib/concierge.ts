import { trips } from '@/data/site'

export type ChatMsg = { role: 'user' | 'assistant'; content: string; tripId?: string }

// Deterministic local recommender. Runs when the serverless API is unavailable
// (no key, offline, timeout) so the live demo NEVER stalls.
export function localRecommend(text: string): { content: string; tripId: string } {
  const t = text.toLowerCase()
  const nums = t.match(/\d+/g)?.map(Number) ?? []
  const groupSize = Math.max(...(nums.length ? nums : [0]))
  const hasKids = /(kid|child|toddler|son|daughter|family|young|little)/.test(t)
  const wantsLong = /(long|full day|all day|9|nine|adventure|experienced|advanced)/.test(t)
  const wantsBrewery = /(brew|beer|drink|bar)/.test(t)
  const wantsShort = /(short|quick|2|two|first time|beginner|nervous|easy)/.test(t)

  let tripId = 'mid'
  if (hasKids || wantsShort) tripId = 'short'
  if (wantsLong) tripId = 'long'
  if (wantsBrewery) tripId = 'mid'
  if (hasKids && wantsBrewery) tripId = 'mid'

  const trip = trips.find((x) => x.id === tripId)!
  const groupLine =
    groupSize > 1 ? `For your group of ${groupSize}, ` : ''
  const kidLine = hasKids
    ? 'with kids along, the calmer water and shorter time on the river is the easy call. '
    : ''
  const breweryLine = wantsBrewery
    ? 'And yes — it floats you right past Little Miami Brewing Co. for a mid-trip stop. '
    : ''

  return {
    tripId,
    content: `${groupLine}I'd point you at ${trip.name} (${trip.miles} miles, about ${trip.hours}). ${kidLine}${breweryLine}It's rated ${trip.level} and the shuttle's included. Want me to hold a spot?`,
  }
}

const STARTER = "Hi! Tell me about your group and I'll pick the right trip. Try: “4 of us, 2 kids, Saturday.”"

export const conciergeStarter: ChatMsg = { role: 'assistant', content: STARTER }

export async function askConcierge(
  message: string,
  history: ChatMsg[],
): Promise<ChatMsg> {
  try {
    const ctrl = new AbortController()
    const to = setTimeout(() => ctrl.abort(), 7000)
    const res = await fetch('/api/concierge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: history.slice(-6) }),
      signal: ctrl.signal,
    })
    clearTimeout(to)
    if (!res.ok) throw new Error(`api ${res.status}`)
    const data = await res.json()
    if (!data?.content) throw new Error('empty')
    return { role: 'assistant', content: data.content, tripId: data.tripId }
  } catch {
    const local = localRecommend(message)
    return { role: 'assistant', ...local }
  }
}
