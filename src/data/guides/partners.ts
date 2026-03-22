import type { GuideDoc } from '../types.js';

export const partnerIntegrationGuide: GuideDoc = {
  id: 'partner-integration',
  category: 'partners',
  title: 'Интеграция с партнёрами',
  summary:
    'Подключение чат-платформ, конструкторов ботов и CRM через токен бота после его модерации.',
  sections: [
    {
      heading: 'Когда интеграция становится доступна',
      content:
        'Интеграции с партнёрами открываются только после создания и успешной модерации бота. Для подключения используется токен бота.',
    },
    {
      heading: 'Где взять токен',
      content:
        'Токен находится на платформе MAX для партнёров в разделе Чат-боты → Интеграция → Получить токен. Этот же токен используется для работы с Bot API.',
    },
    {
      heading: 'Категории партнёров',
      content:
        'Документация делит партнёров на три категории: чат-платформы поддержки, конструкторы ботов и CRM-системы.',
      subsections: [
        {
          heading: 'Чат-платформы поддержки',
          content:
            'Они собирают обращения из MAX и других каналов в едином окне оператора. На официальной странице перечислены Jivo, Voximplant Kit, Naumen, Edna Chat Center, Webim, Chat2Desk, CraftTalk, OMNIDESK, Callibri, Юздеск, Fasttrack, Talk-Me, Angry.Space, AutoFAQ, Sherlock Platform, UIS, Flomni и naimi.ai.',
        },
        {
          heading: 'Конструкторы ботов',
          content:
            'Эта категория предназначена для no-code сценариев и быстрой сборки диалогов. На странице перечислены Aimylogic (JAICP), Botmother, Jetbot, Aiso, Just AI (JAICP), Smartbot, Watbot и VK CXhub.',
        },
        {
          heading: 'CRM-системы',
          content:
            'CRM получают сообщения из MAX, помогают маршрутизировать обращения и связывать диалоги с карточками клиентов. На официальной странице указаны Битрикс24, RetailCRM, YClients, BPMSoft и Мегаплан.',
        },
      ],
    },
    {
      heading: 'Роль интеграций',
      content:
        'MAX позиционирует эти интеграции как способ подключить готовые каналы поддержки, сценарии без разработки и автоматизацию работы с клиентской базой без самостоятельной реализации всех систем с нуля.',
    },
  ],
  relatedGuides: ['service-selection', 'bot-creation'],
};

export const partnerGuides: GuideDoc[] = [partnerIntegrationGuide];
