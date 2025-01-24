/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'mycolor':'green'
      },
      fontFamily:{
        poppins:['Poppins','serif']
      },

      fontWeight:{
        'myfont':900
      }
    },
  },
  plugins: [],
}

