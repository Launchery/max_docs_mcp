import type { ModelDoc } from '../types.js';

export const chatModel: ModelDoc = {
  name: 'Chat',
  description:
    'Объект чата. Публичная страница docs-api в основном описывает вариант группового чата, но некоторые поля явно применяются и к диалогам.',
  fields: [
    {
      name: 'chat_id',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'ID чата',
    },
    {
      name: 'type',
      type: 'string',
      required: true,
      nullable: false,
      description:
        'Тип чата. В object-странице явно описан `chat`, но в других ответах API встречаются и другие типы',
      enumValues: ['dialog', 'chat', 'channel', 'feed'],
    },
    {
      name: 'status',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Статус чата относительно текущего бота',
      enumValues: ['active', 'removed', 'left', 'closed'],
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Отображаемое название чата. Для диалогов может быть `null`',
    },
    {
      name: 'icon',
      type: 'Image',
      required: false,
      nullable: true,
      description: 'Иконка чата',
    },
    {
      name: 'last_event_time',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Время последнего события в чате',
    },
    {
      name: 'participants_count',
      type: 'int32',
      required: true,
      nullable: false,
      description: 'Количество участников чата. Для диалогов всегда `2`',
    },
    {
      name: 'owner_id',
      type: 'int64',
      required: false,
      nullable: true,
      description: 'ID владельца чата',
    },
    {
      name: 'participants',
      type: 'object',
      required: false,
      nullable: true,
      description:
        'Сводка по участникам с временем последней активности. Может быть `null`, если запрашивается список чатов',
    },
    {
      name: 'is_public',
      type: 'boolean',
      required: true,
      nullable: false,
      description: 'Доступен ли чат публично. Для диалогов всегда `false`',
    },
    {
      name: 'link',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Ссылка на чат',
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Описание чата',
    },
    {
      name: 'dialog_with_user',
      type: 'UserWithPhoto',
      required: false,
      nullable: true,
      description: 'Данные о собеседнике. Возвращаются только для чатов типа `dialog`',
    },
    {
      name: 'chat_message_id',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'ID сообщения, содержащего кнопку, через которую был инициирован чат',
    },
    {
      name: 'pinned_message',
      type: 'Message',
      required: false,
      nullable: true,
      description:
        'Закреплённое сообщение. Возвращается только при запросе конкретного чата',
    },
  ],
  relatedModels: ['Image', 'Message', 'UserWithPhoto'],
};

export const chatModels: ModelDoc[] = [chatModel];
