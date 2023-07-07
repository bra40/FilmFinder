/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bonjour: "#E5DDDF",
        "jacksons-purple": "#2D258B",
        "base-background": "#e2e3e8",
        "base-text-color": "#2f6f36",

        blue100: "#D3DAF9",
        blue200: "#A9B6F4",
        blue300: "#7788DE",
        blue400: "#5060BD",
        blue500: "#223192",
        blue600: "#18247D",
        blue700: "#111A69",
        blue800: "#0A1154",
        blue900: "#060B46",

        teal100: "#E1F4FD",
        teal200: "#C4E6FB",
        teal300: "#A4D2F3",
        teal400: "#89BBE8",
        teal500: "#639cd9",
        teal600: "#487ABA",
        teal700: "#315A9C",
        teal800: "#1F3F7D",
        teal900: "#132B68",

        white100: "#FEFEFE",
        white200: "#FDFDFD",
        white300: "#FBFBFB",
        white400: "#F7F7F7",
        white500: "#f3f3f3",

        red600: "#D0B1B4",
        red700: "#AE7A83",
        red800: "#8C4D5D",
        red900: "#742E46",
      },
      ringColor: {
        searchFocus: "blue600",
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"], // Replace with your desired font stack
      },
      height: {
        "input-height": "2.5rem",
      },
      fontSize: {
        xs: ".75rem", // Extra small font size
        sm: ".875rem", // Small font size
        base: "1rem", // Base font size
        lg: "1.125rem", // Large font size
        xl: "1.25rem", // Extra large font size
        "2xl": "1.5rem", // 2X large font size
        // Add more custom font sizes as needed
      },
    },
  },
  plugins: [],
};
