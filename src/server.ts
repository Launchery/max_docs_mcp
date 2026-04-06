import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerResources } from './resources/registry.js';
import { registerListEndpointsTool } from './tools/list-endpoints.js';
import { registerGetEndpointTool } from './tools/get-endpoint.js';
import { registerSearchDocsTool } from './tools/search-docs.js';
import { registerListGuidesTool } from './tools/list-guides.js';
import { registerGetGuideTool } from './tools/get-guide.js';
import { registerGetBridgeApiTool } from './tools/get-bridge-api.js';
import { registerGetComponentTool } from './tools/get-component.js';
import { registerGetCodeExampleTool } from './tools/get-code-example.js';
import { registerPrompts } from './prompts/index.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'max-docs',
    version: '2.0.0',
  });

  registerResources(server);

  // API tools
  registerListEndpointsTool(server);
  registerGetEndpointTool(server);
  registerSearchDocsTool(server);

  // Guide tools
  registerListGuidesTool(server);
  registerGetGuideTool(server);

  // Mini-apps tools
  registerGetBridgeApiTool(server);

  // UI tools
  registerGetComponentTool(server);

  // v2.0 tools
  registerGetCodeExampleTool(server);

  // Prompts
  registerPrompts(server);

  return server;
}
