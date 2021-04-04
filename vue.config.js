module.exports = {
  publicPath: "/app",

  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.VUE_APP_PROXY || "https://eco-beko.ryspekov.life",
        ws: true,
        changeOrigin: true,
      },
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variables.scss";`,
      },
    },
  },
};
