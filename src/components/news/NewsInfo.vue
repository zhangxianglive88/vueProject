<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <P class="subtitle">
      <span>发表时间：{{ newsinfo.add_time }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </P>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区域 -->
    <comment :id="id"></comment>
  </div>
</template>>

<script>
import { Toast } from "mint-ui"
// 导入评论子组件
import comment from "../subcomponents/comment.vue"
export default {
    data(){
        return {
            id: this.$route.params.id,  // 将url传递过来的id值挂载到data上，方便以后调用
            newsinfo: {} // 新闻对象
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){ // 获取新闻详情
            this.$http.get('api/getnew?id='+ this.id).then(result => {
                if (result.body.status === 0) {
                    this.newsinfo = result.body.message[0]
                } else {
                    Toast("获取新闻失败");
                }
            })
        }
    },
    components:{
        comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    color: red;
    margin: 15px 0;
  }
  .subtitle {
    color: #226aff;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
}
</style>