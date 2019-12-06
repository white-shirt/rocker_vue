import Vue from 'vue'
import cards from './cards.vue'
import store from '../../store'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<cards/>',
  components: { cards }
})
