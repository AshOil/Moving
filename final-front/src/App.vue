<template>
    <div id="app">
      <router-link to="/articlelist">ArticleList</router-link>
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
