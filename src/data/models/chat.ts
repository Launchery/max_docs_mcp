import type { ModelDoc } from '../types.js';

export const chatModel: ModelDoc = {
  name: 'Chat',
  description: 'Чат в MAX. Может быть диалогом (dialog), групповым чатом (chat), каналом (channel) или лентой (feed).',
  fields: [
    { name: 'chat_id', type: 'int64', required: true, nullable: false, description: 'Уникальный идентификатор чата' },
    { name: 'type', type: 'string', required: true, nullable: false, description: 'Тип чата', enumValues: ['dialog', 'chat', 'channel', 'feed'] },
    { name: 'status', type: 'string', required: true, nullable: false, description: 'Статус чата', enumValues: ['active', 'removed', 'left', 'closed'] },
    { name: 'title', type: 'string', required: false, nullable: true, description: 'Название чата (null для диалогов)' },
    { name: 'icon', type: 'Image', required: false, nullable: true, description: 'Иконка чата' },
    { name: 'last_event_time', type: 'int64', required: true, nullable: false, description: 'Время последнего события в чате (Unix ms)' },
    { name: 'participants_count', type: 'int32', required: true, nullable: false, description: 'Количество участников' },
    { name: 'owner_id', type: 'int64', required: false, nullable: true, description: 'ID владельца чата' },
    { name: 'participants', type: 'object', required: false, nullable: true, description: 'Информация об участниках' },
    { name: 'is_public', type: 'boolean', required: true, nullable: false, description: 'Публичный ли чат' },
    { name: 'link', type: 'string', required: false, nullable: true, description: 'Ссылка на публичный чат' },
    { name: 'description', type: 'string', required: false, nullable: true, description: 'Описание чата' },
    { name: 'dialog_with_user', type: 'UserWithPhoto', required: false, nullable: true, description: 'Собеседник (только для диалогов)' },
    { name: 'chat_message_id', type: 'string', required: false, nullable: true, description: 'ID последнего сообщения' },
    { name: 'pinned_message', type: 'Message', required: false, nullable: true, description: 'Закреплённое сообщение' },
  ],
  relatedModels: ['Message', 'Image', 'User'],
};

export const chatModels: ModelDoc[] = [chatModel];
