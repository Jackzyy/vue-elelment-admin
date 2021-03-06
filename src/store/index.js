import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import plugins from './plugins'
const path = require('path')

Vue.use(Vuex)

// 动态添加modules
const files = require.context('./modules', false, /\.js$/)
let modules = {}
files.keys().forEach(key => {
  let name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

const store = new Vuex.Store({
  modules,
  getters,
  plugins
})

export default store
