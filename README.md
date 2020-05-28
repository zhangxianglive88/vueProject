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
