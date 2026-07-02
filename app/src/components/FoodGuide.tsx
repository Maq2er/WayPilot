import { Beer, ChevronDown, ChevronUp, Soup } from 'lucide-react'
import { useState } from 'react'
import { drinkGuide, mustTry, venueGuides } from '../data/guide'
import { SectionTitle } from './SectionTitle'

export function FoodGuide({ mode }: { mode: 'food' | 'bars' }) {
  const [open, setOpen] = useState<string | null>(null)
  const items = mode === 'food' ? mustTry : drinkGuide
  return (
    <section className="guide-section">
      <div className="guide-hero">
        {mode === 'food' ? <Soup/> : <Beer/>}
        <div><span>{mode === 'food' ? 'ГАСТРО-ШПАРГАЛКА' : 'БАРНАЯ ШПАРГАЛКА'}</span><h2>{mode === 'food' ? 'Что попробовать на Хайнане' : 'Что пить и где'}</h2></div>
      </div>
      <div className="guide-grid">
        {items.map(item => <article key={item.title}><div><strong>{item.title}</strong>{item.zh && <span>{item.zh}</span>}</div><p>{item.description}</p><dl><div><dt>Где</dt><dd>{item.where}</dd></div><div><dt>Чек</dt><dd>{item.price}</dd></div></dl><small>{item.tip}</small></article>)}
      </div>
      <SectionTitle title={mode === 'food' ? 'Где и что заказывать' : 'Бары и лучшие заказы'}/>
      <div className="venue-list">
        {venueGuides.filter(venue => mode === 'bars' ? /Bar|Mandarin|Corona|Dolphin|FreeGen|Tikki|EDITION/i.test(venue.name) : true).map(venue => {
          const expanded = open === venue.name
          return <article key={venue.name}><button onClick={() => setOpen(expanded ? null : venue.name)}><div><strong>{venue.name}</strong><span>{venue.zh}</span></div>{expanded ? <ChevronUp/> : <ChevronDown/>}</button>{expanded && <div className="venue-details"><p><b>Когда:</b> {venue.when}</p><p><b>Брать:</b> {venue.order}</p><p><b>Осторожно:</b> {venue.caution}</p><strong>{venue.price}</strong></div>}</article>
        })}
      </div>
    </section>
  )
}
