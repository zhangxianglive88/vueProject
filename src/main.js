// 项目入口文件

import Vue from "vue"

import app from './App.vue'

// 导入mui的样式
import './lib/mui/css/mui.css'

// 按需导入mint-ui中的组件
import { Header } from "mint-ui"
Vue.component(Header.name, Header)

var vm = new Vue({
    el:'#app',
    data:{

    },
    methods:{

    },
    render(c){
        return c(app)
    }
})