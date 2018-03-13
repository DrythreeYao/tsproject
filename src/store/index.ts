import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createLogger from '../../node_modules/vuex/dist/logger'
declare let __DEV__: any
declare let __TEST__: any
declare let __PRODUCTION__: any

Vue.use(Vuex)

let debug = true
if (__DEV__) {
  debug = true
}
if (__TEST__) {
  debug = true
}
if (__PRODUCTION__) {
  debug = false
}

export default new Vuex.Store({
  modules: {
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger({})] : [],
})
