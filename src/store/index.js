import Vue from 'vue';
import Vuex from 'vuex';

import device from './modules/device';
import aieggy from './modules/aieggy';
import mask from './modules/mask';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    device,
    aieggy,
    mask
  }
});
