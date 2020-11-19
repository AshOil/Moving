<template>
  <div class="home thumbnail-wrapper">
    <b-row align-v="center">
        <b-col>
          <img src="https://img.hankyung.com/photo/201911/01.21061377.1.jpg" alt="배경" id="photo" class="w-75 p-3 h-100">
        </b-col>
         <Signup />

    </b-row>
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

#photo {
  max-width: 100%; height: auto;
}

</style>
