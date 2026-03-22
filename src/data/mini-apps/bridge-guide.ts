import type { GuideDoc } from '../types.js';

export const bridgeApiGuide: GuideDoc = {
  id: 'bridge-api',
  category: 'mini-apps',
  title: 'MAX Bridge',
  summary:
    'Обзор библиотеки MAX Bridge: подключение `max-web-app.js`, объект `window.WebApp`, события и системные API для мини-приложений',
  sections: [
    {
      heading: 'Подключение библиотеки',
      content:
        'Подключите скрипт `https://st.max.ru/js/max-web-app.js`. После этого мини-приложение получает доступ к глобальному объекту `window.WebApp` без отдельной инициализации.',
    },
    {
      heading: 'Основной объект window.WebApp',
      content:
        'Через `window.WebApp` мини-приложение получает стартовые данные (`initData`, `initDataUnsafe`), информацию о платформе (`ios`, `android`, `desktop`, `web`), версию клиента MAX и методы для закрытия приложения, подписки на события и системных действий.',
    },
    {
      heading: 'Пользовательские жесты и безопасность',
      content:
        'Для методов `openLink`, `openMaxLink`, `shareContent`, `shareMaxContent` и `downloadFile` требуется активное действие пользователя в интерфейсе мини-приложения. Без клика клиент может вернуть ошибки вида `user_gesture_required`.',
    },
    {
      heading: 'Объекты Bridge',
      content:
        'Bridge документирует `BackButton`, `ScreenCapture`, `HapticFeedback`, `DeviceStorage`, `SecureStorage` и `BiometricManager`. Отдельно учитывайте platform-specific ограничения: `DeviceStorage` и `SecureStorage` недоступны в веб-версии, а `BiometricManager` требует первичной инициализации через `init()`.',
    },
    {
      heading: 'События и ответы клиента',
      content:
        'Bridge API описывает события уровня клиента (`WebAppReady`, `WebAppOpenLink`, `WebAppMaxShare`, `WebAppDownloadFile`, `WebAppOpenCodeReader` и другие) вместе с `eventData`, типовыми ответами клиента и кодами ошибок.',
    },
    {
      heading: 'Что использовать в MCP',
      content:
        'Для общего обзора достаточно этого guide, а для детальной структуры объектов, методов, событий и кодов ошибок используйте отдельный resource/tool `get_bridge_api`.',
    },
  ],
  relatedGuides: ['mini-apps-introduction', 'data-validation'],
  relatedEndpoints: ['POST /messages'],
};
