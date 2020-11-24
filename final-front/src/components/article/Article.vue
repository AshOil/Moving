<template>
  <div class="rating" v-if="updateState">
    <span>
      <b-form-rating 
        id="score" 
        no-border=true
        inline 
        variant="warning" 
        v-model="score"   
        :value="score"   
      ></b-form-rating>
    </span>
    <label for="title"></label>
    <input type="text" @keypress.enter="updateArticle" v-model="title" >
    <b-icon icon="pencil-fill" v-b-tooltip.hover.topright="'update'" @click="updateArticle"></b-icon>
  </div>

  <div v-else>
    <b-form-rating 
      id="rating-inline" 
      no-border=true
      inline
      variant="warning"
      :value="article.score"
      readonly
    ></b-form-rating>
    <span class="d-inline" >{{article.user}}님의 한줄평:         {{article.title}}   </span>
    <span>
      <b-icon class="d-inline" v-if="!updateState" icon="pencil-fill" @click="changeUpdate" v-b-tooltip.hover.topright="'update'"></b-icon>
      <b-icon class="d-inline" icon="trash-fill" @click="deleteArticle" v-b-tooltip.hover.topright="'delete'"></b-icon>
      <b-icon class="d-inline" @click="showComment" icon="sort-down-alt" v-b-tooltip.hover.topright="'Comments'"></b-icon>
    </span>
    <div v-if="commentState">
      <CommentList 
        :movieid="movieid" 
        :article="article" />
    </div>
</div> 
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import CommentList from '../comment/CommentList'


export default {
  name: 'Article',
  components: {
    CommentList,
  },
  props: {
    article: {
      type: Object,
    },
    movieid: {
      type: Number,
    }
  },
  data() {
    return {
      updateState: false,
      commentState: false,
      score: 0,
      title: '',
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
    changeUpdate() {
      console.log(this.user)
      if (this.user[0]!=this.article.user) {
        alert('수정할 수 없습니다!!')
      } else {
        this.updateState = !this.updateState 
      }
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
          alert('삭제할 수 없습니다.')
        })
    },
    updateArticle() {
      const config = this.setToken()
      const articleItem = {
        id: this.article.id ,
        title: this.title,
        score: this.score,
        movie_id: this.movieid,
        
      }
      
      console.log(articleItem)
      axios.put(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/${this.article.id}/`, articleItem, config)
        .then(res => {
          console.log(res.data)
          this.updateState = !this.updateState 
          console.log('가라ㅏ')
          this.article.title = this.title
          this.article.score = this.score
          
        })
        .catch(err => {
          console.log(err)
          
        })
    },
  showComment() {
    this.commentState = !this.commentState
  },


  },
  computed: {
    ...mapState([
      'user'
    ]),
  },
  created() {
    this.title = this.article.title
    this.score = this.article.score
  },

}
</script>

<style>
</style>