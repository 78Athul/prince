import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: '#f2f2f2',
        foreground: '#111111',
        muted: '#838282',
        'muted-light': '#b6b5b5',
        gray: {
           100: '#d9d9d9',
           200: '#d1d1d1',
           300: '#c9c9c9',
           400: '#bfbfbf',
           500: '#b6b5b5',
           600: '#838282',
        },
        dark: {
           bg: '#1e1e1e',
           text: '#f6f6f6',
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        "sm": "0.125rem",
        "DEFAULT": "0px",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
export default config
