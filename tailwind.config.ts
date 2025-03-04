import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(alert|button|card|divider|input|link|spinner|ripple|form).js',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#030405',
        surface: '#0A0C10',
        border: '#3A3D45', // Made even lighter from #2A2D35
        primary: {
          default: '#FF9F5B', // Более мягкий оранжевый
          hover: '#FFA573', // Светлее при наведении
        },
        secondary: '#7EE7D2', // Более мягкий бирюзовый
        foreground: {
          primary: '#F0F2F5', // Чуть мягче чем чисто белый
          secondary: '#9BA1AD', // Более тёплый серый
        },
        danger: '#FF6B7D', // Более мягкий красный
        warning: '#FFB74D', // Более мягкий оранжевый
        success: '#66BB6A', // Более мягкий зелёный
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['28px', { lineHeight: '1.4', fontWeight: '500' }],
        h3bold: ['28px', { lineHeight: '1.4', fontWeight: '700' }],
        body: ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5' }],
      },
      fontWeight: {
        bold: '700',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
