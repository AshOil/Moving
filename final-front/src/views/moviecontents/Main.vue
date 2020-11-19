<template>
  <div>
    Main home
    <button @click="gotoDetail">detail</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  methods: {
    gotoDetail() {
      axios.get('http://127.0.0.1:8000/articles/')
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>