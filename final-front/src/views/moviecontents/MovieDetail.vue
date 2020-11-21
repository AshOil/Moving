<template>
  <div class="container">
    <b-card-group columns deck>
      <div class="d-block">
        <!-- 화면 상단 이미지 -->
        <b-card
          overlay
          :img-src="`https://image.tmdb.org/t/p/original/${moviedata[0].backdrop_path}`"
          img-alt="Card Image"
          text-variant="white"
          :title= moviedata[0].title
          :sub-title= moviedata[0].overview
        >
          <b-card-text>
            Some quick example text to build on the card and make up the bulk of the card's content.
          </b-card-text>
        </b-card>
      </div>
      <b-card >
        <MovieSpin 
          :moviedata = moviedata
          :movieid = moviedata[0].movie_id
        />
      </b-card>

      <b-card title="Title" img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
        <b-card-text>
          <p>{{moviedata}}</p>
          <p>{{moviedata[0].movie_id}}</p>
        </b-card-text>
        <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
      </b-card>

    </b-card-group>
    <ArticleList 
      :movieid = moviedata[0].movie_id
    />
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