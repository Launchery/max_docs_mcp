import type { ModelDoc } from '../types.js';

const userBaseFields = [
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
      'Время последней активности в MAX в миллисекундах Unix time. Может отсутствовать, если пользователь скрыл онлайн-статус',
  },
  {
    name: 'name',
    type: 'string',
    required: false,
    nullable: true,
    description: 'Устаревшее поле, которое скоро будет удалено',
  },
] satisfies ModelDoc['fields'];

const userWithPhotoFields = [
  ...userBaseFields,
  {
    name: 'description',
    type: 'string',
    required: false,
    nullable: true,
    description:
      'Описание пользователя или бота. Для пользователя может быть `null`, если описание не заполнено',
    constraints: 'до 16000 символов',
  },
  {
    name: 'avatar_url',
    type: 'string',
    required: false,
    nullable: false,
    description: 'URL аватара пользователя или бота в уменьшенном размере',
  },
  {
    name: 'full_avatar_url',
    type: 'string',
    required: false,
    nullable: false,
    description: 'URL аватара пользователя или бота в полном размере',
  },
] satisfies ModelDoc['fields'];

export const userModel: ModelDoc = {
  name: 'User',
  description:
    'Базовый вариант объекта пользователя или бота без аватара и описания.',
  fields: userBaseFields,
  relatedModels: ['UserWithPhoto', 'BotInfo', 'ChatMember'],
};

export const userWithPhotoModel: ModelDoc = {
  name: 'UserWithPhoto',
  description:
    'Расширенный вариант User с URL аватара и описанием профиля.',
  fields: userWithPhotoFields,
  relatedModels: ['User', 'BotInfo', 'ChatMember'],
};

export const botCommandModel: ModelDoc = {
  name: 'BotCommand',
  description:
    'Команда бота из массива `BotInfo.commands`. Публичная object-страница в docs-api доступна, но в текущем рендере сайта структура раскрыта неполностью; здесь зафиксированы поля, используемые в SDK и примерах.',
  fields: [
    {
      name: 'name',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Имя команды без ведущего `/`, например `hello`',
    },
    {
      name: 'description',
      type: 'string',
      required: true,
      nullable: false,
      description: 'Краткое описание команды, которое увидит пользователь',
    },
  ],
  relatedModels: ['BotInfo'],
};

export const botInfoModel: ModelDoc = {
  name: 'BotInfo',
  description:
    'Вариант UserWithPhoto, который возвращается методом `GET /me` и дополнительно содержит список команд бота.',
  fields: [
    ...userWithPhotoFields,
    {
      name: 'commands',
      type: 'BotCommand[]',
      required: false,
      nullable: true,
      description: 'Команды, поддерживаемые ботом',
      constraints: 'до 32 элементов',
    },
  ],
  relatedModels: ['User', 'UserWithPhoto', 'BotCommand'],
};

export const userModels: ModelDoc[] = [
  userModel,
  userWithPhotoModel,
  botCommandModel,
  botInfoModel,
];
