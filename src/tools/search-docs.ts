import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allEndpoints } from '../data/endpoints/index.js';
import { allModels } from '../data/models/index.js';
import { searchDocs } from '../utils/search.js';
import { formatEndpoint, formatModel } from '../utils/formatter.js';

export function registerSearchDocsTool(server: McpServer): void {
  server.tool(
    'search_docs',
    'Поиск по документации MAX Bot API: эндпоинты, модели, параметры, поля. Возвращает до 10 результатов.',
    {
      query: z.string().describe('Поисковый запрос (ключевые слова)'),
    },
    async ({ query }) => {
      const results = searchDocs(query, allEndpoints, allModels);

      if (results.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: `По запросу "${query}" ничего не найдено.\n\nПопробуйте другие ключевые слова или используйте list_endpoints для просмотра всех эндпоинтов.`,
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
