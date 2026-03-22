import type { OverviewDoc } from './types.js';

export const overview: OverviewDoc = {
  baseUrl: 'https://platform-api.max.ru',
  authDescription:
    'Все запросы авторизуются через заголовок `Authorization: <token>`. ' +
    'Токен бота выдаётся на платформе MAX для партнёров в разделе `Чат-боты -> Интеграция -> Получить токен`. ' +
    'Передача токена через query-параметры больше не поддерживается.',
  rateLimitDescription:
    'Для стабильной работы ботов MAX рекомендует не превышать 30 запросов в секунду. При превышении лимита возвращается HTTP 429.',
  httpStatusCodes: [
    { code: 200, description: 'OK — запрос выполнен успешно' },
    { code: 400, description: 'Bad Request — некорректные параметры запроса' },
    { code: 401, description: 'Unauthorized — невалидный или отсутствующий токен' },
    { code: 404, description: 'Not Found — ресурс не найден' },
    { code: 405, description: 'Method Not Allowed — метод не поддерживается' },
    { code: 429, description: 'Too Many Requests — превышен лимит запросов' },
    { code: 503, description: 'Service Unavailable — сервис недоступен' },
  ],
  generalNotes: [
    'Long Polling рекомендуется для разработки и тестирования, Webhook — для production-окружения.',
    'Для webhook в обзоре API отдельно указано использование только HTTPS, включая самоподписанные сертификаты.',
    'Сообщения поддерживают форматирование через `markdown` и `html` в поле `format` объекта `NewMessageBody`.',
    'Inline-клавиатура поддерживает до 210 кнопок в 30 рядах, до 7 кнопок в ряду.',
    'Для кнопок типов `link`, `open_app`, `request_geo_location` и `request_contact` в одном ряду допускается до 3 кнопок.',
    'Максимальная длина ссылки в кнопке типа `link` — 2048 символов.',
    'Максимальная длина текста сообщения: 4000 символов',
    'Максимальный размер загружаемого файла: 4 ГБ',
  ],
};
