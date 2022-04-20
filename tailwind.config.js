module.exports = {
  darkMode: false, //or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      backgroundImage: {
        'mint-page-pattern': "url('/images/bg_landing.png')",
        'main-page-pattern': "url('/images/bg_landing_ori.jpg')",
       }
    },
  },
  plugins: [],
}
