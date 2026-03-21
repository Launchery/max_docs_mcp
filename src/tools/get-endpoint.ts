import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allEndpoints } from '../data/endpoints/index.js';
import { formatEndpoint, formatEndpointSummary } from '../utils/formatter.js';

export function registerGetEndpointTool(server: McpServer): void {
  server.tool(
    'get_endpoint',
    'Возвращает полную документацию конкретного эндпоинта MAX Bot API по методу и пути',
    {
      method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).describe('HTTP метод'),
      path: z.string().describe('Путь эндпоинта, например /messages или /chats/{chatId}'),
    },
    async ({ method, path }) => {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;

      // Exact match
      const endpoint = allEndpoints.find(
        ep => ep.method === method && ep.path.toLowerCase() === normalizedPath.toLowerCase(),
      );

      if (endpoint) {
        return {
          content: [{
            type: 'text' as const,
            text: formatEndpoint(endpoint),
          }],
        };
      }

      // Fuzzy suggestions
      const suggestions = allEndpoints.filter(
        ep =>
          ep.method === method ||
          ep.path.toLowerCase().includes(normalizedPath.toLowerCase()) ||
          normalizedPath.toLowerCase().includes(ep.path.toLowerCase().replace(/\{[^}]+\}/g, '')),
      );

      let text = `Эндпоинт ${method} ${normalizedPath} не найден.\n\n`;
      if (suggestions.length > 0) {
        text += 'Возможно, вы имели в виду:\n\n';
        text += suggestions.map(ep => `- ${formatEndpointSummary(ep)}`).join('\n');
      } else {
        text += 'Используйте list_endpoints для получения полного списка.';
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
