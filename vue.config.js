module.exports = {
  publicPath: './',
  transpileDependencies: ["vuetify"],
  //配置跨域请求
  devServer: {
    open: true,    //是否自动打开浏览器
    host: 'localhost',
    port: 8080,    //启动端口号
    https: false,    //是否开启https
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://118.178.224.152:8080',
        ws: true,
        changOrigin: true,    //是否开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}