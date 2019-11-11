import Vue from 'vue'
import music from './music.vue'
import store from '../../store'

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<music/>',
  components: { music }
})
