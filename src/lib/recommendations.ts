import { activities, type Activity } from '../data/activities'

export type Preferences = {
  age: string; children: string; location: 'Clarksville, TN' | 'Nashville, TN'; date: string; customDate: string
  distance: string; interests: string[]; walking: string; budget: string; environment: 'Indoor' | 'Outdoor' | 'Either'
  priorities: string[]; nap: string; customNap: string; timeOutside: string
}

export type Recommendation = { activity: Activity; score: number; reasons: string[] }

const budgetLimit: Record<string, number | null> = { Free: 0, 'Under $20': 20, 'Under $40': 40, 'Under $75': 75, "Doesn't matter": null }
const ages: Record<string, [number, number]> = { '12–18 months': [12, 18], '18–24 months': [18, 24], '2–3 years': [24, 36], '3–5 years': [36, 60] }

export function recommend(preferences: Preferences): Recommendation[] {
  const city = preferences.location.startsWith('Clarksville') ? 'Clarksville' : 'Nashville'
  const [minAge, maxAge] = ages[preferences.age] ?? [0, 120]
  const limit = budgetLimit[preferences.budget]
  return activities
    .filter((activity) => activity.city === city)
    .filter((activity) => activity.cost === null || limit === null || activity.cost <= limit)
    .filter((activity) => preferences.environment === 'Either' || activity.environment === preferences.environment.toLowerCase())
    .filter((activity) => activity.ageMinMonths === null || activity.ageMaxMonths === null || (activity.ageMinMonths <= maxAge && activity.ageMaxMonths >= minAge))
    .map((activity) => {
      const matched = preferences.interests.filter((interest) => activity.interests.includes(interest))
      const reasons = matched.length ? [`Example interest tag: ${matched.slice(0, 2).join(' and ')}`] : ['A nearby placeholder option']
      if (activity.environment === 'unknown') reasons.push('Setting: Unknown')
      if (activity.ageMinMonths === null) reasons.push('Age suitability: Unknown')
      const requestedWalking = preferences.walking === 'Very little'
      const walkingFit = activity.walking === 'very little' || (!requestedWalking && activity.walking === 'some')
      const priorityFit = preferences.priorities.some((priority) => priority.toLowerCase().includes('walking') && walkingFit)
      const score = matched.length * 5 + (activity.environment === preferences.environment.toLowerCase() ? 4 : 0) + (priorityFit ? 2 : 0)
      return { activity, score, reasons }
    })
    .sort((a, b) => b.score - a.score || a.activity.name.localeCompare(b.activity.name))
}

export function unknownsFor(preferences: Preferences, picks: Recommendation[]): string[] {
  const details = new Set<string>()
  if (picks.some((item) => item.activity.ageMinMonths === null)) details.add('Age suitability: Unknown.')
  if (picks.some((item) => item.activity.cost === null)) details.add('Activity prices and total cost: Unknown.')
  if (picks.some((item) => item.activity.environment === 'unknown')) details.add('Indoor or outdoor setting: Unknown.')
  details.add('Hours, seasonal availability, and date-specific openings: Unknown.')
  if (preferences.distance !== 'Anywhere nearby') details.add('Driving distance and travel time: Unknown.')
  if (preferences.priorities.length) details.add('Priority amenities and accessibility details: Unknown.')
  return [...details]
}
