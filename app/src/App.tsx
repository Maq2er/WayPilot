import { useCallback, useEffect, useRef, useState } from 'react'
import { AlertTriangle, BookOpenText, CalendarDays, Compass, Download, Heart, MapPin, WifiOff } from 'lucide-react'
import locationsUrl from '../../sanya_locations_v3.geojson?url'
import { checklistItems } from './data/checklist'
import { tripDays } from './data/days'
import { Days } from './components/Days'
import { Emergency } from './components/Emergency'
import { InstallHelp } from './components/InstallHelp'
import { Mine } from './components/Mine'
import { Phrasebook } from './components/Phrasebook'
import { Places } from './components/Places'
import { Today } from './components/Today'
import { useStoredState } from './hooks/useStoredState'
import { copyText } from './lib/copy'
import { defaultBudget, migrateStorage, parseBackup } from './lib/storage'
import type { BackupData, GeoCollection, Place, PrivateEmergencyProfile, ViewId } from './types'

migrateStorage(checklistItems.map(item => item.id))

const nav: Array<{ id: ViewId; label: string; icon: typeof Compass }> = [
  { id:'today', label:'Сегодня', icon:Compass },
  { id:'days', label:'Дни', icon:CalendarDays },
  { id:'places', label:'Места', icon:MapPin },
  { id:'phrases', label:'Фразы', icon:BookOpenText },
  { id:'mine', label:'Моё', icon:Heart },
  { id:'sos', label:'SOS', icon:AlertTriangle },
]

