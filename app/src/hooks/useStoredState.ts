import { useEffect, useState } from 'react'
import { readStored, writeStored } from '../lib/storage'

export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initial))
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    setStorageAvailable(writeStored(key, value))
  }, [key, value])

  return [value, setValue, storageAvailable] as const
}
