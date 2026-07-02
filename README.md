# WayPilot

Мобильный офлайн-путеводитель по Санье: план поездки, 51 место, разговорник,
китайские адреса, избранное, бюджет, чек-лист и аварийный экран.

## Приложение

React + TypeScript + Vite PWA находится в [`app/`](app/).

```bash
cd app
pnpm install
pnpm dev
```

Проверка production-сборки:

```bash
pnpm typecheck
pnpm build
pnpm preview
```

## Офлайн

Service Worker кэширует интерфейс, GeoJSON и локальные аудиофайлы. После
первого полного открытия приложение можно установить на домашний экран и
использовать без сети.

## Аудио разговорника

MP3-заглушки находятся в
[`app/public/assets/audio/phrases/`](app/public/assets/audio/phrases/).
Заменяйте их настоящими дорожками без изменения имён, затем запустите сборку.

## Публикация

Workflow `.github/workflows/deploy-pages.yml` проверяет TypeScript, собирает
PWA и публикует `app/dist` на GitHub Pages при push в `main`.
