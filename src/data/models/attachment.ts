import type { ModelDoc } from '../types.js';

const attachmentTypeValues = [
  'inline_keyboard',
  'image',
  'video',
  'audio',
  'file',
];

export const attachmentModel: ModelDoc = {
  name: 'Attachment',
  description:
    'Общий контейнер вложения внутри `MessageBody.attachments`. Конкретная структура `payload` зависит от `type`.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип вложения',
      enumValues: attachmentTypeValues,
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description:
        'Полезная нагрузка вложения. Её точная форма зависит от типа вложения',
    },
  ],
  relatedModels: [
    'InlineKeyboardAttachment',
    'PhotoAttachment',
    'VideoAttachment',
    'AudioAttachment',
    'FileAttachment',
  ],
};

export const attachmentRequestModel: ModelDoc = {
  name: 'AttachmentRequest',
  description:
    'Вложение для отправки или редактирования сообщения. Отдельная object-страница в docs-api сейчас не раскрыта; структура агрегирована по `NewMessageBody`, `POST /messages`, `PUT /messages` и `POST /uploads`.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description:
        'Тип прикладываемого вложения. Для медиа и файлов используется токен из `POST /uploads`',
      enumValues: attachmentTypeValues,
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description: 'Полезная нагрузка запроса на вложение',
    },
    {
      name: 'payload.token',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Токен загруженного файла для вложений типов `image`, `video`, `audio` и `file`',
    },
    {
      name: 'payload.buttons',
      type: 'Button[][]',
      required: false,
      nullable: true,
      description:
        'Кнопки встроенной клавиатуры для типа `inline_keyboard`',
      constraints: 'максимум 30 рядов и 210 кнопок всего',
    },
  ],
  relatedModels: ['Button', 'InlineKeyboardAttachment'],
};

export const inlineKeyboardModel: ModelDoc = {
  name: 'InlineKeyboardAttachment',
  description:
    'Встроенная клавиатура, прикрепляемая к сообщению. Допускается не более 210 кнопок в 30 рядах.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип вложения',
      enumValues: ['inline_keyboard'],
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description: 'Содержимое клавиатуры',
    },
    {
      name: 'payload.buttons',
      type: 'Button[][]',
      required: true,
      nullable: false,
      description: 'Массив рядов с кнопками',
      constraints: 'максимум 30 рядов, 210 кнопок всего',
    },
  ],
  relatedModels: ['Button'],
};

export const photoAttachmentModel: ModelDoc = {
  name: 'PhotoAttachment',
  description: 'Фото-вложение в сообщении.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип вложения',
      enumValues: ['image'],
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description: 'Данные фото',
    },
    {
      name: 'payload.photo_id',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'ID фото',
    },
    {
      name: 'payload.token',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Токен фото',
    },
    {
      name: 'payload.url',
      type: 'string',
      required: true,
      nullable: false,
      description: 'URL фото',
    },
  ],
};

export const videoAttachmentModel: ModelDoc = {
  name: 'VideoAttachment',
  description: 'Видео-вложение в сообщении.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип вложения',
      enumValues: ['video'],
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description: 'Данные видео',
    },
    {
      name: 'payload.id',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'ID видео',
    },
    {
      name: 'payload.token',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Токен видео',
    },
    {
      name: 'payload.url',
      type: 'string',
      required: true,
      nullable: false,
      description: 'URL превью',
    },
    {
      name: 'payload.thumbnail',
      type: 'string',
      required: false,
      nullable: true,
      description: 'URL миниатюры',
    },
    {
      name: 'payload.width',
      type: 'int32',
      required: false,
      nullable: true,
      description: 'Ширина видео',
    },
    {
      name: 'payload.height',
      type: 'int32',
      required: false,
      nullable: true,
      description: 'Высота видео',
    },
    {
      name: 'payload.duration',
      type: 'int32',
      required: false,
      nullable: true,
      description: 'Длительность в секундах',
    },
  ],
};

export const audioAttachmentModel: ModelDoc = {
  name: 'AudioAttachment',
  description: 'Аудио-вложение в сообщении.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип вложения',
      enumValues: ['audio'],
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description: 'Данные аудио',
    },
    {
      name: 'payload.id',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'ID аудио',
    },
    {
      name: 'payload.token',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Токен аудио',
    },
    {
      name: 'payload.url',
      type: 'string',
      required: true,
      nullable: false,
      description: 'URL аудио',
    },
  ],
};

export const fileAttachmentModel: ModelDoc = {
  name: 'FileAttachment',
  description: 'Файловое вложение в сообщении.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип вложения',
      enumValues: ['file'],
    },
    {
      name: 'payload',
      type: 'object',
      required: true,
      nullable: false,
      description: 'Данные файла',
    },
    {
      name: 'payload.file_id',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'ID файла',
    },
    {
      name: 'payload.token',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Токен файла',
    },
    {
      name: 'payload.url',
      type: 'string',
      required: true,
      nullable: false,
      description: 'URL файла',
    },
    {
      name: 'payload.filename',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Имя файла',
    },
    {
      name: 'payload.size',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Размер файла в байтах',
    },
  ],
};

export const buttonModel: ModelDoc = {
  name: 'Button',
  description: 'Кнопка встроенной клавиатуры.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип кнопки',
      enumValues: [
        'callback',
        'link',
        'request_contact',
        'request_geo_location',
        'open_app',
        'message',
      ],
    },
    {
      name: 'text',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Текст на кнопке',
    },
    {
      name: 'payload',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Payload для callback-кнопок. При нажатии попадает в update типа `message_callback`',
    },
    {
      name: 'url',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Ссылка для кнопок типа `link`',
    },
    {
      name: 'intent',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Стиль кнопки',
      enumValues: ['positive', 'negative', 'default'],
    },
  ],
  relatedModels: ['InlineKeyboardAttachment'],
};

export const attachmentModels: ModelDoc[] = [
  attachmentModel,
  attachmentRequestModel,
  inlineKeyboardModel,
  photoAttachmentModel,
  videoAttachmentModel,
  audioAttachmentModel,
  fileAttachmentModel,
  buttonModel,
];
