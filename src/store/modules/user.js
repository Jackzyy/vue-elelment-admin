import { resetRouter } from '@/router'

const state = {
  userName: '',
  token: '',
  roles: []
}

const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
  }
}

const actions = {
  // 登陆
  login({ commit }) {
    return new Promise(resolve => {
      let name = 'admin'
      let token = 'token'

      commit('SET_TOKEN', token)
      commit('SET_NAME', name)

      resolve()
    })
  },

  // 获取角色权限信息
  getUserRoles({ commit }) {
    return new Promise(resolve => {
      let roles = ['Permission', 'PageAdmin']
      commit('SET_ROLES', roles)
      resolve(roles)
    })
  },

  // 登出
  loginOut({ commit }) {
    return new Promise(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', '')
      resetRouter()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
