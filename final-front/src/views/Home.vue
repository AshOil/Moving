<template>
  <div class="back">
    <img class="rounded float-right mx=0 200" src="../assets/logo.png" alt="안뇽">
    <form class="box">
      <b-tabs content-class="mt-3" lazy >
        <b-tab title="Login">
          <br>
          <Login />
        </b-tab>
        <b-tab title="Sign Up">
          <Signup/>
        </b-tab>
      </b-tabs>
    </form>
  </div>
</template>

<script>
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  data() {
    return {
      check: false
    }
  }, 
  components: {
    Signup,
    Login
  },

}
</script>

<style>
/* .back {
  background: url( "https://i.ytimg.com/vi/P0lUx_CDVgE/maxresdefault.jpg" );
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
} */
.box {
    width: 25%;
    position: relative;
    top: 15%;
    
  }

</style>
