const state = {
  opened: false
}

const mutations = {
  SET_OPENED (state, payload) {
    state.opened = payload
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
