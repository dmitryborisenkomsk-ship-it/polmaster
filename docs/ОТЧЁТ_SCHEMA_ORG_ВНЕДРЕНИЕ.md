# Внедрение разметки schema.org на сайт ПолМастер

**Цель:** добавить структурированные данные (JSON-LD) на каждую страницу для улучшения SEO и отображения в поиске (расширенные сниппеты, карточки организации, FAQ и т.д.).

**Ссылки:**  
- Спецификация: https://schema.org  
- Валидатор: https://validator.schema.org  
- Google: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data  

---

## 1. Что такое schema.org и зачем

- **schema.org** — словарь разметки, который поисковики (Google, Yandex и др.) используют для понимания типа страницы и сущностей (организация, товар, FAQ и т.д.).
- **Зачем:** расширенные сниппеты в выдаче (звёздочки, блоки «Вопросы и ответы», карточка организации), выше шанс на rich results и лучшая индексация.

Формат на сайте удобнее всего задавать через **JSON-LD**: один или несколько блоков `<script type="application/ld+json">` в `<head>` или в начале `<body>` с валидным JSON.

---

## 2. Как встроить в React (SPA)

Варианты:

1. **Компонент, который рендерит `<script type="application/ld+json">`**  
   В каждой странице вызывать компонент и передавать объект схемы (или массив схем). React рендерит скрипт в DOM — поисковики его видят после рендера.

2. **Хук `useSchema(schema)` или `useSchema(schemas[])`**  
   В `useEffect` создаёт или обновляет в `document.head` элемент `<script type="application/ld+json">` с `JSON.stringify(schema)`. При смене страницы старый скрипт удалить, новый вставить.

3. **Единый источник данных**  
   Константы/объект с данными организации (название, адрес, телефон, часы работы) переиспользовать в разметке и, при необходимости, в UI (футер, контакты).

Рекомендация: **компонент `<SchemaMarkup data={...} />`**, который рендерит один `<script type="application/ld+json">`. На странице можно использовать несколько раз с разными `data`. Данные организации вынести в `src/data/organization.ts` (или в конфиг).

---

## 3. Рекомендации по страницам

Ниже — тип страницы, тип schema.org и основные поля. URL сайта условно: `https://polmaster.ru`.

### 3.1. Главная (`/`)

**Типы разметки:**

1. **Organization** — компания в целом.  
   Использовать на всех страницах (можно один раз в layout или на главной).

2. **WebSite** — весь сайт + поиск (опционально).

3. **LocalBusiness** (наследник Organization) — магазин/шоурум с адресом и часами.

**Пример JSON-LD (Organization + WebSite):**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://polmaster.ru/#organization",
      "name": "ПолМастер",
      "url": "https://polmaster.ru",
      "logo": "https://polmaster.ru/logo.png",
      "description": "Надёжный поставщик напольных покрытий с 2009 года. Ламинат, паркет, виниловый пол от 500₽/м².",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Москва",
        "streetAddress": "ул. Примерная, д. 123, ТЦ «ПолМаркет»"
      },
      "telephone": "+7 (495) 123-45-67",
      "email": "info@polmaster.ru",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://polmaster.ru/#website",
      "url": "https://polmaster.ru",
      "name": "ПолМастер — напольные покрытия в Москве",
      "publisher": { "@id": "https://polmaster.ru/#organization" }
    }
  ]
}
```

На главной можно добавить только эту общую разметку; при необходимости позже — **ItemList** с несколькими товарами или категориями.

---

### 3.2. Каталог (`/catalog`)

**Тип:** **CollectionPage** или **ItemList** (список товаров).

- **CollectionPage** — страница каталога, связанная с организацией.
- **ItemList** — перечень позиций (можно первые N товаров с названием, URL, ценой).

**Пример (CollectionPage + ItemList):**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "url": "https://polmaster.ru/catalog",
      "name": "Каталог напольных покрытий",
      "description": "Ламинат, паркетная доска, виниловый пол, кварц-винил, инженерная доска, пробка. Фильтры по бренду и цене.",
      "publisher": { "@id": "https://polmaster.ru/#organization" }
    },
    {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://polmaster.ru/catalog",
          "name": "Ламинат Дуб Светлый Premium"
        }
      ]
    }
  ]
}
```

В реальности массив `itemListElement` заполнять из `products` (первые 5–10 товаров с ссылками на карточку, если будут отдельные URL).

---

### 3.3. Контакты (`/contacts`)

**Тип:** **ContactPage** + повтор **LocalBusiness** (или Organization с полным адресом и часами).

