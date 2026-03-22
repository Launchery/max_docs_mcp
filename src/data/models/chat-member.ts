import type { ModelDoc } from '../types.js';

const chatAdminPermissionValues = [
  'read_all_messages',
  'add_remove_members',
  'add_admins',
  'change_chat_info',
  'pin_message',
  'write',
  'can_call',
  'edit_link',
  'post_edit_delete_message',
  'edit_message',
  'delete_message',
];

export const chatAdminPermissionModel: ModelDoc = {
  name: 'ChatAdminPermission',
  description:
    'Перечень прав администратора группового чата. Используется в `ChatMember.permissions` и методах управления администраторами.',
  fields: [
    {
      name: 'value',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Одно из допустимых прав администратора',
      enumValues: chatAdminPermissionValues,
    },
  ],
};

export const chatMemberModel: ModelDoc = {
  name: 'ChatMember',
  description:
    'Вариант UserWithPhoto для участников чата. Возвращается методами из группы `/chats` и дополняет профиль данными о членстве.',
  fields: [
    {
      name: 'user_id',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Идентификатор пользователя или бота',
    },
    {
      name: 'first_name',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Отображаемое имя пользователя или бота',
    },
    {
      name: 'last_name',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Отображаемая фамилия пользователя. Для ботов поле обычно не возвращается',
    },
    {
      name: 'username',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Никнейм бота или публичное имя пользователя. Для пользователя может быть `null`',
    },
    {
      name: 'is_bot',
      type: 'boolean',
      required: true,
      nullable: false,
      description: '`true`, если это бот',
    },
    {
      name: 'last_activity_time',
      type: 'int64',
      required: true,
      nullable: false,
      description:
        'Время последней активности пользователя или бота в MAX в миллисекундах Unix time',
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      nullable: true,
      description: 'Устаревшее поле, которое скоро будет удалено',
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      nullable: true,
      description:
        'Описание пользователя или бота. Для пользователя может быть `null`',
      constraints: 'до 16000 символов',
    },
    {
      name: 'avatar_url',
      type: 'string',
      required: false,
      nullable: false,
      description: 'URL уменьшенного аватара',
    },
    {
      name: 'full_avatar_url',
      type: 'string',
      required: false,
      nullable: false,
      description: 'URL аватара в полном размере',
    },
    {
      name: 'last_access_time',
      type: 'int64',
      required: true,
      nullable: false,
      description:
        'Время последней активности пользователя внутри чата. Для суперчатов может быть равно времени вступления',
    },
    {
      name: 'is_owner',
      type: 'boolean',
      required: true,
      nullable: false,
      description: 'Является ли пользователь владельцем чата',
    },
    {
      name: 'is_admin',
      type: 'boolean',
      required: true,
      nullable: false,
      description: 'Является ли пользователь администратором чата',
    },
    {
      name: 'join_time',
      type: 'int64',
      required: true,
      nullable: false,
      description: 'Дата присоединения к чату в формате Unix time',
    },
    {
      name: 'permissions',
      type: 'ChatAdminPermission[]',
      required: false,
      nullable: true,
      description: 'Права пользователя внутри чата',
      enumValues: chatAdminPermissionValues,
    },
    {
      name: 'alias',
      type: 'string',
      required: false,
      nullable: false,
      description:
        'Заголовок администратора, который отображается на клиенте. Если не задан, клиенты подставляют стандартную подпись владельца или администратора',
    },
  ],
  relatedModels: ['User', 'UserWithPhoto', 'ChatAdminPermission'],
};

export const chatMemberModels: ModelDoc[] = [
  chatAdminPermissionModel,
  chatMemberModel,
];
