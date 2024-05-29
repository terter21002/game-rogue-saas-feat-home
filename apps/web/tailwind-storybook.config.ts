import sharedConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets' | 'content' | 'darkMode'> = {
  presets: [sharedConfig],
  content: ['./src/**/*.tsx', '../../packages/utils/src/avatar.ts'],
  darkMode: 'media',
};

export default config;
