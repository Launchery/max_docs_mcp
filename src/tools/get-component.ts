import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { uiLibrary } from '../data/ui-components/index.js';
import { formatComponentsOverview, formatComponent } from '../utils/formatter.js';

export function registerGetComponentTool(server: McpServer): void {
  server.tool(
    'get_component',
    'Документация MAX UI компонентов. Без параметров — обзор библиотеки. С параметром — конкретный компонент (Button, Input, Avatar.Container и др.).',
    {
      name: z.string().optional().describe('Имя компонента (например: Button, Input, Avatar.Container, Flex)'),
    },
    async ({ name }) => {
      if (!name) {
        return {
          content: [{
            type: 'text' as const,
            text: formatComponentsOverview(uiLibrary),
          }],
        };
      }

      const normalizedName = name.toLowerCase().trim();

      const comp = uiLibrary.components.find(
        c => c.name.toLowerCase() === normalizedName,
      );

      if (comp) {
        return {
          content: [{
            type: 'text' as const,
            text: formatComponent(comp),
          }],
        };
      }

      // Fuzzy suggestions
      const suggestions = uiLibrary.components.filter(c =>
        c.name.toLowerCase().includes(normalizedName) ||
        c.category.toLowerCase().includes(normalizedName)
      );

      let text = `Компонент "${name}" не найден.\n\n`;
      if (suggestions.length > 0) {
        text += 'Возможно, вы имели в виду:\n\n';
        text += suggestions.map(c => `- **${c.name}** — ${c.description} (${c.category})`).join('\n');
      } else {
        text += `Доступные компоненты: ${uiLibrary.components.map(c => c.name).join(', ')}`;
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
