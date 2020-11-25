<template>
  <div>
    <span>사용자 평점: {{this.avg}}/5  전문가 평점: {{vote_average/2}}/5</span>
    <hr>
    <CreateArticle 
      @create-input = createdArticles
      :movieid="movieid"
      @avg = Avg
    />
  <b-container fluid>
    <div style="position:relative; overflow-y:auto; height:300px">
        <Article
          v-for="article in articles" :key='article.id' 
          :article=article
          :movieid="movieid"
          @delete-article = deleteArticle
          @update-article = updateArticle
        />
    </div>
  </b-container>
    
    
  </div>
</template>

<script>
import axios from 'axios'

import CreateArticle from '@/components/article/CreateArticle'
import Article from '@/components/article/Article'

export default {
  name: 'ArticleList',
  props: {
    movieid: {
      type : Number
    },
    vote_average: {
      type: Number
    },
    // score_avg: {
    //   type: Number
    // }
  },
  components: {
    CreateArticle,
    Article,

  },
  data() {
    return {
      value: null,
      articles: [],
      avg: 0,

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
      axios.get(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/`,config)
      .then(res => {
        console.log(res.data)
        this.articles = res.data
        this.scoreAvg()
      })
      .catch(err => {
        console.log(err)
      })
    },
    createdArticles(text) {
      console.log(text)
      this.articles.push(text)
    },
    deleteArticle(articleId) {
      this.articles = this.articles.filter(article => {
        return article.id !== articleId
      })
    },
    updateArticle(article) {
      console.log(article)
    },
    scoreAvg() {
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/moviedata/${this.movieid}/score/`,config)
      .then(res => {
        this.avg = res.data.avg_score
      })
      .catch(err => {
        console.log(err)
      })
    },
    Avg(avg) {
      console.log(avg)
      this.avg = avg
    }

   },
  created() {
    this.getArticles(),
    this.scoreAvg()
  },

}
</script>

<style>

</style>