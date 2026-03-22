import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allGuides } from '../data/guides/index.js';
import { miniAppGuides } from '../data/mini-apps/index.js';
import { formatGuide } from '../utils/formatter.js';

const allAvailableGuides = [...allGuides, ...miniAppGuides];

export function registerGetGuideTool(server: McpServer): void {
  server.tool(
    'get_guide',
    'Возвращает полное руководство по ID. Используйте list_guides для просмотра доступных ID.',
    {
      id: z.string().describe('ID руководства, например: bot-creation, sdk-javascript, hello-bot-go'),
    },
    async ({ id }) => {
      const normalizedId = id.toLowerCase().trim();

      const guide = allAvailableGuides.find(
        g => g.id.toLowerCase() === normalizedId,
      );

      if (guide) {
        return {
          content: [{
            type: 'text' as const,
            text: formatGuide(guide),
          }],
        };
      }

      // Fuzzy suggestions
      const suggestions = allAvailableGuides.filter(g =>
        g.id.toLowerCase().includes(normalizedId) ||
        g.title.toLowerCase().includes(normalizedId) ||
        g.category.toLowerCase().includes(normalizedId)
      );

      let text = `Руководство "${id}" не найдено.\n\n`;
      if (suggestions.length > 0) {
        text += 'Возможно, вы имели в виду:\n\n';
        text += suggestions.map(g => `- **${g.id}** — ${g.title} (${g.category})`).join('\n');
      } else {
        text += `Доступные руководства: ${allAvailableGuides.map(g => g.id).join(', ')}`;
      }

      return {
        content: [{
          type: 'text' as const,
          text,
        }],
      };
    },
  );
}
