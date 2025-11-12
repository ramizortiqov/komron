# TM LIMITED - Инструкция по развертыванию

## Быстрый старт с Docker Compose

### 1. Подготовка

Клонируйте репозиторий и настройте переменные окружения:

```bash
git clone https://github.com/your-username/tm-limited.git
cd tm-limited

# Скопируйте и отредактируйте env файлы
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 2. Настройка переменных окружения

Отредактируйте файлы `.env`, укажите:

**Обязательные:**
- `DATABASE_URL` - строка подключения к PostgreSQL
- `JWT_SECRET` - секретный ключ для JWT
- `YOOKASSA_SHOP_ID` и `YOOKASSA_SECRET_KEY` - данные ЮКасса
- `CDEK_CLIENT_ID` и `CDEK_CLIENT_SECRET` - данные СДЭК
- `SMTP_*` - настройки SMTP для email

### 3. Запуск

```bash
# Запустить все сервисы
docker-compose up -d

# Применить миграции базы данных
docker-compose exec backend npm run prisma:migrate

# Заполнить начальными данными
docker-compose exec backend npm run prisma:seed
```

### 4. Доступ к приложению

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api/docs

**Учетные данные администратора:**
- Email: admin@tm-limited.ru
- Пароль: Admin123!

## Production развертывание

### Требования

- VPS/Cloud сервер (минимум 2GB RAM, 2 CPU)
- Ubuntu 20.04+ / Debian 11+
- Docker & Docker Compose
- Доменное имя с настроенным DNS
- SSL сертификат (Let's Encrypt)

### Шаги развертывания

#### 1. Настройка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo apt install docker-compose -y

# Создание пользователя для приложения
sudo useradd -m -s /bin/bash tmltd
sudo usermod -aG docker tmltd
```

#### 2. Клонирование и настройка

```bash
su - tmltd
git clone https://github.com/your-username/tm-limited.git
cd tm-limited

# Настройка production переменных
nano .env
nano backend/.env
nano frontend/.env
```

**Важно для production:**
- Установите `NODE_ENV=production`
- Используйте сильные пароли для БД
- Измените `JWT_SECRET` на случайную строку
- Настройте реальные API ключи (ЮКасса, СДЭК)

#### 3. Настройка Nginx (опционально)

Если используете Nginx как reverse proxy:

```nginx
server {
    listen 80;
    server_name tm-limited.ru www.tm-limited.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:4000/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

#### 4. SSL сертификат (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tm-limited.ru -d www.tm-limited.ru
```

#### 5. Запуск production

```bash
cd ~/tm-limited

# Сборка и запуск
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Миграции
docker-compose exec backend npm run prisma:migrate:prod

# Seed данных
docker-compose exec backend npm run prisma:seed
```

#### 6. Настройка автозапуска

```bash
# Создать systemd service
sudo nano /etc/systemd/system/tm-limited.service
```

```ini
[Unit]
Description=TM LIMITED E-Commerce
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/tmltd/tm-limited
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
User=tmltd

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable tm-limited
sudo systemctl start tm-limited
```

## Мониторинг и логи

```bash
# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f frontend
docker-compose logs -f backend

# Статус сервисов
docker-compose ps

# Использование ресурсов
docker stats
```

## Резервное копирование

### Автоматический бэкап базы данных

```bash
# Создать скрипт бэкапа
nano ~/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/tmltd/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker-compose exec -T postgres pg_dump -U tm_limited tm_limited | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
```

```bash
chmod +x ~/backup.sh

# Добавить в cron (ежедневно в 3:00 AM)
crontab -e
# 0 3 * * * /home/tmltd/backup.sh
```

## Обновление приложения

```bash
cd ~/tm-limited

# Остановить сервисы
docker-compose down

# Получить обновления
git pull origin main

# Пересобрать и запустить
docker-compose up -d --build

# Применить миграции
docker-compose exec backend npm run prisma:migrate:prod

# Проверить статус
docker-compose ps
```

## Troubleshooting

### Backend не запускается

```bash
# Проверить логи
docker-compose logs backend

# Проверить подключение к БД
docker-compose exec backend npm run prisma:studio
```

### Frontend не собирается

```bash
# Очистить кеш
docker-compose exec frontend rm -rf .next node_modules
docker-compose exec frontend npm install
docker-compose restart frontend
```

### База данных не доступна

```bash
# Проверить статус PostgreSQL
docker-compose exec postgres pg_isready

# Перезапустить PostgreSQL
docker-compose restart postgres
```

## Производительность

### Рекомендации для высоких нагрузок:

1. **Настройка PostgreSQL** - увеличить `max_connections`, настроить `shared_buffers`
2. **Redis кеширование** - использовать для кеша товаров и категорий
3. **CDN** - использовать для статических файлов и изображений
4. **Horizontal scaling** - запустить несколько instance backend с load balancer
5. **Database optimization** - добавить индексы для часто запрашиваемых полей

## Безопасность

- Регулярно обновляйте зависимости: `npm audit fix`
- Используйте firewall (ufw) для ограничения доступа
- Настройте fail2ban для защиты от brute-force атак
- Регулярно проверяйте логи на подозрительную активность
- Используйте strong passwords и 2FA где возможно

## Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs`
2. Проверьте статус сервисов: `docker-compose ps`
3. Обратитесь к документации API: http://your-domain/api/docs
4. Создайте issue на GitHub

---

**© 2025 TM LIMITED. Все права защищены.**
