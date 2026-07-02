export type ViewId = 'today' | 'days' | 'places' | 'phrases' | 'mine' | 'sos'

export interface LocationProperties {
  cat: string
  name: string
  zh: string
  role: string
  when: string
  verdict: string
  note: string
  tags: string
}

export interface GeoFeature {
  type: 'Feature'
  properties: LocationProperties
  geometry: { type: 'Point'; coordinates: [number, number] }
}

export interface GeoCollection {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

export interface Place extends Omit<LocationProperties, 'tags'> {
  id: string
  lat: number
  lon: number
  tags: string[]
}

export type PhraseCategory = 'basic' | 'taxi' | 'restaurant' | 'hotel' | 'shopping' | 'emergency'

export interface Phrase {
  id: string
  category: PhraseCategory
  ru: string
  zh: string
  pinyin: string
  audio: string | null
  critical?: boolean
}

export interface TripSegment {
  label: string
  summary: string
  placeIds: string[]
  phraseIds?: string[]
}

export interface TripDay {
  id: string
  label: string
  title: string
  primary: string
  fallback: string
  segments: TripSegment[]
  tags: string[]
}

export interface ChecklistItem {
  id: string
  label: string
}

export interface EmergencyData {
  hotel: {
    nameRu: string
    nameEn: string
    nameZh: string
    addressZh: string
    phone: string | null
    bookingNumber: string | null
  }
  insurance: {
    company: string | null
    policyNumber: string | null
    phone: string | null
  }
  numbers: Array<{ number: string; label: string }>
  phraseIds: string[]
}

export interface Budget {
  cash: number | string
  rate: number | string
  transport: number | string
  food: number | string
  bars: number | string
  activity: number | string
  spa: number | string
  shop: number | string
  other: number | string
}

export interface BackupData {
  version: 4
  exportedAt: string
  favoritePlaces: string[]
  favoritePhrases: string[]
  notes: string
  checks: string[]
  budget: Budget
  selectedDayId: string
}
