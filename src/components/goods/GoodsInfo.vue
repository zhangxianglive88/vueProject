<template>
  <div class="goodsinfo-container">

    <!-- 实现半场动画，只能通过钩子函数 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-if="ballFlag" ref="ball"></div>
    </transition>
    

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <div class="purchase-quantity">
            <span>购买数量: </span>
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号：{{ goodsinfo.goods_no }}</p>
            <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
            <p>上架时间：{{ goodsinfo.add_time }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Toast } from "mint-ui";
import numbox from '../subcomponents/goodsinfo_numbox.vue'
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的id挂载到data上，方便后期调用
      lunbotuList: [], // 轮播图的数据
      goodsinfo: [], // 获取到的商品的信息
      ballFlag: false, // 控制小球隐藏和显示的标识符
      selectedCount: 1 // 保存用户选中的商品数量
    }
  },
  created() {
    this.getLunbotu();
    this.getGoodsinfo()
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages?id=" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          })
          this.lunbotuList = result.body.message
        } else {
          Toast("加载轮播图失败")
        }
      })
    },
    getGoodsinfo(){
      // 获取商品的信息
      this.$http.get('api/goods/getinfo?id=' + this.id).then(result=>{
        if(result.body.status === 0){
          this.goodsinfo = result.body.message[0]
        }
      })
    },
    goDesc(id){
      // 点击使用编程式导航跳转到图文介绍页面
      this.$router.push({name: 'goodsdesc', params: { id } })
    },
    goComment(id){
      // 点击跳转到评论页面
      this.$router.push({name: 'goodscomment', params: { id } })
    },
    addToShopCar(){
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el){
      el.style.transform = "translate(0, 0)"
    },
    enter(el, done){
      el.offsetWidth

      // 小球动画优化思路：
      // 1. 先分析导致动画不准确的本质原因：将小球最终移动到的位置距现在了某一分辨率下的滚动条为滚动的情况下
      // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了
      // 3. 因此，经过分析，得到结论:不应该将位置的横纵坐标直接写死了，而是应该根据不同情况，动态计算这个坐标值
      // 4. 经过分析，得出解题思路：先得到徽标的横纵坐标，在得到小球的横纵坐标，然后让y值求差，x值也求差，
      // 得到的结果就是横纵坐标要位移的距离
      // 5. 如何获取徽标和小球的位置？？？ domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      console.log(ballPosition)

      // 获取徽标在页面中的位置 操纵dom元素（子组件是document.getElementById来操纵组件外部的dom元素的）
      const badgePosition = document.getElementById('badge').getBoundingClientRect()
      console.log(badgePosition)

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all 1s ease"
      done()
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存在data上
      this.selectedCount = count
      console.log(`父组件拿到的数字为: ${this.selectedCount}`)
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .price {
    color: black;
    .now_price {
      font-size: 16px;
      color: red;
      font-weight: bold;
    }
  }
  .purchase-quantity {
    margin-bottom: 8px;
    .mui-numbox {
      height: 20px;
    }
  }
  .mint-button--small {
    height: 28px;
  }
  .mui-card-footer{
      display: block;
      button{
          margin: 15px 0;
      }
  }

  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 403px;
    left: 142px;
  }
}
</style>