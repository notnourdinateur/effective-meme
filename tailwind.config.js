/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        canvas: {
          900: '#0c1a2f',
          950: '#070f1d',
        },
        surface: {
          800: '#1c3152',
          900: '#13233d',
        },
        line: {
          600: '#405c89',
          700: '#32486d',
        },
        ink: {
          50: '#f7fbff',
          100: '#e2edfb',
          300: '#afc3df',
          400: '#8aa4c8',
          500: '#6e88ab',
        },
        brand: {
          200: '#8eddfc',
          300: '#62c9f6',
          400: '#38b5ef',
          500: '#1993d0',
        },
        accent: {
          300: '#f6d36f',
        },
        success: {
          200: '#98f0c6',
          300: '#65e2ab',
        },
      },
    },
  },
}
