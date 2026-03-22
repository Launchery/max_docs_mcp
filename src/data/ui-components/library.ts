import type { UILibraryDoc } from '../types.js';

export const uiLibrary: UILibraryDoc = {
  overview:
    'MAX UI — библиотека React-компонентов для создания интерфейсов мини-приложений на платформе MAX. Поддерживает React 18+, TypeScript, адаптацию под платформу (iOS/Android) и тёмную/светлую темы.',
  installInstructions: 'npm install @max-ui/components',
  themeDescription:
    'Поддержка светлой и тёмной тем. Автоматическое переключение на основе системных настроек или ручная установка.',
  platformAdaptation:
    'Компоненты автоматически адаптируются под iOS и Android, используя нативные паттерны взаимодействия каждой платформы.',
  components: [
    // ========== Avatar ==========
    {
      name: 'Avatar.Container',
      category: 'avatar',
      description: 'Основной контейнер аватара',
      props: [
        {
          name: 'size',
          type: 'string',
          required: false,
          defaultValue: '48',
          description: 'Размер аватара в пикселях',
        },
        {
          name: 'shape',
          type: "'circle' | 'square'",
          required: false,
          description: 'Форма аватара: круглая или квадратная',
        },
      ],
    },
    {
      name: 'Avatar.Image',
      category: 'avatar',
      description: 'Изображение аватара',
      props: [
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'URL изображения',
        },
        {
          name: 'alt',
          type: 'string',
          required: false,
          description: 'Альтернативный текст изображения',
        },
      ],
    },
    {
      name: 'Avatar.Text',
      category: 'avatar',
      description: 'Текстовый фоллбэк аватара',
      props: [
        {
          name: 'text',
          type: 'string',
          required: true,
          description: 'Текст для отображения вместо изображения',
        },
      ],
    },
    {
      name: 'Avatar.Icon',
      category: 'avatar',
      description: 'Иконка-фоллбэк аватара',
      props: [
        {
          name: 'icon',
          type: 'ReactNode',
          required: true,
          description: 'Иконка для отображения вместо изображения',
        },
      ],
    },
    {
      name: 'Avatar.OnlineDot',
      category: 'avatar',
      description: 'Индикатор онлайн-статуса',
      props: [
        {
          name: 'online',
          type: 'boolean',
          required: true,
          description: 'Статус онлайн',
        },
      ],
    },
    {
      name: 'Avatar.Overlay',
      category: 'avatar',
      description: 'Оверлей поверх аватара',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое оверлея',
        },
      ],
    },
    {
      name: 'Avatar.CloseButton',
      category: 'avatar',
      description: 'Кнопка закрытия на аватаре',
      props: [
        {
          name: 'onClick',
          type: 'function',
          required: true,
          description: 'Обработчик нажатия кнопки закрытия',
        },
      ],
    },

    // ========== Buttons ==========
    {
      name: 'Button',
      category: 'buttons',
      description: 'Основная кнопка',
      props: [
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'ghost'",
          required: false,
          description: 'Вариант отображения кнопки',
        },
        {
          name: 'size',
          type: "'s' | 'm' | 'l'",
          required: false,
          description: 'Размер кнопки',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          description: 'Отключена ли кнопка',
        },
        {
          name: 'loading',
          type: 'boolean',
          required: false,
          description: 'Состояние загрузки',
        },
        {
          name: 'onClick',
          type: 'function',
          required: false,
          description: 'Обработчик нажатия',
        },
      ],
    },
    {
      name: 'IconButton',
      category: 'buttons',
      description: 'Кнопка-иконка',
      props: [
        {
          name: 'icon',
          type: 'ReactNode',
          required: true,
          description: 'Иконка кнопки',
        },
        {
          name: 'size',
          type: "'s' | 'm' | 'l'",
          required: false,
          description: 'Размер кнопки',
        },
        {
          name: 'variant',
          type: 'string',
          required: false,
          description: 'Вариант отображения',
        },
      ],
    },
    {
      name: 'ToolButton',
      category: 'buttons',
      description: 'Кнопка инструмента',
      props: [
        {
          name: 'icon',
          type: 'ReactNode',
          required: true,
          description: 'Иконка инструмента',
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          description: 'Подпись кнопки',
        },
      ],
    },
    {
      name: 'CellAction',
      category: 'buttons',
      description: 'Кнопка действия в ячейке',
      props: [
        {
          name: 'icon',
          type: 'ReactNode',
          required: false,
          description: 'Иконка действия',
        },
        {
          name: 'label',
          type: 'string',
          required: true,
          description: 'Текст действия',
        },
        {
          name: 'destructive',
          type: 'boolean',
          required: false,
          description: 'Деструктивное действие (красный стиль)',
        },
      ],
    },

    // ========== Inputs ==========
    {
      name: 'Input',
      category: 'inputs',
      description: 'Текстовое поле ввода',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Текущее значение поля',
        },
        {
          name: 'onChange',
          type: 'function',
          required: true,
          description: 'Обработчик изменения значения',
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          description: 'Текст-заполнитель',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          description: 'Отключено ли поле',
        },
        {
          name: 'error',
          type: 'string',
          required: false,
          description: 'Текст ошибки валидации',
        },
      ],
    },
    {
      name: 'Textarea',
      category: 'inputs',
      description: 'Многострочное поле ввода',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Текущее значение поля',
        },
        {
          name: 'onChange',
          type: 'function',
          required: true,
          description: 'Обработчик изменения значения',
        },
        {
          name: 'maxLength',
          type: 'number',
          required: false,
          description: 'Максимальная длина текста',
        },
      ],
    },
    {
      name: 'SearchInput',
      category: 'inputs',
      description: 'Поле поиска',
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Текущее значение поиска',
        },
        {
          name: 'onChange',
          type: 'function',
          required: true,
          description: 'Обработчик изменения значения',
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          description: 'Текст-заполнитель',
        },
      ],
    },
    {
      name: 'Switch',
      category: 'inputs',
      description: 'Переключатель',
      props: [
        {
          name: 'checked',
          type: 'boolean',
          required: true,
          description: 'Состояние переключателя',
        },
        {
          name: 'onChange',
          type: 'function',
          required: true,
          description: 'Обработчик изменения состояния',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          description: 'Отключён ли переключатель',
        },
      ],
    },

    // ========== Data Display ==========
    {
      name: 'CellHeader',
      category: 'data-display',
      description: 'Заголовок ячейки',
      props: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Текст заголовка',
        },
      ],
    },
    {
      name: 'CellInput',
      category: 'data-display',
      description: 'Ячейка с вводом',
      props: [
        {
          name: 'label',
          type: 'string',
          required: true,
          description: 'Метка ячейки',
        },
        {
          name: 'value',
          type: 'string',
          required: true,
          description: 'Значение ячейки',
        },
      ],
    },
    {
      name: 'CellList',
      category: 'data-display',
      description: 'Список ячеек',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Дочерние элементы (ячейки)',
        },
      ],
    },
    {
      name: 'CellSimple',
      category: 'data-display',
      description: 'Простая ячейка',
      props: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Заголовок ячейки',
        },
        {
          name: 'subtitle',
          type: 'string',
          required: false,
          description: 'Подзаголовок ячейки',
        },
        {
          name: 'before',
          type: 'ReactNode',
          required: false,
          description: 'Элемент перед содержимым',
        },
        {
          name: 'after',
          type: 'ReactNode',
          required: false,
          description: 'Элемент после содержимого',
        },
      ],
    },
    {
      name: 'Counter',
      category: 'data-display',
      description: 'Счётчик',
      props: [
        {
          name: 'count',
          type: 'number',
          required: true,
          description: 'Значение счётчика',
        },
        {
          name: 'maxCount',
          type: 'number',
          required: false,
          description: 'Максимальное отображаемое значение',
        },
      ],
    },
    {
      name: 'Dot',
      category: 'data-display',
      description: 'Точка-индикатор',
      props: [
        {
          name: 'color',
          type: 'string',
          required: false,
          description: 'Цвет точки',
        },
      ],
    },
    {
      name: 'Spinner',
      category: 'data-display',
      description: 'Индикатор загрузки',
      props: [
        {
          name: 'size',
          type: "'s' | 'm' | 'l'",
          required: false,
          description: 'Размер индикатора',
        },
      ],
    },

    // ========== Layout ==========
    {
      name: 'Container',
      category: 'layout',
      description: 'Контейнер',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое контейнера',
        },
        {
          name: 'padding',
          type: 'string',
          required: false,
          description: 'Внутренние отступы',
        },
      ],
    },
    {
      name: 'Flex',
      category: 'layout',
      description: 'Флекс-контейнер',
      props: [
        {
          name: 'direction',
          type: "'row' | 'column'",
          required: false,
          description: 'Направление оси',
        },
        {
          name: 'gap',
          type: 'string',
          required: false,
          description: 'Отступ между элементами',
        },
        {
          name: 'align',
          type: 'string',
          required: false,
          description: 'Выравнивание по поперечной оси',
        },
        {
          name: 'justify',
          type: 'string',
          required: false,
          description: 'Выравнивание по главной оси',
        },
      ],
    },
    {
      name: 'Grid',
      category: 'layout',
      description: 'Грид-контейнер',
      props: [
        {
          name: 'columns',
          type: 'number',
          required: false,
          description: 'Количество колонок',
        },
        {
          name: 'gap',
          type: 'string',
          required: false,
          description: 'Отступ между элементами',
        },
      ],
    },
    {
      name: 'Panel',
      category: 'layout',
      description: 'Панель',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое панели',
        },
        {
          name: 'header',
          type: 'ReactNode',
          required: false,
          description: 'Заголовок панели',
        },
      ],
    },

    // ========== Typography ==========
    {
      name: 'Typography.Display',
      category: 'typography',
      description: 'Крупный заголовок',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
        {
          name: 'weight',
          type: "'regular' | 'medium' | 'bold'",
          required: false,
          description: 'Насыщенность шрифта',
        },
      ],
    },
    {
      name: 'Typography.Title',
      category: 'typography',
      description: 'Заголовок',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
        {
          name: 'level',
          type: '1 | 2 | 3',
          required: false,
          description: 'Уровень заголовка',
        },
      ],
    },
    {
      name: 'Typography.Headline',
      category: 'typography',
      description: 'Подзаголовок',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
        {
          name: 'weight',
          type: "'regular' | 'medium' | 'bold'",
          required: false,
          description: 'Насыщенность шрифта',
        },
      ],
    },
    {
      name: 'Typography.Body',
      category: 'typography',
      description: 'Основной текст',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
        {
          name: 'size',
          type: "'s' | 'm' | 'l'",
          required: false,
          description: 'Размер текста',
        },
      ],
    },
    {
      name: 'Typography.Label',
      category: 'typography',
      description: 'Метка',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
        {
          name: 'size',
          type: "'s' | 'm' | 'l'",
          required: false,
          description: 'Размер метки',
        },
      ],
    },
    {
      name: 'Typography.Action',
      category: 'typography',
      description: 'Текст действия',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
      ],
    },

    // ========== Helpers ==========
    {
      name: 'EllipsisText',
      category: 'helpers',
      description: 'Текст с многоточием при переполнении',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Содержимое текста',
        },
        {
          name: 'maxLines',
          type: 'number',
          required: false,
          description: 'Максимальное количество строк',
        },
      ],
    },
    {
      name: 'Ripple',
      category: 'helpers',
      description: 'Эффект волны при нажатии',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'Дочерний элемент с эффектом',
        },
      ],
    },

    // ========== Compositions ==========
    {
      name: 'Profile',
      category: 'compositions',
      description: 'Композиция профиля',
      props: [
        {
          name: 'avatar',
          type: 'ReactNode',
          required: true,
          description: 'Компонент аватара',
        },
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Имя или заголовок профиля',
        },
        {
          name: 'subtitle',
          type: 'string',
          required: false,
          description: 'Дополнительная информация',
        },
        {
          name: 'action',
          type: 'ReactNode',
          required: false,
          description: 'Кнопка действия',
        },
      ],
    },
  ],
};
