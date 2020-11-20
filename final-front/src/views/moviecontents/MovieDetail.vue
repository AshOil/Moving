<template>
  <div>
    <h1>{{ moviedata }}</h1>
    <h1>{{ $store.state.movie }}</h1>
    <Article />
  </div>
</template>

<script>
import Article from '../../components/Article.vue'
import {mapState} from 'vuex'

export default {
  name: 'MovieDetail',
  data() {
    return {
      moviedata: null
    }
  },

  components: {
    Article,
  },

  computed: {
    ...mapState([
      'movie'
    ])
  },
  beforeCreated() {
    this.moviedata = this.movie
    this.$store.dispatch('emptyMovie')
    console.log(this.moviedata)
  }

}
</script>

<style>

</style>