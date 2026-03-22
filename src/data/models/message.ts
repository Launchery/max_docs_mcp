import type { ModelDoc } from '../types.js';

export const messageModel: ModelDoc = {
  name: 'Message',
  description: 'Сообщение в чате MAX.',
  fields: [
    {
      name: 'sender',
      type: 'User',
      required: false,
      nullable: false,
      description: 'Пользователь, отправивший сообщение',
    },
    {
      name: 'recipient',
      type: 'Recipient',
      required: true,
      nullable: false,
      description: 'Получатель сообщения: пользователь или чат',
    },
    {
      name: 'timestamp',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Время создания сообщения в формате Unix time',
    },
    {
      name: 'link',
      type: 'LinkedMessage',
      required: false,
      nullable: true,
      description: 'Пересланное или ответное сообщение',
    },
    {
      name: 'body',
      type: 'MessageBody',
      required: true,
      nullable: true,
      description:
        'Содержимое сообщения: текст и вложения. Может быть `null`, если сообщение содержит только пересланное сообщение',
    },
    {
      name: 'stat',
      type: 'MessageStat',
      required: false,
      nullable: true,
      description:
        'Статистика сообщения. Возвращается только для постов в каналах',
    },
    {
      name: 'url',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Публичная ссылка на пост в канале. Для диалогов и групповых чатов обычно отсутствует',
    },
  ],
  relatedModels: [
    'User',
    'Recipient',
    'MessageBody',
    'LinkedMessage',
    'MessageStat',
  ],
};

export const messageBodyModel: ModelDoc = {
  name: 'MessageBody',
  description: 'Тело сообщения: текст, вложения и параметры форматирования.',
  fields: [
    {
      name: 'mid',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Уникальный идентификатор сообщения',
    },
    {
      name: 'seq',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Порядковый номер сообщения внутри чата',
    },
    {
      name: 'text',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Текст сообщения',
    },
    {
      name: 'attachments',
      type: 'Attachment[]',
      required: false,
      nullable: true,
      description: 'Вложения сообщения',
    },
    {
      name: 'markup',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Формат разметки текста внутри сохранённого сообщения',
      enumValues: ['markdown', 'html', 'none'],
    },
  ],
  relatedModels: ['Attachment'],
};

export const newMessageBodyModel: ModelDoc = {
  name: 'NewMessageBody',
  description:
    'Тело запроса для отправки или редактирования сообщения. Поля совпадают с объектом docs-api `NewMessageBody`.',
  fields: [
    {
      name: 'text',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Новый текст сообщения',
      constraints: 'до 4000 символов',
    },
    {
      name: 'attachments',
      type: 'AttachmentRequest[]',
      required: false,
      nullable: true,
      description:
        'Вложения сообщения. Если передан пустой массив, все вложения будут удалены',
    },
    {
      name: 'link',
      type: 'NewMessageLink',
      required: false,
      nullable: true,
      description: 'Ссылка на сообщение',
    },
    {
      name: 'notify',
      type: 'boolean',
      required: false,
      nullable: false,
      description:
        'Если `false`, участники чата не будут уведомлены. По умолчанию `true`',
      defaultValue: 'true',
    },
    {
      name: 'format',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Формат текстовой разметки для нового сообщения',
      enumValues: ['markdown', 'html'],
    },
  ],
  relatedModels: ['AttachmentRequest', 'NewMessageLink'],
};

export const newMessageLinkModel: ModelDoc = {
  name: 'NewMessageLink',
  description: 'Ссылка на сообщение при отправке нового сообщения.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип связи',
      enumValues: ['reply', 'forward'],
    },
    {
      name: 'mid',
      type: 'string',
      required: true,
      nullable: false,
      description: 'ID сообщения, на которое ссылаются',
    },
  ],
  relatedModels: ['Message'],
};

export const linkedMessageModel: ModelDoc = {
  name: 'LinkedMessage',
  description: 'Связанное сообщение внутри объекта Message.',
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип связи',
      enumValues: ['reply', 'forward'],
    },
    {
      name: 'sender',
      type: 'User',
      required: false,
      nullable: true,
      description: 'Отправитель оригинального сообщения',
    },
    {
      name: 'chat_id',
      type: 'int64',
      required: false,
      nullable: true,
      description: 'ID чата, где находится исходное сообщение',
    },
    {
      name: 'message',
      type: 'MessageBody',
      required: true,
      nullable: false,
      description: 'Тело оригинального сообщения',
    },
  ],
  relatedModels: ['User', 'MessageBody'],
};

export const recipientModel: ModelDoc = {
  name: 'Recipient',
  description: 'Получатель сообщения.',
  fields: [
    {
      name: 'chat_id',
      type: 'int64',
      required: false,
      nullable: true,
      description: 'ID чата',
    },
    {
      name: 'chat_type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип чата',
      enumValues: ['dialog', 'chat', 'channel', 'feed'],
    },
    {
      name: 'user_id',
      type: 'int64',
      required: false,
      nullable: true,
      description: 'ID пользователя для диалогов',
    },
  ],
  relatedModels: ['Chat'],
};

export const messageStatModel: ModelDoc = {
  name: 'MessageStat',
  description: 'Статистика сообщения в канале.',
  fields: [
    {
      name: 'views',
      type: 'int32',
      required: true,
      nullable: false,
      description: 'Количество просмотров',
    },
  ],
};

export const imageModel: ModelDoc = {
  name: 'Image',
  description: 'Изображение, используемое как иконка чата или аватар.',
  fields: [
    {
      name: 'url',
      type: 'string',
      required: true,
      nullable: false,
      description: 'URL изображения',
    },
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
