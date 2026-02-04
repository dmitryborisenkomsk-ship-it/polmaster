/**
 * Данные организации для schema.org и повторного использования (Footer, контакты).
 */

export const BASE_URL = 'https://polmaster.ru';

export const organizationData = {
  name: 'ПолМастер',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'Надёжный поставщик напольных покрытий с 2009 года. Ламинат, паркет, виниловый пол от 500₽/м².',
  address: {
    addressLocality: 'Москва',
    streetAddress: 'ул. Примерная, д. 123, ТЦ «ПолМаркет»',
  },
  telephone: '+7 (495) 123-45-67',
  email: 'info@polmaster.ru',
  openingHours: 'Пн-Сб 9:00-20:00',
  openingHoursSpecification: {
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    opens: '09:00',
    closes: '20:00',
  },
} as const;
