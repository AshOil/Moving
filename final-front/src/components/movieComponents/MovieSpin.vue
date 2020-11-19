<template>
  <b-container >
    <b-row align-h="center" >
      <div class=" w-100" @click="show = !show">
        <b-overlay :show="show" > 
          <b-card :aria-hidden="show ? 'true' : null">
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
            <div ref="show"  v-for="(moviedata, idx) in moviedatas" :key="idx">
              <b-carousel-slide  :img-src="`https://image.tmdb.org/t/p/original/${moviedata.backdrop_path}`"></b-carousel-slide>
            </div>
            </b-carousel>
          </b-card>
          <template #overlay @click.prevent=true>
            <div class="text-center"  >
              <OverlayContent 
              :moviedata = moviedatas[slide]
              />
            </div>
          </template>
        </b-overlay>
      </div>
    </b-row>
  </b-container>
</template>


<script>
import axios from 'axios'
import OverlayContent from './OverlayContent.vue' 

export default {
  name: "MovieSpin",
  components: {
    OverlayContent
  },
  data() {
    return {
      moviedata: null,
      interval: 4000,
      moviedatas: null,
      slide: 0,
      sliding: null,
      show: true,
      
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
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
    onShown() {
      // Focus the cancel button when the overlay is showing
      this.$refs.cancel.focus()

    },
    onHidden() {
      // Focus the show button when the overlay is removed
      this.$refs.show.focus()

    },
    clickCheck() {
      console.log('되나?')
    }
  },
  created() {
    this.getMovie()
  }
}
</script>

<style>

</style>