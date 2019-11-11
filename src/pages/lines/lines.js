import Vue from 'vue'
import lines from './lines.vue'
import store from '../../store'

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<lines/>',
  components: { lines }
})