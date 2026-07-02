import { useState } from 'react'
import { ArrowLeftRight, Check, CircleDollarSign, Copy, ListChecks, MapPinned, Star, Upload, WalletCards, X } from 'lucide-react'
import { checklistItems } from '../data/checklist'
import { phrases } from '../data/phrases'
import type { Budget, Phrase, Place } from '../types'
import { AudioButton } from './AudioButton'
import { SectionTitle } from './SectionTitle'

interface Props {
  locations: Place[]
  favoritePlaceIds: string[]
  favoritePhraseIds: string[]
  recentPlaceIds: string[]
  recentPhraseIds: string[]
  onTogglePlace: (id: string) => void
  onTogglePhrase: (id: string) => void
  notes: string
  onNotes: (value: string) => void
  checks: string[]
  onChecks: (value: string[]) => void
  budget: Budget
  onBudget: (value: Budget) => void
  onCopy: (text: string) => void
  onExport: () => void
  onImport: (file: File) => void
  storageAvailable: boolean
}

export function Mine(props: Props) {
  const rate = Number(props.budget.rate) || 13
  const [cny, setCny] = useState('100')
  const [rub, setRub] = useState(() => String(100 * rate))
  const savedPlaces = props.locations.filter(place => props.favoritePlaceIds.includes(place.id))
  const savedPhrases = phrases.filter(phrase => props.favoritePhraseIds.includes(phrase.id))
  const recentPlaces = props.recentPlaceIds.map(id => props.locations.find(place => place.id === id)).filter((place): place is Place => Boolean(place))
  const recentPhraseItems = props.recentPhraseIds.map(id => phrases.find(phrase => phrase.id === id)).filter((phrase): phrase is Phrase => Boolean(phrase))
  const expenseKeys: Array<keyof Budget> = ['transport','food','bars','activity','spa','shop','other']
  const total = expenseKeys.reduce((sum, key) => sum + (Number(props.budget[key]) || 0), 0)
  const left = (Number(props.budget.cash) || 0) - total
  const changeCny = (value: string) => {
    setCny(value)
    setRub(value === '' ? '' : String(Math.round((Number(value) || 0) * rate * 100) / 100))
  }
  const changeRub = (value: string) => {
    setRub(value)
    setCny(value === '' ? '' : String(Math.round(((Number(value) || 0) / rate) * 100) / 100))
  }
  const setMoney = (key: keyof Budget, value: string) => props.onBudget({ ...props.budget, [key]: value })
  const toggleCheck = (id: string) => props.onChecks(props.checks.includes(id) ? props.checks.filter(item => item !== id) : [...props.checks, id])

  return (
    <section>
      {!props.storageAvailable && <div className="storage-warning">Хранилище браузера недоступно. Экспортируйте данные перед закрытием приложения.</div>}

      <div className="mine-overview">
        <div><MapPinned/><span>Сохранено</span><strong>{savedPlaces.length + savedPhrases.length}</strong></div>
        <div><ListChecks/><span>Готово</span><strong>{props.checks.length}/{checklistItems.length}</strong></div>
        <div><WalletCards/><span>Потрачено</span><strong>{total.toFixed(0)} ¥</strong></div>
      </div>

      {(recentPlaces.length > 0 || recentPhraseItems.length > 0) && <>
        <SectionTitle title="Недавно открывали"/>
        <div className="recent-strip">
          {recentPlaces.map(place => <div key={place.id}><MapPinned/><span>{place.name}</span></div>)}
          {recentPhraseItems.map(phrase => <div key={phrase.id}><strong lang="zh-CN">{phrase.zh}</strong><span>{phrase.ru}</span></div>)}
        </div>
      </>}

      <SectionTitle title={`Избранные места · ${savedPlaces.length}`}/>
      {savedPlaces.length ? <div className="saved-list">{savedPlaces.map(place => <div className="saved-row" key={place.id}><div><strong>{place.name}</strong><span>{place.zh}</span></div><button onClick={() => props.onTogglePlace(place.id)} aria-label="Удалить"><X size={18}/></button></div>)}</div> : <Empty text="Сохраняйте места звездой — они появятся здесь."/>}

      <SectionTitle title={`Избранные фразы · ${savedPhrases.length}`}/>
      {savedPhrases.length ? (
        <div className="saved-phrases">
          {savedPhrases.map(phrase => (
            <article key={phrase.id}>
              <button className="saved-phrase-copy" onClick={() => props.onCopy(phrase.zh)}>
                <strong>{phrase.zh}</strong><span>{phrase.ru}</span><Copy size={18}/>
              </button>
              <AudioButton phrase={phrase}/>
              <button className="remove-saved" onClick={() => props.onTogglePhrase(phrase.id)} aria-label="Удалить"><X size={18}/></button>
            </article>
          ))}
        </div>
      ) : <Empty text="Добавляйте нужные фразы из разговорника."/>}

      <SectionTitle title="Чек-лист перед выходом"/>
      <div className="check-list">{checklistItems.map(item => <label className={props.checks.includes(item.id) ? 'done' : ''} key={item.id}><input type="checkbox" checked={props.checks.includes(item.id)} onChange={() => toggleCheck(item.id)}/><span className="fake-check">{props.checks.includes(item.id) && <Check size={15}/>}</span>{item.label}</label>)}</div>

      <SectionTitle title="Заметки"/>
      <textarea className="notes" value={props.notes} onChange={event => props.onNotes(event.target.value)} placeholder="Номер комнаты, идеи, покупки, полезные адреса…"/>

      <SectionTitle title="Бюджет"/>
      <div className="budget-summary"><CircleDollarSign/><div><span>Потрачено</span><strong>{total.toFixed(0)} CNY · {Math.round(total * rate).toLocaleString('ru-RU')} ₽</strong><small className={left < 0 ? 'negative' : ''}>Остаток наличных: {left.toFixed(0)} CNY</small></div></div>
      <div className="money-grid">
        <Money label="Наличка" value={props.budget.cash} onChange={value => setMoney('cash', value)}/>
        <Money label="Курс ₽/CNY" value={props.budget.rate} onChange={value => setMoney('rate', value)}/>
        <Money label="Транспорт" value={props.budget.transport} onChange={value => setMoney('transport', value)}/>
        <Money label="Еда" value={props.budget.food} onChange={value => setMoney('food', value)}/>
        <Money label="Бары" value={props.budget.bars} onChange={value => setMoney('bars', value)}/>
        <Money label="Активности" value={props.budget.activity} onChange={value => setMoney('activity', value)}/>
        <Money label="Спа" value={props.budget.spa} onChange={value => setMoney('spa', value)}/>
        <Money label="Шопинг" value={props.budget.shop} onChange={value => setMoney('shop', value)}/>
        <Money label="Прочее" value={props.budget.other} onChange={value => setMoney('other', value)}/>
      </div>

      <SectionTitle title="Конвертер валют"/>
      <div className="currency-converter">
        <label><span>Юани</span><div><input type="number" inputMode="decimal" value={cny} onChange={event => changeCny(event.target.value)}/><b>¥</b></div></label>
        <ArrowLeftRight/>
        <label><span>Рубли</span><div><input type="number" inputMode="decimal" value={rub} placeholder={String(100 * rate)} onChange={event => changeRub(event.target.value)}/><b>₽</b></div></label>
      </div>
      <p className="converter-rate">Используется ваш курс: 1 CNY = {rate} ₽</p>

      <SectionTitle title="Готовность к офлайну"/>
      <div className="offline-readiness">
        <span className={props.storageAvailable ? 'ready' : 'warn'}>{props.storageAvailable ? '✓' : '!'} Данные сохраняются</span>
        <span className="ready">✓ {phrases.length} фраз доступны</span>
        <span className={navigator.onLine ? 'ready' : 'ready'}>✓ Основные данные в приложении</span>
      </div>

      <SectionTitle title="Резервная копия"/>
      <div className="backup-actions">
        <button onClick={props.onExport}><Upload size={18}/>Экспорт</button>
        <label><Upload size={18}/>Импорт<input type="file" accept=".json,application/json" onChange={event => event.target.files?.[0] && props.onImport(event.target.files[0])}/></label>
      </div>
    </section>
  )
}

function Money({ label, value, onChange }: { label: string; value: number | string; onChange: (value: string) => void }) {
  return <label className="money"><span>{label}</span><input type="number" inputMode="decimal" value={value} onChange={event => onChange(event.target.value)}/></label>
}

function Empty({ text }: { text: string }) {
  return <div className="empty"><Star/><p>{text}</p></div>
}
