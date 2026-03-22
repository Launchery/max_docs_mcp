import type { GuideDoc } from '../types.js';
import { platformGuides } from './platform.js';
import { chatbotCreationGuides } from './chatbot-creation.js';
import { chatbotManagementGuides } from './chatbot-management.js';
import { tutorialJsGuides } from './tutorial-js.js';
import { tutorialGoGuides } from './tutorial-go.js';
import { sdkJavascriptGuides } from './sdk-javascript.js';
import { sdkGoGuides } from './sdk-go.js';
import { channelGuides } from './channels.js';
import { partnerGuides } from './partners.js';
import { legalGuides } from './legal.js';

export {
  platformGuides,
  chatbotCreationGuides,
  chatbotManagementGuides,
  tutorialJsGuides,
  tutorialGoGuides,
  sdkJavascriptGuides,
  sdkGoGuides,
  channelGuides,
  partnerGuides,
  legalGuides,
};

export const allGuides: GuideDoc[] = [
  ...platformGuides,
  ...chatbotCreationGuides,
  ...chatbotManagementGuides,
  ...tutorialJsGuides,
  ...tutorialGoGuides,
  ...sdkJavascriptGuides,
  ...sdkGoGuides,
  ...channelGuides,
  ...partnerGuides,
  ...legalGuides,
];

export const guidesByCategory: Record<string, GuideDoc[]> = {
  platform: platformGuides,
  chatbot: [...chatbotCreationGuides, ...chatbotManagementGuides],
  tutorials: [...tutorialJsGuides, ...tutorialGoGuides],
  sdk: [...sdkJavascriptGuides, ...sdkGoGuides],
  channels: channelGuides,
  partners: partnerGuides,
  legal: legalGuides,
};
