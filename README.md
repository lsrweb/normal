Vue 后台管理系统基础模板
### 使用
##### git clone ...
##### npm install (yarn install)
##### npm run serve (yarn serve)
##### npm build:prod (yarn build:prod)

#### 项目引入自定义图标,位置在 src/icons/svg
> * 项目可自定义图标
> * 动态路由,后端数据请求,前端进行页面渲染
> * 页面丢失404跳转

#### 项目基于 mock 数据请求,所有接口都存放在 项目根下的 mock 中




###### 项目问题记录
> * 页面刷新时会跳转到404页面,-->将路由最下方的404组件改为懒加载
> * 
