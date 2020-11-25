<template>
  <div>
    <h2 style="text-align: left; color: white; margin: 0 0 20px 16px;">회원가입</h2>
    <label for="username"></label>
    <input type="email" id="username" v-model="credentials.username" class="form-control newinput" placeholder="Your email"  style="margin: 0 auto"/>
    <label for="password"></label>
    <input type="password" id="password" v-model="credentials.password" class="form-control newinput" placeholder="Your password"  style="margin: 0 auto"/>
    <label for="passwordConfirmation"></label>
    <input type="password" id="passwordConfirmation" v-model="credentials.passwordConfirmation" 
    @keypress.enter="signup(credentials)" class="form-control newinput" placeholder="Check your password one more"  style="margin: 0 auto"/>
    <br>
    <b-button @click="signup(credentials)" class="button_color" style="margin: 10px">Sign-Up</b-button>
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
}

.reduced {
  margin-top: 10px
}

.button_color:hover {
  background: rgb(22, 25, 29);
  color: #FFD938;
}




</style>