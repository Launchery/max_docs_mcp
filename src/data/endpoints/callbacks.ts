import type { EndpointDoc } from '../types.js';

export const callbacksEndpoints: EndpointDoc[] = [
  {
    method: 'POST',
    path: '/answers',
    group: 'callbacks',
    summary: 'Ответить на callback-кнопку',
    description: 'Отправляет ответ на нажатие callback-кнопки. Ответом может быть обновлённое сообщение и/или одноразовое уведомление для пользователя.',
    parameters: [
      { name: 'callback_id', location: 'query', type: 'string', required: true, description: 'ID callback из обновления `message_callback`', constraints: 'Минимум 1 символ, не может состоять только из пробелов' },
    ],
    requestBody: {
      description: 'Ответ на callback',
      fields: [
        { name: 'message', type: 'NewMessageBody', required: false, nullable: true, description: 'Новое содержимое сообщения, если нужно обновить текущий ответ бота' },
        { name: 'notification', type: 'string', required: false, nullable: true, description: 'Одноразовое уведомление для пользователя' },
      ],
    },
    response: {
      description: 'Результат ответа',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
        { name: 'message', type: 'string', required: false, nullable: true, description: 'Объяснение ошибки, если операция завершилась неуспешно' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"notification":"Кнопка нажата!"}\' "https://platform-api.max.ru/answers?callback_id=cb123"',
    },
    notes: [
      'Идентификатор берётся из `GET /updates` через поле `updates[i].callback.callback_id`.',
      'Можно передать `message`, `notification` или оба поля сразу.',
    ],
  },
];
