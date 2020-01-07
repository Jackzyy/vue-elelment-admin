import { resetRouter } from '@/router'
import { login } from '@/api/login'
import { getRoles } from '@/api/roles'

const state = {
  userinfo: {},
  roleinfo: {},
  token: ''
}

const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
  },
  SET_ROLE_INFO(state, payload) {
    state.roleinfo = payload
  },
  SET_USER_INFO(state, payload) {
    state.userinfo = payload
  }
}

const actions = {
  // 登陆
  _login({ commit }, info) {
    return new Promise(async (resolve, reject) => {
      try {
        let { userinfo, token } = (await login(info)).data
        console.log(userinfo, token)
        commit('SET_USER_INFO', userinfo)
        commit('SET_TOKEN', token)

        resolve(info)
      } catch (err) {
        reject(err)
      }
    })
  },

  // 获取角色权限信息
  getUserRoles({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        let role = (await getRoles()).data.role
        commit('SET_ROLE_INFO', role)
        resolve(role)
      } catch (err) {
        reject(err)
      }
    })
  },

  // 登出
  loginOut({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_TOKEN', '')
        commit('SET_ROLE_INFO', {})
        commit('SET_USER_INFO', {})
        resetRouter()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
