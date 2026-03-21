import type { OverviewDoc } from './types.js';

export const overview: OverviewDoc = {
  baseUrl: 'https://platform-api.max.ru',
  authDescription:
    'Все запросы авторизуются через заголовок `Authorization: {access_token}`. ' +
    'Токен можно получить в MAX: Чатботы -> Интеграция -> Получить токен. ' +
    'Передача токена через query-параметр устарела (deprecated).',
  rateLimitDescription:
    'Ограничение: 30 запросов в секунду. При превышении лимита возвращается HTTP 429.',
  httpStatusCodes: [
    { code: 200, description: 'OK — запрос выполнен успешно' },
    { code: 400, description: 'Bad Request — некорректные параметры запроса' },
    { code: 401, description: 'Unauthorized — невалидный или отсутствующий токен' },
    { code: 403, description: 'Forbidden — нет прав на выполнение операции' },
    { code: 404, description: 'Not Found — ресурс не найден' },
    { code: 405, description: 'Method Not Allowed — метод не поддерживается' },
    { code: 429, description: 'Too Many Requests — превышен лимит запросов' },
    { code: 500, description: 'Internal Server Error — ошибка сервера' },
  ],
  generalNotes: [
    'Протокол: только HTTPS (включая webhook URL)',
    'Формат данных: JSON (Content-Type: application/json)',
    'Кодировка: UTF-8',
    'Идентификаторы пользователей и чатов: int64',
    'Временные метки: Unix timestamp в миллисекундах',
    'Максимальная длина текста сообщения: 4000 символов',
    'Максимальный размер загружаемого файла: 4 ГБ',
  ],
};
