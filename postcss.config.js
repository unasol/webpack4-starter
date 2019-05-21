const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [
    require("tailwindcss"),
    autoprefixer({
      browsers: ["> 1%", "last 4 versions"],
    }),
  ],
};
