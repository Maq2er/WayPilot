import { useState } from 'react'
import { AlertTriangle, Copy, Maximize2, Phone } from 'lucide-react'
import { emergencyData } from '../data/emergency'
import { phrases } from '../data/phrases'
import type { Phrase } from '../types'
import { PhraseDisplay } from './PhraseDisplay'
import { SectionTitle } from './SectionTitle'

interface Props {
  favoritePhraseIds: string[]
  onToggleFavorite: (id: string) => void
  onCopy: (text: string) => void
}

export function Emergency({ favoritePhraseIds, onToggleFavorite, onCopy }: Props) {
  const [selected, setSelected] = useState<Phrase | null>(null)
  const hotelText = `${emergencyData.hotel.nameZh}\n${emergencyData.hotel.addressZh}`
  const emergencyPhrases = emergencyData.phraseIds
    .map(id => phrases.find(phrase => phrase.id === id))
    .filter((phrase): phrase is Phrase => Boolean(phrase))

  return (
    <section>
      <article className="sos-card">
        <AlertTriangle size={30}/>
        <span>АДРЕС ОТЕЛЯ</span>
        <strong lang="zh-CN">{emergencyData.hotel.nameZh}<br/>{emergencyData.hotel.addressZh}</strong>
        <small>{emergencyData.hotel.nameEn}</small>
        <div className="sos-actions">
          <button onClick={() => onCopy(hotelText)}><Copy size={20}/>Копировать</button>
          <button onClick={() => setSelected({
            id:'hotel-display', category:'emergency', ru:'Адрес отеля',
            zh:`${emergencyData.hotel.nameZh}\n${emergencyData.hotel.addressZh}`,
            pinyin:emergencyData.hotel.nameEn, audio:null,
          })}><Maximize2 size={20}/>Показать крупно</button>
        </div>
      </article>

      <div className="emergency">
        {emergencyData.numbers.map(item => (
          <a key={item.number} href={`tel:${item.number}`}><strong>{item.number}</strong><span>{item.label}</span></a>
        ))}
      </div>

      <div className="emergency-details">
        <EmergencyField icon={<Phone/>} label="Телефон отеля" value={emergencyData.hotel.phone}/>
        <EmergencyField label="Номер бронирования" value={emergencyData.hotel.bookingNumber}/>
        <EmergencyField label="Страховая компания" value={emergencyData.insurance.company}/>
        <EmergencyField label="Телефон страховки" value={emergencyData.insurance.phone}/>
        <p className="data-hint">Добавьте отсутствующие данные в <code>src/data/emergency.ts</code> до поездки.</p>
      </div>

      <SectionTitle title="Экстренные фразы"/>
      <div className="emergency-phrases">
        {emergencyPhrases.map(phrase => (
          <button key={phrase.id} onClick={() => setSelected(phrase)}>
            <span>{phrase.ru}</span><strong lang="zh-CN">{phrase.zh}</strong><Maximize2 size={19}/>
          </button>
        ))}
      </div>
      <div className="warning-box"><AlertTriangle size={20}/><span>В экстренной ситуации попросите сотрудника отеля, ресторана или полиции позвонить за вас.</span></div>

      {selected && (
        <PhraseDisplay
          phrase={selected}
          favorite={favoritePhraseIds.includes(selected.id)}
          onClose={() => setSelected(null)}
          onCopy={onCopy}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  )
}

function EmergencyField({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string | null }) {
  return (
    <div className="emergency-field">
      {icon}<span>{label}</span>
      {value ? <strong>{value}</strong> : <em>Не заполнено</em>}
    </div>
  )
}
