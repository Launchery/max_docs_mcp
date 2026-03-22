import type { BridgeApiDoc } from '../types.js';

export const bridgeApi: BridgeApiDoc = {
  overview:
    'MAX Bridge — JavaScript API для мини-приложений в MAX. Подключается через `https://st.max.ru/js/max-web-app.js` и предоставляет объект `window.WebApp` для работы с клиентом MAX.',
  scriptUrl: 'https://st.max.ru/js/max-web-app.js',
  mainProperties: [
    {
      name: 'initData',
      type: 'string',
      description:
        'Строка с закодированными данными инициализации мини-приложения. Используется для серверной валидации',
      readonly: true,
    },
    {
      name: 'initDataUnsafe',
      type: 'WebAppData',
      description:
        'Декодированные данные инициализации: `query_id`, `auth_date`, `hash`, `start_param`, данные пользователя и чата',
      readonly: true,
    },
    {
      name: 'platform',
      type: 'string',
      description:
        'Платформа клиента MAX, в котором открыто мини-приложение: обычно `ios`, `android`, `desktop` или `web`',
      readonly: true,
    },
    {
      name: 'version',
      type: 'string',
      description:
        'Версия клиента MAX, в котором запущено мини-приложение',
      readonly: true,
    },
  ],
  coreMethods: [
    {
      name: 'ready',
      description:
        'Сообщает клиенту MAX, что мини-приложение готово к показу пользователю',
      params: [],
      returnType: 'void',
      notes: [
        'Если контент не загружен и событие `WebAppReady` не отправлено примерно за 15 секунд, клиент может показать экран ошибки «нет сети».',
      ],
    },
    {
      name: 'close',
      description: 'Закрывает окно мини-приложения',
      params: [],
      returnType: 'void',
    },
    {
      name: 'requestContact',
      description:
        'Запрашивает у пользователя разрешение поделиться номером телефона',
      params: [],
      returnType: 'Promise<string>',
    },
    {
      name: 'onEvent',
      description: 'Подписывает обработчик на событие Bridge',
      params: [
        {
          name: 'eventName',
          type: 'string',
          required: true,
          description: 'Имя события Bridge',
        },
        {
          name: 'callback',
          type: 'Function',
          required: true,
          description: 'Функция-обработчик',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'offEvent',
      description: 'Удаляет обработчик события Bridge',
      params: [
        {
          name: 'eventName',
          type: 'string',
          required: true,
          description: 'Имя события Bridge',
        },
        {
          name: 'callback',
          type: 'Function',
          required: true,
          description: 'Функция-обработчик, которую нужно снять',
        },
      ],
      returnType: 'void',
    },
    {
      name: 'enableClosingConfirmation',
      description:
        'Включает подтверждение закрытия мини-приложения, если есть несохранённые изменения',
      params: [],
      returnType: 'void',
    },
    {
      name: 'disableClosingConfirmation',
      description: 'Отключает подтверждение закрытия мини-приложения',
      params: [],
      returnType: 'void',
    },
    {
      name: 'openLink',
      description: 'Открывает внешнюю ссылку во внешнем браузере',
      params: [
        {
          name: 'url',
          type: 'string',
          required: true,
          description: 'Ссылка для открытия',
        },
      ],
      returnType: 'Promise<{ status: "opened" }>',
      notes: [
        'Для вызова требуется активное действие пользователя внутри мини-приложения.',
      ],
    },
    {
      name: 'openMaxLink',
      description:
        'Открывает диплинк вида `https://max.ru/<some-url>` внутри MAX; ссылки другого вида будут открыты во внешнем браузере',
      params: [
        {
          name: 'url',
          type: 'string',
          required: true,
          description: 'Диплинк MAX',
        },
      ],
      returnType: 'Promise<{ status: "opened" }>',
      notes: [
        'Для вызова требуется активное действие пользователя внутри мини-приложения.',
      ],
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
      returnType: 'Promise<{ status: "shared" | "cancelled" }>',
      notes: [
        'Текст в событии `WebAppShare` ограничен 200 символами.',
        'Для вызова требуется активное действие пользователя.',
      ],
    },
    {
      name: 'shareMaxContent',
      description:
        'Открывает шеринг в личные или групповые чаты MAX',
      params: [
        {
          name: 'params',
          type: '{ text?: string; link?: string; mid?: string; chatType?: "DIALOG" | "CHAT" }',
          required: true,
          description:
            'Передавайте либо `text` и/или `link`, либо `mid` и `chatType` для шеринга ранее отправленного медиа или файла',
        },
      ],
      returnType: 'Promise<{ status: "shared" | "cancelled" }>',
      notes: [
        'Если при шеринге медиа передать `text` или `link`, они будут проигнорированы.',
        'Для вызова требуется активное действие пользователя.',
      ],
    },
    {
      name: 'downloadFile',
      description: 'Запускает скачивание файла на устройство пользователя',
      params: [
        {
          name: 'url',
          type: 'string',
          required: true,
          description: 'HTTPS-ссылка на файл',
        },
        {
          name: 'file_name',
          type: 'string',
          required: true,
          description: 'Имя файла для сохранения',
        },
      ],
      returnType: 'Promise<{ status: "downloading" | "cancelled" }>',
      notes: [
        'Для вызова требуется активное действие пользователя.',
      ],
    },
    {
      name: 'requestScreenMaxBrightness',
      description:
        'Просит клиента установить максимальную яркость экрана примерно на 30 секунд',
      params: [],
      returnType: 'void',
    },
    {
      name: 'restoreScreenBrightness',
      description: 'Восстанавливает исходную яркость экрана',
      params: [],
      returnType: 'void',
    },
    {
      name: 'openCodeReader',
      description:
        'Открывает камеру для считывания QR-кода и возвращает результат сканирования',
      params: [
        {
          name: 'fileSelect',
          type: 'boolean',
          required: false,
          description:
            'Если `true`, клиент дополнительно разрешит выбор изображения из галереи',
        },
      ],
      returnType: 'Promise<string>',
    },
  ],
  objects: [
    {
      name: 'BackButton',
      description: 'Управление кнопкой Назад в шапке мини-приложения',
      properties: [
        {
          name: 'isVisible',
          type: 'boolean',
          description: 'Текущее состояние видимости кнопки Назад',
          readonly: false,
        },
      ],
      methods: [
        {
          name: 'show',
          description: 'Показывает кнопку Назад',
          params: [],
          returnType: 'void',
        },
        {
          name: 'hide',
          description: 'Скрывает кнопку Назад',
          params: [],
          returnType: 'void',
        },
        {
          name: 'onClick',
          description: 'Подписывает обработчик на нажатие кнопки Назад',
          params: [
            {
              name: 'handler',
              type: 'Function',
              required: true,
              description: 'Функция-обработчик',
            },
          ],
          returnType: 'void',
        },
        {
          name: 'offClick',
          description: 'Снимает обработчик нажатия кнопки Назад',
          params: [
            {
              name: 'handler',
              type: 'Function',
              required: true,
              description: 'Функция-обработчик',
            },
          ],
          returnType: 'void',
        },
      ],
    },
    {
      name: 'ScreenCapture',
      description:
        'Управляет возможностью делать скриншоты и записывать экран',
      properties: [
        {
          name: 'isScreenCaptureEnabled',
          type: 'boolean',
          description:
            'По таблице объекта: `true` означает, что запрет на скриншоты/запись включён, `false` — что они разрешены. Это отличается от таблицы события `WebAppSetupScreenCaptureBehavior` на странице Bridge.',
          readonly: true,
        },
      ],
      methods: [
        {
          name: 'enableScreenCapture',
          description:
            'Включает запрет на скриншоты и запись экрана',
          params: [],
          returnType: 'void',
        },
        {
          name: 'disableScreenCapture',
          description:
            'Отключает запрет на скриншоты и запись экрана',
          params: [],
          returnType: 'void',
        },
      ],
    },
    {
      name: 'HapticFeedback',
      description:
        'Тактильная обратная связь: воздействия, уведомления и изменение выбора',
      properties: [],
      methods: [
        {
          name: 'impactOccurred',
          description: 'Запускает виброотклик типа impact',
          params: [
            {
              name: 'impactStyle',
              type: 'string',
              required: true,
              description: 'Стиль тактильного отклика',
              enumValues: ['soft', 'light', 'medium', 'heavy', 'rigid'],
            },
            {
              name: 'disableVibrationFallback',
              type: 'boolean',
              required: false,
              description:
                'Запрет использовать fallback-вибрацию на устройствах без переменной амплитуды. По умолчанию `false`',
            },
          ],
          returnType: 'Promise<{ status: "impactOccured" }>',
        },
        {
          name: 'notificationOccurred',
          description: 'Запускает виброотклик типа notification',
          params: [
            {
              name: 'notificationType',
              type: 'string',
              required: true,
              description: 'Тип уведомления',
              enumValues: ['error', 'success', 'warning'],
            },
            {
              name: 'disableVibrationFallback',
              type: 'boolean',
              required: false,
              description:
                'Запрет использовать fallback-вибрацию на устройствах без переменной амплитуды. По умолчанию `false`',
            },
          ],
          returnType: 'Promise<{ status: "notificationOccured" }>',
        },
        {
          name: 'selectionChanged',
          description:
            'Сообщает клиенту, что пользователь изменил выбор, чтобы воспроизвести соответствующий тактильный сигнал',
          params: [
            {
              name: 'disableVibrationFallback',
              type: 'boolean',
              required: false,
              description:
                'Запрет использовать fallback-вибрацию на устройствах без переменной амплитуды. По умолчанию `false`',
            },
          ],
          returnType: 'Promise<{ status: "selectionChanged" }>',
        },
      ],
    },
    {
      name: 'BiometricManager',
      description:
        'Работа с биометрической аутентификацией и биометрическим токеном в защищённом хранилище устройства',
      properties: [
        {
          name: 'isInited',
          type: 'boolean',
          description: 'Была ли ранее выполнена первичная инициализация',
          readonly: true,
        },
        {
          name: 'isBiometricAvailable',
          type: 'boolean',
          description:
            'Доступна ли биометрия на устройстве пользователя',
          readonly: true,
        },
        {
          name: 'biometricType',
          type: 'string[]',
          description:
            'Типы биометрии. Возможные значения: `fingerprint`, `faceid`, `unknown`. Для Android документация указывает `["unknown"]`',
          readonly: true,
        },
        {
          name: 'deviceId',
          type: 'string | null',
          description:
            'Идентификатор устройства. Если доступ к биометрии не дан, может быть `null`',
          readonly: true,
        },
        {
          name: 'isAccessRequested',
          type: 'boolean',
          description:
            'Был ли ранее отправлен запрос на доступ к биометрии',
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
          description:
            'Есть ли биометрический токен в безопасном хранилище устройства',
          readonly: true,
        },
      ],
      methods: [
        {
          name: 'init',
          description:
            'Первичная инициализация биометрии: проверка доступности и уже выданных разрешений',
          params: [],
          returnType: 'Promise<void>',
        },
        {
          name: 'requestAccess',
          description:
            'Запрашивает у пользователя доступ к использованию биометрии',
          params: [],
          returnType: 'Promise<void>',
        },
        {
          name: 'authenticate',
          description:
            'Запускает процесс биометрической аутентификации',
          params: [],
          returnType: 'Promise<void>',
        },
        {
          name: 'updateBiometricToken',
          description:
            'Сохраняет или обновляет биометрический токен в безопасном хранилище. Чтобы удалить токен, передайте пустую строку',
          params: [
            {
              name: 'token',
              type: 'string',
              required: true,
              description: 'Новый токен или пустая строка для удаления',
            },
          ],
          returnType: 'Promise<void>',
        },
        {
          name: 'openSettings',
          description:
            'Предлагает перейти в настройки MAX на экран приватности, чтобы выдать доступ к биометрии. Документация отмечает, что вызов закрывает мини-приложение',
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
        'Локальное хранилище данных, привязанное к пользователю MAX. Не поддерживается в веб-версии',
      properties: [],
      methods: [
        {
          name: 'setItem',
          description:
            'Сохраняет пару ключ-значение в локальном хранилище устройства',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ',
            },
            {
              name: 'value',
              type: 'string',
              required: true,
              description: 'Значение',
            },
          ],
          returnType: 'Promise<void>',
        },
        {
          name: 'getItem',
          description: 'Получает значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ',
            },
          ],
          returnType: 'Promise<string | null>',
        },
        {
          name: 'removeItem',
          description: 'Удаляет значение по ключу',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ',
            },
          ],
          returnType: 'Promise<void>',
        },
        {
          name: 'clear',
          description:
            'Очищает все ключи, ранее сохранённые ботом в локальном хранилище устройства',
          params: [],
          returnType: 'Promise<void>',
        },
      ],
    },
    {
      name: 'SecureStorage',
      description:
        'Защищённое хранилище данных. Не поддерживается в веб-версии',
      properties: [],
      methods: [
        {
          name: 'setItem',
          description:
            'Сохраняет пару ключ-значение в защищённом хранилище устройства',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ',
            },
            {
              name: 'value',
              type: 'string',
              required: true,
              description: 'Значение',
            },
          ],
          returnType: 'Promise<void>',
        },
        {
          name: 'getItem',
          description:
            'Получает значение по ключу из защищённого хранилища',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ',
            },
          ],
          returnType: 'Promise<string | null>',
        },
        {
          name: 'removeItem',
          description:
            'Удаляет значение по ключу из защищённого хранилища',
          params: [
            {
              name: 'key',
              type: 'string',
              required: true,
              description: 'Ключ',
            },
          ],
          returnType: 'Promise<void>',
        },
      ],
    },
  ],
  events: [
    {
      name: 'WebAppReady',
      description:
        'Сигнализирует клиенту MAX, что мини-приложение готово к работе',
    },
    {
      name: 'WebAppClose',
      description: 'Закрывает мини-приложение',
    },
    {
      name: 'WebAppSetupBackButton',
      description: 'Управляет отображением кнопки Назад',
      dataFields: [
        {
          name: 'isVisible',
          type: 'boolean',
          required: true,
          nullable: false,
          description: '`true` показывает кнопку, `false` скрывает её',
        },
      ],
    },
    {
      name: 'WebAppRequestPhone',
      description:
        'Показывает пользователю запрос на передачу номера телефона',
      dataFields: [
        {
          name: 'phone',
          type: 'string',
          required: false,
          nullable: true,
          description: 'Номер телефона, который вернёт клиент при успехе',
        },
      ],
    },
    {
      name: 'WebAppSetupClosingBehavior',
      description:
        'Управляет запросом подтверждения при закрытии мини-приложения',
      dataFields: [
        {
          name: 'needConfirmation',
          type: 'boolean',
          required: true,
          nullable: false,
          description:
            '`true` включает всплывающее подтверждение, `false` отключает его',
        },
      ],
    },
    {
      name: 'WebAppBackButtonPressed',
      description:
        'Уведомление о том, что пользователь нажал кнопку Назад',
    },
    {
      name: 'WebAppOpenLink',
      description: 'Открывает внешнюю ссылку во внешнем браузере',
      dataFields: [
        {
          name: 'url',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Ссылка для открытия',
        },
      ],
    },
    {
      name: 'WebAppOpenMaxLink',
      description: 'Открывает диплинк MAX внутри клиента',
      dataFields: [
        {
          name: 'url',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Диплинк вида `https://max.ru/<...>`',
        },
      ],
    },
    {
      name: 'WebAppShare',
      description: 'Открывает системный шеринг из мини-приложения',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'text',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Текст для шеринга',
        },
        {
          name: 'link',
          type: 'string',
          required: false,
          nullable: true,
          description: 'Ссылка для шеринга',
        },
      ],
    },
    {
      name: 'WebAppMaxShare',
      description: 'Открывает шеринг в личные и групповые чаты MAX',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'text',
          type: 'string',
          required: false,
          nullable: true,
          description: 'Текст для шеринга',
        },
        {
          name: 'link',
          type: 'string',
          required: false,
          nullable: true,
          description: 'Ссылка для шеринга',
        },
        {
          name: 'mid',
          type: 'string',
          required: false,
          nullable: true,
          description: 'ID сообщения бота, которое нужно расшарить',
        },
        {
          name: 'chatType',
          type: 'string',
          required: false,
          nullable: true,
          description: 'Тип чата для шеринга сообщения: `DIALOG` или `CHAT`',
        },
      ],
    },
    {
      name: 'WebAppDownloadFile',
      description: 'Запускает скачивание файла на устройство',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'url',
          type: 'string',
          required: true,
          nullable: false,
          description: 'HTTPS-ссылка на скачиваемый файл',
        },
        {
          name: 'file_name',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Имя файла для сохранения',
        },
      ],
    },
    {
      name: 'WebAppSetupScreenCaptureBehavior',
      description:
        'Управляет возможностью делать скриншоты и записывать экран. На странице событий значение интерпретируется как прямое разрешение или запрет',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'isScreenCaptureEnabled',
          type: 'boolean',
          required: true,
          nullable: false,
          description:
            'По таблице событий: `true` разрешает скриншоты и запись, `false` запрещает их',
        },
      ],
    },
    {
      name: 'WebAppChangeScreenBrightness',
      description: 'Управляет яркостью экрана',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'maxBrightness',
          type: 'boolean',
          required: true,
          nullable: false,
          description:
            '`true` включает максимальную яркость на ограниченное время, `false` восстанавливает исходное значение',
        },
      ],
    },
    {
      name: 'WebAppHapticFeedbackImpact',
      description: 'Вызывает impact-виброотклик',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'impactStyle',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Стиль вибрации',
          enumValues: ['soft', 'light', 'medium', 'heavy', 'rigid'],
        },
        {
          name: 'disableVibrationFallback',
          type: 'boolean',
          required: false,
          nullable: false,
          description:
            'Запрет на fallback-вибрацию на устройствах без переменной амплитуды',
        },
      ],
    },
    {
      name: 'WebAppHapticFeedbackNotification',
      description: 'Вызывает notification-виброотклик',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'notificationType',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Тип уведомления',
          enumValues: ['error', 'success', 'warning'],
        },
        {
          name: 'disableVibrationFallback',
          type: 'boolean',
          required: false,
          nullable: false,
          description:
            'Запрет на fallback-вибрацию на устройствах без переменной амплитуды',
        },
      ],
    },
    {
      name: 'WebAppHapticFeedbackSelectionChange',
      description:
        'Сообщает клиенту, что пользователь изменил выбор и требуется соответствующий тактильный сигнал',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'disableVibrationFallback',
          type: 'boolean',
          required: false,
          nullable: false,
          description:
            'Запрет на fallback-вибрацию на устройствах без переменной амплитуды',
        },
      ],
    },
    {
      name: 'WebAppOpenCodeReader',
      description: 'Открывает камеру для считывания QR-кода',
      dataFields: [
        {
          name: 'requestId',
          type: 'string',
          required: true,
          nullable: false,
          description: 'Идентификатор запроса',
        },
        {
          name: 'fileSelect',
          type: 'boolean',
          required: false,
          nullable: false,
          description:
            '`true` разрешает также выбор изображения из галереи',
        },
      ],
    },
  ],
  errorCodes: [
    {
      code: 'parse_link_error',
      description: 'Передана некорректная ссылка',
    },
    {
      code: 'user_gesture_required',
      description:
        'Для вызова метода требуется активное действие пользователя внутри мини-приложения',
    },
    {
      code: 'too_large_text',
      description: 'Текст для шеринга слишком длинный',
    },
    {
      code: 'too_large_link',
      description: 'Ссылка для шеринга слишком длинная',
    },
    {
      code: 'invalid_request',
      description:
        'Параметры не переданы, переданы некорректно или не соответствуют ожидаемой схеме',
    },
    {
      code: 'download_failed',
      description: 'Скачивание файла завершилось ошибкой',
    },
    {
      code: 'not_supported',
      description: 'Функция недоступна на устройстве или платформе',
    },
    {
      code: 'permission_denied',
      description: 'Пользователь отказал в доступе к требуемому разрешению',
    },
    {
      code: 'cancelled',
      description: 'Операция была отменена пользователем',
    },
    {
      code: 'invalid_impact_style',
      description: 'Передан неизвестный стиль impact-вибрации',
    },
    {
      code: 'invalid_notification_type',
      description: 'Передан неизвестный тип notification-вибрации',
    },
  ],
};
