import { Copy, MapPin, X } from 'lucide-react'
import type { Place } from '../types'

export function TaxiDisplay({ place, onClose, onCopy }: { place: Place; onClose: () => void; onCopy: (text: string) => void }) {
  const text = `请送我去这里：\n${place.zh}\n${place.name}\n坐标：${place.lat}, ${place.lon}`
  return (
    <div className="taxi-display-backdrop" role="dialog" aria-modal="true" aria-label="Показать таксисту">
      <div className="taxi-display">
        <button className="taxi-display-close" onClick={onClose} aria-label="Закрыть"><X/></button>
        <span>ПОКАЖИТЕ ВОДИТЕЛЮ</span>
        <h2 lang="zh-CN">{place.zh}</h2>
        <p>{place.name}</p>
        <small><MapPin size={16}/>{place.lat}, {place.lon}</small>
        <button className="taxi-copy" onClick={() => onCopy(text)}><Copy size={19}/>Копировать адрес</button>
      </div>
    </div>
  )
}
