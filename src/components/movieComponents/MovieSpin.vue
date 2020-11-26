<template>
  <div>
    <div class="px-3 py-2">
      <b-container >
        <b-row>
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="interval"
            controls

            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
          <div ref="show" :moviesuggest="moviesuggest" v-for="(moviesuggest, idx) in moviesuggests" :key="idx">
            <b-carousel-slide :img-src="`https://image.tmdb.org/t/p/original/${moviesuggest.poster_path}`">

            <p class=" font-weight-bold text-white">{{moviesuggest.title}}</p>
            </b-carousel-slide>
          </div>
          </b-carousel>
        </b-row>
      </b-container>
    </div>
  </div>
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
      moviesuggest: null,
      moviesuggests: null,
      interval: 2000,
      slide: 0,
      sliding: null,
      // movieid: null
      idx: null,
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
      // this.$store.dispatch('emptyMovie')
      this.$emit('nowslide', this.moviesuggests[this.slide])
      // console.log(this.moviesuggests[this.slide])
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
#carousel-1 {
  position: absolute; top:15; left: 0;
  width: 100%;
  height: 50%;
}
b-row {
  position: relative;
}
</style>