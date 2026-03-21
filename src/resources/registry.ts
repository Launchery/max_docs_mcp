import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { overview } from '../data/overview.js';
import { endpointsByGroup, allEndpoints } from '../data/endpoints/index.js';
import { allModels } from '../data/models/index.js';
import { formatOverview, formatEndpoint, formatModel, formatModelsOverview } from '../utils/formatter.js';

export function registerResources(server: McpServer): void {
  // Overview
  server.resource('overview', 'max-docs://overview', {
    description: 'Обзор MAX Bot API: авторизация, base URL, лимиты, статус-коды',
    mimeType: 'text/markdown',
  }, async () => ({
    contents: [{
      uri: 'max-docs://overview',
      mimeType: 'text/markdown',
      text: formatOverview(overview),
    }],
  }));

  // Endpoint groups
  const groups: Array<{ name: string; group: string; description: string }> = [
    { name: 'api-bot', group: 'bot', description: 'GET /me — информация о боте' },
    { name: 'api-chats', group: 'chats', description: 'Эндпоинты управления чатами' },
    { name: 'api-pinned-messages', group: 'pinned-messages', description: 'Закрепление/открепление сообщений' },
    { name: 'api-members', group: 'members', description: 'Управление участниками чатов' },
    { name: 'api-messages', group: 'messages', description: 'Отправка, редактирование, удаление сообщений' },
    { name: 'api-subscriptions', group: 'subscriptions', description: 'Webhook-подписки и long polling' },
    { name: 'api-uploads', group: 'uploads', description: 'Загрузка файлов' },
    { name: 'api-callbacks', group: 'callbacks', description: 'Ответы на callback-кнопки' },
  ];

  for (const { name, group, description } of groups) {
    const uri = `max-docs://api/${group}`;
    server.resource(name, uri, {
      description,
      mimeType: 'text/markdown',
    }, async () => {
      const eps = endpointsByGroup[group] ?? [];
      const text = eps.map(ep => formatEndpoint(ep)).join('\n\n---\n\n');
      return {
        contents: [{
          uri,
          mimeType: 'text/markdown',
          text: `# MAX Bot API — ${group}\n\n${text}`,
        }],
      };
    });
  }

  // All models overview
  server.resource('models', 'max-docs://models', {
    description: 'Обзор всех моделей данных MAX Bot API',
    mimeType: 'text/markdown',
  }, async () => ({
    contents: [{
      uri: 'max-docs://models',
      mimeType: 'text/markdown',
      text: formatModelsOverview(allModels),
    }],
  }));

  // Individual model template
  const modelTemplate = new ResourceTemplate('max-docs://models/{name}', {
    list: async () => ({
      resources: allModels.map(m => ({
        uri: `max-docs://models/${m.name}`,
        name: m.name,
        description: m.description,
        mimeType: 'text/markdown' as const,
      })),
    }),
    complete: {
      name: (value: string) =>
        allModels
          .map(m => m.name)
          .filter(n => n.toLowerCase().startsWith(value.toLowerCase())),
    },
  });

  server.resource('model-detail', modelTemplate, {
    description: 'Детальная документация конкретной модели данных',
    mimeType: 'text/markdown',
  }, async (uri, variables) => {
    const nameVal = variables.name;
    const modelName = Array.isArray(nameVal) ? nameVal[0] : (nameVal ?? '');
    const model = allModels.find(
      m => m.name.toLowerCase() === modelName.toLowerCase(),
    );
    if (!model) {
      const available = allModels.map(m => m.name).join(', ');
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'text/markdown',
          text: `Модель "${modelName}" не найдена.\n\nДоступные модели: ${available}`,
        }],
      };
    }
    return {
      contents: [{
        uri: uri.href,
        mimeType: 'text/markdown',
        text: formatModel(model),
      }],
    };
  });
}
