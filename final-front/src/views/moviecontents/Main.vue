<template>
  <div>
    <MovieSpin />
  </div>
</template>

<script>
import axios from 'axios'
import MovieSpin from '../../components/movieComponents/MovieSpin.vue'


export default {
  name: 'Main',
  components: {
    MovieSpin
  },
  methods: {
    goToDetail() {
      axios.get('http://127.0.0.1:8000/articles/')
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style>

</style>