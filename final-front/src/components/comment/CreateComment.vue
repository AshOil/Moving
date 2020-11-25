<template>
  <div>
    <span>
      <b-icon  style="color:#f0ad4e" class="d-inline" icon="chat-left-text-fill"></b-icon>   
      <input style=" border: 2px solid #f0ad4e; border-radius: 4px; background-color: #14181b; color: white; center" type="text" v-model="content" placeholder="댓글 작성하기" @keypress.enter="createComment">
    </span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateComment',
  props: {
    article: {
      type: Object
    },
    movieid: {
      type : Number
    }
  },
  data() {
    return {
      content: '',
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
    createComment() {
      const config = this.setToken()
      const commentItem = {
        content: this.content,
        movie_id: this.movieid,
        article_id: this.article.id
      }
      console.log(commentItem)
      axios.post(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/${this.article.id}/comments/`, commentItem, config)
        .then(res => {
          // 반응형 변경!!
          this.$emit('create-comment-input', res.data)
          this.content=""
        })
        .catch((err) => {
          console.log(err)
        })
      
    }
  }

}
</script>

<style>

</style>