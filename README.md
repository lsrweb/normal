Vue 后台管理系统基础模板
### 使用
##### git clone ...
##### npm install (yarn install)
##### npm run serve (yarn serve)
##### npm build:prod (yarn build:prod)


#### 项目引入自定义图标,位置在 src/icons/svg
> * 项目可自定义图标
> * 动态路由,后端数据请求,前端进行页面渲染(mock,) --> 这里两种情况,1:后端未处理为树状结构,需要由前端进行结构转换, 2:后端已经处理为树状结构
> * 页面丢失404跳转

#### 项目基于 mock 数据请求,所有接口都存放在 项目根下的 mock 中

> * 接口包括 用户登录,用户信息获取,用户路由获取,用户退出登录
> *

### 项目问题记录

> * 1: 页面刷新时会跳转到404页面,-->将路由最下方的404组件改为懒加载
> * 2: 控制台抛出一个警告

``` 
Non-nested routes must include a leading slash character. Fix the following routes: 
external-link/https:/panjiachen.github.io/vue-element-admin-site/#
external-link 
```

> * 警告意为: 非嵌套路前需要加前导/字符
> * 3: 
