import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mymovieid:'',
    movie: '',
    username: '',
  },
  plugins: [
    createPersistedState()
  ],
  mutations: {
    NOW_MOVIE: function(state, movieData) {
      console.log("되나보네")
      state.movie= movieData
      state.mymovieid=movieData.movie_id
    },
    SUGGEST_MOVIE: function(state, movieData) {
      console.log("되나보네")
      state.movie= movieData
      state.mymovieid=movieData.id
    },
    EMPTY_MOVIE: function(state) {
      console.log("지워졌다!")
      state.movie.splice(0,1)
    },
    ADD_USER: function(state,userName) {
      console.log("로그인 정보 왔따!")
      state.username=userName
    },
    // EMPTY_USER: function(state) {
    //   console.log("User bye")
   
    //   console.log(state.username)
    
    // }
  },
  actions: {
    nowMovie: function({commit}, movieData) {
      console.log("되나?")
      commit('NOW_MOVIE', movieData)
    },
    suggestMovie: function({commit}, movieData) {
      console.log("되나?")
      commit('SUGGEST_MOVIE', movieData)
    },
    emptyMovie: function({commit}) {
      console.log("지워볼까?")
      commit('EMPTY_MOVIE')
    },
    addUser: function({commit}, userName) {
      console.log("로그인 정보 왔어?")
      commit('ADD_USER', userName)
    },
    // emptyUser: function({commit}) {
    //   console.log("User 비울까?")
    //   commit('EMPTY_USER')
    // }
    
  },
})
