const state = {
  deviceData: { width: "", height: "", DPI: "" }
}

const getters = {
  getDeviceData(state) {
    state.deviceData.width = window.screen.width;
    state.deviceData.height = window.screen.height;
    state.deviceData.DPI = window.devicePixelRatio;
    return state.deviceData;
  }
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}