export default function App() {
  const [view, setView] = useState<ViewId>('today')
  const [locations, setLocations] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [dataError, setDataError] = useState(false)
  const [toast, setToast] = useState('')
  const [favoritePlaces, setFavoritePlaces, placesStorage] = useStoredState<string[]>('favoritePlaces', [])
  const [favoritePhrases, setFavoritePhrases, phrasesStorage] = useStoredState<string[]>('favoritePhrases', [])
  const [notes, setNotes, notesStorage] = useStoredState('notes', '')
  const [checks, setChecks, checksStorage] = useStoredState<string[]>('checkIds', [])
  const [budget, setBudget, budgetStorage] = useStoredState('budget', defaultBudget)
  const [selectedDayId, setSelectedDayId, dayStorage] = useStoredState('selectedDayId', tripDays[0].id)
  const [privateEmergency, setPrivateEmergency, emergencyStorage] = useStoredState<PrivateEmergencyProfile>('privateEmergency', {
    hotelPhone:'', bookingNumber:'', insuranceCompany:'', policyNumber:'', insurancePhone:'',
    bloodType:'', diabetesType:'', hypertensionGrade:'', asthmaSeverity:'', allergies:'', medications:'', emergencyContact:'',
  })
  const [installHelp, setInstallHelp] = useState(false)
  const [requestedPlaceId, setRequestedPlaceId] = useState<string | null>(null)
  const [requestedPhraseId, setRequestedPhraseId] = useState<string | null>(null)
  const timer = useRef<number>()

  const storageAvailable = placesStorage && phrasesStorage && notesStorage && checksStorage && budgetStorage && dayStorage && emergencyStorage

  useEffect(() => {
    let active = true
    fetch(locationsUrl)
      .then(response => {
        if (!response.ok) throw new Error('GeoJSON недоступен')
        return response.json() as Promise<GeoCollection>
      })
      .then(data => {
        if (!active) return
        setLocations(data.features.map((feature, index) => ({
          id:`p${index}`,
          ...feature.properties,
          lat:feature.geometry.coordinates[1],
          lon:feature.geometry.coordinates[0],
          tags:String(feature.properties.tags || '').replace(/[\[\]'"]/g,'').split(/[\s,]+/).map(item => item.trim().toLowerCase()).filter(Boolean),
        })))
      })
      .catch(() => active && setDataError(true))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const notify = (text: string) => {
    window.clearTimeout(timer.current)
    setToast(text)
    timer.current = window.setTimeout(() => setToast(''), 2400)
  }

  const handleCopy = async (text: string) => {
    notify(await copyText(text) ? 'Скопировано' : 'Не удалось скопировать')
  }

  const toggle = (list: string[], id: string) => list.includes(id) ? list.filter(item => item !== id) : [...list, id]
  const go = (id: ViewId) => {
    setView(id)
    window.scrollTo({ top:0, behavior:'smooth' })
  }
  const openPlace = (id: string) => {
    setRequestedPlaceId(id)
    go('places')
  }
  const openPhrase = (id: string) => {
    setRequestedPhraseId(id)
    go('phrases')
  }
  const clearRequestedPlace = useCallback(() => setRequestedPlaceId(null), [])
  const clearRequestedPhrase = useCallback(() => setRequestedPhraseId(null), [])

  const exportData = () => {
    const data: BackupData = {
      version:4,
      exportedAt:new Date().toISOString(),
      favoritePlaces,
      favoritePhrases,
      notes,
      checks,
      budget,
      selectedDayId,
    }
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type:'application/json' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'sanya-app-backup-v4.json'
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    notify('Резервная копия готова')
  }

  const importData = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = parseBackup(String(reader.result))
        setFavoritePlaces(data.favoritePlaces)
        setFavoritePhrases(data.favoritePhrases)
        setNotes(data.notes)
        setChecks(data.checks)
        setBudget(data.budget)
        setSelectedDayId(data.selectedDayId || tripDays[0].id)
        notify('Данные восстановлены')
      } catch {
        notify('Файл резервной копии не подходит')
      }
    }
    reader.onerror = () => notify('Не удалось прочитать файл')
    reader.readAsText(file)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-title">
          <span className="eyebrow"><WifiOff size={11}/>РАБОТАЕТ ОФЛАЙН</span>
          <h1>{nav.find(item => item.id === view)?.label}</h1>
        </div>
        <button className="icon-button" onClick={() => setInstallHelp(true)} aria-label="Как установить приложение"><Download size={21}/></button>
      </header>

      <main>
        {dataError && <div className="storage-warning">Не удалось загрузить данные мест. Перезапустите приложение; остальные разделы доступны.</div>}
        {view === 'today' && <Today locations={locations} selectedDayId={selectedDayId} onSelectDay={setSelectedDayId} onOpenPlace={openPlace} onOpenPhrase={openPhrase} go={go}/>}
        {view === 'days' && <Days locations={locations} onOpenPlace={openPlace}/>}
        {view === 'places' && <Places locations={locations} loading={loading} favoriteIds={favoritePlaces} requestedPlaceId={requestedPlaceId} onRequestHandled={clearRequestedPlace} onToggleFavorite={id => setFavoritePlaces(toggle(favoritePlaces,id))} onCopy={handleCopy}/>}
        {view === 'phrases' && <Phrasebook favoriteIds={favoritePhrases} requestedPhraseId={requestedPhraseId} onRequestHandled={clearRequestedPhrase} onToggleFavorite={id => setFavoritePhrases(toggle(favoritePhrases,id))} onCopy={handleCopy}/>}
        {view === 'mine' && <Mine locations={locations} favoritePlaceIds={favoritePlaces} favoritePhraseIds={favoritePhrases} onTogglePlace={id => setFavoritePlaces(toggle(favoritePlaces,id))} onTogglePhrase={id => setFavoritePhrases(toggle(favoritePhrases,id))} notes={notes} onNotes={setNotes} checks={checks} onChecks={setChecks} budget={budget} onBudget={setBudget} onCopy={handleCopy} onExport={exportData} onImport={importData} storageAvailable={storageAvailable}/>}
        {view === 'sos' && <Emergency profile={privateEmergency} onProfile={setPrivateEmergency} favoritePhraseIds={favoritePhrases} onToggleFavorite={id => setFavoritePhrases(toggle(favoritePhrases,id))} onCopy={handleCopy}/>}
      </main>

      <nav className="bottom-nav six" aria-label="Основная навигация">
        {nav.map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => go(item.id)}><item.icon size={20}/><span>{item.label}</span></button>)}
      </nav>

      {toast && <div className="toast" role="status">{toast}</div>}
      {installHelp && <InstallHelp onClose={() => setInstallHelp(false)}/>}
    </div>
  )
}
