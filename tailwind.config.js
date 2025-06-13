/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./main.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Instrument Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        // NovaCore color system
        midnight: 'var(--midnight-black)',
        slate: {
          dark: 'var(--slate-dark)',
          medium: 'var(--slate-medium)',
          light: 'var(--slate-light)',
        },
        accent: {
          blue: 'var(--accent-blue)',
          purple: 'var(--accent-purple)',
          green: 'var(--accent-green)',
          orange: 'var(--accent-orange)',
          cyan: 'var(--accent-cyan)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          default: 'var(--border-default)',
        }
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'small': 'var(--shadow-small)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
        'glow': 'var(--shadow-glow)',
        'glow-purple': 'var(--shadow-glow-purple)',
        'glow-green': 'var(--shadow-glow-green)',
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'dropdown': 'var(--shadow-dropdown)',
      },
      animation: {
        'modern-fade-in': 'modern-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'modern-slide-up': 'modern-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'modern-glow': 'modern-glow 3s ease-in-out infinite',
        'modern-pulse': 'modern-pulse 2s ease-in-out infinite',
        'modern-bounce': 'modern-bounce 1s ease',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'header-dropdown': 'header-dropdown-slide-in 0.15s ease-out',
        'cart-slide-in': 'cart-slide-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}