import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

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
  plugins: [nextui()],
};
export default config;
