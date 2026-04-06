import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allEndpoints } from '../data/endpoints/index.js';
import { allGuides } from '../data/guides/index.js';
import { miniAppGuides } from '../data/mini-apps/index.js';

const codeExamples: Record<string, {
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
}> = {
  'send-message': {
    title: 'Отправка текстового сообщения',
    description: 'Пример отправки простого текстового сообщения в чат через MAX Bot API',
    language: 'typescript',
    tags: ['message', 'send', 'chat', 'bot', 'text'],
    code: `import fetch from 'node-fetch';

const TOKEN = process.env.MAX_BOT_TOKEN;
const CHAT_ID = 123456; // ID чата

async function sendMessage(text: string) {
  const response = await fetch(
    \`https://botapi.max.ru/messages?access_token=\${TOKEN}\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        body: text,
      }),
    }
  );
  return response.json();
}

// Использование
await sendMessage('Привет от бота!');
`,
  },
  'send-buttons': {
    title: 'Отправка сообщения с кнопками',
    description: 'Интерактивное сообщение с inline-кнопками для навигации',
    language: 'typescript',
    tags: ['message', 'buttons', 'callback', 'inline', 'keyboard'],
    code: `import fetch from 'node-fetch';

const TOKEN = process.env.MAX_BOT_TOKEN;
const CHAT_ID = 123456;

async function sendWithButtons() {
  const response = await fetch(
    \`https://botapi.max.ru/messages?access_token=\${TOKEN}\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        body: 'Выберите действие:',
        attachments: [{
          type: 'inline_keyboard',
          payload: {
            buttons: [
              [{
                type: 'callback',
                text: '📋 Мои данные',
                payload: 'action=show_data',
                intent: 'positive',
              }],
              [{
                type: 'callback',
                text: '⚙️ Настройки',
                payload: 'action=settings',
              }],
              [{
                type: 'callback',
                text: '❓ Помощь',
                payload: 'action=help',
                intent: 'default',
              }],
            ],
          },
        }],
      }),
    }
  );
  return response.json();
}
`,
  },
  'handle-callback': {
    title: 'Обработка callback-нажатий',
    description: 'Обработка нажатий на inline-кнопки и отправка ответа',
    language: 'typescript',
    tags: ['callback', 'button', 'answer', 'handler', 'webhook'],
    code: `import { Router } from 'express';

const router = Router();

router.post('/webhook', async (req, res) => {
  const update = req.body;

  if (update.callback) {
    const { callback_id, payload, user } = update.callback;
    const params = new URLSearchParams(payload);

    switch (params.get('action')) {
      case 'show_data':
        await answerCallback(callback_id, '📋 Ваши данные загружены');
        break;
      case 'settings':
        await answerCallback(callback_id, '⚙️ Открываю настройки...');
        break;
      case 'help':
        await answerCallback(callback_id, '❓ Чем могу помочь?');
        break;
    }
  }

  res.sendStatus(200);
});

async function answerCallback(callbackId: string, text: string) {
  await fetch(
    \`https://botapi.max.ru/answers?access_token=\${TOKEN}\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_id: callbackId,
        body: text,
      }),
    }
  );
}
`,
  },
  'webhook-setup': {
    title: 'Настройка webhook-подписки',
    description: 'Регистрация webhook URL для получения обновлений',
    language: 'typescript',
    tags: ['webhook', 'subscription', 'setup', 'updates', 'events'],
    code: `import fetch from 'node-fetch';
import crypto from 'crypto';

const TOKEN = process.env.MAX_BOT_TOKEN;
const WEBHOOK_URL = 'https://your-domain.com/webhook';

async function setupWebhook() {
  // 1. Подписаться на обновления
  const response = await fetch(
    \`https://botapi.max.ru/subscriptions?access_token=\${TOKEN}\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        update_types: [
          'message_created',
          'message_callback',
          'chat_created',
          'chat_member_added',
        ],
      }),
    }
  );

  const subscription = await response.json();
  console.log('Подписка создана:', subscription);
  return subscription;
}

// Проверка подписки
async function checkSubscription() {
  const response = await fetch(
    \`https://botapi.max.ru/subscriptions?access_token=\${TOKEN}\`
  );
  const subs = await response.json();
  console.log('Активные подписки:', subs.subscriptions);
}
`,
  },
  'mini-app-init': {
    title: 'Инициализация мини-приложения',
    description: 'Подключение MAX Bridge API в мини-приложении',
    language: 'typescript',
    tags: ['mini-app', 'bridge', 'init', 'webapp', 'frontend'],
    code: `// В HTML-файле мини-приложения
// <script src="https://webapp.max.ru/max-webapp.js"></script>

declare interface MaxWebApp {
  ready: () => void;
  close: () => void;
  expand: () => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (fn: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (fn: () => void) => void;
  };
  onEvent: (event: string, fn: (...args: any[]) => void) => void;
}

// Инициализация
const app = (window as any).WebApp as MaxWebApp;

// Сообщить платформе, что приложение готово
app.ready();

// Настроить главную кнопку
app.MainButton.text = 'Подтвердить';
app.MainButton.show();
app.MainButton.onClick(() => {
  console.log('Кнопка нажата!');
  app.close();
});

// Обработка кнопки "Назад"
app.BackButton.show();
app.BackButton.onClick(() => {
  console.log('Назад');
});
`,
  },
  'upload-file': {
    title: 'Загрузка и отправка файла',
    description: 'Загрузка изображения и отправка в чат',
    language: 'typescript',
    tags: ['upload', 'file', 'image', 'attachment', 'media'],
    code: `import fetch from 'node-fetch';
import fs from 'fs';

const TOKEN = process.env.MAX_BOT_TOKEN;
const CHAT_ID = 123456;

async function uploadAndSendImage(filePath: string) {
  // 1. Получить URL для загрузки
  const uploadUrlResp = await fetch(
    \`https://botapi.max.ru/uploads?access_token=\${TOKEN}&type=image\`
  );
  const { url: uploadUrl } = await uploadUrlResp.json();

  // 2. Загрузить файл
  const fileBuffer = fs.readFileSync(filePath);
  const formData = new FormData();
  formData.append('data', new Blob([fileBuffer]), 'image.jpg');

  const uploadResp = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });
  const uploadResult = await uploadResp.json();

  // 3. Отправить сообщение с вложением
  const msgResp = await fetch(
    \`https://botapi.max.ru/messages?access_token=\${TOKEN}\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        body: 'Смотрите что нашёл!',
        attachments: [{
          type: 'image',
          payload: uploadResult,
        }],
      }),
    }
  );

  return msgResp.json();
}
`,
  },
  'bridge-storage': {
    title: 'Работа с Bridge Storage API',
    description: 'Сохранение и чтение данных через MAX Bridge Storage',
    language: 'typescript',
    tags: ['bridge', 'storage', 'data', 'persist', 'mini-app'],
    code: `// Использование Bridge Storage API в мини-приложении

interface StorageApi {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  getKeys: () => Promise<string[]>;
  clear: () => Promise<void>;
}

// Предполагается, что Bridge API уже инициализирован

async function saveUserPreferences(userId: string, prefs: Record<string, any>) {
  const storage = getStorageApi(); // Получить из Bridge
  await storage.setItem(\`prefs_\${userId}\`, JSON.stringify(prefs));
}

async function getUserPreferences(userId: string): Promise<Record<string, any>> {
  const storage = getStorageApi();
  const raw = await storage.getItem(\`prefs_\${userId}\`);
  return raw ? JSON.parse(raw) : {};
}

async function clearAllData() {
  const storage = getStorageApi();
  await storage.clear();
  console.log('Все данные очищены');
}
`,
  },
  'error-handling': {
    title: 'Обработка ошибок API',
    description: 'Стандартные паттерны обработки ошибок MAX Bot API',
    language: 'typescript',
    tags: ['error', 'handling', 'retry', 'rate-limit', 'status'],
    code: `import fetch from 'node-fetch';

class MaxApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'MaxApiError';
  }
}

async function apiRequest(
  method: string,
  endpoint: string,
  body?: any,
  retries = 3,
): Promise<any> {
  const url = \`https://botapi.max.ru\${endpoint}?access_token=\${TOKEN}\`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        // Rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const delay = parseInt(retryAfter || '1') * 1000;
          console.log(\`Rate limited. Ждём \${delay}ms...\`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }

        throw new MaxApiError(
          response.status,
          data.code || 'unknown',
          data.message || 'API Error',
        );
      }

      return data;
    } catch (error) {
      if (error instanceof MaxApiError) throw error;
      if (attempt === retries) throw error;

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(\`Попытка \${attempt} не удалась. Повтор через \${delay}ms\`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
`,
  },
};

