import type { ModelDoc } from '../types.js';

export const subscriptionModel: ModelDoc = {
  name: 'Subscription',
  description: 'Webhook-подписка бота. Определяет URL для получения обновлений и типы событий.',
  fields: [
    { name: 'url', type: 'string', required: true, nullable: false, description: 'HTTPS URL для получения обновлений' },
    { name: 'time', type: 'int64', required: true, nullable: false, description: 'Время создания подписки (Unix ms)' },
    { name: 'update_types', type: 'string[]', required: false, nullable: true, description: 'Типы обновлений (null = все типы)', enumValues: ['message_created', 'message_callback', 'message_edited', 'message_removed', 'bot_added', 'bot_removed', 'dialog_muted', 'dialog_unmuted', 'dialog_cleared', 'dialog_removed', 'user_added', 'user_removed', 'bot_started', 'bot_stopped', 'chat_title_changed'] },
    { name: 'version', type: 'string', required: false, nullable: true, description: 'Версия API подписки' },
  ],
};

export const subscriptionModels: ModelDoc[] = [subscriptionModel];
