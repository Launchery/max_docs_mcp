import type { EndpointDoc } from '../types.js';

export const subscriptionsEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/subscriptions',
    group: 'subscriptions',
    summary: 'Получить список подписок (webhooks)',
    description:
      'Возвращает список webhook-подписок бота. Для production-окружения документация MAX рекомендует использовать именно webhook.',
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
    description:
      'Создаёт webhook-подписку для получения обновлений от бота. Текущая страница метода требует HTTPS-endpoint и описывает доставку только на стандартный порт 443.',
    parameters: [],
    requestBody: {
      description: 'Данные подписки',
      fields: [
        {
          name: 'url',
          type: 'string',
          required: true,
          nullable: false,
          description: 'URL HTTPS-endpoint вашего бота для webhook',
          constraints: 'Должен начинаться с https://; поддерживается только порт 443',
        },
        { name: 'update_types', type: 'string[]', required: false, nullable: true, description: 'Типы событий для подписки (по умолчанию все)', enumValues: ['message_created', 'message_callback', 'message_edited', 'message_removed', 'bot_added', 'bot_removed', 'dialog_muted', 'dialog_unmuted', 'dialog_cleared', 'dialog_removed', 'user_added', 'user_removed', 'bot_started', 'bot_stopped', 'chat_title_changed'] },
        {
          name: 'secret',
          type: 'string',
          required: false,
          nullable: true,
          description:
            'Секрет для подписи webhook-запросов в заголовке `X-Max-Bot-Api-Secret`',
          constraints: '5-256 символов, паттерн: ^[a-zA-Z0-9_-]{5,256}$',
        },
      ],
    },
    response: {
      description: 'Результат создания подписки',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
        { name: 'message', type: 'string', required: false, nullable: true, description: 'Объяснение ошибки, если операция завершилась неуспешно' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"url":"https://example.com/webhook","update_types":["message_created"],"secret":"my_secret_key"}\' https://platform-api.max.ru/subscriptions',
    },
    notes: [
      'Webhook-endpoint должен вернуть HTTP 200 в течение 30 секунд. Иной код ответа или превышение тайм-аута считаются ошибкой доставки.',
      'Если доставка не удалась, MAX выполняет до 10 повторных попыток с экспоненциальным увеличением интервала.',
      'Если в течение 8 часов по URL вебхука не получен успешный ответ, бот автоматически отписывается от webhook.',
      'Секрет передаётся в заголовке `X-Max-Bot-Api-Secret` каждого webhook-запроса, если он был указан при создании подписки.',
      'Для production-окружения документация рекомендует webhook, для разработки и тестирования — long polling.',
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
    description: 'Получает обновления методом long polling. Используется для разработки и тестирования, если бот не подписан на webhook. Каждое обновление имеет номер последовательности, а `marker` указывает на следующее ожидаемое обновление.',
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
      'Если передан `marker`, бот получит только ещё не подтверждённые обновления.',
      'Если `marker` не передан, бот получит все новые обновления после последнего подтверждения.',
      'Для production-окружения MAX рекомендует использовать webhook.',
    ],
  },
];
