// 项目入口文件
import Vue from "vue"

// 导入路由包
import vueRouter from "vue-router"
// 安装vue-router
Vue.use(vueRouter)

// 导入vue-resource包
import vueResource from "vue-resource"
Vue.use(vueResource)

// 设置请求的根路径
Vue.http.options.root = 'http://zhangxiang.com:8888'

// 导入APP根组件
import app from './App.vue'

// 导入mui的样式
import './lib/mui/css/mui.css'

// 导入mui的图标扩展样式
import "./lib/mui/css/icons-extra.css"

// 导入自己的 router.js模块
import router from "./router.js"

// 按需导入组件并注册
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el:'#app',
    render(c){
        return c(app)
    },
    router // 挂在路由对象到vm实例上
})