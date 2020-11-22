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
          text-variant="white"
          :title= moviedata[0].title
          :sub-title= moviedata[0].overview

          img-top
          style="max-height: 40rem;"
          class="mb-2"
        >
        </b-card>
      </div>


      <b-card >
        <b-card-text>
          <p>{{moviedata}}</p>
          <p>{{moviedata[0].movie_id}}</p>
          <div>
          <b-button v-b-toggle.sidebar-border>관련 영화 찾아보기</b-button>
            <b-sidebar id="sidebar-border" sidebar-class="border-right border-danger">
              <div class="px-3 py-2">

                <MovieSpin 
                  :moviedata = moviedata
                  :movieid = moviedata[0].movie_id
                />

              </div>
            </b-sidebar>
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

export default {
  name: 'MovieDetail',
  data() {
    return {
      moviedata: this.movie,
    }
  },

  components: {
    ArticleList,
    MovieSpin
  },
  computed: {
    ...mapState([
      'movie'
    ])
  },
  created() {
    this.moviedata = this.movie
    console.log(this.moviedata)
  },
  destroyed() {
    console.log("파괴!")
    this.$store.dispatch('emptyMovie')
  }

}
</script>

<style>

</style>