import Vue from 'vue'
import Index from './index.vue'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Index/>',
  components: { Index },
  render: h => h(Index)
})
