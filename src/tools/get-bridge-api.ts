import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { bridgeApi } from '../data/mini-apps/index.js';
import { formatBridgeApiOverview, formatBridgeObject, formatBridgeEvents } from '../utils/formatter.js';

export function registerGetBridgeApiTool(server: McpServer): void {
  server.tool(
    'get_bridge_api',
    'Документация MAX Bridge API (window.WebApp) для мини-приложений. Без параметров — обзор. С параметром — конкретный объект (BackButton, HapticFeedback и др.) или "events" для списка событий.',
    {
      object: z.string().optional().describe('Имя объекта Bridge API (BackButton, HapticFeedback, BiometricManager, ScreenCapture, DeviceStorage, SecureStorage) или "events"'),
    },
    async ({ object }) => {
      if (!object) {
        return {
          content: [{
            type: 'text' as const,
            text: formatBridgeApiOverview(bridgeApi),
          }],
        };
      }

      const normalizedName = object.toLowerCase().trim();

      if (normalizedName === 'events') {
        return {
          content: [{
            type: 'text' as const,
            text: formatBridgeEvents(bridgeApi.events),
          }],
        };
      }

      // Search in objects and storage
      const allObjects = [...bridgeApi.objects, ...bridgeApi.storageApi];
      const found = allObjects.find(o => o.name.toLowerCase() === normalizedName);

      if (found) {
        return {
          content: [{
            type: 'text' as const,
            text: formatBridgeObject(found),
          }],
        };
      }

      // Fuzzy suggestions
      const available = allObjects.map(o => o.name);
      let text = `Объект "${object}" не найден.\n\n`;
      text += `Доступные объекты: ${available.join(', ')}, events`;

      return {
        content: [{
          type: 'text' as const,
          text,
        }],
      };
    },
  );
}
