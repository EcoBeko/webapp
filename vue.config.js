module.exports = {
  publicPath: "/app",

  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000/api",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
