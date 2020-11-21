<template>
  <div>
    <h1>{{ moviedata[0].title}}</h1>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from '../../components/article/ArticleList'
import {mapState} from 'vuex'

export default {
  name: 'MovieDetail',
  data() {
    return {
      moviedata: this.movie
    }
  },

  components: {
    ArticleList,
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