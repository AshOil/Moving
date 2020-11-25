<template>
  <div class="auth-container">
    <div class="header">
    <img class="logo" 
    src="../assets/biglogo.png" 
    data-html= true
    v-b-popover.hover="'이미지의 크기는 곧 평점을 의미합니다. <br/> 혹시 흔들리는 이미지가 있다면? 아마 당신을 위한 영화가 될 것입니다.'"
    title="Moving 사용설명서"
    >
    </div>
      <div class="content">
        <form>
       
          <div v-if="is_signpage">
            <Signup/>
            <p class="text">
              <a href="#" @click="changeIsSingpage">Go to Login</a>
            </p>
          </div>
          <div v-else>
            <Login/>
            <p class="text">
              <a href="#" @click="changeIsSingpage">Go to Signup</a>
            </p>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  data() {
    return {
      check: false,
      is_signpage: false,
    }
  }, 
  components: {
    Signup,
    Login
  },
  methods: {
    changeIsSingpage() {
      this.is_signpage = !this.is_signpage
    }
  }

}
</script>

<style>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  width: 400px;
}

.content {
  min-width: 500px;
  background: rgba(78, 78, 78, 0.3);
  padding: 30px 20px 30px 20px;
  margin-top: -40px;
  border-radius: 10px;
}

form {

}
.logo {
  width: 100%;
}
.text{
  margin: 20px;
}
.text a{
  color: white;
}
.box{
  min-width: 350px;
  height: 500px

}

</style>
