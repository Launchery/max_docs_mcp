import type { ModelDoc } from '../types.js';

export const inlineKeyboardModel: ModelDoc = {
  name: 'InlineKeyboardAttachment',
  description: 'Встроенная клавиатура, прикрепляемая к сообщению. Максимум 210 кнопок в 30 рядах.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип вложения', enumValues: ['inline_keyboard'] },
    { name: 'payload', type: 'object', required: true, nullable: false, description: 'Содержимое клавиатуры' },
    { name: 'payload.buttons', type: 'Button[][]', required: true, nullable: false, description: 'Двумерный массив кнопок (ряды × кнопки)', constraints: 'максимум 30 рядов, 210 кнопок всего' },
  ],
  relatedModels: ['Button'],
};

export const photoAttachmentModel: ModelDoc = {
  name: 'PhotoAttachment',
  description: 'Фото-вложение в сообщении.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип вложения', enumValues: ['image'] },
    { name: 'payload', type: 'object', required: true, nullable: false, description: 'Данные фото' },
    { name: 'payload.photo_id', type: 'int64', required: true, nullable: false, description: 'ID фото' },
    { name: 'payload.token', type: 'string', required: true, nullable: false, description: 'Токен фото' },
    { name: 'payload.url', type: 'string', required: true, nullable: false, description: 'URL фото' },
  ],
};

export const videoAttachmentModel: ModelDoc = {
  name: 'VideoAttachment',
  description: 'Видео-вложение в сообщении.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип вложения', enumValues: ['video'] },
    { name: 'payload', type: 'object', required: true, nullable: false, description: 'Данные видео' },
    { name: 'payload.id', type: 'int64', required: true, nullable: false, description: 'ID видео' },
    { name: 'payload.token', type: 'string', required: true, nullable: false, description: 'Токен видео (используется в GET /videos/{videoToken})' },
    { name: 'payload.url', type: 'string', required: true, nullable: false, description: 'URL превью' },
    { name: 'payload.thumbnail', type: 'string', required: false, nullable: true, description: 'URL миниатюры' },
    { name: 'payload.width', type: 'int32', required: false, nullable: true, description: 'Ширина видео' },
    { name: 'payload.height', type: 'int32', required: false, nullable: true, description: 'Высота видео' },
    { name: 'payload.duration', type: 'int32', required: false, nullable: true, description: 'Длительность в секундах' },
  ],
};

export const audioAttachmentModel: ModelDoc = {
  name: 'AudioAttachment',
  description: 'Аудио-вложение в сообщении.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип вложения', enumValues: ['audio'] },
    { name: 'payload', type: 'object', required: true, nullable: false, description: 'Данные аудио' },
    { name: 'payload.id', type: 'int64', required: true, nullable: false, description: 'ID аудио' },
    { name: 'payload.token', type: 'string', required: true, nullable: false, description: 'Токен аудио' },
    { name: 'payload.url', type: 'string', required: true, nullable: false, description: 'URL аудио' },
  ],
};

export const fileAttachmentModel: ModelDoc = {
  name: 'FileAttachment',
  description: 'Файловое вложение в сообщении.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип вложения', enumValues: ['file'] },
    { name: 'payload', type: 'object', required: true, nullable: false, description: 'Данные файла' },
    { name: 'payload.file_id', type: 'int64', required: true, nullable: false, description: 'ID файла' },
    { name: 'payload.token', type: 'string', required: true, nullable: false, description: 'Токен файла' },
    { name: 'payload.url', type: 'string', required: true, nullable: false, description: 'URL файла' },
    { name: 'payload.filename', type: 'string', required: true, nullable: false, description: 'Имя файла' },
    { name: 'payload.size', type: 'int64', required: true, nullable: false, description: 'Размер файла в байтах' },
  ],
};

export const buttonModel: ModelDoc = {
  name: 'Button',
  description: 'Кнопка для inline-клавиатуры. Поддерживает различные типы действий.',
  fields: [
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип кнопки', enumValues: ['callback', 'link', 'request_contact', 'request_geo_location', 'open_app', 'message'] },
    { name: 'text', type: 'string', required: true, nullable: false, description: 'Текст на кнопке' },
    { name: 'payload', type: 'string', required: false, nullable: true, description: 'Payload (для callback-кнопок, передаётся в update)' },
    { name: 'url', type: 'string', required: false, nullable: true, description: 'URL (для link-кнопок)' },
    { name: 'intent', type: 'string', required: false, nullable: true, description: 'Стиль кнопки', enumValues: ['positive', 'negative', 'default'] },
  ],
  relatedModels: ['InlineKeyboardAttachment'],
};

export const attachmentModels: ModelDoc[] = [
  inlineKeyboardModel,
  photoAttachmentModel,
  videoAttachmentModel,
  audioAttachmentModel,
  fileAttachmentModel,
  buttonModel,
];
