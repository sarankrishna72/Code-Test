import { essentials } from '../app/core/essentials/env.config';
import { platformConfig } from '../app/core/essentials/platform.config';
export const environment = {
  production: true
};
export const config = Object.assign({"envType" : 'prod'}, platformConfig['prod'], essentials);
