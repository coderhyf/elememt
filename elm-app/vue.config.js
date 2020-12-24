module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        // target: 'https://eleme1-october.herokuapp.com/api/',
        // target: 'https://eleme2-october.herokuapp.com/api/',
        target: 'https://eleme3-october.herokuapp.com/api/',
        // target: 'https://ele-interface.herokuapp.com/api/',
        // target: 'https://eleme1-gorge-61965.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
};
