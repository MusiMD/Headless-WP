/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{html,js,ts,jsx,mdx}",
    "./src/lib/**/*.{html,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#57DFDA',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};

