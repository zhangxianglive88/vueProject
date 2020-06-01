<template>
  <div class="goods-list">
    <!-- 老方法 -->
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" tag="div" :to="'/home/goodsinfo/' + item.id">
      <img :src="item.img_url" alt />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.market_price}}</span>
          <span class="old">${{ item.sell_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩下{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>-->

    <!-- 在网页中有两种跳转方式： -->
    <!-- 方式一： 使用 a 标签的形式叫做 标签跳转-->
    <!-- 方式二： 使用window.location.href的形式，叫做 编程式导航（js代码） -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.market_price}}</span>
          <span class="old">${{ item.sell_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩下{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    // data 是往自己组件内部，挂载一些私有数据
    return {
      pageIndex: 1,
      goodslist: [] // 存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http
        .get("api/getgoods?pageIndex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      // 加载更多商品列表
      (this.pageIndex += 1), this.getGoodsList();
    },
    goDetail(id){
        // 使用 js 的形式实现路由导航
        // 注意： 一定要区分 this.$route 和 this.$router 这两个对象
        // 其中，this.$route是路由参数对象，包含属性params和query
        // 而 this.$router是路由导航对象，用它可以很方便的使用js代码，实现路由的前进，后退，跳转到新的URL地址
        // console.log(this)
        // 1. 最简单的
        // this.$router.push('/home/goodsinfo/' + id)
        // 2. 传递对象
        // this.$router.push({path:'/home/goodsinfo/' + id})
        // 3. 传递命名的路由
        this.$router.push({ name: 'goodsinfo', params: { id }})
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 258px;
    border: 2px solid #ccc;
    box-shadow: 0 0 3px #ccc;
    width: 49%;
    margin: 4px 0;
    padding: 3px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      p {
        margin: 0;
        padding: 3px;
      }
      background-color: #eee;
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>