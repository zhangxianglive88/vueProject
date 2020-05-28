// 项目入口文件
import Vue from "vue"

// 导入路由包
import vueRouter from "vue-router"
// 安装vue-router
Vue.use(vueRouter)

// 导入vue-resource包
import vueResource from "vue-resource"
Vue.use(vueResource)

// 导入APP根组件
import app from './App.vue'

// 导入mui的样式
import './lib/mui/css/mui.css'

// 导入mui的图标扩展样式
import "./lib/mui/css/icons-extra.css"

// 按需导入mint-ui中的组件
import { Header } from "mint-ui"
Vue.component(Header.name, Header)

// 导入自己的 router.js模块
import router from "./router.js"

// 引入轮播组件，并注册
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

var vm = new Vue({
    el:'#app',
    render(c){
        return c(app)
    },
    router // 挂在路由对象到vm实例上
})