import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Copy, MapPin, Search, Star, X } from 'lucide-react'
import type { Place } from '../types'
import { FoodGuide } from './FoodGuide'

const categories = ['все','рядом','море','еда','бар','шопинг','природа','дождь','транспорт','резерв']

interface Props {
  locations: Place[]
  loading: boolean
  favoriteIds: string[]
  requestedPlaceId: string | null
  onRequestHandled: () => void
  onToggleFavorite: (id: string) => void
  onCopy: (text: string) => void
}

export function Places({ locations, loading, favoriteIds, requestedPlaceId, onRequestHandled, onToggleFavorite, onCopy }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('все')
  const [mode, setMode] = useState<'places' | 'food' | 'bars'>('places')
  const filtered = useMemo(() => locations.filter(place => {
    const text = `${place.name} ${place.zh} ${place.cat} ${place.tags.join(' ')}`.toLowerCase()
    return (category === 'все' || place.tags.includes(category) || place.cat.toLowerCase().includes(category)) &&
      text.includes(query.trim().toLowerCase())
  }), [locations, query, category])

  useEffect(() => {
    if (!requestedPlaceId || !locations.length) return
    const place = locations.find(item => item.id === requestedPlaceId)
    if (!place) {
      onRequestHandled()
      return
    }
    setCategory('все')
    setMode('places')
    setQuery(place.name)
    onRequestHandled()
  }, [locations, onRequestHandled, requestedPlaceId])

  return (
    <section>
      <div className="place-mode-tabs" role="tablist" aria-label="Раздел мест">
        <button className={mode === 'places' ? 'active' : ''} onClick={() => setMode('places')}>Места</button>
        <button className={mode === 'food' ? 'active' : ''} onClick={() => setMode('food')}>Что попробовать</button>
        <button className={mode === 'bars' ? 'active' : ''} onClick={() => setMode('bars')}>Бары</button>
      </div>
      {mode === 'places' && <><div className="search-sticky">
        <div className="search-box">
          <Search size={19}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Название, китайский текст, тег…"/>
          {query && <button onClick={() => setQuery('')} aria-label="Очистить"><X size={19}/></button>}
        </div>
        <div className="chips">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <span className="count">{loading ? 'Загружаю места…' : `${filtered.length} мест`}</span>
      </div>
      <div className="place-list">
        {filtered.map(place => (
          <PlaceCard
            key={place.id}
            place={place}
            favorite={favoriteIds.includes(place.id)}
            onToggleFavorite={onToggleFavorite}
            onCopy={onCopy}
          />
        ))}
      </div></>}
      {mode === 'food' && <FoodGuide mode="food"/>}
      {mode === 'bars' && <FoodGuide mode="bars"/>}
    </section>
  )
}

function PlaceCard({ place, favorite, onToggleFavorite, onCopy }: { place: Place; favorite: boolean; onToggleFavorite: (id: string) => void; onCopy: (text: string) => void }) {
  const [open, setOpen] = useState(false)
  const taxi = `请送我们去这里：\n${place.zh}\n${place.name}\n坐标：${place.lat}, ${place.lon}`
  return (
    <article className="place" data-place-id={place.id}>
      <div className="place-top"><span className="category">{place.cat}</span><button className={`favorite ${favorite ? 'active' : ''}`} onClick={() => onToggleFavorite(place.id)} aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}><Star size={21} fill={favorite ? 'currentColor' : 'none'}/></button></div>
      <h3>{place.name}</h3><p className="chinese">{place.zh}</p><p className="verdict">{place.verdict}</p>
      {open && <div className="place-details"><InfoRow label="Когда" text={place.when}/><InfoRow label="Зачем" text={place.role}/><p>{place.note}</p><code>{place.lat}, {place.lon}</code></div>}
      <button className="details-button" onClick={() => setOpen(!open)}>{open ? 'Свернуть' : 'Подробнее'} {open ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}</button>
      <div className="place-actions">
        <button onClick={() => onCopy(taxi)}><Copy size={18}/>Таксисту</button>
        <a href={`https://maps.apple.com/?ll=${place.lat},${place.lon}&q=${encodeURIComponent(place.name)}`}><MapPin size={18}/>Apple Maps</a>
      </div>
    </article>
  )
}

function InfoRow({ label, text }: { label: string; text: string }) {
  return <div className="info-row"><strong>{label}</strong><span>{text}</span></div>
}
