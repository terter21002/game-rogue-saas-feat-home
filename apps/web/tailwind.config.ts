// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets' | 'content' | 'theme'> = {
  presets: [sharedConfig],
  content: ['./src/**/*.tsx', '../../packages/utils/src/avatar.ts'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
      },
    },
  },
};

export default config;
