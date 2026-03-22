import type { GuideDoc } from '../types.js';

import { bridgeApiGuide } from './bridge-guide.js';
import { miniAppIntroGuides } from './introduction.js';
import { dataValidationGuides } from './data-validation.js';

export { bridgeApi } from './bridge-api.js';
export { bridgeApiGuide } from './bridge-guide.js';

export const miniAppGuides: GuideDoc[] = [
  bridgeApiGuide,
  ...miniAppIntroGuides,
  ...dataValidationGuides,
];
