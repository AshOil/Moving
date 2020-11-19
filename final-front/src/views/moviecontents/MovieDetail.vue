<template>
  <div @click="onClick">
    <h1>{{ moviedata.title }}</h1>
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
      moviedata: this.movie
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
    // this.moviedata = this.movie
    this.$store.dispatch('emptyMovie')
    console.log(this.moviedata)
  }

}
</script>

<style>

</style>