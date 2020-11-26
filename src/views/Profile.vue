<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      pickmovie: 0,
    }
  },
  methods: {
    setToken() {
      const token =localStorage.getItem('jwt')
      const config = {
        headers:{
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getProfile() {
      const config = this.setToken()
      console.log(config)
      axios.get(`https://ssafyingmoving.herokuapp.com/moviedata/profile/${this.username}/`, config)
      .then(res => {
        console.log(res.data)
        this.pickmovie = res.data
      })
      .catch(err => {
        console.log(err)
      })
      },
    },
    computed: {
    ...mapState([
      'username'
    ]),
  },
  created() {
    this.getProfile()
  }
}

</script>

<style>

</style>