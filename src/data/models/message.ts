import type { ModelDoc } from '../types.js';

export const messageModel: ModelDoc = {
  name: 'Message',
  description: 'Сообщение в MAX. Содержит информацию об отправителе, получателе, теле сообщения и метаданных.',
  fields: [
    { name: 'sender', type: 'User', required: true, nullable: false, description: 'Отправитель сообщения' },
    { name: 'recipient', type: 'Recipient', required: true, nullable: false, description: 'Получатель (чат или пользователь)' },
    { name: 'timestamp', type: 'int64', required: true, nullable: false, description: 'Время отправки (Unix ms)' },
    { name: 'link', type: 'LinkedMessage', required: false, nullable: true, description: 'Ссылка на другое сообщение (ответ/пересылка)' },
    { name: 'body', type: 'MessageBody', required: true, nullable: false, description: 'Тело сообщения' },
    { name: 'stat', type: 'MessageStat', required: false, nullable: true, description: 'Статистика сообщения (только для каналов)' },
    { name: 'url', type: 'string', required: false, nullable: true, description: 'URL сообщения (только для каналов)' },
  ],
  relatedModels: ['User', 'Recipient', 'MessageBody', 'LinkedMessage', 'MessageStat'],
};

export const messageBodyModel: ModelDoc = {
  name: 'MessageBody',
  description: 'Тело сообщения. Содержит текст, вложения и метаданные.',
  fields: [
    { name: 'mid', type: 'string', required: true, nullable: false, description: 'Уникальный идентификатор сообщения' },
    { name: 'seq', type: 'int64', required: true, nullable: false, description: 'Порядковый номер сообщения в чате' },
    { name: 'text', type: 'string', required: false, nullable: true, description: 'Текст сообщения' },
    { name: 'attachments', type: 'Attachment[]', required: false, nullable: true, description: 'Вложения сообщения' },
    { name: 'markup', type: 'string', required: false, nullable: true, description: 'Формат разметки текста', enumValues: ['markdown', 'html', 'none'] },
  ],
  relatedModels: ['Attachment'],
};

export const newMessageBodyModel: ModelDoc = {
  name: 'NewMessageBody',
  description: 'Тело нового сообщения для отправки или редактирования.',
  fields: [
    { name: 'text', type: 'string', required: false, nullable: true, description: 'Текст сообщения', constraints: 'максимум 4000 символов' },
    { name: 'attachments', type: 'AttachmentRequest[]', required: false, nullable: true, description: 'Вложения. null = не менять (при редактировании), [] = удалить все' },
    { name: 'link', type: 'NewMessageLink', required: false, nullable: true, description: 'Ссылка на другое сообщение (ответ или пересылка)' },
    { name: 'notify', type: 'boolean', required: false, nullable: false, description: 'Уведомлять получателя', defaultValue: 'true' },
    { name: 'format', type: 'string', required: false, nullable: true, description: 'Формат разметки текста', enumValues: ['markdown', 'html'] },
  ],
  relatedModels: ['AttachmentRequest', 'NewMessageLink'],
};

export const newMessageLinkModel: ModelDoc = {
  name: 'NewMessageLink',
  description: 'Ссылка на другое сообщение при отправке. Используется для ответов и пересылок.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип связи', enumValues: ['reply', 'forward'] },
    { name: 'mid', type: 'string', required: true, nullable: false, description: 'ID сообщения, на которое ссылаемся' },
  ],
  relatedModels: ['Message'],
};

export const linkedMessageModel: ModelDoc = {
  name: 'LinkedMessage',
  description: 'Связанное сообщение (ответ или пересылка) внутри Message.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип связи', enumValues: ['reply', 'forward'] },
    { name: 'sender', type: 'User', required: false, nullable: true, description: 'Отправитель оригинального сообщения' },
    { name: 'chat_id', type: 'int64', required: false, nullable: true, description: 'Чат оригинального сообщения' },
    { name: 'message', type: 'MessageBody', required: true, nullable: false, description: 'Тело оригинального сообщения' },
  ],
  relatedModels: ['User', 'MessageBody'],
};

export const recipientModel: ModelDoc = {
  name: 'Recipient',
  description: 'Получатель сообщения — чат или пользователь.',
  fields: [
    { name: 'chat_id', type: 'int64', required: false, nullable: true, description: 'ID чата (для групповых чатов)' },
    { name: 'chat_type', type: 'string', required: true, nullable: false, description: 'Тип чата', enumValues: ['dialog', 'chat', 'channel', 'feed'] },
    { name: 'user_id', type: 'int64', required: false, nullable: true, description: 'ID пользователя (для диалогов)' },
  ],
  relatedModels: ['Chat'],
};

export const messageStatModel: ModelDoc = {
  name: 'MessageStat',
  description: 'Статистика сообщения (количество просмотров). Доступна только для каналов.',
  fields: [
    { name: 'views', type: 'int32', required: true, nullable: false, description: 'Количество просмотров' },
  ],
};

export const imageModel: ModelDoc = {
  name: 'Image',
  description: 'Изображение, используемое как иконка чата или аватар.',
  fields: [
    { name: 'url', type: 'string', required: true, nullable: false, description: 'URL изображения' },
  ],
};

export const messageModels: ModelDoc[] = [
  messageModel,
  messageBodyModel,
  newMessageBodyModel,
  newMessageLinkModel,
  linkedMessageModel,
  recipientModel,
  messageStatModel,
  imageModel,
];
