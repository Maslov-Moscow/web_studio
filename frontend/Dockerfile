# Этап 1: Сборка
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем package-файлы и .npmrc
COPY package*.json .npmrc ./

# Устанавливаем все зависимости с retry логикой
RUN npm install --legacy-peer-deps || \
    (sleep 5 && npm install --legacy-peer-deps) || \
    (sleep 10 && npm install --legacy-peer-deps)

# Копируем код
COPY . .

# Создаем директорию public если не существует
RUN mkdir -p public

# Принимаем build arguments для Next.js переменных окружения
ARG NEXT_PUBLIC_USE_MOCK_API
ARG NEXT_PUBLIC_API_URL

# Передаем их как environment variables для сборки
ENV NEXT_PUBLIC_USE_MOCK_API=$NEXT_PUBLIC_USE_MOCK_API
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Сборка Next.js (переменные NEXT_PUBLIC_* будут встроены в код)
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