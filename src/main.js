import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'
import store from './store'
import '@/icons'
import './plugins/element.js'
import 'ant-design-vue/dist/antd.css';
import './registerServiceWorker'
import '@/permission'

Vue.use(Antd);

if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
