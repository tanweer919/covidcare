module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#57c6ac",
      secondary: "#3366ff",
      secondaryHover: "#5781ff",
      gray300: "#f3f3f4",
      gray400: "#e2e8f0",
      textgray: "#6c6c6c",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
