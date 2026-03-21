import type { EndpointDoc } from '../types.js';
import { botEndpoints } from './bot.js';
import { chatsEndpoints } from './chats.js';
import { pinnedMessagesEndpoints } from './pinned-messages.js';
import { membersEndpoints } from './members.js';
import { messagesEndpoints } from './messages.js';
import { subscriptionsEndpoints } from './subscriptions.js';
import { uploadsEndpoints } from './uploads.js';
import { callbacksEndpoints } from './callbacks.js';

export {
  botEndpoints,
  chatsEndpoints,
  pinnedMessagesEndpoints,
  membersEndpoints,
  messagesEndpoints,
  subscriptionsEndpoints,
  uploadsEndpoints,
  callbacksEndpoints,
};

export const allEndpoints: EndpointDoc[] = [
  ...botEndpoints,
  ...chatsEndpoints,
  ...pinnedMessagesEndpoints,
  ...membersEndpoints,
  ...messagesEndpoints,
  ...subscriptionsEndpoints,
  ...uploadsEndpoints,
  ...callbacksEndpoints,
];

export const endpointsByGroup: Record<string, EndpointDoc[]> = {
  bot: botEndpoints,
  chats: chatsEndpoints,
  'pinned-messages': pinnedMessagesEndpoints,
  members: membersEndpoints,
  messages: messagesEndpoints,
  subscriptions: subscriptionsEndpoints,
  uploads: uploadsEndpoints,
  callbacks: callbacksEndpoints,
};
