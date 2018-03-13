import { passportService } from "../../core/ts/services";
import User from "../../vo/User";
import { app } from "../../core/ts/app";

// initial state
const state = {
  user: {},
  loginStatus: false,
}

// actions
const actions = {
  getUser({ commit }) {
    passportService.getUserInfo()
      .then(res => {
        let data = res.data.data
        let user: User = {
          // id: data.id,
          // sid: data.sid,
          name: data.name,
          portrait: data.portrait,
        }
        commit('setUser', user)
        commit('setLoginStatus', true)
      }, err => {
        commit('setLoginStatus', false)
      })
  },
}

// mutations
const mutations = {
  setUser(state, user: User) {
    state.user = user
    app.storageUser(user)
  },
  setLoginStatus(state, status) {
    state.loginStatus = status
  },
}

export default {
  state,
  actions,
  mutations,
}
