/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // لو تستخدم App Router
    './pages/**/*.{js,ts,jsx,tsx}', // لو تستخدم Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // المكونات
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'custom-multi-gradient': `linear-gradient(135deg,
      //     #ffba08,
      //     #faa307,
      //     #f48c06,
      //     #e85d04,
      //     #d00000,
      //     #9d0208,
      //     #6a040f,
      //     #370617,
      //     #03071e,
      //     #dc2f02
      //   )`,
      // }
    },
  },
  plugins: [],
}
