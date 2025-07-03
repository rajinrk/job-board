module.exports = {
  plugins: {
    tailwindcss: { 
      config: './tailwind.config.js',
      plugin: require('@tailwindcss/postcss'),
    },
    autoprefixer: {},
  },
}; 