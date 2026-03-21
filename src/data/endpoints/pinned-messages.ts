import type { EndpointDoc } from '../types.js';

export const pinnedMessagesEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/chats/{chatId}/pin',
    group: 'pinned-messages',
    summary: 'Получить закреплённое сообщение',
    description: 'Возвращает текущее закреплённое сообщение в чате.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Закреплённое сообщение',
      fields: [
        { name: 'message', type: 'Message', required: false, nullable: true, description: 'Закреплённое сообщение (null если ничего не закреплено)' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345/pin',
    },
  },
  {
    method: 'PUT',
    path: '/chats/{chatId}/pin',
    group: 'pinned-messages',
    summary: 'Закрепить сообщение',
    description: 'Закрепляет указанное сообщение в чате. Требуется право pin_message.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    requestBody: {
      description: 'Данные для закрепления',
      fields: [
        { name: 'message_id', type: 'string', required: true, nullable: false, description: 'ID сообщения для закрепления' },
        { name: 'notify', type: 'boolean', required: false, nullable: false, description: 'Уведомлять участников', defaultValue: 'true' },
      ],
    },
    response: {
      description: 'Результат закрепления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X PUT -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"message_id":"mid.abc123"}\' https://platform-api.max.ru/chats/12345/pin',
    },
  },
  {
    method: 'DELETE',
    path: '/chats/{chatId}/pin',
    group: 'pinned-messages',
    summary: 'Открепить сообщение',
    description: 'Удаляет закреплённое сообщение из чата. Требуется право pin_message.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Результат открепления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345/pin',
    },
  },
];
