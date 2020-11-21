<template>
  <div>
    <p>article</p>
    <div>
      <span>
        <label for="rating-inline" style="margin-right: 10px">Score</label>
        <b-form-rating id="rating-inline" inline v-model="value" ></b-form-rating>
        <p>{{value*2}}</p>
      </span>
      <span>
      <label for="title"></label>
      <input type="text" id="title" placeholder="Wirte your opinion about Movie" >
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Article',
  data() {
    return {
      value: null,
      aritlces: null
      // articles:{
      //   title: '',
      //   score: ''
      // }
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
    getArticles() {
      
      // Article List 가져와
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/articles/',config)
      .then(res => {
        console.log(res.data)
        this.todos = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    createdArticles(text) {
      this.articles.push(text)
    },
    deleteArticle(articleId) {
      this.articles = this.articles.filter(article => {
        return article.id !== articleId
      })


    },
    updateArticle(article) {
      console.log(article)
    }

   },
  created() {
    this.getArticles()
  }

}
</script>

<style>

</style>