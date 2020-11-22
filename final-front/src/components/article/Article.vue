<template>
<div class="rating">
  
  <div v-if="updateState">
    <span>
      <label for="rating-inline" style="margin-right: 10px">Score: </label>
      <b-form-rating id="rating-inline" inline v-model="changescore" variant="warning"></b-form-rating>
    </span>
    <label for="changetitle"></label>
    <input type="text" @keypress.enter="updateArticle" v-model="changetitle" >
    <b-icon icon="pencil-fill" v-b-tooltip.hover.topright="'plus'" @click="updateArticle"></b-icon>
  </div>

  <div v-else>
    <b-form-rating 
      id="rating-inline" 
      no-border=true
      inline
      variant="warning"
      :value="article.score/2"
      readonly
    ></b-form-rating>
    <p>{{article.user}}</p>
    <span>{{article.title}}</span>
  </div>
  <b-icon v-if="!updateState" icon="pencil-fill" @click="changeUpdateState" v-b-tooltip.hover.topright="'update'"></b-icon>
  <b-icon icon="trash-fill" @click="deleteArticle" v-b-tooltip.hover.topright="'delete'"></b-icon>
  <b-icon icon="chat-right-text-fill" v-b-tooltip.hover.topright="'Comments'"></b-icon>
  <hr>

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