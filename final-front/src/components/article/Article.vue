<template>
  <div class="rating" v-if="updateState">
    <span>
      <b-form-rating 
        id="score" 
        no-border=true
        style="background: #00000000;"
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
    <div style="text-align: left;display: inline-block;float: left;">
      <b-form-rating 
        id="rating-inline" 
        no-border=true
        style="background: #00000000;"
        inline
        variant="warning"
        :value="article.score"
        readonly
      ></b-form-rating>
      <span class="d-inline" style="color: white">{{article.user}}님의 한줄평:         {{article.title}}   </span>
    </div>
    <span style="float: right;text-align: right;margin: 10px;">
      <b-icon class="d-inline" style="color:#f0ad4e" v-if="!updateState" icon="pencil" @click="changeUpdate" v-b-tooltip.hover.topright="'수정하기'"></b-icon>
      <b-icon class="d-inline" style="color:#f0ad4e" icon="trash-fill" @click="deleteArticle" v-b-tooltip.hover.topright="'삭제하기'"></b-icon>
      <b-icon class="d-inline" style="color:#f0ad4e" @click="showComment" icon="sort-down-alt" v-b-tooltip.hover.topright="'댓글달기'"></b-icon>
      <p v-if="this.created_at != this.updated_at" style="color: white; font-size: xx-small;">수정됨</p>
    </span>
    
    <div v-if="commentState">
      <div style="display: block">
      <CommentList 
        :movieid="movieid" 
        :article="article" />
      </div>
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
      created_at: null,
      updated_at: null,
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
      console.log(this.username)
      if (this.username!=this.article.user) {
        alert('수정할 수 없습니다!!')
      } else {
        this.updateState = !this.updateState 
      }
    },

    deleteArticle() {
      const config = this.setToken()
      this.checkDelete()
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
          this.created_at = res.data.created_at
          this.updated_at = res.data.updated_at
          this.article.title = this.title
          this.article.score = this.score
          // console.log(this.created_at)
          // console.log(this.updated_at)   
        })
        .catch(err => {
          console.log(err)
          
        })
    },
  showComment() {
    this.commentState = !this.commentState
  },
  checkDelete(){
    if (confirm("정말 삭제하시겠습니까??") == true){    //확인
      return;
    }else{   //취소
      document.form.submit(); 
    }
    }
  },
  computed: {
    ...mapState([
      'username'
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