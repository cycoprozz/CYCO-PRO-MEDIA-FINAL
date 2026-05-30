module.exports = {
  content: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        gold: { 400: '#d4af37', 500: '#c5a028', 600: '#b8941f' },
        dark: { 900: '#0a0a0a', 800: '#1a1a1a', 700: '#2a2a2a' }
      }
    }
  },
  plugins: []
};
