<template>
  <div class="back">
    <div>
      <Signup />
    </div>
    <div>
      <Login />
    </div>
  </div>
 
</template>

<script>
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  components: {
    Signup,
    Login
  }
}
</script>

<style>
.back {
  background: url( "https://i.ytimg.com/vi/P0lUx_CDVgE/maxresdefault.jpg" );
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

</style>