const allCodeExamples = Object.entries(codeExamples).map(([id, ex]) => ({
  id,
  ...ex,
}));

export function registerGetCodeExampleTool(server: McpServer): void {
  server.tool(
    'get_code_example',
    'Получить пример кода для типичной задачи MAX Bot API. Доступно: send-message, send-buttons, handle-callback, webhook-setup, mini-app-init, upload-file, bridge-storage, error-handling.',
    {
      task: z.string().describe('Задача или ключевой слово (например: "send message", "buttons", "webhook", "mini-app", "upload", "error")'),
    },
    async ({ task }) => {
      const query = task.toLowerCase().trim();
      const terms = query.split(/\s+/);

      // Direct match by ID
      const directMatch = codeExamples[query.replace(/[\s-]+/g, '-')];
      if (directMatch) {
        return {
          content: [{
            type: 'text' as const,
            text: `# ${directMatch.title}\n\n${directMatch.description}\n\n\`\`\`${directMatch.language}\n${directMatch.code}\n\`\`\``,
          }],
        };
      }

      // Search by tags and title
      const scored = allCodeExamples.map(ex => {
        let score = 0;
        for (const term of terms) {
          if (ex.id.includes(term)) score += 3;
          if (ex.title.toLowerCase().includes(term)) score += 2;
          if (ex.description.toLowerCase().includes(term)) score += 1;
          for (const tag of ex.tags) {
            if (tag.includes(term)) score += 2;
          }
        }
        return { ...ex, score };
      }).filter(ex => ex.score > 0).sort((a, b) => b.score - a.score);

      if (scored.length === 0) {
        const available = allCodeExamples.map(ex => `\`${ex.id}\` — ${ex.title}`).join('\n');
        return {
          content: [{
            type: 'text' as const,
            text: `Пример для "${task}" не найден.\n\nДоступные примеры:\n${available}\n\nУкажите конкретный ID или ключевые слова.`,
          }],
        };
      }

      const best = scored[0];
      return {
        content: [{
          type: 'text' as const,
          text: `# ${best.title}\n\n${best.description}\n\n\`\`\`${best.language}\n${best.code}\n\`\`\`\n\n${scored.length > 1 ? `Ещё ${scored.length - 1} похожих результатов: ${scored.slice(1).map(s => `\`${s.id}\``).join(', ')}` : ''}`,
        }],
      };
    },
  );
}
