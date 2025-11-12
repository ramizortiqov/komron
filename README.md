# TM LIMITED - Premium E-Commerce Platform

Премиальный интернет-магазин бренда одежды класса люкс в стиле "Old Money".

## 🎯 Технологический стек

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **SSL**: Let's Encrypt

## 📦 Интеграции

- **Платежи**: ЮКасса (YooKassa)
- **Доставка**: СДЭК, Почта РФ
- **Аналитика**: Яндекс.Метрика, Google Analytics
- **Email**: Nodemailer

## 🚀 Быстрый старт

### Предварительные требования

- Node.js >= 18.x
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Установка

1. **Клонирование репозитория**
```bash
git clone https://github.com/your-username/tm-limited.git
cd tm-limited
```

2. **Настройка переменных окружения**
```bash
# Корневой .env
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. **Запуск через Docker Compose**
```bash
docker-compose up -d
```

4. **Миграция базы данных**
```bash
cd backend
npm run prisma:migrate
npm run prisma:seed
```

5. **Доступ к приложению**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Admin Panel: http://localhost:3000/admin

### Разработка без Docker

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📁 Структура проекта

```
tm-limited/
├── backend/                  # NestJS Backend API
│   ├── src/
│   │   ├── modules/         # Модули приложения
│   │   │   ├── auth/       # Авторизация и аутентификация
│   │   │   ├── users/      # Управление пользователями
│   │   │   ├── products/   # Управление товарами
│   │   │   ├── categories/ # Категории товаров
│   │   │   ├── orders/     # Заказы
│   │   │   ├── payments/   # Интеграция с ЮКасса
│   │   │   ├── delivery/   # СДЭК и Почта РФ
│   │   │   └── email/      # Email уведомления
│   │   ├── common/         # Общие утилиты
│   │   ├── config/         # Конфигурация
│   │   └── database/       # Prisma схемы
│   ├── prisma/
│   │   ├── schema.prisma   # Схема БД
│   │   └── seeds/          # Данные для заполнения
│   └── test/               # Тесты
│
├── frontend/                # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   │   ├── (shop)/     # Публичная часть
│   │   │   └── admin/      # Админ-панель
│   │   ├── components/     # React компоненты
│   │   │   ├── ui/         # UI компоненты
│   │   │   ├── shop/       # Компоненты магазина
│   │   │   └── admin/      # Компоненты админки
│   │   ├── lib/            # Утилиты и хелперы
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand store
│   │   ├── types/          # TypeScript типы
│   │   └── styles/         # Глобальные стили
│   └── public/             # Статические файлы
│
├── docker-compose.yml       # Docker Compose конфигурация
├── .env.example            # Пример переменных окружения
└── README.md               # Документация
```

## 🔑 Конфигурация

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tm_limited"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# YooKassa
YOOKASSA_SHOP_ID=your-shop-id
YOOKASSA_SECRET_KEY=your-secret-key

# CDEK
CDEK_CLIENT_ID=your-client-id
CDEK_CLIENT_SECRET=your-client-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_YANDEX_METRIKA_ID=your-metrika-id
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

## 👤 Данные по умолчанию

После запуска и seed данных:

**Администратор:**
- Email: admin@tm-limited.ru
- Пароль: Admin123!

**Менеджер:**
- Email: manager@tm-limited.ru
- Пароль: Manager123!

## 📝 API Документация

Swagger документация доступна после запуска: http://localhost:4000/api/docs

### Основные эндпоинты:

**Публичные:**
- `GET /api/products` - Список товаров
- `GET /api/products/:id` - Детали товара
- `GET /api/categories` - Категории
- `POST /api/orders` - Создание заказа
- `GET /api/orders/:id/track` - Отслеживание заказа
- `POST /api/payments/webhook` - Webhook ЮКасса

**Админ (требуется авторизация):**
- `POST /api/auth/login` - Вход
- `GET /api/admin/dashboard` - Статистика
- `POST /api/admin/products` - Создание товара
- `PATCH /api/admin/orders/:id` - Обновление заказа

## 🎨 Дизайн система

### Цветовая палитра
- **Primary**: #2C2C2C (темно-серый)
- **Secondary**: #4A4A4A (глубокий серый)
- **Background**: #FFFFFF (белый), #F8F6F1 (кремовый)
- **Text**: #000000 (черный), #2C2C2C (темно-серый)

### Шрифты
- **Headings**: Playfair Display
- **Body**: Inter

### Компоненты
- Минималистичный дизайн в стиле "Old Money"
- Большие качественные изображения
- Плавные анимации
- Адаптивный дизайн (Mobile-First)

## 🧪 Тестирование

### Backend
```bash
cd backend

# Unit тесты
npm run test

# E2E тесты
npm run test:e2e

# Покрытие
npm run test:cov
```

### Frontend
```bash
cd frontend

# Запуск тестов
npm run test

# E2E тесты (Playwright)
npm run test:e2e
```

## 📈 Производительность

Целевые показатели:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **PageSpeed Score**: 90+

### Оптимизации:
- SSR/SSG для критичных страниц
- Оптимизация изображений (WebP, AVIF)
- Code splitting и lazy loading
- Redis кеширование
- CDN для статики

## 🔒 Безопасность

- **SSL/TLS**: HTTPS на всех страницах
- **CORS**: Настройка origin
- **Rate Limiting**: Защита от DDoS
- **SQL Injection**: Prisma ORM
- **XSS**: Content Security Policy
- **CSRF**: CSRF токены
- **Passwords**: bcrypt hashing

## 🚢 Деплой

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Документация

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Admin Guide](./docs/ADMIN_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Поддержка

Для вопросов и поддержки:
- Email: support@tm-limited.ru
- Telegram: @tmlimited

## 📄 Лицензия

Proprietary - © 2025 TM LIMITED. Все права защищены.
