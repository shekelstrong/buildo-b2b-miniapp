# buildo-b2b-miniapp

> B2B личный кабинет Buildo — Telegram Mini App для владельцев бизнеса.

## Стек

- **React 19** + Vite 6 + TypeScript
- **Tailwind CSS 3** (iOS 27 Liquid Glass стиль)
- **Telegram WebApp SDK** (initData, theme, native buttons)
- **Lucide React** (иконки)
- **Без бэкенда** — пока mock-данные, потом подключим к FastAPI

## Структура

```
buildo-b2b-miniapp/
├── src/
│   ├── App.tsx              # Главный layout + 3 таба
│   ├── main.tsx             # Entry point
│   ├── styles.css           # Tailwind + Liquid Glass
│   ├── lib/
│   │   └── telegram.ts      # WebApp integration
│   └── components/
│       ├── Dashboard.tsx    # Главный экран: тариф, метрики, активность
│       ├── Audit.tsx        # 7-шаговая анкета (квалификация B2B лида)
│       └── Settings.tsx     # Профиль, подписка, безопасность
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Что внутри

### 1. Dashboard (главный экран)

- Текущий тариф + дней до конца
- 4 метрики: диалоги (с прогресс-баром), часы/мес, экономия в ₽, ошибки
- Лента активности (4 последних события)
- CTA: подключить новый канал (VK, WhatsApp, Instagram*)

### 2. Audit (квалификация)

- 7-шаговая анкета для B2B-клиента
- Синхронизирована со сценарием в `bot/handlers/b2b.py` (@nemo_buildobot)
- После отправки → создаётся лид в `b2b_leads` + уведомление админу

### 3. Settings (профиль)

- Карточка пользователя (имя, Telegram ID)
- Подписка: тариф, дата след. платежа, способ оплаты
- Уведомления (toggle'ы)
- Безопасность (2FA, серверы)
- Поддержка (чат, документы, политика)

## Разработка

```bash
npm install
npm run dev      # localhost:5173
npm run build    # dist/
```

## Deploy

Пока не настроен. Планируется Layero (через GitHub).

## TODO

- [ ] Подключить к FastAPI бэкенду (заменить mock-данные)
- [ ] Supabase для хранения истории активности
- [ ] Real-time обновления через WebSocket
- [ ] Push-уведомления через Telegram Bot API
- [ ] White-label режим (для Корпоративного тарифа)
- [ ] Аналитика графиков (recharts/visx)
