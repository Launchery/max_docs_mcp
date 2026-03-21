import type { EndpointDoc } from '../types.js';

export const subscriptionsEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/subscriptions',
    group: 'subscriptions',
    summary: 'Получить список подписок (webhooks)',
    description: 'Возвращает список активных webhook-подписок бота.',
    parameters: [],
    response: {
      description: 'Список подписок',
      fields: [
        { name: 'subscriptions', type: 'Subscription[]', required: true, nullable: false, description: 'Массив подписок' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/subscriptions',
    },
  },
  {
    method: 'POST',
    path: '/subscriptions',
    group: 'subscriptions',
    summary: 'Создать webhook-подписку',
    description: 'Создаёт новую webhook-подписку. URL должен быть HTTPS на порту 443. Сервер должен ответить в течение 30 секунд. При неудаче доставки — повтор до 10 раз с экспоненциальной задержкой. Автоматическая отписка после 8 часов неудачных доставок.',
    parameters: [],
    requestBody: {
      description: 'Данные подписки',
      fields: [
        { name: 'url', type: 'string', required: true, nullable: false, description: 'HTTPS URL для получения обновлений', constraints: 'Только HTTPS, порт 443' },
        { name: 'update_types', type: 'string[]', required: false, nullable: true, description: 'Типы событий для подписки (по умолчанию все)', enumValues: ['message_created', 'message_callback', 'message_edited', 'message_removed', 'bot_added', 'bot_removed', 'dialog_muted', 'dialog_unmuted', 'dialog_cleared', 'dialog_removed', 'user_added', 'user_removed', 'bot_started', 'bot_stopped', 'chat_title_changed'] },
        { name: 'secret', type: 'string', required: false, nullable: true, description: 'Секрет для подписи запросов (передаётся в заголовке X-Max-Bot-Api-Secret)', constraints: '5-256 символов, паттерн: ^[a-zA-Z0-9_-]{5,256}$' },
      ],
    },
    response: {
      description: 'Результат создания подписки',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"url":"https://example.com/webhook","update_types":["message_created"],"secret":"my_secret_key"}\' https://platform-api.max.ru/subscriptions',
    },
    notes: [
      'URL должен быть HTTPS на порту 443',
      'Таймаут ответа: 30 секунд',
      'Повтор доставки: до 10 раз с экспоненциальной задержкой',
      'Автоматическая отписка после 8 часов неудачных доставок',
      'Секрет передаётся в заголовке X-Max-Bot-Api-Secret',
    ],
  },
  {
    method: 'DELETE',
    path: '/subscriptions',
    group: 'subscriptions',
    summary: 'Удалить webhook-подписку',
    description: 'Удаляет webhook-подписку по URL.',
    parameters: [
      { name: 'url', location: 'query', type: 'string', required: true, description: 'URL подписки для удаления' },
    ],
    response: {
      description: 'Результат удаления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" "https://platform-api.max.ru/subscriptions?url=https://example.com/webhook"',
    },
  },
  {
    method: 'GET',
    path: '/updates',
    group: 'subscriptions',
    summary: 'Получить обновления (long polling)',
    description: 'Получает обновления методом long polling. Альтернатива webhook-подпискам. Соединение удерживается до появления обновлений или таймаута.',
    parameters: [
      { name: 'limit', location: 'query', type: 'integer', required: false, description: 'Максимальное количество обновлений', constraints: '1-1000', defaultValue: '100' },
      { name: 'timeout', location: 'query', type: 'integer', required: false, description: 'Таймаут ожидания в секундах', constraints: '0-90', defaultValue: '30' },
      { name: 'marker', location: 'query', type: 'int64', required: false, description: 'Маркер для получения обновлений после определённой позиции' },
      { name: 'types', location: 'query', type: 'string[]', required: false, description: 'Типы событий для фильтрации', enumValues: ['message_created', 'message_callback', 'message_edited', 'message_removed', 'bot_added', 'bot_removed', 'dialog_muted', 'dialog_unmuted', 'dialog_cleared', 'dialog_removed', 'user_added', 'user_removed', 'bot_started', 'bot_stopped', 'chat_title_changed'] },
    ],
    response: {
      description: 'Список обновлений',
      fields: [
        { name: 'updates', type: 'Update[]', required: true, nullable: false, description: 'Массив обновлений' },
        { name: 'marker', type: 'int64', required: false, nullable: true, description: 'Маркер для следующего запроса' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" "https://platform-api.max.ru/updates?timeout=30&limit=100"',
    },
    notes: [
      'Нельзя использовать одновременно с webhook-подписками',
      'При таймауте возвращается пустой массив обновлений',
    ],
  },
];
