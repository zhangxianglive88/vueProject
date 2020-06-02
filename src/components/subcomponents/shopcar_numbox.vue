<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      ref="numbox"
      @change="countChanged"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    // 初试化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      // 数量改变了
      // 每当数量值改变，则立即把最新的数量同步到购物车的store中，覆盖之前的数量值
      // console.log(this.goodsid)
      // console.log(this.$refs.numbox.value)
      this.$store.commit('updateGoodsinfo', {
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ["initcount","goodsid"]
};
</script>

<style lang="scss" scoped>
</style>