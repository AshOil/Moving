<template>
  <div>
    <div class="container">
      <div class=" w-100">
        <b-overlay :show="show"  @click="clickPossible"> 
          <b-card :aria-hidden="show ? 'true' : null">
            <stack
              :column-min-width="150"
              :gutter-width="15"
              :gutter-height="15"
              monitor-images-loaded
            >
              <stack-item
                v-for="(moviedata, idx) in moviedatas"
                :key="idx"
                style="transition: transform 300ms"
              >
                <div style="width=100% height=100%" v-if="moviedata.vote_average >= 9">
                  <img @click="clickImage(moviedata)" class="large" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div  style="width=100% height=100%" v-else-if="moviedata.vote_average >= 7">
                  <img @click="clickImage(moviedata)" class="medium" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div  style="width=100% height=100%" v-else-if="moviedata.vote_average >= 5">
                  <img @click="clickImage(moviedata)" class="small" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div style="width=100% height=100%" v-else>
                  <img @click="clickImage(moviedata)" class="verysmall" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
              </stack-item>
            </stack>
          </b-card>
          <template #overlay>
            <div class="text-center" @click="goToDetail">
              <OverlayContent 
              :moviedata = moviedata
              />
            </div>
          </template>
        </b-overlay>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { Stack, StackItem } from "vue-stack-grid"
import OverlayContent from './OverlayContent.vue' 

export default {
  name: "MovieList",
  components: {
    Stack, 
    StackItem,
    OverlayContent
  },
  data() {
    return {
      moviedata: null,
      moviedatas: null,
      show: false, 
    }
  },
  methods: {
    getMovie() {
      axios.get("https://api.themoviedb.org/3/movie/popular?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-Kr&page=1")
        .then(res => {
          console.log(res.data.results)
          this.moviedatas = res.data.results
        })
    },
    goToDetail() {
      this.$store.dispatch('nowMovie',this.moviedata)
      this.$router.push("MovieDetail")
    },
    onShown() {
      // Focus the cancel button when the overlay is showing
      this.$refs.cancel.focus()

    },
    onHidden() {
      // Focus the show button when the overlay is removed
      this.$refs.show.focus()

    },
    clickPossible() {
      if (this.show) {
        this.show = false
      }
    },
    clickImage(moviedata) {
        this.show = !this.show
        this.moviedata = moviedata
        console.log(this.moviedata)
    },
  },
  created() {
    this.getMovie()
  }
}

</script>

<style>
.container { 
    width: 80rem; 
    margin: 0 auto; 
    display: inline-block;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
} 
img {
  width: 10rem; 
  border-radius: 12px; 
  margin: 1%;
}
.verysmall { 
  height: 8rem;
}
.small { 
  height: 12rem;
}
.medium { 
  height: 16rem;
}
.large { 
  height: 25rem;
}
</style>