import type { ModelDoc } from '../types.js';

export const updateModel: ModelDoc = {
  name: 'Update',
  description: 'Обновление (событие), получаемое ботом через webhook или long polling. Тип события определяется полем update_type.',
  fields: [
    { name: 'update_type', type: 'string', required: true, nullable: false, description: 'Тип обновления', enumValues: ['message_created', 'message_callback', 'message_edited', 'message_removed', 'bot_added', 'bot_removed', 'dialog_muted', 'dialog_unmuted', 'dialog_cleared', 'dialog_removed', 'user_added', 'user_removed', 'bot_started', 'bot_stopped', 'chat_title_changed'] },
    { name: 'timestamp', type: 'int64', required: true, nullable: false, description: 'Время события (Unix ms)' },
    { name: 'message', type: 'Message', required: false, nullable: true, description: 'Сообщение (для событий message_created, message_edited, message_callback)' },
    { name: 'user_locale', type: 'string', required: false, nullable: true, description: 'Локаль пользователя (IETF BCP 47, только для диалогов)' },
    { name: 'chat_id', type: 'int64', required: false, nullable: true, description: 'ID чата (для событий чата)' },
    { name: 'user', type: 'User', required: false, nullable: true, description: 'Пользователь, связанный с событием' },
    { name: 'inviter_id', type: 'int64', required: false, nullable: true, description: 'ID пригласившего (для bot_added, user_added)' },
    { name: 'admin_id', type: 'int64', required: false, nullable: true, description: 'ID администратора, выполнившего действие' },
    { name: 'callback', type: 'Callback', required: false, nullable: true, description: 'Данные callback (для message_callback)' },
    { name: 'title', type: 'string', required: false, nullable: true, description: 'Новое название чата (для chat_title_changed)' },
    { name: 'message_id', type: 'string', required: false, nullable: true, description: 'ID удалённого сообщения (для message_removed)' },
  ],
  relatedModels: ['Message', 'User', 'Callback'],
};

export const updateModels: ModelDoc[] = [updateModel];
