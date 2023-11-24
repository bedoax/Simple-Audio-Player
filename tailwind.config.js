/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow:{
        '4xl':'2px 2px 14px 11px #e74ae9',
      },
      animation:{
        'infat': 'rotate 0.3s infinite paused linear;',
        keyframes:{
          rotate: {
          '0%':{transform:'rotate(0deg)'},
          '100%':{transform: 'rotate(360deg)'},
        }
      }
    }
    },
  },
  plugins: [],
}

