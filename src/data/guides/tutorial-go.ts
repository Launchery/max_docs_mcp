import type { GuideDoc, CodeExample } from '../types.js';

const codeExamples: CodeExample[] = [
  {
    language: 'bash',
    title: 'Настройка проекта',
    code: `mkdir my-first-bot
cd my-first-bot
go mod init first-max-bot
go get github.com/max-messenger/max-bot-api-client-go`,
    description: 'Создание директории проекта, инициализация Go-модуля и установка клиентской библиотеки.',
  },
  {
    language: 'go',
    title: 'Отправка ответа',
    code: `api.Messages.Send(maxbot.NewMessage().
  SetChat(chatId).
  SetText(responseText))`,
    description: 'Отправка текстового сообщения в указанный чат с помощью API.',
  },
];

export const helloBotGoGuide: GuideDoc = {
  id: 'hello-bot-go',
  category: 'tutorials',
  title: 'Hello Bot на Go',
  summary: 'Пошаговое руководство по созданию первого бота MAX на Golang',
  sections: [
    {
      heading: 'Инициализация проекта',
      content:
        'Создайте директорию проекта командой mkdir my-first-bot, инициализируйте Go-модуль с помощью go mod init и установите клиентскую библиотеку через go get.',
    },
    {
      heading: 'Основная функциональность',
      content:
        'Инициализируйте экземпляр бота с токеном, используйте методы API для отправки сообщений и настройте обработку входящих обновлений.',
    },
    {
      heading: 'Обработка сообщений',
      content:
        'Обрабатывайте входящие сообщения через события типа MessageCreatedUpdate. Каждое событие содержит информацию о сообщении, отправителе и чате.',
    },
    {
      heading: 'Тестирование',
      content:
        'Для тестирования отправьте команду /hello в чат с ботом. Бот должен ответить приветственным сообщением.',
    },
    {
      heading: 'Ресурсы',
      content:
        'Полный исходный код примеров доступен в GitHub-репозитории проекта.',
    },
  ],
  codeExamples,
  relatedGuides: ['bot-coding-preparation', 'sdk-go'],
  relatedEndpoints: ['POST /messages', 'GET /updates'],
};

export const tutorialGoGuides: GuideDoc[] = [helloBotGoGuide];
