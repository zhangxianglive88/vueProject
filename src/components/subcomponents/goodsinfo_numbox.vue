<template>
  <!-- 问题： 我们不知道什么时候能够拿到max值，但是总归有一颗，会得到一个真正的max值 -->
  <!-- 可以使用watch属性监听，来监听父组件传递过来的max值，不管watch会被出发几次，但最后一次肯定是一个合法的max值 -->
  <!-- 有可能当我们的goodsinfo_numbox组件加载完之后，父组件中goodinfo还没有从服务器获取到，导致max值为undefined，
  所以不能通过设置：data-numbox-max="max"这种方式来实现设置购买数量的最大值 -->
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      ref="numbox"
      @change="countChanged"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 分析：子组件什么时候将数据传递给父组件 -->
  <!-- 当文本框中的数据发生改变的时候，将input元素的value属性值通过事件调用的方式传递给父组件 -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    // 树池化数字选择框组件
    mui(".mui-numbox").numbox();
    console.log(this.max);
  },
  methods: {
    countChanged() {
      // 每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value)
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    max: function(newValue, oldValue) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>