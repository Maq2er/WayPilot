import { useState } from 'react'
import { ChevronDown, ChevronUp, Coffee, MapPin, Moon, Sun } from 'lucide-react'
import { tripDays } from '../data/days'
import type { Place } from '../types'

const segmentIcons = { Утро:Sun, День:Coffee, Вечер:Moon }

export function Days({ locations, onOpenPlace }: { locations: Place[]; onOpenPlace: (id: string) => void }) {
  const [open, setOpen] = useState(0)
  return (
    <section>
      <p className="lead">Маршрут — ориентир, а не расписание. Плохую погоду не нужно побеждать героизмом.</p>
      <div className="day-list">
        {tripDays.map((day, index) => (
          <article className="day-card" key={day.id}>
            <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              <span className="date">{day.label}</span><span className="day-title">{day.title}</span>{open === index ? <ChevronUp/> : <ChevronDown/>}
            </button>
            {open === index && (
              <div className="day-body">
                {day.segments.map(segment => (
                  <div className="day-segment" key={segment.label}>
                    <strong>{(() => { const Icon = segmentIcons[segment.label as keyof typeof segmentIcons] ?? Sun; return <><Icon size={14}/>{segment.label}</> })()}</strong><span>{segment.summary}</span>
                    <div>{segment.placeIds.slice(0,3).map(id => {
                      const place = locations.find(item => item.id === id)
                      return place ? <button key={id} onClick={() => onOpenPlace(id)}><MapPin size={13}/>{place.name}</button> : null
                    })}</div>
                  </div>
                ))}
                <div className="day-fallback"><strong>Если не сложилось</strong><span>{day.fallback}</span></div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