**Пример:**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "url": "https://polmaster.ru/contacts",
      "name": "Контакты ПолМастер",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "ПолМастер",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Москва",
          "streetAddress": "ул. Примерная, д. 123, ТЦ «ПолМаркет»"
        },
        "telephone": "+7 (495) 123-45-67",
        "email": "info@polmaster.ru",
        "openingHours": "Пн-Сб 9:00-20:00"
      }
    }
  ]
}
```

---

### 3.4. О компании (`/about`)

**Тип:** **AboutPage** + **Organization** (история, описание).

**Пример:**

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "url": "https://polmaster.ru/about",
  "name": "О компании ПолМастер",
  "description": "ПолМастер — надёжный поставщик напольных покрытий с 2009 года. 15+ лет на рынке, 5000+ клиентов, собственный шоурум и бригада укладчиков в Москве.",
  "mainEntity": {
    "@id": "https://polmaster.ru/#organization"
  }
}
```

---

### 3.5. Вопросы и ответы (`/faq`)

**Тип:** **FAQPage** — даёт возможность вывода блока «Вопросы и ответы» в поиске.

**Пример (данные взять из `faqData` на странице):**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Какой срок доставки напольных покрытий?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Доставка по Москве осуществляется в течение 1-3 рабочих дней..."
      }
    }
  ]
}
```

Массив `mainEntity` заполнять из того же источника, что и блок аккордеона на странице.

---

### 3.6. Калькулятор ламината (`/calculator`)

**Тип:** **WebApplication** или **SoftwareApplication** — инструмент на сайте.

**Пример:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "url": "https://polmaster.ru/calculator",
  "name": "Калькулятор ламината",
  "description": "Рассчитайте количество ламината для комнаты: размеры комнаты и доски, тип укладки (прямая / со смещением). Визуализация укладки и расчёт упаковок.",
  "applicationCategory": "UtilitiesApplication",
  "browserRequirements": "Требуется JavaScript"
}
```

---

### 3.7. 404 (NotFound)

Разметку можно не добавлять или использовать **WebPage** с указанием, что страница не найдена (для поисковиков польза небольшая).

---

## 4. План внедрения

### Шаг 1. Данные организации

Создать `src/data/organization.ts`:

- название, url, logo, description;
- address (город, улица, здание);
- telephone, email;
- openingHours / openingHoursSpecification.

Использовать эти поля в JSON-LD и при необходимости в Footer/Contacts.

### Шаг 2. Компонент для JSON-LD

Создать `src/components/SchemaMarkup.tsx`:

- проп: `data: object | object[]` (один объект или массив для `@graph`);
- рендер: `<script type="application/ld+json">` с `JSON.stringify(data)` (если массив — один объект с `@graph`);
- вставлять в начало `<body>` или в `<head>` (через portal в `document.head` или просто в body — поисковики читают оба варианта).

### Шаг 3. Разметка по страницам

| Страница   | Файл              | Разметка |
|-----------|-------------------|----------|
| Главная   | Index.tsx         | Organization, WebSite (и при желании LocalBusiness) |
| Каталог   | Catalog.tsx       | CollectionPage, ItemList (из products) |
| Контакты  | Contacts.tsx      | ContactPage, LocalBusiness |
| О компании| AboutCompany.tsx  | AboutPage, ссылка на Organization |
| FAQ       | FAQ.tsx           | FAQPage (из faqData) |
| Калькулятор | LaminateCalculator.tsx | WebApplication |

В каждой странице: импорт `SchemaMarkup` и данных (organization, faqData, products и т.д.), формирование объекта схемы, рендер `<SchemaMarkup data={...} />`.

### Шаг 4. Базовый URL

Иметь константу с базовым URL сайта (например `https://polmaster.ru`) и подставлять её в `url`, `@id`, в ссылках на товары и т.д., чтобы разметка была валидной и не ломалась при смене домена.

### Шаг 5. Проверка

- После внедрения проверить страницы в https://validator.schema.org  
- При необходимости — в Google Rich Results Test (или аналог для Yandex).

---

## 5. Краткая сводка по типам

| Страница    | Тип(ы) schema.org     | Зачем |
|-------------|------------------------|--------|
| Главная     | Organization, WebSite | Карточка организации, сайт в поиске |
| Каталог     | CollectionPage, ItemList | Страница каталога, список товаров |
| Контакты    | ContactPage, LocalBusiness | Контакты и адрес в сниппете |
| О компании  | AboutPage             | Описание страницы |
| FAQ         | FAQPage               | Блок «Вопросы и ответы» в выдаче |
| Калькулятор | WebApplication        | Понимание, что это инструмент |
| 404         | — или WebPage         | По желанию |

---

## 6. Итог

1. Вынести данные организации в один модуль.  
2. Добавить компонент, который выводит `<script type="application/ld+json">` с переданным объектом/графом.  
3. На каждой странице формировать свой JSON-LD и рендерить его через этот компонент.  
4. Использовать базовый URL сайта из константы.  
5. Проверить разметку в validator.schema.org и при необходимости в инструментах поисковиков.

После этого разметка schema.org будет внедрена на каждую нужную страницу и готова к использованию поисковыми системами.
