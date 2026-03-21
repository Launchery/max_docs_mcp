import type { EndpointDoc } from '../types.js';

export const botEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/me',
    group: 'bot',
    summary: 'Получить информацию о боте',
    description: 'Возвращает информацию о текущем боте: имя, username, описание, аватар и список команд.',
    parameters: [],
    response: {
      description: 'Информация о боте (BotInfo)',
      fields: [
        { name: 'user_id', type: 'int64', required: true, nullable: false, description: 'Уникальный идентификатор пользователя' },
        { name: 'first_name', type: 'string', required: true, nullable: false, description: 'Имя' },
        { name: 'last_name', type: 'string', required: false, nullable: true, description: 'Фамилия' },
        { name: 'username', type: 'string', required: false, nullable: true, description: 'Уникальное имя пользователя' },
        { name: 'is_bot', type: 'boolean', required: true, nullable: false, description: 'Является ли пользователь ботом' },
        { name: 'last_activity_time', type: 'int64', required: true, nullable: false, description: 'Время последней активности (Unix ms)' },
        { name: 'description', type: 'string', required: false, nullable: true, description: 'Описание бота', constraints: 'max 16000 символов' },
        { name: 'avatar_url', type: 'string', required: false, nullable: true, description: 'URL аватара (маленький)' },
        { name: 'full_avatar_url', type: 'string', required: false, nullable: true, description: 'URL полного аватара' },
        { name: 'commands', type: 'BotCommand[]', required: false, nullable: true, description: 'Список команд бота', constraints: 'максимум 32 команды' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/me',
      responseJson: JSON.stringify({
        user_id: 123456,
        first_name: 'MyBot',
        username: 'my_bot',
        is_bot: true,
        last_activity_time: 1609459200000,
        description: 'Бот для демонстрации',
        commands: [{ name: 'start', description: 'Начать работу' }],
      }, null, 2),
    },
  },
];
