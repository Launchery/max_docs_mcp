import type { ModelDoc } from '../types.js';

const updateTypeValues = [
  'message_created',
  'message_callback',
  'message_edited',
  'message_removed',
  'bot_added',
  'bot_removed',
  'dialog_muted',
  'dialog_unmuted',
  'dialog_cleared',
  'dialog_removed',
  'user_added',
  'user_removed',
  'bot_started',
  'bot_stopped',
  'chat_title_changed',
];

export const callbackModel: ModelDoc = {
  name: 'Callback',
  description:
    'Данные callback-кнопки внутри update типа `message_callback`. Отдельная object-страница в docs-api сейчас не раскрыта, поэтому структура агрегирована по методам `GET /updates` и `POST /answers`.',
  fields: [
    {
      name: 'callback_id',
      type: 'string',
      required: true,
      nullable: false,
      description:
        'Идентификатор callback. Это значение используется при вызове `POST /answers`',
    },
    {
      name: 'payload',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Payload callback-кнопки, если он был задан при отправке сообщения',
    },
  ],
};

export const updateModel: ModelDoc = {
  name: 'Update',
  description:
    'Событие, получаемое ботом через webhook или long polling. Базовая страница объекта в docs-api описывает `message_created`, а остальные поля зависят от `update_type`.',
  fields: [
    {
      name: 'update_type',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Тип обновления',
      enumValues: updateTypeValues,
    },
    {
      name: 'timestamp',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Unix-время, когда произошло событие',
    },
    {
      name: 'message',
      type: 'Message',
      required: false,
      nullable: true,
      description:
        'Сообщение для событий `message_created`, `message_edited` и `message_callback`',
    },
    {
      name: 'user_locale',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Текущий язык пользователя в формате IETF BCP 47. Доступен только в диалогах',
    },
    {
      name: 'chat_id',
      type: 'int64',
      required: false,
      nullable: true,
      description:
        'ID чата. Используется в ряде событий, например при старте бота по диплинку',
    },
    {
      name: 'user',
      type: 'User',
      required: false,
      nullable: true,
      description: 'Пользователь, связанный с событием',
    },
    {
      name: 'inviter_id',
      type: 'int64',
      required: false,
      nullable: true,
      description: 'ID пользователя, который добавил бота или участника',
    },
    {
      name: 'admin_id',
      type: 'int64',
      required: false,
      nullable: true,
      description: 'ID администратора, который выполнил действие',
    },
    {
      name: 'callback',
      type: 'Callback',
      required: false,
      nullable: true,
      description: 'Данные callback для события `message_callback`',
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Новое название чата для события `chat_title_changed`',
    },
    {
      name: 'message_id',
      type: 'string',
      required: false,
      nullable: true,
      description: 'ID удалённого сообщения для события `message_removed`',
    },
    {
      name: 'payload',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Payload диплинка. Используется, например, в событии `bot_started`',
    },
  ],
  relatedModels: ['Message', 'User', 'Callback'],
};

export const updateModels: ModelDoc[] = [callbackModel, updateModel];
