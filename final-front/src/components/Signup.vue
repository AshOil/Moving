<template>
  <div>
    <h1>Sign Up</h1>
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="credentials.password">
    </div>
    <div>
      <label for="passwordConfirmation">비밀번호 확인: </label>
      <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation" 
      @keypress.enter="signup(credentials)">
    </div>
    <button @click="signup(credentials)">회원가입</button>
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
            // console.log('signup')
            // 회원가입 정상 진행(server)
            this.$router.push({ name:'Login'})
        })
      } else {
        alert('작성된 비밀번호가 다릅니다.')
      }
      
    }
  },
}
</script>

<style>

</style>