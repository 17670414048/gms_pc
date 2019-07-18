import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {router} from './router/index';
Vue.use(ElementUI);
// import './filters'
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')