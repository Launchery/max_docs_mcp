import type { ModelDoc } from '../types.js';

export const userModel: ModelDoc = {
  name: 'User',
  description: 'Пользователь MAX. Базовая модель для всех пользователей, включая ботов.',
  fields: [
    { name: 'user_id', type: 'int64', required: true, nullable: false, description: 'Уникальный идентификатор пользователя' },
    { name: 'first_name', type: 'string', required: true, nullable: false, description: 'Имя пользователя' },
    { name: 'last_name', type: 'string', required: false, nullable: true, description: 'Фамилия пользователя' },
    { name: 'username', type: 'string', required: false, nullable: true, description: 'Уникальное имя пользователя (username)' },
    { name: 'is_bot', type: 'boolean', required: true, nullable: false, description: 'true если пользователь является ботом' },
    { name: 'last_activity_time', type: 'int64', required: true, nullable: false, description: 'Время последней активности (Unix ms)' },
    { name: 'description', type: 'string', required: false, nullable: true, description: 'Описание пользователя', constraints: 'максимум 16000 символов' },
    { name: 'avatar_url', type: 'string', required: false, nullable: true, description: 'URL маленького аватара' },
    { name: 'full_avatar_url', type: 'string', required: false, nullable: true, description: 'URL полноразмерного аватара' },
  ],
  relatedModels: ['BotInfo', 'ChatMember'],
};

export const botInfoModel: ModelDoc = {
  name: 'BotInfo',
  description: 'Расширенная информация о боте. Наследует все поля User и добавляет список команд.',
  fields: [
    { name: 'user_id', type: 'int64', required: true, nullable: false, description: 'Уникальный идентификатор бота' },
    { name: 'first_name', type: 'string', required: true, nullable: false, description: 'Имя бота' },
    { name: 'last_name', type: 'string', required: false, nullable: true, description: 'Фамилия бота' },
    { name: 'username', type: 'string', required: false, nullable: true, description: 'Username бота' },
    { name: 'is_bot', type: 'boolean', required: true, nullable: false, description: 'Всегда true' },
    { name: 'last_activity_time', type: 'int64', required: true, nullable: false, description: 'Время последней активности (Unix ms)' },
    { name: 'description', type: 'string', required: false, nullable: true, description: 'Описание бота', constraints: 'максимум 16000 символов' },
    { name: 'avatar_url', type: 'string', required: false, nullable: true, description: 'URL маленького аватара' },
    { name: 'full_avatar_url', type: 'string', required: false, nullable: true, description: 'URL полноразмерного аватара' },
    { name: 'commands', type: 'BotCommand[]', required: false, nullable: true, description: 'Список команд бота', constraints: 'максимум 32 команды' },
  ],
  relatedModels: ['User', 'BotCommand'],
};

export const userModels: ModelDoc[] = [userModel, botInfoModel];
