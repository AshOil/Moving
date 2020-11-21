<template>
  <div>
    <span>
      <label for="rating-inline" style="margin-right: 10px">Score: </label>
      <b-form-rating id="rating-inline" inline v-model="score" variant="warning"></b-form-rating>
      <span>{{score*2}}</span>
    </span>
    <label for="title"></label>
    <input type="text" @keypress.enter="createArticle" v-model="title" placeholder="Write your Opinion about Movie">
    <button @click="createArticle">+</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateArticle',
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
        score: this.score*2
      }
      axios.post('http://127.0.0.1:8000/moviedata/articles/', articleItem, config)
        .then(res => {
          console.log(res.data)
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