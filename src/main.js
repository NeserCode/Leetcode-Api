import Vue from 'vue'
import App from './App.vue'
import leetcode from './leetcode/index.js'

Vue.config.productionTip = false
Vue.prototype.$leetcode = new leetcode()

new Vue({
  render: h => h(App),
}).$mount('#app')
