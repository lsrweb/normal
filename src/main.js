import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import './registerServiceWorker'
import router from './router'
import '@/icons'

import store from './store'


import './plugins/element.js'

import 'ant-design-vue/dist/antd.css';

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
