import createPersistedState from 'vuex-persistedstate'

/**
 * Vuex持久化储存
 * 根据模块选择储存位置
 */

const appPlugins = createPersistedState({
  storage: window.localStorage,
  reducer (val) {
    return {
      app: val.app,
      token: val.user.token
    }
  }
})

const userPlugins = createPersistedState({
  storage: window.sessionStorage,
  reducer (val) {
    return {

    }
  }
})

export default [appPlugins, userPlugins]
