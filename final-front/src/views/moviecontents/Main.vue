<template>
  <div v-if="login">
      <div id="nav" class="p-3">
        <div style="width: 1220px; margin: 0 auto ">
          <nav class="navbar navbar-expand-lg navbar-light" style=" height: 40px;margin: 10px;margin-bottom: 30px;">
            <router-link
              to="/"
              class="navbar-brand"
              href="#"
              router-tag="a"
              style="color: #f0f0f0"
              >
              <img src="../../assets/logo.png" class="d-inline-block align-top" alt="Kitten">
              </router-link
            >
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <router-link style="background-color: #14181b" to="/main" class="nav-link" router-tag="a"
                    >Main</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link style="background-color: #14181b" to="/" class="nav-link" router-tag="a"
                    @click.native="logout">Logout</router-link
                  >
                </li>
              </ul>
            </div>
          </nav>
            <MovieList />
        </div>
      </div>
      
    </div>


</template>

<script>
import MovieList from '../../components/movieComponents/MovieList.vue'


export default {
  name: 'Main',
  components: {
    MovieList
  },
  methods: {
    logout() {
      console.log('logout')
      this.login =false
      this.$store.dispatch('emptyUser')
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