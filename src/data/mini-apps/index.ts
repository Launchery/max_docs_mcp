import type { GuideDoc } from '../types.js';

import { miniAppIntroGuides } from './introduction.js';
import { dataValidationGuides } from './data-validation.js';

export { bridgeApi } from './bridge-api.js';

export const miniAppGuides: GuideDoc[] = [
  ...miniAppIntroGuides,
  ...dataValidationGuides,
];
