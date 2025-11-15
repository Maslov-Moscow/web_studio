# Этап 1: Сборка
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем package-файлы
COPY package*.json ./

# Устанавливаем все зависимости (нужны dev-зависимости для сборки)
RUN npm install

# Копируем код
COPY . .

# Создаем директорию public если не существует
RUN mkdir -p public

# Сборка Next.js
RUN npm run build

# Этап 2: Продакшн
FROM node:20-alpine AS runner
WORKDIR /app

# Копируем standalone + статику
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]