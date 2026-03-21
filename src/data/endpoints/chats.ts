import type { EndpointDoc } from '../types.js';

export const chatsEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/chats',
    group: 'chats',
    summary: 'Получить список чатов',
    description: 'Возвращает список групповых чатов, в которых бот является участником. Результаты пагинируются.',
    parameters: [
      { name: 'count', location: 'query', type: 'integer', required: false, description: 'Количество чатов на странице', constraints: '1-100', defaultValue: '50' },
      { name: 'marker', location: 'query', type: 'int64', required: false, description: 'Маркер для пагинации, полученный из предыдущего ответа' },
    ],
    response: {
      description: 'Список чатов с маркером пагинации',
      fields: [
        { name: 'chats', type: 'Chat[]', required: true, nullable: false, description: 'Массив чатов' },
        { name: 'marker', type: 'int64', required: false, nullable: true, description: 'Маркер для следующей страницы (null если это последняя)' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" "https://platform-api.max.ru/chats?count=10"',
    },
  },
  {
    method: 'GET',
    path: '/chats/{chatId}',
    group: 'chats',
    summary: 'Получить информацию о чате',
    description: 'Возвращает полную информацию о конкретном чате по его идентификатору.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Информация о чате (Chat)',
      fields: [
        { name: 'chat_id', type: 'int64', required: true, nullable: false, description: 'Идентификатор чата' },
        { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип чата', enumValues: ['dialog', 'chat', 'channel', 'feed'] },
        { name: 'status', type: 'string', required: true, nullable: false, description: 'Статус чата', enumValues: ['active', 'removed', 'left', 'closed'] },
        { name: 'title', type: 'string', required: false, nullable: true, description: 'Название чата' },
        { name: 'icon', type: 'Image', required: false, nullable: true, description: 'Иконка чата' },
        { name: 'last_event_time', type: 'int64', required: true, nullable: false, description: 'Время последнего события (Unix ms)' },
        { name: 'participants_count', type: 'int32', required: true, nullable: false, description: 'Количество участников' },
        { name: 'owner_id', type: 'int64', required: false, nullable: true, description: 'ID владельца чата' },
        { name: 'is_public', type: 'boolean', required: true, nullable: false, description: 'Публичный ли чат' },
        { name: 'link', type: 'string', required: false, nullable: true, description: 'Ссылка на чат' },
        { name: 'description', type: 'string', required: false, nullable: true, description: 'Описание чата' },
        { name: 'pinned_message', type: 'Message', required: false, nullable: true, description: 'Закреплённое сообщение' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345',
    },
  },
  {
    method: 'PATCH',
    path: '/chats/{chatId}',
    group: 'chats',
    summary: 'Изменить чат',
    description: 'Позволяет изменить название, иконку или закреплённое сообщение чата.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    requestBody: {
      description: 'Поля для обновления',
      fields: [
        { name: 'icon', type: 'object', required: false, nullable: false, description: 'Новая иконка чата (объект с url и token)' },
        { name: 'title', type: 'string', required: false, nullable: false, description: 'Новое название чата', constraints: '1-200 символов' },
        { name: 'pin', type: 'string', required: false, nullable: false, description: 'ID сообщения для закрепления' },
        { name: 'notify', type: 'boolean', required: false, nullable: false, description: 'Уведомлять участников', defaultValue: 'true' },
      ],
    },
    response: {
      description: 'Обновлённый чат (Chat)',
      fields: [
        { name: 'chat_id', type: 'int64', required: true, nullable: false, description: 'Идентификатор чата' },
        { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип чата' },
        { name: 'status', type: 'string', required: true, nullable: false, description: 'Статус чата' },
        { name: 'title', type: 'string', required: false, nullable: true, description: 'Название чата' },
      ],
    },
    example: {
      curl: 'curl -X PATCH -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"title":"Новое название"}\' https://platform-api.max.ru/chats/12345',
    },
  },
  {
    method: 'DELETE',
    path: '/chats/{chatId}',
    group: 'chats',
    summary: 'Удалить чат',
    description: 'Удаляет чат. Бот должен быть владельцем или администратором чата.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Результат удаления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
        { name: 'message', type: 'string', required: false, nullable: true, description: 'Дополнительное сообщение' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345',
    },
  },
  {
    method: 'POST',
    path: '/chats/{chatId}/actions',
    group: 'chats',
    summary: 'Отправить действие бота в чат',
    description: 'Отправляет индикатор действия бота (например, «печатает...»).',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    requestBody: {
      description: 'Действие бота',
      fields: [
        { name: 'action', type: 'string', required: true, nullable: false, description: 'Тип действия', enumValues: ['typing_on', 'sending_photo', 'sending_video', 'sending_audio', 'sending_file', 'mark_seen'] },
      ],
    },
    response: {
      description: 'Результат отправки',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"action":"typing_on"}\' https://platform-api.max.ru/chats/12345/actions',
    },
  },
];
