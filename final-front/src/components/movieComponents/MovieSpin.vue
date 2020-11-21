<template>
  <b-container >
    <b-row align-h="center" >
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="interval"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
      <div ref="show"  v-for="(moviesuggest, idx) in moviesuggests" :key="idx">
        <b-carousel-slide class="w-300 h-620" :img-src="`https://image.tmdb.org/t/p/original/${moviesuggest.poster_path}`"></b-carousel-slide>
      </div>
      </b-carousel>
    </b-row>
  </b-container>
</template>


<script>
import axios from 'axios'

export default {
  name: "MovieSpin",
  props: {
    moviedatas: {
      type : Array
    },
    movieid: {
      type : Number
    }
  },
  components: {
  },
  data() {
    return {
      // moviedata: null,
      moviesuggests: null,
      interval: 4000,
      slide: 0,
      sliding: null,
      // movieid: null
      idx: null
      
    }
  },
  methods: {
    getMovie() {
      axios.get(`https://api.themoviedb.org/3/movie/${this.movieid}/similar?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-Kr&page=1`)
        .then(res => {
          console.log("시작")
          console.log(res.data.results)
          console.log("시작")
          this.moviesuggests = res.data.results
        })
    },
    // goToDetail() {
    //   this.moviedata = this.moviedatas[this.slide]
    //   console.log('이동하자!')
    //   this.$store.dispatch('nowMovie',this.moviedata)
    //   this.$router.push("MovieDetail")
    // },
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
    clickCheck() {
      console.log('되나?')
    },  
  },
  created() {
    console.log("생성")
    console.log(this.moviedata)
    this.idx=this.movieid
    this.getMovie()
  }
}
</script>

<style>

</style>