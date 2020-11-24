<template>
  <div class="container">
    <b-card-group>
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
          <p class="text-align:left">{{moviedata.overview}}</p>
          <span>
            장르 : {{detaildata.genres[0].name}} |
            개봉일 : {{detaildata.release_date}}  |
            상영시간 : {{detaildata.runtime}}분  |
            장르 : {{detaildata.genres[0].name}}
          </span>

          </div>
        </b-card>
      </div>


      <b-card class="rounded-lg" style="background-color: #ffdd00">
        <b-card-text >
          <div>
          <b-button v-b-toggle.sidebar-border>관련 영화 찾아보기</b-button>
            <b-sidebar width=25% id="sidebar-border"  title="관련영화"  shadow>
              <div style="background-color: #ffdd00">
                <MovieSpin 
                  :moviedata = moviedata
                  :movieid = mymovieid
                  @nowslide="nowslide"
                />
                </div>
               <template #footer="">
                <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                  <strong class="mr-auto">해당영화 상세정보</strong>
                  <b-button size="sm" @click="goToDetail">GO!</b-button>
                </div>
              </template>
            </b-sidebar>
          <hr>
          <p class="font-weight-bold">영화 트레일러</p>
          <youtube fitParent=True :video-id="videoId" ref="youtube" @playing="playing"></youtube>
          </div>
        </b-card-text>
      </b-card>

      <b-card class="rounded-lg" style="background-color: #ffdd00">
        <ArticleList 
          :movieid = mymovieid
          :vote_average = moviedata.vote_average
        />
      </b-card>

    </b-card-group>
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
      slidemovie: null
    }
  },
  methods: {
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
    }
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
</style>