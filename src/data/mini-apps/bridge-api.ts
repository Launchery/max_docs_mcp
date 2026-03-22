import type { BridgeApiDoc } from '../types.js';

export const bridgeApi: BridgeApiDoc = {
  overview:
    'MAX Bridge — JavaScript API для интеграции мини-приложений с платформой MAX. Подключение библиотеки через тег script.',
  scriptUrl: 'https://st.max.ru/js/max-web-app.js',
  mainProperties: [
    {
      name: 'initData',
      type: 'string',
      description: 'Закодированные данные инициализации мини-приложения',
      readonly: true,
    },
    {
      name: 'initDataUnsafe',
      type: 'object',
      description: 'Декодированные данные инициализации (WebAppData)',
      readonly: true,
    },
    {
      name: 'platform',
      type: 'string',
      description: 'Платформа пользователя: ios, android, desktop, web',
      readonly: true,
    },
    {
      name: 'version',
      type: 'string',
      description: 'Версия API Bridge',
      readonly: true,
    },
    {
      name: 'isClosingConfirmationEnabled',
      type: 'boolean',
      description: 'Включено ли подтверждение закрытия',
      readonly: true,
    },
  ],
  coreMethods: [
    {
      name: 'ready',
      description: 'Сигнализирует о готовности мини-приложения к отображению',
      params: [],
      returnType: 'void',
    },
    {
      name: 'close',
      description: 'Закрывает мини-приложение',
      params: [],
      returnType: 'void',
    },
    {
      name: 'requestContact',
      description: 'Запрашивает номер телефона пользователя',
      params: [],
      returnType: 'void',
    },
    {
      name: 'onEvent',
      description: 'Подписка на событие Bridge',
      params: [
        {
          name: 'eventName',
          type: 'string',
          required: true,
          description: 'Имя события',
        },
        {
          name: 'callback',
          type: 'Function',
          required: true,
          description: 'Функция-обработчик события',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'offEvent',
      description: 'Отписка от события Bridge',
      params: [
        {
          name: 'eventName',
          type: 'string',
          required: true,
          description: 'Имя события',
        },
        {
          name: 'callback',
          type: 'Function',
          required: true,
          description: 'Функция-обработчик события',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'enableClosingConfirmation',
      description: 'Включает подтверждение при закрытии',
      params: [],
      returnType: 'void',
    },
    {
      name: 'disableClosingConfirmation',
      description: 'Отключает подтверждение при закрытии',
      params: [],
      returnType: 'void',
    },
    {
      name: 'openLink',
      description: 'Открывает внешнюю ссылку в браузере',
      params: [
        {
          name: 'url',
          type: 'string',
          required: true,
          description: 'URL для открытия',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'openMaxLink',
      description: 'Открывает внутреннюю ссылку MAX (deeplink)',
      params: [
        {
          name: 'url',
          type: 'string',
          required: true,
          description: 'Внутренний URL MAX',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'shareContent',
      description: 'Открывает нативный диалог шеринга',
      params: [
        {
          name: 'text',
          type: 'string',
          required: true,
          description: 'Текст для шеринга',
        },
        {
          name: 'link',
          type: 'string',
          required: false,
          description: 'Ссылка для шеринга',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'shareMaxContent',
      description: 'Шеринг контента внутри MAX',
      params: [
        {
          name: 'params',
          type: 'object',
          required: true,
          description:
            'Объект с параметрами: mid и chatType (для пересылки сообщения) или text и link (для шеринга текста)',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'downloadFile',
      description: 'Скачивает файл',
      params: [
        {
          name: 'url',
          type: 'string',
          required: true,
          description: 'URL файла для скачивания',
        },
        {
          name: 'filename',
          type: 'string',
          required: true,
          description: 'Имя файла для сохранения',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'requestScreenMaxBrightness',
      description:
        'Устанавливает максимальную яркость экрана (30 секунд)',
      params: [],
      returnType: 'void',
    },
    {
      name: 'restoreScreenBrightness',
      description: 'Восстанавливает яркость экрана',
      params: [],
      returnType: 'void',
    },
    {
      name: 'openCodeReader',
      description: 'Открывает сканер QR-кодов',
      params: [
        {
          name: 'fileSelect',
          type: 'boolean',
          required: false,
          description: 'Разрешить выбор файла',
        },
      ],
      returnType: 'void',
    },
  ],
  objects: [
    {
      name: 'BackButton',
      description: 'Управление кнопкой «Назад» в мини-приложении',
      properties: [
        {
          name: 'isVisible',
          type: 'boolean',
          description: 'Видимость кнопки «Назад»',
          readonly: false,
        },
      ],
      methods: [
        {
          name: 'show',
          description: 'Показывает кнопку «Назад»',
          params: [],
          returnType: 'void',
        },
        {
          name: 'hide',
          description: 'Скрывает кнопку «Назад»',
          params: [],
          returnType: 'void',
        },
        {
          name: 'onClick',
          description: 'Устанавливает обработчик нажатия кнопки «Назад»',
          params: [
            {
              name: 'handler',
              type: 'Function',
              required: true,
              description: 'Функция-обработчик нажатия',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'offClick',
          description: 'Удаляет обработчик нажатия кнопки «Назад»',
          params: [
            {
              name: 'handler',
              type: 'Function',
              required: true,
              description: 'Функция-обработчик для удаления',
            },
          ],
          returnType: 'void',
        },
      ],
    },
    {
      name: 'ScreenCapture',
      description: 'Управление захватом экрана в мини-приложении',
      properties: [
        {
          name: 'isScreenCaptureEnabled',
          type: 'boolean',
          description: 'Разрешён ли захват экрана',
          readonly: true,
        },
      ],
      methods: [
        {
          name: 'enableScreenCapture',
          description: 'Разрешает захват экрана (скриншоты и запись)',
          params: [],
          returnType: 'void',
        },
        {
          name: 'disableScreenCapture',
          description: 'Запрещает захват экрана',
          params: [],
          returnType: 'void',
        },
      ],
    },
    {
      name: 'HapticFeedback',
      description: 'Управление тактильной обратной связью (вибрацией)',
      properties: [],
      methods: [
        {
          name: 'impactOccurred',
          description: 'Вызывает вибрацию при нажатии',
          params: [
            {
              name: 'style',
              type: 'string',
              required: true,
              description: 'Стиль вибрации',
              enumValues: ['soft', 'light', 'medium', 'heavy', 'rigid'],
            },
          ],
          returnType: 'void',
        },
        {
          name: 'notificationOccurred',
          description: 'Вызывает вибрацию при уведомлении',
          params: [
            {
              name: 'type',
              type: 'string',
              required: true,
              description: 'Тип уведомления',
              enumValues: ['error', 'success', 'warning'],
            },
          ],
          returnType: 'void',
        },
        {
          name: 'selectionChanged',
          description: 'Вызывает вибрацию при изменении выбора',
          params: [],
          returnType: 'void',
        },
      ],
    },
    {
      name: 'BiometricManager',
      description: 'Управление биометрической аутентификацией',
      properties: [
        {
          name: 'isInited',
          type: 'boolean',
          description: 'Инициализирован ли менеджер биометрии',
          readonly: true,
        },
        {
          name: 'isBiometricAvailable',
          type: 'boolean',
          description: 'Доступна ли биометрия на устройстве',
          readonly: true,
        },
        {
          name: 'biometricType',
          type: 'string',
          description: 'Тип биометрии (fingerprint, face и т.д.)',
          readonly: true,
        },
        {
          name: 'deviceId',
          type: 'string',
          description: 'Уникальный идентификатор устройства',
          readonly: true,
        },
        {
          name: 'isAccessRequested',
          type: 'boolean',
          description: 'Был ли запрошен доступ к биометрии',
          readonly: true,
        },
        {
          name: 'isAccessGranted',
          type: 'boolean',
          description: 'Предоставлен ли доступ к биометрии',
          readonly: true,
        },
        {
          name: 'isBiometricTokenSaved',
          type: 'boolean',
          description: 'Сохранён ли биометрический токен',
          readonly: true,
        },
      ],
      methods: [
        {
          name: 'init',
          description: 'Инициализирует менеджер биометрии',
          params: [],
          returnType: 'void',
        },
        {
          name: 'requestAccess',
          description: 'Запрашивает доступ к биометрии у пользователя',
          params: [],
          returnType: 'void',
        },
        {
          name: 'authenticate',
          description: 'Запускает биометрическую аутентификацию',
          params: [],
          returnType: 'void',
        },
        {
          name: 'updateBiometricToken',
          description: 'Обновляет биометрический токен',
          params: [
            {
              name: 'token',
              type: 'string',
              required: true,
              description: 'Новый биометрический токен',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'openSettings',
          description: 'Открывает настройки биометрии устройства',
          params: [],
          returnType: 'void',
        },
      ],
    },
  ],
  storageApi: [
    {
      name: 'DeviceStorage',
      description:
        'Локальное хранилище устройства (недоступно в веб-версии)',
      properties: [],
      methods: [
        {
          name: 'setItem',
          description: 'Сохраняет значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ для сохранения',
            },
            {
              name: 'value',
              type: 'string',
              required: true,
              description: 'Значение для сохранения',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'getItem',
          description: 'Получает значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ для получения значения',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'removeItem',
          description: 'Удаляет значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ для удаления',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'clear',
          description: 'Очищает всё хранилище',
          params: [],
          returnType: 'void',
        },
      ],
    },
    {
      name: 'SecureStorage',
      description:
        'Зашифрованное хранилище устройства (недоступно в веб-версии)',
      properties: [],
      methods: [
        {
          name: 'setItem',
          description: 'Сохраняет зашифрованное значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ для сохранения',
            },
            {
              name: 'value',
              type: 'string',
              required: true,
              description: 'Значение для сохранения',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'getItem',
          description: 'Получает зашифрованное значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ для получения значения',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'removeItem',
          description: 'Удаляет зашифрованное значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ для удаления',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'clear',
          description: 'Очищает всё зашифрованное хранилище',
          params: [],
          returnType: 'void',
        },
      ],
    },
  ],
  events: [
    {
      name: 'WebAppReady',
      description: 'Мини-приложение готово к отображению',
    },
    {
      name: 'WebAppClose',
      description: 'Мини-приложение закрывается',
    },
    {
      name: 'WebAppSetupBackButton',
      description: 'Изменение состояния кнопки «Назад»',
    },
    {
      name: 'WebAppBackButtonPressed',
      description: 'Нажата кнопка «Назад»',
    },
    {
      name: 'WebAppRequestPhone',
      description: 'Запрос номера телефона пользователя',
    },
    {
      name: 'WebAppSetupClosingBehavior',
      description: 'Изменение поведения при закрытии',
    },
    {
      name: 'WebAppOpenLink',
      description: 'Открытие внешней ссылки',
    },
    {
      name: 'WebAppOpenMaxLink',
      description: 'Открытие внутренней ссылки MAX',
    },
    {
      name: 'WebAppShare',
      description: 'Шеринг контента через нативный диалог',
    },
    {
      name: 'WebAppMaxContent',
      description: 'Шеринг контента внутри MAX',
    },
    {
      name: 'WebAppDownloadFile',
      description: 'Скачивание файла',
    },
    {
      name: 'WebAppChangeScreenBrightness',
      description: 'Изменение яркости экрана',
    },
    {
      name: 'WebAppSetupScreenCaptureBehavior',
      description: 'Изменение настроек захвата экрана',
    },
    {
      name: 'WebAppHapticFeedback',
      description: 'Вызов тактильной обратной связи',
    },
    {
      name: 'WebAppOpenCodeReader',
      description: 'Открытие сканера QR-кодов',
    },
  ],
  errorCodes: [
    {
      code: 'parse_link_error',
      description: 'Ошибка парсинга ссылки',
    },
    {
      code: 'user_gesture_required',
      description: 'Требуется действие пользователя (жест)',
    },
    {
      code: 'too_large_text',
      description: 'Слишком длинный текст',
    },
    {
      code: 'too_large_link',
      description: 'Слишком длинная ссылка',
    },
    {
      code: 'invalid_request',
      description: 'Некорректный запрос',
    },
    {
      code: 'not_supported',
      description: 'Функция не поддерживается на данной платформе',
    },
    {
      code: 'permission_denied',
      description: 'Доступ запрещён',
    },
    {
      code: 'cancelled',
      description: 'Операция отменена пользователем',
    },
  ],
};
