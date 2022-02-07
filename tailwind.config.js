module.exports = {
  darkMode: false, //or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      backgroundImage: {
        'mint-page-pattern': "url('/images/mint-page_bg.jpg')",
        'main-page-pattern': "url('/images/main-page.jpg')",
       }
    },
  },
  plugins: [],
}
