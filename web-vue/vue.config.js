module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/graphiql": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
}