<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（最多吐糟120字）" maxlength="120em" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(comment, i) in comments" :key="comment.add_time">
            <div class="title">
                第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ comment.user_name }}&nbsp;&nbsp;发表时间：{{ comment.add_time | dataFormat }}
            </div>
            <div class="cmt-body">
                {{ comment.content === 'undefined'?'此用户很懒': comment.content}}
            </div>
        </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>>

<script>
import { Toast } from "mint-ui"
export default{
    data(){
        return {
            pageindex: 1, // 默认展示第一页数据
            comments:[], // 所有的评论数据
            msg: '' // 评论输入的内容
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments?id='+ this.id + "&pageindex=" + this.pageindex)
            .then(result=>{
                if(result.body.status === 0){
                    // 每当获取新评论数据的时候，不要把老数据清空，而是应该以老数据拼接上新数据
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        getMore(){
            this.pageindex += 1,
            this.getComments() 
        },
        postComment(){
            // 校验是否为空内容
            if(this.msg.trim().length === 0){
                return Toast('评论内容不能为空!')
            }

            // 发表评论
            // 参数1：请求的url地址
            // 参数2：提交给服务器的数据对象{content：this.msg}
            // 参数3： 定义提交时的表单中数据的格式{ emulateJSON：true}
            this.$http.post('api/postcomment?id='+ this.id, {content:this.msg.trim()})
            .then(result=>{
                if(result.body.status === 0){
                    // 拼接出一个评论对象
                    var cmt = {
                        user_name:"匿名用户",
                        add_time: new Date(),
                        content: this.msg
                    }
                    this.comments.unshift(cmt)
                    this.msg=''
                }
            })
        }
    },
    props:['id']
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
       .cmt-item{
           font-size: 13px;
           .title{
               background-color: #ccc;
               line-height: 35px
           }
           .cmt-body{
               line-height: 35px;
               text-indent: 2em;
           }
       } 
    }
}

</style>