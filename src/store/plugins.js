import createPersistedState from 'vuex-persistedstate'

/**
 * Vuex持久化储存
 * 根据模块选择储存位置
 */

const appPlugins = createPersistedState({
  storage: window.localStorage,
  reducer (store) {
    return {
      app: store.app,
      user: { // 此结构必需与State结构相同，否则刷新还原数据时解构赋值错位
        token: store.user.token,
        userName: store.user.userName
      }
    }
  }
})

const userPlugins = createPersistedState({
  storage: window.sessionStorage,
  reducer (store) {
    return {

    }
  }
})

export default [appPlugins, userPlugins]
