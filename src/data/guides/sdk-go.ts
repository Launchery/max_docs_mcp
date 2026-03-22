import type { GuideDoc } from '../types.js';

export const sdkGoGuide: GuideDoc = {
  id: 'sdk-go',
  category: 'sdk',
  title: 'Go SDK',
  summary: 'Документация по библиотеке max-bot-api-client-go для Golang',
  sections: [
    {
      heading: 'Установка',
      content:
        'Для начала работы инициализируйте Go-модуль и установите библиотеку.',
      subsections: [
        {
          heading: 'Инициализация модуля',
          content: 'go mod init first-max-bot',
        },
        {
          heading: 'Установка библиотеки',
          content: 'go get github.com/max-messenger/max-bot-api-client-go',
        },
      ],
    },
    {
      heading: 'Инициализация бота',
      content:
        'Для создания экземпляра бота используется функция maxbot.New(os.Getenv("TOKEN")), которая принимает токен бота из переменной окружения.',
    },
    {
      heading: 'Вызовы API-методов',
      content:
        'API-методы доступны через объект бота. Например: api.Bots.GetBot() — получение информации о боте, api.Messages.Send() — отправка сообщений.',
    },
    {
      heading: 'Обработка событий',
      content:
        'Работа с обновлениями осуществляется через каналы Go. Метод api.GetUpdates(ctx) возвращает канал, из которого можно читать входящие обновления в цикле.',
    },
    {
      heading: 'Ресурсы',
      content:
        'Исходный код библиотеки доступен на GitHub: https://github.com/max-messenger/max-bot-api-client-go',
    },
  ],
  codeExamples: [
    {
      title: 'Инициализация',
      language: 'go',
      code: `import maxbot "github.com/max-messenger/max-bot-api-client-go"

api := maxbot.New(os.Getenv("TOKEN"))
info, err := api.Bots.GetBot()`,
    },
    {
      title: 'Получение обновлений',
      language: 'go',
      code: `updates := api.GetUpdates(ctx)
for update := range updates {
  // обработка обновлений
}`,
    },
    {
      title: 'Отправка сообщения',
      language: 'go',
      code: `api.Messages.Send(maxbot.NewMessage().
  SetChat(chatId).
  SetText("Привет из Go!"))`,
    },
  ],
  relatedGuides: ['hello-bot-go', 'bot-coding-preparation'],
  relatedEndpoints: ['POST /messages', 'GET /updates', 'GET /me'],
};

export const sdkGoGuides: GuideDoc[] = [sdkGoGuide];
