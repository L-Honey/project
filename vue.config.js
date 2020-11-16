module.exports = {
  configureWebpack:{
    /*配置路径相关的信息*/
    resolve:{
      alias:{/*去别名*/
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}
