import Vue from 'vue'
import cards from './cards.vue'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<cards/>',
  components: { cards }
})
