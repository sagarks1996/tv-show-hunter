module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
};
