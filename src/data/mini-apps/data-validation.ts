import type { GuideDoc } from '../types.js';

export const dataValidationGuide: GuideDoc = {
  id: 'data-validation',
  category: 'mini-apps',
  title: 'Валидация данных мини-приложения',
  summary: 'Процесс верификации данных инициализации через HMAC-SHA256',
  sections: [
    {
      heading: 'Процесс валидации',
      content:
        'Валидация данных инициализации мини-приложения выполняется в 6 шагов с использованием алгоритма HMAC-SHA256.',
      subsections: [
        {
          heading: 'Шаг 1: Получение данных',
          content:
            'Получите закодированную строку данных инициализации через WebAppData.',
        },
        {
          heading: 'Шаг 2: Извлечение параметров',
          content:
            'Извлеките параметры через window.WebApp.InitData.',
        },
        {
          heading: 'Шаг 3: Подготовка данных',
          content:
            'Выполните URL-декодирование строки. Объедините параметры в формат {key}={value}. Исключите параметр hash из набора данных. Отсортируйте оставшиеся параметры по алфавиту. Соедините их символом новой строки (\\n).',
        },
        {
          heading: 'Шаг 4: Генерация секретного ключа',
          content:
            'Сгенерируйте секретный ключ с помощью HMAC_SHA256, используя строку «WebAppData» в сочетании с токеном бота: HMAC_SHA256(\'WebAppData\' + Bot Token).',
        },
        {
          heading: 'Шаг 5: Вычисление хеша',
          content:
            'Вычислите хеш HMAC-SHA256, используя секретный ключ и подготовленные данные. Сконвертируйте результат в hex-строку.',
        },
        {
          heading: 'Шаг 6: Верификация',
          content:
            'Сравните вычисленный хеш с полученным значением hash из исходных данных. Если значения совпадают — данные валидны.',
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
  relatedGuides: ['mini-apps-introduction', 'bridge-api-guide'],
};

export const dataValidationGuides: GuideDoc[] = [dataValidationGuide];
