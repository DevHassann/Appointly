/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        "bg-main": "#FFF",
        "text-main": "#001C30",
        "text-secondary": "#002A61",
        "text-light": "#176B87",
        "btn-bg": "#0A6EBD",
        "btn-bg-hover": "#0B83DE",
        "theme-blue": "#4991FC" //Light blue theme color
      },
      screens: {
        bt: "960px",
      },
      backgroundImage: {
        heroSection: "url(/heroSection-main.jpg)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
};

