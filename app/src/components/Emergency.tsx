import { useState } from 'react'
import { AlertTriangle, Building2, Copy, LockKeyhole, Maximize2, Pencil, Phone, X } from 'lucide-react'
import { consularContacts, emergencyData } from '../data/emergency'
import { phrases } from '../data/phrases'
import type { Phrase, PrivateEmergencyProfile } from '../types'
import { PhraseDisplay } from './PhraseDisplay'
import { SectionTitle } from './SectionTitle'

interface Props {
  profile: PrivateEmergencyProfile
  onProfile: (profile: PrivateEmergencyProfile) => void
  favoritePhraseIds: string[]
  onToggleFavorite: (id: string) => void
  onCopy: (text: string) => void
}

export function Emergency({ profile, onProfile, favoritePhraseIds, onToggleFavorite, onCopy }: Props) {
  const [selected, setSelected] = useState<Phrase | null>(null)
  const [editing, setEditing] = useState(false)
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

      <SectionTitle title="Помощь гражданам РФ"/>
      <div className="consular-list">
        {consularContacts.map(contact => {
          const contactText = `${contact.title}\n${contact.addressZh}\n${contact.addressRu}\nОбычный телефон: ${contact.phone}\nЭкстренный телефон: ${contact.emergencyPhone}`
          return (
            <article className="consular-card" key={contact.id}>
              <div className="consular-head"><Building2/><div><strong>{contact.title}</strong><span>{contact.note}</span></div></div>
              <p lang="zh-CN">{contact.addressZh}</p>
              <small>{contact.addressRu}</small>
              <div className="consular-actions">
                <a href={`tel:${contact.emergencyPhone.replace(/\s/g, '')}`}><Phone size={18}/>Экстренный звонок</a>
                <button onClick={() => onCopy(contactText)}><Copy size={18}/>Копировать</button>
              </div>
              <a className="regular-phone" href={`tel:${contact.phone.replace(/\s/g, '')}`}>Обычный телефон: {contact.phone}</a>
            </article>
          )
        })}
      </div>
      <p className="consular-hint">Экстренный номер предназначен для угрозы жизни, задержания, утраты документов и других чрезвычайных ситуаций. Контакты сверены по данным МИД РФ 2 июля 2026 года.</p>

      <div className="private-card">
        <div className="private-card-head"><div><LockKeyhole/><span>Приватные данные</span><small>Только на этом устройстве</small></div><button onClick={() => setEditing(!editing)}>{editing ? <X/> : <Pencil/>}{editing ? 'Закрыть' : 'Заполнить'}</button></div>
        {editing ? (
          <div className="private-form">
            <PrivateInput label="Телефон отеля" value={profile.hotelPhone} onChange={hotelPhone => onProfile({...profile,hotelPhone})}/>
            <PrivateInput label="Номер бронирования" value={profile.bookingNumber} onChange={bookingNumber => onProfile({...profile,bookingNumber})}/>
            <PrivateInput label="Страховая компания" value={profile.insuranceCompany} onChange={insuranceCompany => onProfile({...profile,insuranceCompany})}/>
            <PrivateInput label="Номер полиса" value={profile.policyNumber} onChange={policyNumber => onProfile({...profile,policyNumber})}/>
            <PrivateInput label="Телефон ассистанса" value={profile.insurancePhone} onChange={insurancePhone => onProfile({...profile,insurancePhone})}/>
            <p>Сохраняется в localStorage и не отправляется на GitHub или сервер.</p>
          </div>
        ) : (
          <div className="private-summary">
            <Summary label="Телефон отеля" value={profile.hotelPhone}/>
            <Summary label="Бронирование" value={profile.bookingNumber}/>
            <Summary label="Страховка" value={profile.insuranceCompany}/>
            <Summary label="Номер полиса" value={profile.policyNumber}/>
            <Summary label="Ассистанс" value={profile.insurancePhone}/>
          </div>
        )}
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

function PrivateInput({ label, value, onChange }: { label:string; value:string; onChange:(value:string)=>void }) {
  return <label><span>{label}</span><input value={value} onChange={event => onChange(event.target.value)} autoComplete="off"/></label>
}

function Summary({ label, value }: { label:string; value:string }) {
  return <div><span>{label}</span>{value ? <strong>{value}</strong> : <em>Не заполнено</em>}</div>
}
