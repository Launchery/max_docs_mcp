import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allEndpoints } from '../data/endpoints/index.js';
import { allModels } from '../data/models/index.js';
import { allGuides } from '../data/guides/index.js';
import { miniAppGuides, bridgeApi } from '../data/mini-apps/index.js';
import { uiLibrary } from '../data/ui-components/index.js';
import { searchDocs } from '../utils/search.js';
import { formatEndpoint, formatModel, formatGuide, formatComponent } from '../utils/formatter.js';

const allGuidesWithMiniApps = [...allGuides, ...miniAppGuides];

export function registerSearchDocsTool(server: McpServer): void {
  server.tool(
    'search_docs',
    'Поиск по всей документации MAX: эндпоинты, модели, руководства, Bridge API, UI-компоненты. Возвращает до 10 результатов.',
    {
      query: z.string().describe('Поисковый запрос (ключевые слова)'),
    },
    async ({ query }) => {
      const results = searchDocs(
        query,
        allEndpoints,
        allModels,
        allGuidesWithMiniApps,
        bridgeApi,
        uiLibrary.components,
      );

      if (results.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: `По запросу "${query}" ничего не найдено.\n\nПопробуйте другие ключевые слова или используйте list_endpoints / list_guides для просмотра всех документов.`,
          }],
        };
      }

      const sections = results.map((r, i) => {
        const header = `### Результат ${i + 1} (${r.type}, score: ${r.score})`;
        if (r.type === 'endpoint' && r.endpoint) {
          return `${header}\n\n${formatEndpoint(r.endpoint)}`;
        }
        if (r.type === 'model' && r.model) {
          return `${header}\n\n${formatModel(r.model)}`;
        }
        if (r.type === 'guide' && r.guide) {
          return `${header}\n\n${formatGuide(r.guide)}`;
        }
        if (r.type === 'component' && r.component) {
          return `${header}\n\n${formatComponent(r.component)}`;
        }
        if (r.type === 'bridge-method' && r.bridgeMethod) {
          const m = r.bridgeMethod;
          const params = m.params.map(p => p.name).join(', ');
          return `${header}\n\n**Bridge метод: ${m.name}(${params})**\n\n${m.description}`;
        }
        if (r.type === 'bridge-event' && r.bridgeEvent) {
          return `${header}\n\n**Bridge событие: ${r.bridgeEvent.name}**\n\n${r.bridgeEvent.description}`;
        }
        return `${header}\n\n${r.title}: ${r.description}`;
      });

      const text = [
        `# Результаты поиска: "${query}"`,
        '',
        `Найдено: ${results.length} результат(ов)`,
        '',
        ...sections,
      ].join('\n\n');

      return {
        content: [{
          type: 'text' as const,
          text,
        }],
      };
    },
  );
}
