import { useEffect, useRef } from 'react'
import { Copy, Star, X } from 'lucide-react'
import type { Phrase } from '../types'
import { AudioButton } from './AudioButton'

interface Props {
  phrase: Phrase
  favorite: boolean
  onClose: () => void
  onCopy: (text: string) => void
  onToggleFavorite: (id: string) => void
}

export function PhraseDisplay({ phrase, favorite, onClose, onCopy, onToggleFavorite }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = oldOverflow
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [onClose])

  return (
    <div className="phrase-display-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="phrase-display" role="dialog" aria-modal="true" aria-labelledby="phrase-display-title">
        <button ref={closeRef} className="phrase-display-close" onClick={onClose} aria-label="Закрыть"><X/></button>
        <span className="phrase-display-label">Покажите экран собеседнику</span>
        <h2 id="phrase-display-title" lang="zh-CN">{phrase.zh}</h2>
        <p className="phrase-display-pinyin">{phrase.pinyin}</p>
        <p className="phrase-display-translation">{phrase.ru}</p>
        <div className="phrase-display-actions">
          <AudioButton phrase={phrase} large/>
          <button onClick={() => onCopy(phrase.zh)}><Copy size={20}/>Копировать</button>
          <button className={favorite ? 'selected' : ''} onClick={() => onToggleFavorite(phrase.id)}>
            <Star size={20} fill={favorite ? 'currentColor' : 'none'}/>{favorite ? 'Сохранено' : 'В избранное'}
          </button>
        </div>
      </section>
    </div>
  )
}
