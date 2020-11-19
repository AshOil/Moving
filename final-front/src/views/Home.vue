<template>
  <div>
    <div class="container">
      <img src="https://i.ytimg.com/vi/P0lUx_CDVgE/maxresdefault.jpg" alt="배경" id="photo">
    </div>
    <div>
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

/* #photo {
max-width: 100%;
max-height: 100%;
bottom: 100px;
left: 0; */
/* overflow: auto;
position: fixed;
right: 0;
top: 100px;
} */
#photo{
position: absolute; top:0; left: 0;
width: 100%;
height: 100%;
}

</style>
