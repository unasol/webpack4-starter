const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.js"),
    autoprefixer({
      browsers: ["> 1%", "last 4 versions"],
    }),
  ],
};
