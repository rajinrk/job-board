module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  important: true,
  theme: {
    extend: {
      screens: {
        xsm: '400px',
        sm: '600px',
        md: '770px',
        lg: '1028px',
        xl: '1280px',
        '2xl': '1520px',
        '3xl': '1580px'
      }
    },
  },
  plugins: [],
}; 