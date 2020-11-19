import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movie: []
  },
  mutations: {
    NOW_MOVIE: function(state, movieData) {
      state.movie.push(movieData)
    },
    EMPTY_MOVIE: function(state) {
      state.movie = []
    }

  },
  actions: {
    nowMovie: function({commit}, movieData) {
      commit('NOW_MOVIE', movieData)
    },
    emptyMovie: function({commit}) {
      commit('EMPTY_MOVIE')
    }

  },
})
