<template>
<div style="margin: 10px;" >
  <div style="color:white" >
    {{comment.user}} : {{comment.content}}
    <b-icon class="d-inline" style="color:#f0ad4e" @click="deleteComment" icon="trash2-fill" v-b-tooltip.hover.topright="'comment delete'"></b-icon>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Comment',
  props: {
    article: {
      type: Object,
    },
    movieid: {
      type: Number,
    },
    comment: {
      type: Object
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
    deleteComment() {
      const config = this.setToken()
      axios.delete(`https://ssafyingmoving.herokuapp.com/moviedata/${this.movieid}/articles/${this.article.id}/comments/${this.comment.id}/`,config)
        .then(res => {
          console.log(res.data)
          this.$emit('delete-comment',res.data.id)
        })
        .catch(err => {
          console.log(err)
          alert('삭제할 수 없습니다.')
        })
    },

  }
}
</script>

<style>

</style>