import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allGuides, guidesByCategory } from '../data/guides/index.js';
import { formatGuidesTable } from '../utils/formatter.js';

export function registerListGuidesTool(server: McpServer): void {
  server.tool(
    'list_guides',
    'Список всех руководств документации MAX: платформа, создание ботов, SDK, мини-приложения, каналы, партнёры, юридические документы',
    {
      category: z.enum([
        'platform', 'chatbot', 'tutorials', 'sdk',
        'mini-apps', 'channels', 'partners', 'legal',
      ]).optional().describe('Фильтр по категории (опционально)'),
    },
    async ({ category }) => {
      const guides = category ? (guidesByCategory[category] ?? allGuides) : allGuides;
      return {
        content: [{
          type: 'text' as const,
          text: formatGuidesTable(guides, category),
        }],
      };
    },
  );
}
