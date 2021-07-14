// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/index.html", "./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
