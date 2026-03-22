import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { overview } from '../data/overview.js';
import { endpointsByGroup, allEndpoints } from '../data/endpoints/index.js';
import { allModels } from '../data/models/index.js';
import { allGuides, guidesByCategory } from '../data/guides/index.js';
import { miniAppGuides, bridgeApi } from '../data/mini-apps/index.js';
import { uiLibrary } from '../data/ui-components/index.js';
import {
  formatOverview, formatEndpoint, formatModel, formatModelsOverview,
  formatGuidesTable, formatGuide,
  formatBridgeApiOverview, formatBridgeObject, formatBridgeEvents,
  formatComponentsOverview, formatComponent,
} from '../utils/formatter.js';

const allGuidesWithMiniApps = [...allGuides, ...miniAppGuides];

export function registerResources(server: McpServer): void {
  // ========== API Overview ==========

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

  // ========== API Endpoint Groups ==========

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

  // ========== Models ==========

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

  // ========== Guides ==========

  server.resource('guides-overview', 'max-docs://guides', {
    description: 'Обзор всех руководств: платформа, боты, SDK, мини-приложения, каналы, партнёры, юридика',
    mimeType: 'text/markdown',
  }, async () => ({
    contents: [{
      uri: 'max-docs://guides',
      mimeType: 'text/markdown',
      text: formatGuidesTable(allGuidesWithMiniApps),
    }],
  }));

  const guideCategories: Array<{ name: string; category: string; description: string }> = [
    { name: 'guide-platform', category: 'platform', description: 'Подключение к платформе и выбор сервисов' },
    { name: 'guide-chatbot', category: 'chatbot', description: 'Создание, настройка и управление чат-ботами' },
    { name: 'guide-tutorials', category: 'tutorials', description: 'Пошаговые туториалы Hello Bot (JS, Go)' },
    { name: 'guide-sdk', category: 'sdk', description: 'Документация SDK: JavaScript/TypeScript и Go' },
    { name: 'guide-mini-apps', category: 'mini-apps', description: 'Подключение мини-приложений, MAX Bridge и валидация данных' },
    { name: 'guide-channels', category: 'channels', description: 'Создание и управление каналами' },
    { name: 'guide-partners', category: 'partners', description: 'Интеграция с партнёрскими сервисами' },
    { name: 'guide-legal', category: 'legal', description: 'Правила, требования, соглашения, конфиденциальность' },
  ];

  for (const { name, category, description } of guideCategories) {
    const uri = `max-docs://guides/${category}`;
    server.resource(name, uri, {
      description,
      mimeType: 'text/markdown',
    }, async () => {
      const guides = guidesByCategory[category] ?? [];
      const text = guides.map(g => formatGuide(g)).join('\n\n---\n\n');
      return {
        contents: [{
          uri,
          mimeType: 'text/markdown',
          text: `# MAX Руководства — ${category}\n\n${text}`,
        }],
      };
    });
  }

  // Individual guide template
  const guideTemplate = new ResourceTemplate('max-docs://guides/{id}', {
    list: async () => ({
      resources: allGuidesWithMiniApps.map(g => ({
        uri: `max-docs://guides/${g.id}`,
        name: g.title,
        description: g.summary,
        mimeType: 'text/markdown' as const,
      })),
    }),
    complete: {
      id: (value: string) =>
        allGuidesWithMiniApps
          .map(g => g.id)
          .filter(id => id.toLowerCase().startsWith(value.toLowerCase())),
    },
  });

  server.resource('guide-detail', guideTemplate, {
    description: 'Детальное руководство по ID',
    mimeType: 'text/markdown',
  }, async (uri, variables) => {
    const idVal = variables.id;
    const guideId = Array.isArray(idVal) ? idVal[0] : (idVal ?? '');
    const guide = allGuidesWithMiniApps.find(
      g => g.id.toLowerCase() === guideId.toLowerCase(),
    );
    if (!guide) {
      const available = allGuidesWithMiniApps.map(g => g.id).join(', ');
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'text/markdown',
          text: `Руководство "${guideId}" не найдено.\n\nДоступные руководства: ${available}`,
        }],
      };
    }
    return {
      contents: [{
        uri: uri.href,
        mimeType: 'text/markdown',
        text: formatGuide(guide),
      }],
    };
  });

  // ========== Mini-Apps / Bridge API ==========

  server.resource('mini-apps-overview', 'max-docs://mini-apps', {
    description: 'Обзор мини-приложений MAX: введение, Bridge API, валидация данных',
    mimeType: 'text/markdown',
  }, async () => {
    const text = miniAppGuides.map(g => formatGuide(g)).join('\n\n---\n\n');
    return {
      contents: [{
        uri: 'max-docs://mini-apps',
        mimeType: 'text/markdown',
        text: `# MAX Мини-приложения\n\n${text}`,
      }],
    };
  });

  server.resource('bridge-api', 'max-docs://mini-apps/bridge-api', {
    description: 'Полная документация MAX Bridge API (window.WebApp)',
    mimeType: 'text/markdown',
  }, async () => ({
    contents: [{
      uri: 'max-docs://mini-apps/bridge-api',
      mimeType: 'text/markdown',
      text: formatBridgeApiOverview(bridgeApi),
    }],
  }));

  server.resource('bridge-api-events', 'max-docs://mini-apps/bridge-api/events', {
    description: 'События MAX Bridge API',
    mimeType: 'text/markdown',
  }, async () => ({
    contents: [{
      uri: 'max-docs://mini-apps/bridge-api/events',
      mimeType: 'text/markdown',
      text: formatBridgeEvents(bridgeApi.events),
    }],
  }));

  // Individual Bridge object template
  const allBridgeObjects = [...bridgeApi.objects, ...bridgeApi.storageApi];

  const bridgeObjectTemplate = new ResourceTemplate('max-docs://mini-apps/bridge-api/{name}', {
    list: async () => ({
      resources: allBridgeObjects.map(o => ({
        uri: `max-docs://mini-apps/bridge-api/${o.name}`,
        name: o.name,
        description: o.description,
        mimeType: 'text/markdown' as const,
      })),
    }),
    complete: {
      name: (value: string) =>
        allBridgeObjects
          .map(o => o.name)
          .filter(n => n.toLowerCase().startsWith(value.toLowerCase())),
    },
  });

  server.resource('bridge-object-detail', bridgeObjectTemplate, {
    description: 'Детальная документация объекта Bridge API',
    mimeType: 'text/markdown',
  }, async (uri, variables) => {
    const nameVal = variables.name;
    const objName = Array.isArray(nameVal) ? nameVal[0] : (nameVal ?? '');
    const obj = allBridgeObjects.find(
      o => o.name.toLowerCase() === objName.toLowerCase(),
    );
    if (!obj) {
      const available = allBridgeObjects.map(o => o.name).join(', ');
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'text/markdown',
          text: `Объект "${objName}" не найден.\n\nДоступные объекты: ${available}`,
        }],
      };
    }
    return {
      contents: [{
        uri: uri.href,
        mimeType: 'text/markdown',
        text: formatBridgeObject(obj),
      }],
    };
  });

  // ========== UI Components ==========

  server.resource('ui-components', 'max-docs://ui-components', {
    description: 'Обзор библиотеки MAX UI компонентов',
    mimeType: 'text/markdown',
  }, async () => ({
    contents: [{
      uri: 'max-docs://ui-components',
      mimeType: 'text/markdown',
      text: formatComponentsOverview(uiLibrary),
    }],
  }));

  const componentTemplate = new ResourceTemplate('max-docs://ui-components/{name}', {
    list: async () => ({
      resources: uiLibrary.components.map(c => ({
        uri: `max-docs://ui-components/${c.name}`,
        name: c.name,
        description: c.description,
        mimeType: 'text/markdown' as const,
      })),
    }),
    complete: {
      name: (value: string) =>
        uiLibrary.components
          .map(c => c.name)
          .filter(n => n.toLowerCase().startsWith(value.toLowerCase())),
    },
  });

  server.resource('component-detail', componentTemplate, {
    description: 'Детальная документация UI компонента',
    mimeType: 'text/markdown',
  }, async (uri, variables) => {
    const nameVal = variables.name;
    const compName = Array.isArray(nameVal) ? nameVal[0] : (nameVal ?? '');
    const comp = uiLibrary.components.find(
      c => c.name.toLowerCase() === compName.toLowerCase(),
    );
    if (!comp) {
      const available = uiLibrary.components.map(c => c.name).join(', ');
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'text/markdown',
          text: `Компонент "${compName}" не найден.\n\nДоступные компоненты: ${available}`,
        }],
      };
    }
    return {
      contents: [{
        uri: uri.href,
        mimeType: 'text/markdown',
        text: formatComponent(comp),
      }],
    };
  });
}
