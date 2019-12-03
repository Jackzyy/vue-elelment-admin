const state = {
  opened: false,
  showDriver: true // true: 需要导航
}

const mutations = {
  SET_OPENED(state, payload) {
    state.opened = payload
  },

  SET_DRIVER(state, payload) {
    state.showDriver = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
