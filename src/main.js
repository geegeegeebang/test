import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
