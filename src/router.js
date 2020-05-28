import VueRouter from 'vue-router'

//  导入对应的路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import NewsList from './components/news/NewsList.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from "./components/photos/PhotoList.vue"


var router = new VueRouter({
    routes:[ // 配置路由规则
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/photolist', component: PhotoList},
        {path: '/home/newsinfo/:id', component: Newsinfo}
    ],
    linkActiveClass: "mui-active" // 覆盖默认的路由高亮的类，默认的类叫作router-link-active
})

export default router