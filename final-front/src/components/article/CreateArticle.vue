<template>
  <div>
    <span>
      <label for="rating-inline" style="margin-right: 10px">Score: </label>
      <b-form-rating id="rating-inline" inline v-model="score" variant="warning"></b-form-rating>
    </span>
    <label for="title"></label>
    <input type="text" @keypress.enter="createArticle" v-model="title" placeholder="Write your Opinion about Movie">
    
    <b-icon icon="plus-circle-fill" v-b-tooltip.hover.topright="'plus'" @click="createArticle"></b-icon>
  
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'CreateArticle',
 
  props: {
    movieid: {
      type : Number
    }
  },
  data() {
    return {
      title: '',
      score: 0
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
    createArticle() {
      const config = this.setToken()
      const articleItem = {
        title: this.title,
        score: this.score,
        movie_id: this.movieid
      }
      console.log(articleItem)
      axios.post(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/`, articleItem, config)
        .then(res => {
          
          // 반응형 변경!!
          this.$emit('create-input', res.data)
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }
}
</script>

<style>

</style>