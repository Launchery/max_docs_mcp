import type { EndpointDoc } from '../types.js';

export const messagesEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/messages',
    group: 'messages',
    summary: 'Получить сообщения',
    description: 'Возвращает сообщения из чата или по конкретным ID. Необходимо указать chat_id или message_ids.',
    parameters: [
      { name: 'chat_id', location: 'query', type: 'int64', required: false, description: 'ID чата для получения сообщений' },
      { name: 'message_ids', location: 'query', type: 'string', required: false, description: 'ID сообщений через запятую' },
      { name: 'from', location: 'query', type: 'int64', required: false, description: 'Начало временного диапазона (Unix ms)' },
      { name: 'to', location: 'query', type: 'int64', required: false, description: 'Конец временного диапазона (Unix ms)' },
      { name: 'count', location: 'query', type: 'integer', required: false, description: 'Количество сообщений', constraints: '1-100', defaultValue: '50' },
    ],
    response: {
      description: 'Список сообщений',
      fields: [
        { name: 'messages', type: 'Message[]', required: true, nullable: false, description: 'Массив сообщений' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" "https://platform-api.max.ru/messages?chat_id=12345&count=10"',
    },
  },
  {
    method: 'POST',
    path: '/messages',
    group: 'messages',
    summary: 'Отправить сообщение',
    description: 'Отправляет сообщение в чат или диалог. Необходимо указать user_id (для диалога) или chat_id (для чата). Поддерживает текст, вложения, inline-клавиатуры и ответы на сообщения.',
    parameters: [
      { name: 'user_id', location: 'query', type: 'int64', required: false, description: 'ID пользователя для отправки в диалог' },
      { name: 'chat_id', location: 'query', type: 'int64', required: false, description: 'ID чата для отправки' },
      { name: 'disable_link_preview', location: 'query', type: 'boolean', required: false, description: 'Отключить предпросмотр ссылок' },
    ],
    requestBody: {
      description: 'Тело сообщения (NewMessageBody)',
      fields: [
        { name: 'text', type: 'string', required: false, nullable: true, description: 'Текст сообщения', constraints: 'максимум 4000 символов' },
        { name: 'attachments', type: 'AttachmentRequest[]', required: false, nullable: true, description: 'Вложения (фото, видео, файлы, inline-клавиатуры). null = не менять, [] = удалить все' },
        { name: 'link', type: 'NewMessageLink', required: false, nullable: true, description: 'Ссылка на другое сообщение (ответ или пересылка)' },
        { name: 'notify', type: 'boolean', required: false, nullable: false, description: 'Уведомлять получателя', defaultValue: 'true' },
        { name: 'format', type: 'string', required: false, nullable: true, description: 'Формат текста', enumValues: ['markdown', 'html'] },
      ],
    },
    response: {
      description: 'Отправленное сообщение',
      fields: [
        { name: 'message', type: 'Message', required: true, nullable: false, description: 'Отправленное сообщение' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"text":"Hello!","attachments":[{"type":"inline_keyboard","payload":{"buttons":[[{"type":"callback","text":"Click me","payload":"btn1"}]]}}]}\' "https://platform-api.max.ru/messages?chat_id=12345"',
      responseJson: JSON.stringify({
        message: {
          sender: { user_id: 100, first_name: 'MyBot', is_bot: true },
          recipient: { chat_id: 12345, chat_type: 'chat' },
          timestamp: 1609459200000,
          body: { mid: 'mid.abc', seq: 1, text: 'Hello!' },
        },
      }, null, 2),
    },
    notes: [
      'Должен быть указан хотя бы text или attachments',
      'Inline-клавиатура: максимум 210 кнопок, 30 рядов',
      'Форматирование markdown: *жирный*, _курсив_, ~зачёркнутый~, `код`, [ссылка](url)',
    ],
  },
  {
    method: 'PUT',
    path: '/messages',
    group: 'messages',
    summary: 'Редактировать сообщение',
    description: 'Редактирует ранее отправленное сообщение. Сообщение можно редактировать в течение 24 часов после отправки.',
    parameters: [
      { name: 'message_id', location: 'query', type: 'string', required: true, description: 'ID сообщения для редактирования' },
    ],
    requestBody: {
      description: 'Новое тело сообщения (NewMessageBody)',
      fields: [
        { name: 'text', type: 'string', required: false, nullable: true, description: 'Новый текст', constraints: 'максимум 4000 символов' },
        { name: 'attachments', type: 'AttachmentRequest[]', required: false, nullable: true, description: 'Новые вложения' },
        { name: 'link', type: 'NewMessageLink', required: false, nullable: true, description: 'Ссылка на другое сообщение' },
        { name: 'notify', type: 'boolean', required: false, nullable: false, description: 'Уведомлять получателя', defaultValue: 'true' },
        { name: 'format', type: 'string', required: false, nullable: true, description: 'Формат текста', enumValues: ['markdown', 'html'] },
      ],
    },
    response: {
      description: 'Результат редактирования',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X PUT -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"text":"Updated text"}\' "https://platform-api.max.ru/messages?message_id=mid.abc"',
    },
    notes: ['Сообщение можно редактировать только в течение 24 часов после отправки'],
  },
  {
    method: 'DELETE',
    path: '/messages',
    group: 'messages',
    summary: 'Удалить сообщение',
    description: 'Удаляет сообщение. Сообщение можно удалить в течение 24 часов после отправки.',
    parameters: [
      { name: 'message_id', location: 'query', type: 'string', required: true, description: 'ID сообщения для удаления' },
    ],
    response: {
      description: 'Результат удаления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" "https://platform-api.max.ru/messages?message_id=mid.abc"',
    },
    notes: ['Сообщение можно удалить только в течение 24 часов после отправки'],
  },
  {
    method: 'GET',
    path: '/messages/{messageId}',
    group: 'messages',
    summary: 'Получить сообщение по ID',
    description: 'Возвращает конкретное сообщение по его идентификатору.',
    parameters: [
      { name: 'messageId', location: 'path', type: 'string', required: true, description: 'ID сообщения' },
    ],
    response: {
      description: 'Сообщение (Message)',
      fields: [
        { name: 'sender', type: 'User', required: true, nullable: false, description: 'Отправитель' },
        { name: 'recipient', type: 'Recipient', required: true, nullable: false, description: 'Получатель' },
        { name: 'timestamp', type: 'int64', required: true, nullable: false, description: 'Время отправки (Unix ms)' },
        { name: 'body', type: 'MessageBody', required: true, nullable: false, description: 'Тело сообщения' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/messages/mid.abc',
    },
  },
  {
    method: 'GET',
    path: '/videos/{videoToken}',
    group: 'messages',
    summary: 'Получить информацию о видео',
    description: 'Возвращает информацию о видео по его токену, включая URL для скачивания.',
    parameters: [
      { name: 'videoToken', location: 'path', type: 'string', required: true, description: 'Токен видео' },
    ],
    response: {
      description: 'Информация о видео',
      fields: [
        { name: 'url', type: 'string', required: true, nullable: false, description: 'URL для скачивания видео' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/videos/abc123token',
    },
  },
];
