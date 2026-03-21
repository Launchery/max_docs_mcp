import type { ModelDoc } from '../types.js';

export const chatMemberModel: ModelDoc = {
  name: 'ChatMember',
  description: 'Участник чата. Расширяет User дополнительными полями о членстве в чате.',
  fields: [
    { name: 'user_id', type: 'int64', required: true, nullable: false, description: 'ID пользователя' },
    { name: 'first_name', type: 'string', required: true, nullable: false, description: 'Имя' },
    { name: 'last_name', type: 'string', required: false, nullable: true, description: 'Фамилия' },
    { name: 'username', type: 'string', required: false, nullable: true, description: 'Username' },
    { name: 'is_bot', type: 'boolean', required: true, nullable: false, description: 'Является ли ботом' },
    { name: 'last_access_time', type: 'int64', required: true, nullable: false, description: 'Время последнего захода (Unix ms)' },
    { name: 'is_owner', type: 'boolean', required: true, nullable: false, description: 'Является ли владельцем чата' },
    { name: 'is_admin', type: 'boolean', required: true, nullable: false, description: 'Является ли администратором' },
    { name: 'join_time', type: 'int64', required: true, nullable: false, description: 'Время вступления в чат (Unix ms)' },
    { name: 'permissions', type: 'ChatAdminPermission[]', required: false, nullable: true, description: 'Права администратора', enumValues: ['read_all_messages', 'add_remove_members', 'add_admins', 'change_chat_info', 'pin_message', 'write', 'can_call', 'edit_link', 'post_edit_delete_message', 'edit_message', 'delete_message'] },
    { name: 'alias', type: 'string', required: false, nullable: true, description: 'Псевдоним администратора' },
  ],
  relatedModels: ['User'],
};

export const chatMemberModels: ModelDoc[] = [chatMemberModel];
