const state = {
  opened: false, // 菜单侧边栏展开状态 true:打开 false:关闭
  showDriver: true // 导航状态 true:需要 false:不需要
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
