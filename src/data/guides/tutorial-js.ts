import type { GuideDoc, CodeExample } from '../types.js';

const codeExamples: CodeExample[] = [
  {
    language: 'bash',
    title: 'Установка',
    code: 'npm install --save @maxhub/max-bot-api',
    description: 'Установка библиотеки через npm. Также поддерживаются yarn, pnpm и deno.',
  },
  {
    language: 'typescript',
    title: 'Инициализация бота',
    code: `import { Bot } from '@maxhub/max-bot-api';

const bot = new Bot(process.env.BOT_TOKEN);
bot.start();`,
    description: 'Создание экземпляра бота с токеном из переменной окружения и запуск.',
  },
  {
    language: 'typescript',
    title: 'Обработка команды /hello',
    code: `bot.command('hello', (ctx) => {
  const user = ctx.user();
  if (!user) {
    return ctx.reply('Привет! ✨');
  }
  return ctx.reply(\`Привет, \${user}! ✨\`);
});`,
    description: 'Регистрация обработчика команды /hello с приветствием пользователя.',
  },
];

export const helloBotJsGuide: GuideDoc = {
  id: 'hello-bot-javascript',
  category: 'tutorials',
  title: 'Hello Bot на JavaScript',
  summary: 'Пошаговое руководство по созданию первого бота MAX на JavaScript',
  sections: [
    {
      heading: 'Установка библиотеки',
      content:
        'Установите библиотеку @maxhub/max-bot-api с помощью предпочтительного менеджера пакетов: npm, yarn, pnpm или deno.',
    },
    {
      heading: 'Инициализация бота',
      content:
        'Создайте экземпляр класса Bot, передав токен бота в конструктор. Рекомендуется хранить токен в переменной окружения BOT_TOKEN.',
    },
    {
      heading: 'Регистрация команды',
      content:
        'Зарегистрируйте обработчик команды /hello с помощью метода bot.command(). Метод принимает название команды и функцию-обработчик.',
    },
    {
      heading: 'Получение данных пользователя',
      content:
        'Используйте метод ctx.user() для получения информации об отправителе сообщения. Метод возвращает данные пользователя или null, если информация недоступна.',
    },
    {
      heading: 'Тестирование',
      content:
        'Для тестирования бота отправьте команду /hello в чат с ботом. Бот должен ответить приветственным сообщением с именем пользователя.',
    },
    {
      heading: 'Ресурсы',
      content:
        'Полный исходный код примеров и дополнительная документация доступны в GitHub-репозитории проекта.',
    },
  ],
  codeExamples,
  relatedGuides: ['bot-coding-preparation', 'sdk-javascript'],
  relatedEndpoints: ['POST /messages'],
};

export const tutorialJsGuides: GuideDoc[] = [helloBotJsGuide];
