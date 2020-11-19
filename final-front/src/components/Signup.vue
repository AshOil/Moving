<template>
  <div>
    <h1>Sign Up</h1>
    <label for="username"></label>
    <input type="email" id="username" v-model="credentials.username" class="form-control" placeholder="Your email" />
    <label for="password"></label>
    <input type="password" id="password" v-model="credentials.password" class="form-control" placeholder="Your password"/>
    <label for="passwordConfirmation"></label>
    <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation" 
    @keypress.enter="signup(credentials)" class="form-control" placeholder="Check your password one more"/>
    <br>
    <b-button @click="signup(credentials)">Sign-Up</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',

  data() {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: ''
      } 
    }
  },
  methods: {
    signup({ username, password ,passwordConfirmation}) {
      const userData = {
        username,
        password,
        passwordConfirmation,
      }
      if (password === passwordConfirmation) {
        axios.post('http://127.0.0.1:8000/accounts/signup/', userData)
          .then(() => {
            console.log('회원가입')
            // console.log('signup')
            // 회원가입 정상 진행(server)
            this.$router.go(this.$router.currentRoute)
        })
      } else {
        alert('작성된 비밀번호가 다릅니다.')
      }
      
    }
  },
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