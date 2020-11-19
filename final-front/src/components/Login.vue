<template>
  <div>
    <h1>Login</h1>
    <label for="username"></label>
    <input type="text" id="username" v-model="credentials.username" placeholder="Your email" class="form-control">
    <label for="password"></label>
    <input type="password" id="password" v-model="credentials.password" @keypress.enter="login(credentials)" placeholder="Your password" class="form-control">
    <br />
    <b-button @click="login(credentials)">LogIn</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login({ username, password }) {

      axios.post('http://127.0.0.1:8000/accounts/api-token-auth/', { username, password })
        .then(res => {
          console.log(res.data)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({name:'Main'})
        })
    }
  }
}
</script>

<style>
:hover{
  cursor: pointer;
}
.box {
  width: 25%;
  position: absolute;
  left: 15rem;
  top: 15rem;    
  }

</style>