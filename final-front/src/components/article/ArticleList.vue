<template>
  <div>
    <p>사용자 평점: {{}}</p>
    <p>전문가 평점: </p>
    <p>한줄평</p>
    <hr>
    <CreateArticle 
      @create-input = createdArticles
    />
    <Article
      v-for="article in articles" :key='article.id' 
      :article=article
      @delete-article = deleteArticle
      @update-article = updateArticle
    />
  </div>
</template>

<script>
import axios from 'axios'

import CreateArticle from '@/components/article/CreateArticle'
import Article from '@/components/article/Article'

export default {
  name: 'ArticleList',
  components: {
    CreateArticle,
    Article
  },
  data() {
    return {
      value: null,
      articles: null
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
      axios.get('http://127.0.0.1:8000/moviedata/articles/',config)
      .then(res => {
        console.log(res.data)
        this.articles = res.data
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