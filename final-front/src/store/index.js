import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movie: [],
    user: [],
  },

  mutations: {
    NOW_MOVIE: function(state, movieData) {
      console.log("되나보네")
      state.movie.push(movieData)
    },
    EMPTY_MOVIE: function(state) {
      console.log("지워졌다!")
      state.movie = []
    },
    ADD_USER: function(state,userName) {
      console.log("로그인 정보 왔따!")
      state.user.push(userName)
    },
    EMPTY_USER: function(state) {
      console.log("User bye")
      state.user = []
    
    }
  },
  actions: {
    nowMovie: function({commit}, movieData) {
      console.log("되나?")
      commit('NOW_MOVIE', movieData)
    },
    emptyMovie: function({commit}) {
      console.log("지워볼까?")
      commit('EMPTY_MOVIE')
    },
    addUser: function({commit}, userName) {
      console.log("로그인 정보 왔어?")
      commit('ADD_USER', userName)
    },
    emptyUser: function({commit}) {
      console.log("User 비울까?")
      commit('EMPTY_USER')
    }
    
  },
})
