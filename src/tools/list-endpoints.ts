import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allEndpoints } from '../data/endpoints/index.js';
import { formatEndpointsTable } from '../utils/formatter.js';

export function registerListEndpointsTool(server: McpServer): void {
  server.tool(
    'list_endpoints',
    'Возвращает таблицу всех эндпоинтов MAX Bot API с методом, путём и описанием',
    {},
    async () => ({
      content: [{
        type: 'text' as const,
        text: formatEndpointsTable(allEndpoints),
      }],
    }),
  );
}
