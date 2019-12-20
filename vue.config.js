const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './', // 相对路径
  lintOnSave: true,

  //反向代理配置
  devServer: {
    proxy: {
      '/api': {
        target: '/target.com', //目标地址
        // ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理
        pathRewrite: { '^/api': '/' } //重写路径
      }
    }
  },

  // Gzip
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
}
