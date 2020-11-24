<template>
  <div class="back">
    <img class="rounded logo" 
    src="../assets/biglogo.png" 
    alt="안뇽" 
    data-html= true
    style="white-space: pre-line;"
    v-b-popover.hover="'이미지의 크기는 곧 평점을 의미합니다. <br/> 혹시 흔들리는 이미지가 있다면? 아마 당신을 위한 영화가 될 것입니다.'"
    title="Moving 사용설명서"
    >
      <form class="width=20% border-warning">
        <div style="border: solid 2px yellow" class="m-3">
          <b-tabs class="mx-auto"   lazy >
            <b-tab title="Login">
              <br>
              <Login />
            </b-tab>
            <b-tab title="Sign Up">
              <br>
              <Signup/>
            </b-tab>
          </b-tabs>
        </div>
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
.back {
  display: block;
  border: yellow;
  border-color: yellow;
  text-align: center;

}
form {
  border-style: solid;
  border-width: medium;
  width: 30%;
  text-align: center;
  margin: auto;
  border: yellow;
  border: 2px;
}
.logo {
  width: 400px;
  height: auto;
  text-align: center;
}

</style>
