const state = {
  userName: '',
  token: '',
  roles: []
}

const mutations = {
  SET_TOKEN (state, val) {
    state.token = val
  },
  SET_ROLES (state, payload) {
    state.roles = payload
  },
  SET_NAME (state, payload) {
    state.userName = payload
  }
}

const actions = {
  // 登陆
  login ({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let roles = ['Permission', 'PageAdmin']
      let name = 'admin'
      let token = 'token'

      commit('SET_TOKEN', token)
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)

      resolve(roles)
    })
  },

  // 登出
  loginOut ({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', '')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
