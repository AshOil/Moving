<template>
  <div>
    <span style="color: #f0ad4e;">사용자 평점: {{this.avg}}/5  전문가 평점: {{vote_average/2}}/5</span>
    <hr style="border: solid 1px #f0ad4e;">
    <CreateArticle 
      @create-input = createdArticles
      :movieid="movieid"
      :user_list="user_list"
      @avg = Avg
    />
  <hr style="border: solid 1px #f0ad4e;">
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
import {mapState} from 'vuex'
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
      user_list: []

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
        console.log("유저데이터")
        this.articles.forEach(article => {
          this.user_list.push(article.user)
        })
        console.log(this.user_list)
        
        
      })
      .catch(err => {
        console.log(err)
      })
    },
    createdArticles(text) {
      console.log(text)
      this.articles.push(text)
      this.user_list.push(this.username)
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
   computed: {
    ...mapState([
      'username'
    ]),
  },
  created() {
    this.getArticles(),
    this.scoreAvg()
  },

}
</script>

<style>

</style>