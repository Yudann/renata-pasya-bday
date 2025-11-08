import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./componenjs/**/*.{js,jsx}", 
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./index.html"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Semantic colors from version 1
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          dark: "hsl(var(--secondary-dark))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        
        // Birthday theme colors from version 1
        'birthday-pink': {
          light: "hsl(var(--pink-light))",
          DEFAULT: "hsl(var(--pink-medium))",
          dark: "hsl(var(--pink-dark))",
        },
        'birthday-purple': {
          light: "hsl(var(--purple-light))",
          DEFAULT: "hsl(var(--purple-medium))",
          dark: "hsl(var(--purple-dark))",
        },
        'birthday-yellow': {
          light: "hsl(var(--yellow-light))",
          DEFAULT: "hsl(var(--yellow-medium))",
          dark: "hsl(var(--yellow-dark))",
        },
        'birthday-cream': {
          DEFAULT: "hsl(var(--cream))",
          dark: "hsl(var(--cream-dark))",
        },
        
        // Additional birthday colors from version 2
        'birthday': {
          'pink': {
            100: '#FFF0F6',
            200: '#FFD6E8',
            300: '#FFB3D9',
            400: '#FF8EC7',
            500: '#FF6BB3',
            600: '#FF4DA6',
          },
          'blue': {
            100: '#F0F8FF',
            200: '#D6EAFF',
            300: '#B3D9FF',
            400: '#8EC7FF',
            500: '#6BB5FF',
            600: '#4DA6FF',
          },
          'green': {
            100: '#F0FFF4',
            200: '#D6FFE3',
            300: '#B3FFCF',
            400: '#8EFFB8',
            500: '#6BFFA3',
            600: '#4DFF94',
          },
          'cream': {
            100: '#FFFBF0',
            200: '#FFF7E8',
            300: '#FFEFD6',
            400: '#FFE7C2',
            500: '#FFDFAD',
          },
          'purple': {
            100: '#F8F0FF',
            200: '#E8D6FF',
            300: '#D4B3FF',
            400: '#BE8EFF',
            500: '#A86BFF',
          }
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'baloo': ['Baloo 2', 'cursive'],
        'chewy': ['Chewy', 'cursive'],
        'comic': ['"Comic Neue"', 'cursive'],
        'happy': ['"Chewy"', 'cursive'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Additional animations from version 2
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        // Additional animations from version 2
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'confetti': 'confetti 5s ease-in-out infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
      },
      backgroundImage: {
        'birthday-gradient': 'linear-gradient(135deg, hsl(327 73% 85%), hsl(280 67% 80%), hsl(48 96% 70%))',
        'dark-gradient': 'linear-gradient(135deg, hsl(280 40% 15%), hsl(280 67% 30%), hsl(280 40% 15%))',
        // Additional gradients from version 2
        'soft-gradient': 'linear-gradient(135deg, #FFF0F6 0%, #F0F8FF 50%, #F0FFF4 100%)',
        'party-gradient': 'linear-gradient(45deg, #FF6BB3, #A86BFF, #6BB5FF, #6BFFA3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} ;