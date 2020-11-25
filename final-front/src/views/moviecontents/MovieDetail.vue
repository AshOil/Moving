<template>
  <div class="p-3">
    <!-- NavBar part -->
    <div style="width: 1220px; margin: 0 auto ">
      <nav class="navbar navbar-expand-lg navbar-light" style=" height: 40px;margin: 10px;margin-bottom: 30px;">
        <router-link
          to="/main"
          class="navbar-brand"
          href="#"
          router-tag="a"
          style="color: #f0f0f0"
          >
          <img src="../../assets/logo.png" class="d-inline-block align-top" alt="Kitten">
          </router-link
        >
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto" >
            <li class="nav-item">
              <router-link style="background-color: #14181b; color: #f0ad4e;" to="/main" class="nav-link" router-tag="a"
                >Main</router-link
              >
            </li>
            <li class="nav-item">
              <router-link style="background-color: #14181b; color: #f0ad4e;" to="/" class="nav-link" router-tag="a"
                @click.native="logout">Logout</router-link
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  <!-- 화면구성 -->
  <div class="container">
    <b-card-group class="rounded-lg border border-warning m-3">
      <div class="d-block">
        <!-- 화면 상단 이미지 -->
        <b-card
          id="mainimage"
          overlay
          :img-src="`https://image.tmdb.org/t/p/w1280/${moviedata.backdrop_path}`"
          margin=0
          img-alt="Card Image"
          img-top
          style="max-height: 40rem;"
          class="mb-2"
        >
          <div id="content">
          <h1 class="m-3"> {{moviedata.title}}</h1>
          <hr>
          <p class="text-align:left; font-family: 'GmarketSansMedium';">{{moviedata.overview}}</p>
          <span>
            장르 : {{detaildata.genres[0].name}} |
            개봉일 : {{detaildata.release_date}}  |
            상영시간 : {{detaildata.runtime}}분  |
            장르 : {{detaildata.genres[0].name}}
          </span>
          </div>
        </b-card>
      </div>
      <!-- 카드 하단부분 -->
      <b-card class="rounded-lg border border-warning m-3" style="background-color: #14181b">
        <b-card-text >
          <hr>
          <p class="font-weight-bold h4 m-3" style="color: #f0ad4e;">영화 트레일러</p>
          <hr>
          <youtube fitParent=True :video-id="videoId" ref="youtube" @playing="playing"></youtube>
          <br>
          <hr style="color:yellow">
          <br>
          <b-button v-b-toggle.sidebar-border style="color:yellow">관련 영화 찾아보기</b-button>
          <b-sidebar class="text-warning" width=25% id="sidebar-border"  title="관련영화"  shadow>
            <div style="background-color: #14181b" class="text-warning">
              <MovieSpin 
                :moviedata = moviedata
                :movieid = mymovieid
                @nowslide="nowslide"
              />
              </div>
              <template #footer="">
              <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                <strong class="mr-auto text-warning">해당영화 상세정보</strong>
                <b-button size="sm" @click="goToDetail">GO!</b-button>
              </div>
            </template>
          </b-sidebar>
        </b-card-text>
      </b-card>
      <!-- 댓글 부분 -->
      <b-card class="rounded-lg border border-warning m-3" style="background-color: #14181b ">
        <ArticleList 
          :movieid = mymovieid
          :vote_average = moviedata.vote_average
          
        />
      </b-card>
    </b-card-group>
    </div>
  </div>
</template>

<script>
import ArticleList from '../../components/article/ArticleList'
import MovieSpin from '../../components/movieComponents/MovieSpin'
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  name: 'MovieDetail',
  data() {
    return {
      moviedata: this.movie,
      detaildata:null,
      videoId: '',
      slidemovie: null,
    }
  },
  methods: {
    setToken() {
      const token =localStorage.getItem('jwt')
      const config = {
        headers:{
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getMovie() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.mymovieid}?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-Kr&page=1`)
        .then(res => {
          // console.log(res.data)
          this.detaildata = res.data
        })
    },
    getVideo() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.mymovieid}/videos?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-Kr&page=1`)
        .then(res => {
          // console.log("영화정보")
          // console.log(res.data.results[0])
          this.videoId = res.data.results[0].key
        })
    },    
    playVideo() {
      this.player.playVideo()
    },
    nowslide(slidedata) {
      this.slidemovie = slidedata
      // console.log(this.slidemovie)
    },
    goToDetail() {
      // console.log(this.slidemovie)
      this.$store.dispatch('suggestMovie', this.slidemovie)
      // console.log(this.movie)
      this.$router.go(this.$router.currentRoute)
    },
    
  },
  components: {
    ArticleList,
    MovieSpin
  },
  computed: {
    ...mapState([
      'movie',
      'mymovieid'
    ]),
    videoURI: function () {
      const videoId = this.videodata.key
      return `https://www.youtube.com/watch?v=${videoId}`
    },    
    player() {
      return this.$refs.youtube.player
    }
  },
  created() {
    this.moviedata = this.movie
    // console.log(this.moviedata)
    // console.log("내가왔다.")
    this.getMovie()
    this.getVideo()
    // console.log(this.movie)
  },

}
</script>

<style>
.clearfix::after {
content: "";
display: block ;
clear: left;
}
#mainimage {
  filter: brightness(80%);
  height: 30%;
  background-color: black;
  /* filter: blur(2px);
  -webkit-filter: blur(2px); */
  /* position: relative;
  max-width: 800px; 
  margin: 0 auto;  */
}

input::placeholder { align-self: center; }

#content {
  position: absolute; /* Position the background text */
  bottom: 0; /* At the bottom. Use top:0 to append it to the top */
  left: 0;
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
  color: #f1f1f1; /* Grey text */
  width: 100%; /* Full width */
  /* padding: 20px; */
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: yellow;
}

#nav a.router-link-exact-active {
  color: yellow;
}
</style>