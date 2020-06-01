# 这是一个NB的项目

## [主流开源协议有何区别？](https://www.zhihu.com/question/19568896)

## 传统方式将修改过后的代码上传到github  
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页APP组件
1. 完成 Header 区域，使用的是 Mint-UI 的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
  + 先把扩展图标的 css 样式，拷贝到项目中
  + 拷贝 扩展字体库 ttf 文件， 到项目中
  + 为购物车小图标，添加如下样式`mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由连接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 使用 vue-router 的 this.$http.get 获取数据
2. 获取到的数据要保存在 data 身上
3. 使用 v-for 循环渲染每个 item 项

## 改造九宫格区域的样式

## 改造新闻资讯的路由链接

## 新闻资讯页面制作
1. 绘制界面，使用 MUI 中的 meidia-list.html
2. 使用vue-resource获取真实数据
3. 数据渲染到页面

## 实现新闻资讯点击跳转到新闻详情
1. 将列表中的每一项改造为 router-link， 同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
  + `import comment from './comment'`
3. 在父组件中，使用 components 属性，将刚才倒入的 comment 组件注册为自己的子组件
4. 将注册子组件时候的注册名称，以标签形式在页面中引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++，然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数据的concat方法，拼接上新数组

## 发表评论
1. 将文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户评论内容不能为空
4. 通过vue-resource发送一个请求，将评论内容提交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论
  + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论取不到
  + 换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论，追加到data中comments的开头，这样，九阳完美实现刷新评论列表的需求了

## 改造图片分享按钮为路由链接并显示对应的组件页面

## 绘制图片列表组件页面结构并美化样式
1. 顶部的滑动条制作
2. 制作底部图片列表
### 制作顶部滑动条的坑们
1. 需要借助于 MUI 中的tab-top-weibo-view-main.html
2. 需要将 slider 区域的 mui-fullscreen类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下
  + 导入mui.js
  + 调用官方提供的方式去初始化
  ```
  mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
4. 在初始化滑动条的时候，导入了mui.js,但是控制台报错了：` 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
+ 经过我们合理的推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'argument'东西，但是，webpack打包好的bundle.js中,默认是启用严格模式的，所以，这两者冲突了；
+ 解决方案：1. 将 mui.js 中的非严格模式的代码改掉，但是不现实； 2. 将 webpack 打包时候的严格模式禁用掉
+ 最终，我们选择了 plan B 移除严格模式：使用这个插件
bable-plugin-transform-remove-strict-mode 
5. 刚进入图片分享页面的时候，滑动条无法正常工作，经过认真的分析发现，如果要初始化滑动条，必须要等DOM元素加载完毕，所以，我们将初始化滑动条的代码搬到了mounted 生命周期函数中
6. 当滑动条调试ok后，发现，tabbar无法正常工作了，这时候，我们需要把每个 tabbar 按钮的样式`mui-tab-item`重新改一下名字：`mui-tab-item-zx`
7. 获取所有分类，并渲染分类列表

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的组件`lazy-load`
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了图片列表的懒加载改造和样式美化

## 实现了点击图片跳转到图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用tag属性指定要渲染为那种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件vue-preview这个缩略图插件
2. 获取到所有的图片列表渲染数据
3. 注意：每个图片对象中必须有w和h属性

## 绘制商品页面基本结构并美化

## 尝试在手机上进行项目的预览和调试
1. 要保证自己的手机正常运行
2. 要保证手机和开发项目的电脑处于同一个局域网，也就是说，手机可以访问到电脑的ip
3. 打开自己的项目中 package.json文件，在dev脚本中添加 --host 指令，把当前电脑的 WIFI IP地址，设置为 --host 的指令值
  + 如何查看自己电脑所处 WIFI 的 IP 呢，在cmd中断中运行`ipconfig`, 查看无线网的IP地址
4. 一直未调试成功，先放一放~
