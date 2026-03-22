import type { GuideDoc } from '../types.js';

export const partnerIntegrationGuide: GuideDoc = {
  id: 'partner-integration',
  category: 'partners',
  title: 'Интеграция с партнёрами',
  summary:
    'Подключение платформ поддержки, конструкторов ботов и CRM-систем к MAX',
  sections: [
    {
      heading: 'Токен интеграции',
      content:
        'Для подключения партнёрского сервиса необходимо получить токен интеграции. Путь: Чат-боты → Интеграция → Получить токен.',
    },
    {
      heading: 'Платформы чат-поддержки',
      content:
        'Поддерживаемые платформы чат-поддержки: Jivo, Voximplant, Naumen, Edna Chat Center, Webim, Chat2Desk, Craft Talk, OMNIDESK, Callibri, Юздеск, Fasttrack, Talk-Me, Angry.Space, AutoFAQ, Sherlock Platform, UISCOM, Flomni, naimi.ai.',
    },
    {
      heading: 'Конструкторы ботов (no-code)',
      content:
        'Конструкторы ботов, не требующие программирования: Aimylogic (JAICP), Botmother, Jetbot, Aiso, Just AI (JAICP), Smartbot, Watbot, VK CXhub.',
    },
    {
      heading: 'CRM-системы',
      content:
        'Интеграция с CRM-системами: Битрикс24, RetailCRM, YClients, BPMSoft, Мегаплан.',
    },
    {
      heading: 'Преимущества платформы',
      content:
        'Централизованная обработка сообщений, автоматическое распределение лидов, интеграция с ИИ, государственная сертификация безопасности.',
    },
  ],
  relatedGuides: ['service-selection', 'bot-creation'],
};

export const partnerGuides: GuideDoc[] = [partnerIntegrationGuide];
