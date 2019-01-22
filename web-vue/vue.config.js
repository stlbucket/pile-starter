module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
}