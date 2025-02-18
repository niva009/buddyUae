/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "blue-primary": "#1D589E",
          primary: "#2e2e2e",
          secondary: "#434343",
          accent: "#ffffff",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        blue: "#016855",
        gray: "#D0DAEA",
        light: "#F0F0F0",
        black: "#1C1C1C",
        grey: "#6C7275",
        linkblack: "#37393F",
        textgrey: "#7D7D7D",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [require("daisyui")],
};
