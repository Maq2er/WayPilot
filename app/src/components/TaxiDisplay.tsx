import { Copy, MapPin, Share2, X } from 'lucide-react'
import type { Place } from '../types'

export function TaxiDisplay({ place, onClose, onCopy }: { place: Place; onClose: () => void; onCopy: (text: string) => void }) {
  const text = `请送我去这里：\n${place.zh}\n${place.name}\n坐标：${place.lat}, ${place.lon}`
  const share = () => {
    if (navigator.share) void navigator.share({ title:place.name, text })
    else void onCopy(text)
  }
  return (
    <div className="taxi-display-backdrop" role="dialog" aria-modal="true" aria-label="Показать таксисту">
      <div className="taxi-display">
        <button className="taxi-display-close" onClick={onClose} aria-label="Закрыть"><X/></button>
        <span>ПОКАЖИТЕ ВОДИТЕЛЮ</span>
        <h2 lang="zh-CN">{place.zh}</h2>
        <p>{place.name}</p>
        <small><MapPin size={16}/>{place.lat}, {place.lon}</small>
        <div className="taxi-display-actions">
          <button className="taxi-copy" onClick={() => onCopy(text)}><Copy size={19}/>Копировать</button>
          <button className="taxi-share" onClick={share}><Share2 size={19}/>Поделиться</button>
        </div>
      </div>
    </div>
  )
}
