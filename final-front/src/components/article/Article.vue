<template>
<div>
  <b-form-rating 
  id="rating-inline" 
  inline
  variant="warning"
  :value="article.score"
  readonly
  ></b-form-rating>
  <br>
  <span>{{article.score}}</span>
  <br>
  <span>{{article.title}}</span>
  <button @click="deleteArticle">x</button>
</div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'Article',
  props: {
    article: {
      type: Object,
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
    deleteArticle() {
      const config = this.setToken()
      axios.delete(`http://127.0.0.1:8000/articles/${this.article.id}/`,config)
      .then(res => {
        console.log(res)
        this.$emit('delete-article',res.data.id)
      })
    },
    updateArticle() {
      const config = this.setToken()
      const articleItem = {
        title: this.article.title,
      }
      axios.put(`http://127.0.0.1:8000/article/${this.article.id}/`, articleItem, config)
        .then(res => {
          console.log(res.data)
          // this.$emit('update-todo', this.todo)
        })
    }
  }
}
</script>

<style>
</style>