import type { EndpointDoc } from '../types.js';

export const membersEndpoints: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/chats/{chatId}/members',
    group: 'members',
    summary: 'Получить список участников чата',
    description: 'Возвращает список участников чата с пагинацией. Можно фильтровать по конкретным user_ids.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
      { name: 'user_ids', location: 'query', type: 'int64[]', required: false, description: 'Фильтр по ID пользователей (массив)' },
      { name: 'marker', location: 'query', type: 'int64', required: false, description: 'Маркер для пагинации' },
      { name: 'count', location: 'query', type: 'integer', required: false, description: 'Количество на страницу', constraints: '1-100', defaultValue: '20' },
    ],
    response: {
      description: 'Список участников',
      fields: [
        { name: 'members', type: 'ChatMember[]', required: true, nullable: false, description: 'Массив участников' },
        { name: 'marker', type: 'int64', required: false, nullable: true, description: 'Маркер следующей страницы' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" "https://platform-api.max.ru/chats/12345/members?count=10"',
    },
  },
  {
    method: 'POST',
    path: '/chats/{chatId}/members',
    group: 'members',
    summary: 'Добавить участников в чат',
    description: 'Добавляет одного или нескольких пользователей в чат. Возвращает информацию о неудачных добавлениях.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    requestBody: {
      description: 'Список пользователей для добавления',
      fields: [
        { name: 'user_ids', type: 'int64[]', required: true, nullable: false, description: 'Массив ID пользователей для добавления' },
      ],
    },
    response: {
      description: 'Результат добавления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
        { name: 'failed_user_ids', type: 'int64[]', required: false, nullable: true, description: 'ID пользователей, которых не удалось добавить' },
        { name: 'failed_user_details', type: 'object[]', required: false, nullable: true, description: 'Детали ошибок для каждого неудачного добавления' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"user_ids":[111,222]}\' https://platform-api.max.ru/chats/12345/members',
    },
  },
  {
    method: 'DELETE',
    path: '/chats/{chatId}/members',
    group: 'members',
    summary: 'Удалить участника из чата',
    description: 'Удаляет пользователя из чата. Опционально можно заблокировать.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
      { name: 'user_id', location: 'query', type: 'int64', required: true, description: 'ID пользователя для удаления' },
      { name: 'block', location: 'query', type: 'boolean', required: false, description: 'Заблокировать пользователя' },
    ],
    response: {
      description: 'Результат удаления',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" "https://platform-api.max.ru/chats/12345/members?user_id=111&block=true"',
    },
  },
  {
    method: 'GET',
    path: '/chats/{chatId}/members/admins',
    group: 'members',
    summary: 'Получить список администраторов',
    description: 'Возвращает список администраторов чата.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Список администраторов',
      fields: [
        { name: 'members', type: 'ChatMember[]', required: true, nullable: false, description: 'Массив администраторов' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345/members/admins',
    },
  },
  {
    method: 'POST',
    path: '/chats/{chatId}/members/admins',
    group: 'members',
    summary: 'Назначить администратора',
    description: 'Назначает пользователя администратором чата с указанными правами.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    requestBody: {
      description: 'Данные нового администратора',
      fields: [
        { name: 'admins', type: 'object[]', required: true, nullable: false, description: 'Массив объектов с user_id, permissions и alias' },
      ],
    },
    response: {
      description: 'Результат назначения',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X POST -H "Authorization: {access_token}" -H "Content-Type: application/json" -d \'{"admins":[{"user_id":111,"permissions":["read_all_messages","pin_message"]}]}\' https://platform-api.max.ru/chats/12345/members/admins',
    },
  },
  {
    method: 'DELETE',
    path: '/chats/{chatId}/members/admins/{userId}',
    group: 'members',
    summary: 'Снять администратора',
    description: 'Снимает права администратора с пользователя.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
      { name: 'userId', location: 'path', type: 'int64', required: true, description: 'ID пользователя' },
    ],
    response: {
      description: 'Результат снятия',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345/members/admins/111',
    },
  },
  {
    method: 'GET',
    path: '/chats/{chatId}/members/me',
    group: 'members',
    summary: 'Получить членство бота в чате',
    description: 'Возвращает информацию о текущем боте как участнике чата: права, роль, время вступления.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Членство бота (ChatMember)',
      fields: [
        { name: 'user_id', type: 'int64', required: true, nullable: false, description: 'ID бота' },
        { name: 'is_owner', type: 'boolean', required: true, nullable: false, description: 'Является ли владельцем' },
        { name: 'is_admin', type: 'boolean', required: true, nullable: false, description: 'Является ли администратором' },
        { name: 'join_time', type: 'int64', required: true, nullable: false, description: 'Время вступления (Unix ms)' },
        { name: 'permissions', type: 'ChatAdminPermission[]', required: false, nullable: true, description: 'Права администратора' },
      ],
    },
    example: {
      curl: 'curl -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345/members/me',
    },
  },
  {
    method: 'DELETE',
    path: '/chats/{chatId}/members/me',
    group: 'members',
    summary: 'Выйти из чата',
    description: 'Бот покидает указанный чат.',
    parameters: [
      { name: 'chatId', location: 'path', type: 'int64', required: true, description: 'Идентификатор чата' },
    ],
    response: {
      description: 'Результат выхода',
      fields: [
        { name: 'success', type: 'boolean', required: true, nullable: false, description: 'Успешность операции' },
      ],
    },
    example: {
      curl: 'curl -X DELETE -H "Authorization: {access_token}" https://platform-api.max.ru/chats/12345/members/me',
    },
  },
];
