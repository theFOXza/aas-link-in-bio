import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // African-inspired earthy palette
        'aas-gold': '#D4A63C',
        'aas-gold-dark': '#B8922E',
        'aas-earth': '#8B5A2B',
        'aas-forest': '#2D5016',
        'aas-forest-dark': '#1F3A0F',
        'aas-sand': '#F5F0E6',
        'aas-cream': '#FBF9F4',
        'aas-charcoal': '#2C2C2C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      animation: {
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
