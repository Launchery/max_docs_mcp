import type {
  ComponentDoc,
  ComponentProp,
  UILibraryDoc,
} from '../types.js';

const prop = (
  name: string,
  type: string,
  required: boolean,
  description: string,
  defaultValue?: string,
): ComponentProp => ({
  name,
  type,
  required,
  description,
  defaultValue,
});

const component = (
  name: string,
  category: string,
  description: string,
  props: ComponentProp[],
  notes?: string[],
): ComponentDoc => ({
  name,
  category,
  description,
  props,
  notes,
});

export const uiLibrary: UILibraryDoc = {
  overview:
    'MAX UI — React-библиотека компонентов для мини-приложений MAX. Актуальный npm-пакет: `@maxhub/max-ui`. Быстрый старт на текущем пакете: импортировать `@maxhub/max-ui/dist/styles.css` и обернуть приложение в провайдер `MaxUI`. Ниже перечислены ключевые typed props; базовые DOM props (`children`, `onClick`, `value`, `src` и т.д.) наследуются от underlying React-элементов.',
  installInstructions:
    'npm install @maxhub/max-ui\nimport \'@maxhub/max-ui/dist/styles.css\';\nimport { MaxUI } from \'@maxhub/max-ui\';',
  themeDescription:
    'Провайдер `MaxUI` принимает значения контекста `platform` (`ios` | `android`) и `colorScheme` (`light` | `dark`). Компоненты ориентируются на этот контекст для адаптации внешнего вида.',
  platformAdaptation:
    'Пакет типизирует платформу как `ios` или `android`, а цветовую схему как `light` или `dark`. Документация MAX UI дополняет это Storybook-примерами и площадкой Playground для каждого компонента.',
  components: [
    component(
      'Avatar.Container',
      'avatar',
      'Контейнер аватара с поддержкой размеров, формы и угловых слотов.',
      [
        prop('size', 'number', false, 'Размер контейнера аватара'),
        prop(
          'overlay',
          'ReactNode',
          false,
          'Оверлей, который рендерится поверх аватара',
        ),
        prop(
          'form',
          '"circle" | "squircle"',
          false,
          'Форма аватара',
        ),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"overlay" | "content" | "rightBottomCorner" | "rightTopCorner">',
          false,
          'Классы для внутренних частей контейнера',
        ),
        prop(
          'rightTopCorner',
          'ReactNode',
          false,
          'Слот в правом верхнем углу',
        ),
        prop(
          'rightBottomCorner',
          'ReactNode',
          false,
          'Слот в правом нижнем углу',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Radix Slot'),
      ],
    ),
    component(
      'Avatar.Image',
      'avatar',
      'Изображение аватара с fallback-элементом и fallback-градиентом.',
      [
        prop('fallback', 'ReactNode', false, 'Фолбэк-содержимое вместо изображения'),
        prop(
          'fallbackGradient',
          '"red" | "orange" | "green" | "blue" | "purple" | "custom"',
          false,
          'Градиент для fallback-состояния',
        ),
      ],
      ['Нативные props изображения, такие как `src` и `alt`, наследуются от `<img>`.'],
    ),
    component(
      'Avatar.Text',
      'avatar',
      'Текстовый фолбэк аватара.',
      [
        prop(
          'gradient',
          '"red" | "orange" | "green" | "blue" | "purple" | "custom"',
          false,
          'Градиент текстового фолбэка',
        ),
      ],
      ['Текст передаётся как обычный `children`.'],
    ),
    component(
      'Avatar.Icon',
      'avatar',
      'Иконка внутри аватара.',
      [],
      ['Специальных typed props поверх обычного `<span>` у компонента нет.'],
    ),
    component(
      'Avatar.OnlineDot',
      'avatar',
      'Индикатор онлайн-статуса для аватара.',
      [],
      ['Специальных typed props поверх обычного `<span>` у компонента нет.'],
    ),
    component(
      'Avatar.Overlay',
      'avatar',
      'Оверлей для отображения дополнительного состояния поверх аватара.',
      [],
      ['Специальных typed props поверх обычного `<span>` у компонента нет.'],
    ),
    component(
      'Avatar.CloseButton',
      'avatar',
      'Кнопка закрытия, встроенная в аватар.',
      [],
      ['Наследует стандартные button props.'],
    ),

    component(
      'Button',
      'buttons',
      'Основная кнопка MAX UI.',
      [
        prop(
          'size',
          '"small" | "medium" | "large"',
          false,
          'Размер кнопки',
        ),
        prop(
          'mode',
          '"primary" | "secondary" | "tertiary" | "link"',
          false,
          'Режим кнопки',
        ),
        prop(
          'appearance',
          '"themed" | "negative" | "neutral" | "neutral-themed" | "contrast-static"',
          false,
          'Цветовое оформление',
        ),
        prop('stretched', 'boolean', false, 'Растягивает кнопку на доступную ширину'),
        prop('iconBefore', 'ReactNode', false, 'Контент перед текстом'),
        prop('iconAfter', 'ReactNode', false, 'Контент после текста'),
        prop('indicator', 'ReactNode', false, 'Дополнительный индикатор'),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<ButtonInnerElementKey>',
          false,
          'Классы для внутренних частей кнопки',
        ),
        prop('loading', 'boolean', false, 'Состояние загрузки'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'IconButton',
      'buttons',
      'Кнопка-иконка с теми же режимами и appearance, что и обычная Button.',
      [
        prop(
          'size',
          '"small" | "medium" | "large"',
          false,
          'Размер кнопки',
        ),
        prop(
          'mode',
          '"primary" | "secondary" | "tertiary" | "link"',
          false,
          'Режим кнопки',
        ),
        prop(
          'appearance',
          '"themed" | "negative" | "neutral" | "neutral-themed" | "contrast-static"',
          false,
          'Цветовое оформление',
        ),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"content" | "spinnerContainer" | "spinner">',
          false,
          'Классы для внутренних частей кнопки',
        ),
        prop('loading', 'boolean', false, 'Состояние загрузки'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'ToolButton',
      'buttons',
      'Кнопка-инструмент с иконкой и лёгким appearance.',
      [
        prop('icon', 'ReactNode', false, 'Иконка кнопки'),
        prop(
          'appearance',
          '"default" | "secondary"',
          false,
          'Оформление кнопки',
        ),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"label" | "icon">',
          false,
          'Классы для label и icon-частей',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'CellAction',
      'buttons',
      'Кнопка действия в формате ячейки.',
      [
        prop(
          'mode',
          '"primary" | "destructive" | "custom"',
          false,
          'Режим действия',
        ),
        prop(
          'height',
          '"compact" | "normal"',
          false,
          'Высота ячейки',
        ),
        prop('before', 'ReactNode', false, 'Контент перед основным содержимым'),
        prop('showChevron', 'boolean', false, 'Показывает шеврон справа'),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"before" | "chevron" | "content">',
          false,
          'Классы для внутренних частей ячейки',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),

    component(
      'Input',
      'inputs',
      'Базовое текстовое поле ввода.',
      [
        prop('mode', '"primary" | "secondary"', false, 'Визуальный режим поля'),
        prop('compact', 'boolean', false, 'Компактная версия поля'),
        prop('iconBefore', 'ReactNode', false, 'Контент перед полем'),
        prop('iconAfter', 'ReactNode', false, 'Контент после поля'),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"input" | "clearButton" | "body" | "iconBefore" | "iconAfter">',
          false,
          'Классы для внутренних частей поля',
        ),
        prop(
          'withClearButton',
          'boolean',
          false,
          'Показывает кнопку очистки',
        ),
      ],
    ),
    component(
      'Textarea',
      'inputs',
      'Многострочное поле ввода.',
      [
        prop('mode', '"primary" | "secondary"', false, 'Визуальный режим textarea'),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"textarea">',
          false,
          'Классы для внутренних частей textarea',
        ),
      ],
    ),
    component(
      'SearchInput',
      'inputs',
      'Поле поиска со встроенной кнопкой очистки.',
      [
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"input" | "clearButton" | "body">',
          false,
          'Классы для внутренних частей поля поиска',
        ),
      ],
    ),
    component(
      'Switch',
      'inputs',
      'Переключатель.',
      [],
      ['Специальных typed props поверх стандартного `<input>` у компонента нет.'],
    ),

    component(
      'CellHeader',
      'data-display',
      'Заголовок группы ячеек.',
      [
        prop(
          'titleStyle',
          '"caps" | "normal"',
          false,
          'Стиль заголовка',
        ),
        prop('fullWidth', 'boolean', false, 'Растягивает заголовок на всю ширину'),
        prop('after', 'ReactNode', false, 'Контент после заголовка'),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"content" | "after">',
          false,
          'Классы для внутренних частей',
        ),
      ],
    ),
    component(
      'CellInput',
      'data-display',
      'Поле ввода в формате ячейки.',
      [
        prop(
          'height',
          '"compact" | "normal"',
          false,
          'Высота ячейки',
        ),
        prop('before', 'ReactNode', false, 'Контент перед input'),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"before" | "input" | "clearButton" | "body">',
          false,
          'Классы для внутренних частей',
        ),
      ],
    ),
    component(
      'CellList',
      'data-display',
      'Контейнер для списка ячеек.',
      [
        prop(
          'mode',
          '"full-width" | "island"',
          false,
          'Режим списка ячеек',
        ),
        prop('filled', 'boolean', false, 'Заполненный вариант списка'),
        prop('header', 'ReactNode', false, 'Заголовок списка'),
      ],
    ),
    component(
      'CellSimple',
      'data-display',
      'Универсальная ячейка с title/subtitle/overline и слотами по краям.',
      [
        prop(
          'height',
          '"compact" | "normal"',
          false,
          'Высота ячейки',
        ),
        prop(
          'innerClassNames',
          'InnerClassNamesProp<"before" | "after" | "chevron" | "content" | "title" | "subtitle" | "overline">',
          false,
          'Классы для внутренних частей',
        ),
        prop('title', 'ReactNode', false, 'Основной заголовок'),
        prop('subtitle', 'ReactNode', false, 'Подзаголовок'),
        prop('overline', 'ReactNode', false, 'Верхняя подпись'),
        prop('before', 'ReactNode', false, 'Контент слева'),
        prop('after', 'ReactNode', false, 'Контент справа'),
        prop('showChevron', 'boolean', false, 'Показывает шеврон'),
        prop('as', 'ElementType', false, 'Кастомный underlying элемент'),
        prop('disabled', 'boolean', false, 'Отключённое состояние'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Counter',
      'data-display',
      'Счётчик/бейдж со значением.',
      [
        prop('value', 'number', true, 'Числовое значение счётчика'),
        prop('rounded', 'boolean', false, 'Скруглённый вариант'),
        prop(
          'appearance',
          '"themed" | "neutral" | "neutral-themed" | "neutral-static" | "negative"',
          false,
          'Цветовое оформление',
        ),
        prop('disabled', 'boolean', false, 'Отключённое состояние'),
        prop('muted', 'boolean', false, 'Приглушённый вариант'),
        prop(
          'mode',
          '"filled" | "inverse"',
          false,
          'Режим счётчика',
        ),
      ],
    ),
    component(
      'Dot',
      'data-display',
      'Точка-индикатор.',
      [
        prop(
          'appearance',
          '"themed" | "contrast-pinned" | "neutral-fade" | "accent-red" | "inherit"',
          false,
          'Вариант индикатора',
        ),
      ],
    ),
    component(
      'Spinner',
      'data-display',
      'Индикатор загрузки.',
      [
        prop('size', '20 | 24 | number', false, 'Размер спиннера'),
        prop(
          'appearance',
          '"primary" | "themed" | "neutral-themed" | "primary-static" | "contrast" | "contrast-static" | "negative"',
          false,
          'Вариант окраски',
        ),
      ],
    ),

    component(
      'Container',
      'layout',
      'Базовый контейнер с опцией растяжения на всю ширину.',
      [
        prop('fullWidth', 'boolean', false, 'Растягивает контейнер на всю ширину'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Flex',
      'layout',
      'Флекс-контейнер.',
      [
        prop('display', '"flex" | "inline-flex"', false, 'Тип flex-отображения'),
        prop(
          'direction',
          '"row" | "column" | "row-reverse" | "column-reverse"',
          false,
          'Направление оси',
        ),
        prop(
          'align',
          '"flex-start" | "flex-end" | "center" | "baseline" | "stretch"',
          false,
          'Выравнивание по поперечной оси',
        ),
        prop(
          'justify',
          '"start" | "center" | "end" | "space-between"',
          false,
          'Выравнивание по главной оси',
        ),
        prop(
          'wrap',
          '"wrap" | "nowrap" | "wrap-reverse"',
          false,
          'Перенос элементов',
        ),
        prop('gap', 'number | string', false, 'Общий gap'),
        prop('gapX', 'number | string', false, 'Горизонтальный gap'),
        prop('gapY', 'number | string', false, 'Вертикальный gap'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Grid',
      'layout',
      'Grid-контейнер.',
      [
        prop('display', '"grid" | "inline-grid"', false, 'Тип grid-отображения'),
        prop(
          'align',
          '"start" | "center" | "end" | "baseline" | "stretch"',
          false,
          'Выравнивание по вертикали',
        ),
        prop(
          'justify',
          '"start" | "center" | "end" | "space-between"',
          false,
          'Выравнивание по горизонтали',
        ),
        prop('gap', 'number | string', false, 'Общий gap'),
        prop('gapX', 'number | string', false, 'Горизонтальный gap'),
        prop('gapY', 'number | string', false, 'Вертикальный gap'),
        prop('cols', 'number', false, 'Количество колонок'),
        prop('rows', 'number', false, 'Количество рядов'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Panel',
      'layout',
      'Базовая панель для центрирования и укладки содержимого.',
      [
        prop('mode', '"primary" | "secondary"', false, 'Режим панели'),
        prop('centeredX', 'boolean', false, 'Центрирование по горизонтали'),
        prop('centeredY', 'boolean', false, 'Центрирование по вертикали'),
      ],
    ),

    component(
      'Typography.Display',
      'typography',
      'Крупный display-текст.',
      [prop('asChild', 'boolean', false, 'Рендер через Slot')],
    ),
    component(
      'Typography.Title',
      'typography',
      'Заголовок.',
      [
        prop(
          'variant',
          '"large-strong" | "medium-strong" | "small" | "small-strong" | "custom"',
          false,
          'Вариант заголовка',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Typography.Headline',
      'typography',
      'Подзаголовок.',
      [
        prop(
          'variant',
          '"large-strong" | "medium" | "medium-strong" | "small" | "small-strong" | "custom"',
          false,
          'Вариант headline',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Typography.Body',
      'typography',
      'Основной текст.',
      [
        prop(
          'variant',
          '"large" | "medium" | "small" | "small-strong" | "small-caps" | "custom"',
          false,
          'Вариант body-текста',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Typography.Label',
      'typography',
      'Текст метки.',
      [
        prop(
          'variant',
          '"large" | "large-strong" | "large-caps" | "medium" | "medium-strong" | "small-strong" | "small-caps" | "custom"',
          false,
          'Вариант label-текста',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),
    component(
      'Typography.Action',
      'typography',
      'Текст действия.',
      [
        prop(
          'variant',
          '"large" | "medium" | "small" | "label" | "custom"',
          false,
          'Вариант action-текста',
        ),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
    ),

    component(
      'EllipsisText',
      'helpers',
      'Текст с ограничением числа строк.',
      [
        prop('maxLines', 'number', false, 'Максимальное число видимых строк'),
        prop('asChild', 'boolean', false, 'Рендер через Slot'),
      ],
      [
        'При `maxLines > 1` используется line-clamp, поддержка которого зависит от браузера.',
      ],
    ),
    component(
      'Ripple',
      'helpers',
      'Эффект ripple.',
      [],
      ['Специальных typed props поверх `<span>` у компонента нет.'],
    ),

    component(
      'Profile',
      'compositions',
      'Композиция профиля из раздела MAX UI Compositions.',
      [],
      [
        'Страница `Profile` есть в публичной документации MAX UI, но в опубликованном npm-пакете `@maxhub/max-ui` версии 0.1.13 отдельный `.d.ts` для этой композиции не экспортируется.',
        'Для точного состава пропсов и слотов ориентируйтесь на страницу компонента и Storybook.',
      ],
    ),
  ],
};
