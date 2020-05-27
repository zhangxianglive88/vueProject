// 导入路径处理模块
var path = require('path')

var webpack = require('webpack')
// 导入自动生成html文件的插件
var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports={
  entry:path.join(__dirname, './src/main.js'), //项目入口文件
  output:{ // 配置输出选项
    path:path.join(__dirname, './dist'),
    filename:"boundle.js"
  },
  module:{  
    rules:[
      {test:/\.css$/, use:['style-loader', 'css-loader']},
      {test:/\.scss$/, use:['style-loader', 'css-loader', 'sass-loader']},
      {test:/\.less$/, use:['style-loader', 'css-loader', 'less-loader']},
      {test:/\.js$/, use: 'babel-loader', exclude:/node_modules/},
      {test:/\.vue$/, use: 'vue-loader'},
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
    ]
  },
  devServer:{
    open: true,
    // contentBase: 'src',
    port: 3000,
    hot: true
  },
  plugins:[ // 配置插件
    new webpack.HotModuleReplacementPlugin(), // new
    new htmlWebpackPlugin({  // 创建一个 在内存中 生成 HTML  页面的插件
      template:path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html' // 指定生成的页面的名称
    })
  ],
  resolve: {
    alias: { // 修改Vue被导入时候的包的路径
      "vue$": 'vue/dist/vue.js'
    }
  }
}
