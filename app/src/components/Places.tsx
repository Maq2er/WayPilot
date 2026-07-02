import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Map, MapPin, Search, Star, X } from 'lucide-react'
import type { Place } from '../types'
import { FoodGuide } from './FoodGuide'
import { TaxiDisplay } from './TaxiDisplay'
import { placePhoto } from '../data/placePhotos'

const categories = ['все','рядом','море','еда','бар','шопинг','природа','дождь','фото','чай','напитки','транспорт','резерв']

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
  const [showTaxi, setShowTaxi] = useState(false)
  const photo = placePhoto(place.name)
  const coverEmoji = place.tags.includes('бар') ? '◒' : place.tags.includes('еда') ? '◇' : place.tags.includes('море') ? '≈' : place.tags.includes('шопинг') ? '▣' : place.tags.includes('транспорт') ? '➜' : '⌁'
  const isApple = /iPhone|iPad|Macintosh/i.test(navigator.userAgent)
  const systemMap = isApple
    ? `https://maps.apple.com/?ll=${place.lat},${place.lon}&q=${encodeURIComponent(place.name)}`
    : `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`
  const amap = `https://uri.amap.com/search?keyword=${encodeURIComponent(place.zh || place.name)}&city=${encodeURIComponent('三亚')}&src=WayPilot&callnative=1`
  return (
    <article className="place" data-place-id={place.id}>
      {photo
        ? <img className="place-photo" src={photo} alt={place.name} loading="lazy"/>
        : <div className={`place-photo-placeholder ${place.tags[0] || 'default'}`}><b>{coverEmoji}</b><span>{place.zh || place.name}</span><small>{place.tags.includes('бар') || place.tags.includes('еда') ? 'Нужно фото фасада' : 'Фото места готовится'}</small></div>}
      <div className="place-top"><span className="category">{place.cat}</span><button className={`favorite ${favorite ? 'active' : ''}`} onClick={() => onToggleFavorite(place.id)} aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}><Star size={21} fill={favorite ? 'currentColor' : 'none'}/></button></div>
      <h3>{place.name}</h3><p className="chinese">{place.zh}</p><p className="verdict">{place.verdict}</p>
      {open && <div className="place-details"><InfoRow label="Когда" text={place.when}/><InfoRow label="Зачем" text={place.role}/><p>{place.note}</p><code>{place.lat}, {place.lon}</code></div>}
      <button className="details-button" onClick={() => setOpen(!open)}>{open ? 'Свернуть' : 'Подробнее'} {open ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}</button>
      <div className="place-actions">
        <button onClick={() => setShowTaxi(true)}><MapPin size={18}/>Таксисту</button>
        <a href={amap} target="_blank" rel="noreferrer"><Map size={18}/>Amap</a>
        <a href={systemMap} target="_blank" rel="noreferrer"><MapPin size={18}/>{isApple ? 'Apple' : 'Google'}</a>
      </div>
      {showTaxi && <TaxiDisplay place={place} onClose={() => setShowTaxi(false)} onCopy={onCopy}/>}
    </article>
  )
}

function InfoRow({ label, text }: { label: string; text: string }) {
  return <div className="info-row"><strong>{label}</strong><span>{text}</span></div>
}
