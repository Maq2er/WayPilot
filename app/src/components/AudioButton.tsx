import { useEffect, useRef, useState } from 'react'
import { CircleOff, Pause, Volume2 } from 'lucide-react'
import type { Phrase } from '../types'

interface Props {
  phrase: Phrase
  large?: boolean
}

type AudioState = 'idle' | 'playing' | 'unavailable'

export function AudioButton({ phrase, large = false }: Props) {
  const [state, setState] = useState<AudioState>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => () => {
    audioRef.current?.pause()
    window.speechSynthesis?.cancel()
  }, [])

  const speakWithSystemVoice = () => {
    if (!('speechSynthesis' in window)) {
      setState('unavailable')
      return
    }
    const voices = window.speechSynthesis.getVoices()
    const chineseVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('zh'))
    if (!chineseVoice) {
      setState('unavailable')
      return
    }
    const utterance = new SpeechSynthesisUtterance(phrase.zh)
    utterance.lang = chineseVoice.lang
    utterance.voice = chineseVoice
    utterance.rate = 0.82
    utterance.onstart = () => setState('playing')
    utterance.onend = () => setState('idle')
    utterance.onerror = () => setState('unavailable')
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const play = () => {
    if (state === 'playing') {
      audioRef.current?.pause()
      window.speechSynthesis?.cancel()
      setState('idle')
      return
    }

    if (!phrase.audio) {
      speakWithSystemVoice()
      return
    }

    const source = `${import.meta.env.BASE_URL}${phrase.audio.replace(/^\//, '')}`
    const audio = new Audio(source)
    audioRef.current?.pause()
    audioRef.current = audio
    audio.onplay = () => setState('playing')
    audio.onended = () => setState('idle')
    audio.onerror = () => speakWithSystemVoice()
    void audio.play().catch(speakWithSystemVoice)
  }

  const unavailable = state === 'unavailable'
  return (
    <button
      type="button"
      className={`audio-button ${large ? 'large' : ''} ${unavailable ? 'unavailable' : ''}`}
      onClick={play}
      disabled={unavailable}
      title={unavailable ? 'Нет локального файла и китайского системного голоса' : undefined}
    >
      {unavailable ? <CircleOff size={19}/> : state === 'playing' ? <Pause size={19}/> : <Volume2 size={19}/>}
      <span>{unavailable ? 'Аудио недоступно' : state === 'playing' ? 'Стоп' : 'Проиграть'}</span>
    </button>
  )
}
