<template>
  <div class="">
    <h2 style="text-align: left; color: white; margin: 0 0 20px 16px;">로그인</h2>
    <label for="username"></label>
    <input type="text" id="username" v-model="credentials.username" placeholder="Your ID" class="form-control newinput" >
    <label for="password"></label>
    <input type="password" id="password" v-model="credentials.password" @keypress.enter="login(credentials)" placeholder="Your password" class="form-control newinput">
    <b-button @click="login(credentials)" class="button_color" >LogIn</b-button>
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
      },
    }
  },
  methods: {
    login({ username, password }) {
      axios.post('http://127.0.0.1:8000/accounts/api-token-auth/', { username, password })
        .then(res => {
          console.log(res.data)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$store.dispatch('addUser', this.credentials.username)
          this.$router.push({name:'Main'})
        })
        .catch(err => {
          console.log(err)
          alert('로그인에 실패하였습니다.')
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
  }

.newinput{
  background: rgb(69, 69, 71) ;
  border: none;
  width: 90%;
  color: white;
  margin: 0 auto;
  height: 45px;
  margin-bottom: 10px;
}
.newinput:focus {
  background: rgb(74, 75, 77);
  color: white;
}
.button_color{
  width: 90%;
  background: #FFD938;
  height: 45px;
  color: rgb(22, 25, 29);
  font-weight: 600;
  margin-top: 50px
  
}
.button_color:hover {
  background: rgb(22, 25, 29);
  color: #FFD938;
}



</style>