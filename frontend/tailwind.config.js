/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06B6A4",  
          light: "#E6FFFB",   
          extralight: "#F6FBF9",   
          dark: "#054F45",    
        },
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        ".selected-hover": {
          "@apply rounded-xl  hover:bg-primary/70 hover:text-white": {},
        },
        ".selected": {
          "@apply rounded-xl  bg-primary/70 text-white": {},
        },
        ".modal": {
          "@apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50": {},
        },
      })
    }
  ],
}
