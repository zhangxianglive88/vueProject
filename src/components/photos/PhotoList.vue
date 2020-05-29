<template>
  <div>
    <!-- 顶部滚动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active': '']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in imagesCategory"
            :key="item.id"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in imagesList" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      imagesCategory: [], // 所有分类的列表数组
      imagesList: [] // 图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求所有图片列表的数据
    this.getPhotoListByCatedId(0);
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素了，最好在mounted里面，因为这个时候的DOM元素是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接处一个最完整的分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.imagesCategory = result.body.message;
        }
      });
    },
    getPhotoListByCatedId(cateId) {
      // 根据分类id获取图片列表
      this.$http.get("api/getimages?id=" + cateId).then(result => {
        if (result.body.status === 0) {
          this.imagesList = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  padding: 0 10px ;
  margin:0;
  li {
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #999;
    img{
      width: 100%;
      vertical-align: middle;

    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
      max-height: 84px;
      width: 100%;
      position: absolute;
      bottom: 0;
      text-align: left;
      color: white;
      background-color:rgba($color: #000000, $alpha: 0.2);
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 12px;;
      }
    }
  }
}
</style>