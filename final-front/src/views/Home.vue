<template>
  <div class="auth-container">
    <div class="header">
      <img class="logo" 
      src="../assets/biglogo.png" 
      v-b-toggle.hover.sidebar-1
      id="sidebar-1"
      
      >
      <b-sidebar id="sidebar-1" target="popover-sidebar-1" triggers="hover" title="Moving 사용설명서"  :backdrop-variant="variant"
      backdrop
      shadow style="text-align:left background-color:rgba(78, 78, 78, 0.3)">
        <div >
          <hr>
          <p style=" font-weight:bold"> MOVING은 뭔가요? </p>
          <hr>
          <p style="display:block">
            Moving은 이미지를 활용한 <br> 
            영화 추천 사이트입니다. <br> 
              <br> 
            여러 과정 필요없이, <br> 
            한눈의 평점을 비교하고 확인할 수 있습니다.<br> 
            <br> 
            포스터의 크기는 다른 이용자의<br>
            평점을 의미합니다. 
            <br>
            <br>
            포스터가 클수록 <br> 
            사용자들에게 우수한 평가를 받은 영화입니다.<br> 

          </p>
          <hr>
          <p style=" font-weight:bold"> 흔들리는 포스터는 뭔가요? </p>
          <hr>
          <p style="display:block">
            당신이 최근 좋게 평가한 영화를  <br>
            기준으로 맞춤 추천된 영화입니다. <br>
            <br>
            혹시 흔들리는 포스터가 없다면, <br>
            좋아하는 영화에 평가를 남겨보세요! <br>
            더 좋은 영화를 추천받을 수 있을거에요.
          </p>
          
        </div>
      </b-sidebar>

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
.b-sidebar {
  /* min-width: 500px; */
  background: rgba(78, 78, 78, 0.3);
  /* padding: 30px 20px 30px 20px;
  margin-top: -40px; */
  border-radius: 10px;
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
