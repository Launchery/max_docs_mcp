import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerPrompts(server: McpServer): void {
  // Prompt: How to create a MAX bot
  server.prompt(
    'create-bot',
    'Пошаговое руководство по созданию MAX чат-бота. Включает регистрацию, настройку webhook и первый ответ.',
    {
      language: z.enum(['typescript', 'javascript', 'go', 'python']).optional().describe('Язык программирования (по умолчанию: typescript)'),
    },
    async ({ language = 'typescript' }) => {
      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Я хочу создать чат-бота для MAX Platform на ${language}. Покажи пошаговый процесс:
1. Регистрация бота через MAX
2. Получение токена
3. Настройка webhook для получения сообщений
4. Отправка первого ответа пользователю
5. Добавление inline-кнопок

Используй актуальную документацию MAX Bot API через доступные инструменты (search_docs, list_endpoints, get_guide, get_code_example).`,
          },
        }],
      };
    }
  );

  // Prompt: Send message patterns
  server.prompt(
    'send-message-patterns',
    'Все способы отправки сообщений в MAX: текст, кнопки, изображения, файлы, карусели.',
    {},
    async () => {
      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Покажи все доступные типы сообщений в MAX Bot API:
1. Простое текстовое сообщение
2. Сообщение с inline-кнопками
3. Сообщение с вложением (изображение, файл)
4. Сообщение с несколькими вложениями
5. Ответ на конкретное сообщение

Для каждого типа приведи пример запроса. Используй search_docs, get_endpoint, get_code_example для актуальной информации.`,
          },
        }],
      };
    }
  );

  // Prompt: Mini-app development
  server.prompt(
    'build-mini-app',
    'Руководство по созданию мини-приложения для MAX: Bridge API, UI компоненты, навигация.',
    {
      app_type: z.enum(['game', 'utility', 'store', 'custom']).optional().describe('Тип мини-приложения (по умолчанию: custom)'),
    },
    async ({ app_type = 'custom' }) => {
      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Я создаю мини-приложение типа "${app_type}" для MAX Platform. Помоги с:
1. Подключение Bridge API (window.WebApp)
2. Основные методы: ready(), expand(), close()
3. Работа с MainButton и BackButton
4. Получение данных пользователя
5. Навигация внутри мини-приложения
6. Использование Bridge Storage для сохранения данных

Используй get_bridge_api, search_docs, get_guide, get_code_example для актуальной документации.`,
          },
        }],
      };
    }
  );

  // Prompt: Debug error
  server.prompt(
    'debug-max-api',
    'Диагностика ошибок MAX Bot API: статусы, коды ошибок, типичные проблемы.',
    {
      error_description: z.string().describe('Описание ошибки или HTTP-статус'),
    },
    async ({ error_description }) => {
      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `У меня проблема с MAX Bot API: ${error_description}

Помоги диагностировать:
1. Что означает эта ошибка в контексте MAX API?
2. Какие возможные причины?
3. Как исправить?
4. Есть ли пример обработки такой ошибки?

Используй search_docs и get_endpoint для поиска релевантной документации.`,
          },
        }],
      };
    }
  );
}
