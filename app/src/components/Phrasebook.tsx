import { useEffect, useMemo, useState } from 'react'
import { Copy, Maximize2, Search, Star, X } from 'lucide-react'
import { phraseCategoryLabels, phrases } from '../data/phrases'
import type { Phrase, PhraseCategory } from '../types'
import { AudioButton } from './AudioButton'
import { PhraseDisplay } from './PhraseDisplay'

interface Props {
  favoriteIds: string[]
  requestedPhraseId: string | null
  onRequestHandled: () => void
  onToggleFavorite: (id: string) => void
  onCopy: (text: string) => void
}

export function Phrasebook({ favoriteIds, requestedPhraseId, onRequestHandled, onToggleFavorite, onCopy }: Props) {
  const [category, setCategory] = useState<PhraseCategory | 'all'>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Phrase | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return phrases.filter(phrase => {
      const categoryMatch = category === 'all' || phrase.category === category
      const textMatch = `${phrase.ru} ${phrase.zh} ${phrase.pinyin}`.toLowerCase().includes(normalized)
      return categoryMatch && textMatch
    })
  }, [category, query])

  useEffect(() => {
    if (!requestedPhraseId) return
    const phrase = phrases.find(item => item.id === requestedPhraseId)
    if (phrase) {
      setCategory(phrase.category)
      setQuery('')
      setSelected(phrase)
    }
    onRequestHandled()
  }, [onRequestHandled, requestedPhraseId])

  return (
    <section>
      <p className="lead">Нажмите на китайский текст, чтобы открыть крупный режим. Аудио использует локальный файл или установленный китайский голос устройства.</p>
      <div className="search-sticky phrase-search">
        <div className="search-box">
          <Search size={19}/>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Найти фразу…"/>
          {query && <button onClick={() => setQuery('')} aria-label="Очистить"><X size={19}/></button>}
        </div>
        <div className="chips">
          <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>Все</button>
          {(Object.entries(phraseCategoryLabels) as Array<[PhraseCategory, string]>).map(([id, label]) => (
            <button key={id} className={category === id ? 'active' : ''} onClick={() => setCategory(id)}>{label}</button>
          ))}
        </div>
        <span className="count">{filtered.length} фраз</span>
      </div>

      <div className="phrase-grid">
        {filtered.map(phrase => {
          const favorite = favoriteIds.includes(phrase.id)
          return (
            <article className="phrase-card" key={phrase.id}>
              <div className="phrase-card-top">
                <span>{phraseCategoryLabels[phrase.category]}</span>
                <button className={favorite ? 'phrase-favorite selected' : 'phrase-favorite'} onClick={() => onToggleFavorite(phrase.id)} aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
                  <Star size={20} fill={favorite ? 'currentColor' : 'none'}/>
                </button>
              </div>
              <button className="phrase-main" onClick={() => setSelected(phrase)}>
                <strong lang="zh-CN">{phrase.zh}</strong>
                <span>{phrase.pinyin}</span>
                <small>{phrase.ru}</small>
                <Maximize2 size={17}/>
              </button>
              <div className="phrase-actions">
                <AudioButton phrase={phrase}/>
                <button onClick={() => onCopy(phrase.zh)}><Copy size={18}/>Копировать</button>
              </div>
            </article>
          )
        })}
      </div>

      {selected && (
        <PhraseDisplay
          phrase={selected}
          favorite={favoriteIds.includes(selected.id)}
          onClose={() => setSelected(null)}
          onCopy={onCopy}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  )
}
