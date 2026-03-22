import type { ModelDoc } from '../types.js';

const subscriptionUpdateTypes = [
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

export const subscriptionModel: ModelDoc = {
  name: 'Subscription',
  description:
    'Webhook-подписка бота. Отдельная object-страница в docs-api сейчас не опубликована; описание агрегировано по методам `GET /subscriptions` и `POST /subscriptions`.',
  fields: [
    {
      name: 'url',
      type: 'string',
      required: true,
      nullable: false,
      description: 'HTTPS URL webhook-endpoint бота',
      constraints: 'должен начинаться с https://',
    },
    {
      name: 'update_types',
      type: 'string[]',
      required: false,
      nullable: true,
      description:
        'Типы событий, на которые подписан webhook. Если поле не задано, бот получает все типы',
      enumValues: subscriptionUpdateTypes,
    },
  ],
};

export const subscriptionModels: ModelDoc[] = [subscriptionModel];
