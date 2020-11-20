import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movie: []
  },
  mutations: {
    NOW_MOVIE: function(state, movieData) {
      console.log("되나보네")
      state.movie.push(movieData)
    },
    EMPTY_MOVIE: function(state) {
      console.log("지워졌다!")
      state.movie = []
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
    }

  },
})
