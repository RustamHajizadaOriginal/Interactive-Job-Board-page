module.export = {
  plugins: [
    require("autoprefixer"),
    require("cssnano"),
    require("postcss-pxtorem")({ propList: ["*"] }),
  ],
};
