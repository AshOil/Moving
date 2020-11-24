<template>
  <div>
    {{comment.content}}
    <b-icon class="d-inline" @click="deleteComment" icon="trash2-fill" v-b-tooltip.hover.topright="'comment delete'"></b-icon>
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
      axios.delete(`http://127.0.0.1:8000/moviedata/${this.movieid}/articles/${this.article.id}/comments/${this.comment.id}/`,config)
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