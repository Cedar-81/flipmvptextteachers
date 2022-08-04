/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main_color: "#fff",
      dark_color: "#333333",
      light_color: "#bbbbbb",
      light_color_2: "#F6F6F6",
      accent_color: "#f21d1d",
      accent_color_2: "rgba(242, 29, 29, 0.18)",
      accent_bkg_color: "#eef1f6",
      accent_bkg_dark_color: "#c4c4c4",
      sidenav_bkg_color: "#EEF1F6",
      accent_bkg_hover: "rgba(242, 29, 29, 0.6)",
      dark_color_2: "#6F6F6F",
    },
    extend: {
      boxShadow: {
        main: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
