import { useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronRight, CloudRain, Compass, Copy, Home, MapPin, Navigation, Sparkles, Sun, Umbrella, Waves } from 'lucide-react'
import { tripDays } from '../data/days'
import { phrases } from '../data/phrases'
import type { Place, ViewId } from '../types'
import { SectionTitle } from './SectionTitle'

const vibes = {
  море: { icon:Waves, title:'Хочу море', items:['Yalong Bay утром или после 16:00','Dadonghai рядом с отелем','West Island, если море спокойное'] },
  дождь: { icon:CloudRain, title:'Идёт дождь', items:['Atlantis Lost Chambers + CDF','Joy City + чай + массаж','Не ехать на острова и в Wanning'] },
  жара: { icon:Sun, title:'Слишком жарко', items:['Outdoor до 10:30 и после 16:30','CDF / Joy City / Atlantis днём','Электролиты и пауза в отеле'] },
  устали: { icon:Umbrella, title:'Нет сил', items:['Dadonghai + FreeGen','Чай + еда + массаж','Короткий закат в Sanya Bay'] },
  рядом: { icon:MapPin, title:'Только рядом', items:['Dadonghai Beach','FreeGen или Dolphin','Summer Mall / Pineapple'] },
}
type VibeId = keyof typeof vibes

interface Props {
  locations: Place[]
  selectedDayId: string
  onSelectDay: (id: string) => void
  onOpenPlace: (id: string) => void
  onOpenPhrase: (id: string) => void
  go: (view: ViewId) => void
}

export function Today({ locations, selectedDayId, onSelectDay, onOpenPlace, onOpenPhrase, go }: Props) {
  const [vibe, setVibe] = useState<VibeId>('море')
  const chosen = vibes[vibe]
  const Icon = chosen.icon
  const nearby = locations.filter(place => place.tags.includes('рядом')).slice(0, 3)

  const automaticDay = useMemo(() => {
    const today = new Date()
    const iso = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`
    return tripDays.find(day => day.id === iso)
  }, [])
  const activeDay = tripDays.find(day => day.id === selectedDayId) ?? automaticDay ?? tripDays[0]

  return (
    <>
      <section className="today-plan">
        <div className="today-orbit" aria-hidden="true"/>
        <div className="today-plan-header">
          <div><span><Sparkles size={12}/>ПЛАН НА СЕГОДНЯ</span><h2>{activeDay.title}</h2><p>{activeDay.label} · можно менять на ходу</p></div>
          <select value={activeDay.id} onChange={event => onSelectDay(event.target.value)} aria-label="Выбрать день">
            {tripDays.map(day => <option key={day.id} value={day.id}>{day.label}</option>)}
          </select>
        </div>
        <div className="today-segments">
          {activeDay.segments.map(segment => (
            <article key={segment.label}>
              <span>{segment.label}</span><strong>{segment.summary}</strong>
              <div>
                {segment.placeIds.slice(0,2).map(id => {
                  const place = locations.find(item => item.id === id)
                  return place ? <button key={id} onClick={() => onOpenPlace(id)}><MapPin size={15}/>{place.name}</button> : null
                })}
                {segment.phraseIds?.slice(0,1).map(id => {
                  const phrase = phrases.find(item => item.id === id)
                  return phrase ? <button key={id} onClick={() => onOpenPhrase(id)}><Copy size={15}/>{phrase.zh}</button> : null
                })}
              </div>
            </article>
          ))}
        </div>
        <button className="today-all-days" onClick={() => go('days')}><Navigation size={17}/>Весь маршрут <ChevronRight size={18}/></button>
      </section>

      <section className="hero-card">
        <span className="hero-kicker">Если планы изменились</span>
        <div className="vibe-row">
          {(Object.keys(vibes) as VibeId[]).map(id => {
            const VibeIcon = vibes[id].icon
            return <button key={id} className={`vibe ${vibe === id ? 'active' : ''}`} onClick={() => setVibe(id)}><VibeIcon size={19}/><span>{id}</span></button>
          })}
        </div>
        <div className="recommendation"><Icon size={25}/><div><h2>{chosen.title}</h2><ul>{chosen.items.map(item => <li key={item}>{item}</li>)}</ul></div></div>
      </section>

      <SectionTitle title="Быстрый выбор" action="Все места" onAction={() => go('places')}/>
      <div className="quick-grid">
        <QuickCard icon={Home} title="2 часа" text="Dadonghai, фрукты, кофе или массаж"/>
        <QuickCard icon={Sun} title="Полдня" text="Yalong Bay, CDF, Atlantis или чай"/>
        <QuickCard icon={CalendarDays} title="Весь день" text="West Island, Wanning или Yanoda"/>
      </div>
      <SectionTitle title="Рядом с отелем"/>
      <div className="mini-list">
        {nearby.map(place => <button key={place.id} className="mini-place" onClick={() => onOpenPlace(place.id)}><div><strong>{place.name}</strong><span>{place.zh}</span></div><MapPin size={18}/></button>)}
      </div>
      <div className="offline-tip"><Check size={19}/><span>Данные уже в приложении. Интернет нужен только для внешних карт и проверки актуальных часов.</span></div>
    </>
  )
}

function QuickCard({ icon: Icon, title, text }: { icon: typeof Compass; title: string; text: string }) {
  return <article className="quick-card"><Icon size={22}/><strong>{title}</strong><span>{text}</span></article>
}
