# API Configuration & Lazy Loading

## Mock API Mode

Фронтенд поддерживает режим моков для разработки без бэкенда.

### Включение мок-режима

В файле `.env.local` (или `.env.local.example`):

```bash
# ВАЖНО: значение должно быть строго 'true' (маленькими буквами)
NEXT_PUBLIC_USE_MOCK_API=true

# URL API (по умолчанию '/api')
NEXT_PUBLIC_API_URL=/api
```

⚠️ **ВНИМАНИЕ**: Значение должно быть именно `true` (маленькими буквами), не `True` или `TRUE`!

### Проверка работы моков

Когда моки включены, в консоли браузера вы увидите сообщения:

```
[MOCK] Using mock data for /services/
[MOCK] Using mock data for /stats/
[MOCK] Using mock data for /process/
...
```

### Отключение моков (переход на реальное API)

```bash
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=/api
```

## Lazy Loading

Все секции страницы загружаются по мере скролла для оптимизации производительности.

### Как работает

- Используется **Intersection Observer API**
- Компоненты загружают данные только когда становятся видимыми
- **Параметры**:
  - `threshold: 0.1` - триггер при 10% видимости
  - `rootMargin: '100px'` - предзагрузка за 100px до появления
  - `triggerOnce: true` - загрузка только один раз

### Какие компоненты используют lazy loading

- ✅ **HeroSection** - загружается сразу (всегда видна)
- ✅ **Header** - загружается сразу (всегда видна)
- 🔄 **ServicesBlock** - lazy load
- 🔄 **AboutUs** - lazy load
- 🔄 **WorkProcess** - lazy load
- 🔄 **ClientsGallery** - lazy load

### Последовательность загрузки

1. Пользователь открывает страницу
2. Загружаются только **HeroSection** и **Header**
3. При скролле вниз:
   - За 100px до **ServicesBlock** → загружаются услуги
   - За 100px до **AboutUs** → загружаются настройки сайта и статистика
   - За 100px до **WorkProcess** → загружаются этапы процесса
   - За 100px до **ClientsGallery** → загружаются клиенты и индикаторы доверия

### Преимущества

- ⚡ Быстрая начальная загрузка страницы
- 🎯 Экономия трафика (загружается только то, что видит пользователь)
- 📊 Меньше запросов к API при открытии страницы
- 🚀 Лучшие показатели Core Web Vitals

## Структура API запросов

### Моковые данные

Все моки находятся в `frontend/lib/api.ts` в константе `MOCK_DATA`.

### Реальные эндпоинты

После интеграции бэкенда будут использоваться следующие эндпоинты:

```
GET /api/hero-section/      - Hero секция
GET /api/site-settings/     - Настройки сайта
GET /api/navigation/        - Меню навигации
GET /api/services/          - Услуги
GET /api/stats/             - Статистика
GET /api/process/           - Этапы работы
GET /api/clients/           - Клиенты
GET /api/social-links/      - Социальные сети
GET /api/trust-indicators/  - Индикаторы доверия
GET /api/section-headers/   - Заголовки секций
GET /api/footer-links/      - Ссылки футера
POST /api/contact/          - Контактная форма
```

## Отладка

### Проблема: Моки не работают

**Симптомы**: Видите запросы к `/api/*` в Network tab браузера

**Решение**:
1. Проверьте `.env.local`: `NEXT_PUBLIC_USE_MOCK_API=true` (маленькими буквами!)
2. Перезапустите dev сервер: `npm run dev`
3. Очистите кэш браузера

### Проблема: Все запросы выполняются сразу

**Симптомы**: Все API запросы в Network tab появляются одновременно

**Решение**:
- Это нормально если вы быстро прокрутили страницу до конца
- При медленном скролле запросы будут выполняться постепенно
- Проверьте консоль - сообщения `[MOCK] Using mock data...` появляются последовательно

### Проблема: Компонент не загружается

**Причины**:
- Компонент слишком далеко (больше 100px) от viewport
- Проскроллите вниз, чтобы триггер сработал

## Примеры использования

### Добавление нового lazy-loaded компонента

```typescript
import { useInView } from "@/lib/useInView";

export function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (!isInView) return; // Не загружать пока не в viewport

    async function fetchData() {
      const result = await getMyData();
      setData(result);
      setLoading(false);
    }

    fetchData();
  }, [isInView]); // Зависимость от isInView

  return (
    <section ref={ref as any}>
      {/* Ваш контент */}
    </section>
  );
}
```

### Настройка параметров Intersection Observer

```typescript
// Более агрессивная предзагрузка
const { ref, isInView } = useInView({
  threshold: 0.1,
  rootMargin: '200px' // Загрузка за 200px до viewport
});

// Загрузка только при полной видимости
const { ref, isInView } = useInView({
  threshold: 1.0, // 100% видимости
  rootMargin: '0px'
});

// Повторная загрузка при появлении/исчезновении
const { ref, isInView } = useInView({
  threshold: 0.1,
  triggerOnce: false // Загружать каждый раз при появлении
});
```
