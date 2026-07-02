import type { BackupData, Budget } from '../types'

const PREFIX = 'sanya-pwa:'

export function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeStored<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function migrateStorage(checklistIds: string[]): void {
  const oldFavorites = readStored<unknown>('favorites', null)
  const currentPlaces = readStored<unknown>('favoritePlaces', null)
  if (currentPlaces === null && Array.isArray(oldFavorites)) {
    writeStored('favoritePlaces', oldFavorites.filter((id): id is string => typeof id === 'string'))
  }

  const oldChecks = readStored<unknown>('checks', null)
  const currentChecks = readStored<unknown>('checkIds', null)
  if (currentChecks === null && Array.isArray(oldChecks)) {
    const ids = oldChecks
      .filter((index): index is number => Number.isInteger(index))
      .map(index => checklistIds[index])
      .filter(Boolean)
    writeStored('checkIds', ids)
  }
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string')
}

function isBudget(value: unknown): value is Budget {
  return Boolean(value && typeof value === 'object' && 'cash' in value && 'rate' in value)
}

export function parseBackup(raw: string): BackupData {
  const data: unknown = JSON.parse(raw)
  if (!data || typeof data !== 'object') throw new Error('Некорректный файл')
  const source = data as Record<string, unknown>

  if (source.version === 3) {
    return {
      version: 4,
      exportedAt: new Date().toISOString(),
      favoritePlaces: stringArray(source.favorites) ? source.favorites : [],
      favoritePhrases: [],
      notes: typeof source.notes === 'string' ? source.notes : '',
      checks: [],
      budget: isBudget(source.budget) ? source.budget : defaultBudget,
      selectedDayId: '',
    }
  }

  if (
    source.version !== 4 ||
    !stringArray(source.favoritePlaces) ||
    !stringArray(source.favoritePhrases) ||
    !stringArray(source.checks) ||
    typeof source.notes !== 'string' ||
    typeof source.selectedDayId !== 'string' ||
    !isBudget(source.budget)
  ) {
    throw new Error('Некорректная структура резервной копии')
  }

  return source as unknown as BackupData
}

export const defaultBudget: Budget = {
  cash: 2500,
  rate: 13,
  transport: '',
  food: '',
  bars: '',
  activity: '',
  spa: '',
  shop: '',
  other: '',
}
