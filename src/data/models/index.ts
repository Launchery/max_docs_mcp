import type { ModelDoc } from '../types.js';
import { userModels } from './user.js';
import { chatModels } from './chat.js';
import { messageModels } from './message.js';
import { updateModels } from './update.js';
import { chatMemberModels } from './chat-member.js';
import { attachmentModels } from './attachment.js';
import { subscriptionModels } from './subscription.js';

export {
  userModels,
  chatModels,
  messageModels,
  updateModels,
  chatMemberModels,
  attachmentModels,
  subscriptionModels,
};

export const allModels: ModelDoc[] = [
  ...userModels,
  ...chatModels,
  ...messageModels,
  ...updateModels,
  ...chatMemberModels,
  ...attachmentModels,
  ...subscriptionModels,
];
