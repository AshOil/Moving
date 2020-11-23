<template>
    <div id="app" class="bg-dark h-100%">
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/main">Main</router-link> 
        </li>
        <li class="nav-item">
          <router-link to="/main">Main</router-link>
        </li>
        <li class="nav-item">
          <router-link @click.native="logout" to="#">LogOut</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
    </div>
  </nav> -->


      <router-link to="/main">Main</router-link> |
    <span v-if="login">
      <router-link to="/main">Main</router-link> |
      <router-link @click.native="logout" to="#">LogOut</router-link>
    </span>
    <router-view @login="login = true" />
  </div>
</template>

<script>
export default {
  name:'App',
  data() {
    return {
      login:false
    }
  },
  methods: {
    logout() {
      console.log('logout')
      this.login =false
      localStorage.removeItem('jwt')
      this.$router.push({name: 'Home' })
    }
  },
  created() {
    //로그인 되어있는 상태인지 확인! >>> 서버로부터 JWT 받았는지 확인!
    const token = localStorage.getItem('jwt')
    // token이 있으면?
    if (token) {
      this.login = true
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
