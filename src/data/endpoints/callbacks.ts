import type { EndpointDoc } from '../types.js';

export const callbacksEndpoints: EndpointDoc[] = [
  {
    method: 'POST',
    path: '/answers',
    group: 'callbacks',
    summary: 'Ответить на callback-кнопку',
    description: 'Отправляет ответ на нажатие callback-кнопки. Можно отправить новое сообщение и/или уведомление (toast).',
    parameters: [
      { name: 'callback_id', location: 'query', type: 'string', required: true, description: 'ID callback-запроса из обновления message_callback' },
    ],
    requestBody: {
      description: 'Ответ на callback',
      fields: [
        { name: 'message', type: 'NewMessageBody', required: false, nullable: true, description: 'Сообщение для отправки в ответ' },
        { name: 'notification', type: 'string', required: false, nullable: true, description: 'Текст уведомления (toast) для пользователя' },
      ],
    },
    response: {
      description: 'Результат ответа',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"notification":"Кнопка нажата!"}\' "https://platform-api.max.ru/answers?callback_id=cb123"',
    },
    notes: [
      'callback_id получается из обновления с update_type = message_callback',
      'Можно отправить message, notification, или оба',
    ],
  },
];
