<template>
  <div>
    <span>
      <label for="rating-inline" style="margin-right: 10px">Score: </label>
      <b-form-rating id="rating-inline" inline v-model="score" variant="warning" no-border=true style="background: #00000000;"></b-form-rating>
    </span>
    <label for="title"></label>
    <input type="text" @keypress.enter="createArticle" v-model="title" placeholder="한줄평">
    
    <b-icon icon="plus-circle-fill" v-b-tooltip.hover.topright="'plus'" @click="createArticle"></b-icon>
  
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name: 'CreateArticle',
 
  props: {
    movieid: {
      type : Number
    },
    user_list: {
      type: Array
    },
  },
  data() {
    return {
      title: '',
      score: 0,
      score_avg2: 0,
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
      if (this.user_list.includes(this.username)) {
            alert('이미 작성한 사용자 입니다.')
          }
      else {
        axios.post(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/`, articleItem, config)
          .then(res => {
            this.scoreAvg()
            this.$emit('create-input', res.data)
            this.title = ''
            
          })
          .catch((err) => {
            console.log(err)
          })
      }
      
    },
    scoreAvg() {
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/moviedata/${this.movieid}/score/`,config)
      .then(res => {
        this.score_avg2 = res.data.avg_score
        this.$emit('avg', this.score_avg2)
      })
      .catch(err => {
        console.log(err)
      })
    }
    
  },
  computed: {
    ...mapState([
      'username'
    ]),
  }, 
}
</script>

<style>

</style>