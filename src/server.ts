import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerResources } from './resources/registry.js';
import { registerListEndpointsTool } from './tools/list-endpoints.js';
import { registerGetEndpointTool } from './tools/get-endpoint.js';
import { registerSearchDocsTool } from './tools/search-docs.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'max-docs',
    version: '1.0.0',
  });

  registerResources(server);
  registerListEndpointsTool(server);
  registerGetEndpointTool(server);
  registerSearchDocsTool(server);

  return server;
}
