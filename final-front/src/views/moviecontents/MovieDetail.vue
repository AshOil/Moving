<template>
  <div>
    <h1>{{ moviedata[0].fields.title}}</h1>
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