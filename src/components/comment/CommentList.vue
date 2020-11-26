<template>
  <div style="background: rgb(69, 69, 71); border-radius: 5px; display: inline-block;width: 100%;">
    <div  style="margin: 10px;">
      <CreateComment 
        :movieid="movieid" 
        :article="article" 
        @create-comment-input = createdComment
      />
    </div>
    <hr style="border: dashed 0.5px #f0ad4e;">
    <Comment
      v-for="comment in comments" :key='comment.id'
      :movieid="movieid" 
      :article="article" 
      :comment="comment"
      @delete-comment = deleteComment

    />
  </div>
</template>

<script>
import axios from 'axios'

import CreateComment from '../comment/CreateComment'
import Comment from '../comment/Comment'

export default {
  name: 'CommentList',
  data() {
    return {
      comments: []
    }
  },
  components: {
    CreateComment,
    Comment
  },
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
    getComments() {
      // Comment List 가져와
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/${this.article.id}/comments/`, config)
      .then(res => {
        console.log(res.data)
        this.comments = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    createdComment(text) {
      console.log(text)
      this.comments.push(text)
      console.log(this.comments)
    },
    deleteComment(commentId) {
      console.log(commentId)
      this.comments = this.comments.filter(comment => {
        return comment.id !== commentId
      })
    },
  },
  created() {
    this.getComments()
  },

}
</script>

<style>

</style>