export type Activity = {
  id: string
  name: string
  city: 'Clarksville' | 'Nashville'
  category: string
  interests: string[]
  environment: 'indoor' | 'outdoor' | 'unknown'
  cost: number | null
  walking: 'very little' | 'some' | 'unknown'
  ageMinMonths: number | null
  ageMaxMonths: number | null
  amenities: string[] | null
  address: string | null
  website: string | null
  durationMinutes: number | null
  placeholder: true
}

// PLACEHOLDER DATA ONLY. Names are supplied by the product brief. No real-world
// prices, addresses, hours, amenities, age guidance, or sources are asserted.
export const activities: Activity[] = [
  { id: 'cl-1', name: 'Heritage Park', city: 'Clarksville', category: 'Park', interests: ['Playground', 'Water play', 'Nature'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'cl-2', name: 'Liberty Park', city: 'Clarksville', category: 'Park', interests: ['Playground', 'Nature', 'Animals'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'cl-3', name: 'Rotary Park', city: 'Clarksville', category: 'Park', interests: ['Playground', 'Nature'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'cl-4', name: 'McGregor Park', city: 'Clarksville', category: 'Park', interests: ['Playground', 'Nature', 'Books'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'cl-5', name: 'Downtown Commons', city: 'Clarksville', category: 'Community space', interests: ['Playground', 'Music', 'Water play'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'cl-6', name: 'Customs House Museum', city: 'Clarksville', category: 'Museum', interests: ['Art/sensory', 'Books', 'Learning/science'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'na-1', name: 'Adventure Science Center', city: 'Nashville', category: 'Museum', interests: ['Learning/science', 'Art/sensory', 'Trains/cars'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'na-2', name: 'Fannie Mae Dees Park', city: 'Nashville', category: 'Park', interests: ['Playground', 'Nature', 'Art/sensory'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'na-3', name: 'Nashville playground (placeholder)', city: 'Nashville', category: 'Playground', interests: ['Playground'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'na-4', name: 'Nashville indoor play location (placeholder)', city: 'Nashville', category: 'Indoor play', interests: ['Indoor play', 'Art/sensory'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'na-5', name: 'Nashville splash pad / water play (placeholder)', city: 'Nashville', category: 'Water play', interests: ['Water play', 'Playground'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
  { id: 'na-6', name: 'Nashville children’s museum / activity (placeholder)', city: 'Nashville', category: 'Children’s activity', interests: ['Learning/science', 'Books', 'Music'], environment: 'unknown', cost: null, walking: 'unknown', ageMinMonths: null, ageMaxMonths: null, amenities: null, address: null, website: null, durationMinutes: null, placeholder: true },
]
