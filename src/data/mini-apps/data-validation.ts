import type { GuideDoc } from '../types.js';

export const dataValidationGuide: GuideDoc = {
  id: 'data-validation',
  category: 'mini-apps',
  title: 'Валидация данных мини-приложения',
  summary: 'Проверка подлинности `initData` мини-приложения через HMAC-SHA256 и токен бота',
  sections: [
    {
      heading: 'Процесс валидации',
      content:
        'MAX передаёт стартовые параметры при каждом запуске мини-приложения. Чтобы убедиться, что данные не были подменены, документация рекомендует проверять `initData` через HMAC-SHA256.',
      subsections: [
        {
          heading: 'Шаг 1: Получение данных',
          content:
            'Получите закодированную строку инициализации из `window.WebApp.initData`.',
        },
        {
          heading: 'Шаг 2: Извлечение параметров',
          content:
            'Разберите параметры строки, извлеките `hash` и остальные поля `auth_date`, `query_id`, `user`, `start_param` и другие доступные значения.',
        },
        {
          heading: 'Шаг 3: Подготовка данных',
          content:
            'Выполните URL-декодирование строки. Объедините параметры в формат {key}={value}. Исключите параметр hash из набора данных. Отсортируйте оставшиеся параметры по алфавиту. Соедините их символом новой строки (\\n).',
        },
        {
          heading: 'Шаг 4: Генерация секретного ключа',
          content:
            'Сформируйте `secret_key` через HMAC-SHA256, используя строку `WebAppData` и токен бота, выданный на платформе MAX для партнёров.',
        },
        {
          heading: 'Шаг 5: Вычисление хеша',
          content:
            'Вычислите хеш HMAC-SHA256, используя секретный ключ и подготовленные данные. Сконвертируйте результат в hex-строку.',
        },
        {
          heading: 'Шаг 6: Верификация',
          content:
            'Сравните вычисленный хеш с исходным `hash`. Совпадение означает, что стартовые данные подлинные.',
        },
      ],
    },
  ],
  codeExamples: [
    {
      title: 'Генерация секретного ключа',
      language: 'typescript',
      code: `import { createHmac } from 'crypto';

const secretKey = createHmac('sha256', 'WebAppData')
  .update(botToken)
  .digest();`,
    },
    {
      title: 'Подготовка и проверка данных',
      language: 'typescript',
      code: `const params = new URLSearchParams(initData);
const hash = params.get('hash');
params.delete('hash');

const dataCheckString = [...params.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([key, value]) => \`\${key}=\${value}\`)
  .join('\\n');

const calculatedHash = createHmac('sha256', secretKey)
  .update(dataCheckString)
  .digest('hex');

const isValid = calculatedHash === hash;`,
    },
  ],
  relatedGuides: ['mini-apps-introduction', 'bridge-api'],
};

export const dataValidationGuides: GuideDoc[] = [dataValidationGuide];
