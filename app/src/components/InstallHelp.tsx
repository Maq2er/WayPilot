import { Download, X } from 'lucide-react'

export function InstallHelp({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="install-title">
        <button className="modal-close" onClick={onClose} aria-label="Закрыть"><X/></button>
        <Download size={28}/><h2 id="install-title">Установка и офлайн</h2>
        <div className="install-step"><strong>iPhone / Safari</strong><span>Откройте сайт → «Поделиться» → «На экран Домой» → «Добавить».</span></div>
        <div className="install-step"><strong>Android / Chrome</strong><span>Меню браузера → «Установить приложение».</span></div>
        <p>После первого полного открытия интерфейс, места и локальные аудиофайлы сохранятся. Перед поездкой включите авиарежим и проверьте запуск с домашнего экрана.</p>
        <button className="primary" onClick={onClose}>Понятно</button>
      </div>
    </div>
  )
}
