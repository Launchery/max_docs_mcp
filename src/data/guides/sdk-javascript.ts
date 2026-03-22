import type { GuideDoc } from '../types.js';

export const sdkJavascriptGuide: GuideDoc = {
  id: 'sdk-javascript',
  category: 'sdk',
  title: 'JavaScript/TypeScript SDK',
  summary:
    'Полная документация по библиотеке @maxhub/max-bot-api для JavaScript и TypeScript',
  sections: [
    {
      heading: 'Установка',
      content:
        'Библиотека доступна для установки через несколько пакетных менеджеров.',
      subsections: [
        {
          heading: 'npm',
          content: 'npm install --save @maxhub/max-bot-api',
        },
        {
          heading: 'yarn',
          content: 'yarn add @maxhub/max-bot-api',
        },
        {
          heading: 'pnpm',
          content: 'pnpm add @maxhub/max-bot-api',
        },
        {
          heading: 'deno',
          content: 'deno add npm:@maxhub/max-bot-api',
        },
      ],
    },
    {
      heading: 'Слушатели событий',
      content:
        'Бот поддерживает следующие события: bot_started, message_created, message_removed, message_edited, bot_added, bot_removed, user_added, user_removed, chat_title_changed, message_callback.',
    },
    {
      heading: 'Входящие сообщения',
      content:
        'Для обработки входящих сообщений используются следующие методы: bot.command(\'start\', ...) — обработка команд, bot.hears(\'text\', ...) — обработка текстовых паттернов, bot.action(\'payload\', ...) — обработка нажатий на кнопки.',
    },
    {
      heading: 'Исходящие сообщения',
      content:
        'Для отправки сообщений используются методы sendMessageToUser(userId, text) и sendMessageToChat(chatId, text). Поддерживается форматирование Markdown и HTML.',
    },
    {
      heading: 'Вложения (Attachments)',
      content:
        'Поддерживаемые типы вложений: ImageAttachment, VideoAttachment, AudioAttachment, FileAttachment, StickerAttachment, LocationAttachment, ShareAttachment.',
    },
    {
      heading: 'Загрузка файлов',
      content:
        'Для загрузки файлов на сервер используются методы: uploadImage(), uploadVideo(), uploadAudio(), uploadFile().',
    },
    {
      heading: 'Клавиатура и кнопки',
      content:
        'Для создания инлайн-клавиатуры используется Keyboard.inlineKeyboard(). Доступные типы кнопок: callback(), link(), requestContact(), requestGeoLocation(), openApp(), message(). Ограничения: максимум 210 кнопок, 30 строк, 7 кнопок в строке.',
    },
    {
      heading: 'Расширенные возможности',
      content:
        'Расширение контекста (context extension) позволяет добавлять пользовательские данные в контекст обработчиков. Доступ к raw API осуществляется через ctx.api.raw. Метод ctx.reply() используется для быстрого ответа на входящее сообщение.',
    },
    {
      heading: 'Ресурсы',
      content:
        'Исходный код библиотеки доступен на GitHub: https://github.com/max-messenger/max-bot-api-client-ts',
    },
  ],
  codeExamples: [
    {
      title: 'Инициализация бота',
      language: 'typescript',
      code: `import { Bot } from '@maxhub/max-bot-api';

const bot = new Bot(process.env.BOT_TOKEN);
bot.start();`,
    },
    {
      title: 'Обработка событий',
      language: 'typescript',
      code: `bot.on('message_created', (ctx) => {
  console.log('Новое сообщение:', ctx.message);
});

bot.on('bot_started', (ctx) => {
  ctx.reply('Бот запущен!');
});`,
    },
    {
      title: 'Команды и паттерны',
      language: 'typescript',
      code: `bot.command('start', (ctx) => ctx.reply('Привет!'));
bot.hears('привет', (ctx) => ctx.reply('Здравствуйте!'));
bot.action('btn_click', (ctx) => ctx.reply('Кнопка нажата!'));`,
    },
    {
      title: 'Отправка сообщений',
      language: 'typescript',
      code: `bot.api.sendMessageToUser(userId, 'Персональное сообщение');
bot.api.sendMessageToChat(chatId, 'Сообщение в чат');`,
    },
    {
      title: 'Инлайн-клавиатура',
      language: 'typescript',
      code: `import { Keyboard } from '@maxhub/max-bot-api';

const keyboard = Keyboard.inlineKeyboard([
  [Keyboard.callback('Нажми', 'btn_click')],
  [Keyboard.link('Перейти', 'https://example.com')],
]);`,
    },
  ],
  relatedGuides: ['hello-bot-javascript', 'bot-coding-preparation'],
  relatedEndpoints: [
    'POST /messages',
    'GET /updates',
    'POST /subscriptions',
    'POST /uploads',
  ],
};

export const sdkJavascriptGuides: GuideDoc[] = [sdkJavascriptGuide];
