import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/championData.ts',
    './node_modules/@nextui-org/theme/dist/components/[object Object].js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui(),
    plugin(function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '2px #fff',
        },
      });
    }),
  ],
};
export default config;
