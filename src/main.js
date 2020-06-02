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
// 全局设置post时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true


// 导入APP根组件
import app from './App.vue'

// 导入mui的样式
import './lib/mui/css/mui.css'

// 导入mui的图标扩展样式
import "./lib/mui/css/icons-extra.css"

// 导入自己的 router.js模块
import router from "./router.js"

// 按需导入组件并注册
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui';
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Header.name, Header)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// 完整引入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入vue集成PhotoSwipe图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

// 每次刚进入网站，肯定会调用main.js。在刚调用的时候，先从本地存储中，将购物车的数据读出来放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {  // this.$store.state.xxx
        car: car  // 将购物车中的数据用一个数组存储起来，在car数组中，存储一些商品的对象，
        // 可以暂时将这个商品对象设计成这样： { id："商品的id"， count："要购买的数量"， price："商品单价"， selected： false}
    },
    mutations: {  // this.$store.commit('方法名称'，'按需传入唯一的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息保存到store中的car上
            // 分析
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
            // 2. 如果没有，则直接把商品数据push到car中即可
            var flag = false
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }

            })
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 当更新car之后，把car数组存储到本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsinfo(state, goodsinfo){
            console.log(goodsinfo)
            // 修改购物车中商品的数量值
            state.car.some(item=>{
                console.log(item)
                if(item.id === goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量，把最新的购物车数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {   // this.$store.getters.***
        // 相当于计算属性，也相当于filters
        getAllCount(state){
            var c = 0
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        }
    }
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el: '#app',
    render(c) {
        return c(app)
    },
    router, // 挂在路由对象到vm实例上
    store // 挂载store状态管理对象
})