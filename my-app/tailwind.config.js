/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       screens: {
        'custom-lg': '1080px', 
        'custom-md' : '980px',
        'custom-md1': '1182px',
        'custom-md2': '900px',
        'custom-md3': '1222px',
        'custom-md4': '1182px',
        // Add custom breakpoint
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

