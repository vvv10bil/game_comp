# CS2 Companion

Веб-додаток-компаньон для гравців **Counter-Strike 2**: відстеження улюблених
лоудаутів (зброя + скіни), особиста статистика матчів, каталог зброї.

Навчальний проєкт для курсу JavaScript. Стек: **React (Vite) + Node.js (Express)
+ Prisma + SQLite**, автентифікація через **JWT + bcrypt**.

## Структура репозиторію

```
.
├── .devcontainer/           # Конфігурація GitHub Codespaces
├── client/                  # React-фронтенд (Vite)
│   ├── src/
│   │   ├── api/             # axios-клієнт до бекенду
│   │   ├── components/      # перевикористовувані компоненти UI
│   │   ├── context/         # React-контексти (AuthContext)
│   │   ├── pages/           # сторінки маршрутів
│   │   └── styles/          # CSS
│   └── vite.config.js       # проксі /api → http://localhost:3000
├── server/                  # Node.js Express API
│   ├── prisma/              # Prisma schema, міграції
│   └── src/
│       ├── controllers/     # бізнес-логіка endpoint-ів
│       ├── middleware/      # auth-middleware (JWT)
│       ├── routes/          # описи маршрутів
│       └── index.js         # точка входу Express
├── docs/
│   └── PROJECT_REPORT.md    # звіт для викладача
└── package.json             # workspace-скрипти
```

## Швидкий старт у GitHub Codespaces

1. Натиснути **Code → Create codespace on `main`** на сторінці репозиторію.
2. Дочекатися автоматичного `npm install` (виконується через `postCreateCommand`).
3. Ініціалізувати БД та запустити обидва сервери:
   ```bash
   npm run db:init
   npm run dev
   ```
4. Codespaces автоматично перенаправить порти **5173** (фронтенд)
   та **3000** (бекенд). Відкрити URL порту `5173` у вкладці **Ports**.

## Локальний запуск

Передумови: Node.js ≥ 18.

```bash
# 1. Встановити залежності фронта і бекенда
npm install

# 2. Створити .env у server/ (скопіювати з .env.example) і згенерувати БД
cp server/.env.example server/.env
npm run db:init

# 3. Запустити в режимі розробки
npm run dev          # одночасно client (5173) і server (3000)
```

Окремо:

```bash
npm run dev:server   # тільки бекенд
npm run dev:client   # тільки фронтенд
```

## Команди

| Команда             | Що робить                                        |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Запуск фронта і бекенда паралельно                |
| `npm run db:init`   | `prisma migrate dev` — створює SQLite-файл і таблиці |
| `npm run db:studio` | Відкриває Prisma Studio (GUI до БД)              |
| `npm run build`     | Прод-збірка фронтенду                            |

## Документація

Повний опис того, що реалізовано, які бібліотеки використано та обрану
архітектуру — у файлі [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md).
