import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';
import lineClamp from '@tailwindcss/line-clamp';

import plugin from 'tailwindcss/plugin';
import { colors } from './src/constants/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/championData.ts',
    './node_modules/@nextui-org/theme/dist/components/[object Object].js',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: colors.brand,
        tier: {
          ...colors.tier,
          'grand-master': colors.tier.grandMaster,
        },
        semantic: {
          background: {
            page: 'var(--color-background-page)',
            surface: 'var(--color-background-surface)',
            elevated: 'var(--color-background-elevated)',
            input: 'var(--color-background-input)',
            subtle: 'var(--color-background-subtle)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            muted: 'var(--color-text-muted)',
            disabled: 'var(--color-text-disabled)',
            inverse: 'var(--color-text-inverse)',
            accent: 'var(--color-text-accent)',
          },
          icon: {
            default: 'var(--color-icon-default)',
            muted: 'var(--color-icon-muted)',
            'on-media': 'var(--color-icon-on-media)',
            action: 'var(--color-icon-action)',
            'action-secondary': 'var(--color-icon-action-secondary)',
          },
          border: {
            default: 'var(--color-border-default)',
            strong: 'var(--color-border-strong)',
            input: 'var(--color-border-input)',
          },
          button: {
            'primary-fill': 'var(--color-button-primary-fill)',
            'primary-text': 'var(--color-button-primary-text)',
            'secondary-fill': 'var(--color-button-secondary-fill)',
            'secondary-text': 'var(--color-button-secondary-text)',
            'disabled-fill': 'var(--color-button-disabled-fill)',
            'disabled-text': 'var(--color-button-disabled-text)',
          },
        },
      },
      keyframes: {
        spinCustom: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spinCustom: 'spinCustom 1s linear infinite',
      },
    },
  },
  plugins: [
    nextui(),
    lineClamp,
    plugin(function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': `2px ${colors.white}`,
        },
      });
    }),
  ],
};
export default config;
