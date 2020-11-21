<template>
<div>
  <b-form-rating 
  id="rating-inline" 
  inline
  variant="warning"
  :value="article.score/2"
  readonly
  ></b-form-rating>
  <br>
  <span>{{article.score}}</span>
  <br>
  <span>{{article.title}}</span>
  <b-icon icon="pencil-fill" @click="updateArticle" v-b-tooltip.hover.topright="'update'"></b-icon>
  <b-icon icon="trash-fill" @click="deleteArticle" v-b-tooltip.hover.topright="'delete'"></b-icon>
  <b-icon icon="chat-right-text-fill" v-b-tooltip.hover.topright="'Comments'"></b-icon>
</div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'Article',
  props: {
    article: {
      type: Object,
    },
    movieid: {
      type: Number,
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
      axios.delete(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/${this.article.id}/`,config)
        .then(res => {
          console.log(res)
          this.$emit('delete-article',res.data.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle() {
      const config = this.setToken()
      const articleItem = {
        title: this.article.title,
      }
      axios.put(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/${this.article.id}/`, articleItem, config)
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