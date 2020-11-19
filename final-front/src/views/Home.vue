<template>
  <div class="back">
    <!-- <div class="back" >
      <img src="https://i.ytimg.com/vi/P0lUx_CDVgE/maxresdefault.jpg" alt="배경" id="photo">
    </div> -->
    <div style="z-index: 99999990;">
      <Signup />
    </div>
  </div>
 
</template>

<script>
import Signup from '../components/Signup.vue'

export default {
  name: 'Home',
  components: {
    Signup
  }
}
</script>

<style>

#photo{
position: absolute; top:0; left: 0;
width: 100%;
height: 100%;
}
.back {
  background-image: url( "https://i.ytimg.com/vi/P0lUx_CDVgE/maxresdefault.jpg" );
  height: 100vh;
}

</style>
