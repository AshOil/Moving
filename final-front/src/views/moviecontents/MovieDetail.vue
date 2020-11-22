<template>
  <div class="container">
    <b-card-group>
      <div class="d-block">
        <!-- 화면 상단 이미지 -->
        <b-card
          overlay
          :img-src="`https://image.tmdb.org/t/p/w1280/${moviedata[0].backdrop_path}`"
          margin=0
          img-alt="Card Image"
          img-top
          style="max-height: 40rem;"
          class="mb-2"
        >
        </b-card>
      </div>


      <b-card >
        <b-card-text>
          <h1> {{moviedata[0].title}}</h1>
          <hr>
          <p>{{moviedata[0].overview}}</p>
          <p>장르 : {{detaildata.genres[0].name}}</p>
          <p>개봉일 : {{detaildata.release_date}}</p>
          <p>상영시간 : {{detaildata.runtime}}분</p>
          <p>장르 : {{detaildata.genres[0].name}}</p>

          <div>
          <b-button v-b-toggle.sidebar-border>관련 영화 찾아보기</b-button>
            <b-sidebar width=25% id="sidebar-border"  title="관련영화"  shadow>
              <div>
                <MovieSpin 
                  :moviedata = moviedata
                  :movieid = moviedata[0].movie_id
                />
                </div>
               <template #footer="{ hide }">
                <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                  <strong class="mr-auto">해당영화 상세정보</strong>
                  <b-button size="sm" @click="hide">GO!</b-button>
                </div>
              </template>
            </b-sidebar>
          <hr>
          <p class="font-weight-bold">영화 트레일러</p>
          <youtube fitParent=True :video-id="videoId" ref="youtube" @playing="playing"></youtube>
          </div>
        </b-card-text>
      </b-card>

      
      <b-card >
        <ArticleList 
          :movieid = moviedata[0].movie_id
          :vote_average = moviedata[0].vote_average
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
      // videodata:null,
      videoId: ''
    }
  },
  methods: {
    getMovie() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.moviedata[0].movie_id}?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-Kr&page=1`)
        .then(res => {
          console.log(res.data)
          this.detaildata = res.data
        })
    },
    getVideo() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.moviedata[0].movie_id}/videos?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-Kr&page=1`)
        .then(res => {
          console.log("영화정보")
          console.log(res.data.results[0])
          this.videoId = res.data.results[0].key
        })
    },    
    playVideo() {
      this.player.playVideo()
    },
  },
  components: {
    ArticleList,
    MovieSpin
  },
  computed: {
    ...mapState([
      'movie'
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
    this.getMovie()
    console.log(this.detaildata)
    this.getVideo()
  },
  destroyed() {
    console.log("파괴!")
    this.$store.dispatch('emptyMovie')
  }

}
</script>

<style>
.clearfix::after {
content: "";
display: block ;
clear: left;
}
</style>