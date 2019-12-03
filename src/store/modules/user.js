import { resetRouter } from '@/router'
import { login } from '@/api/login'

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
  SET_USER_NAME(state, payload) {
    state.userName = payload
  }
}

const actions = {
  // 登陆
  _login({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let info = (await login()).data
        console.log(info)

        commit('SET_TOKEN', info.token)
        commit('SET_USER_NAME', info.user)

        resolve(info)
      } catch (err) {
        reject(err)
      }
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
      commit('SET_USER_NAME', '')
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
