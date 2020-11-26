<template>
  <div   id="goleft" v-if="login">
      <div id="nav" class="p-3">
        <div style="width: 1220px; margin: 0 auto ">
          <nav class="navbar navbar-expand-lg navbar-light" style=" height: 40px;margin: 10px;margin-bottom: 30px;">
            <router-link
              to="/main"
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
                  <router-link style="background-color: #14181b; color:#f0ad4e" to="/main" class="nav-link" router-tag="a"
                    >Main</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link style="background-color: #14181b; color:#f0ad4e" to="/" class="nav-link" router-tag="a"
                    @click.native="logout">Logout</router-link
                  >
                </li>
                <div v-if="this.nowopen">
                  <li class="nav-item">
                    <a style="background-color: #14181b; color:#f0ad4e" class="nav-link" 
                      @click="closeNav()">Moving?</a>
                  </li>
                </div>
                <div v-else>
                  <li class="nav-item">
                    <a style="background-color: #14181b; color:#f0ad4e" class="nav-link" 
                      @click="openNav()">Moving?</a>
                  </li>
                </div>
              </ul>
            </div>
          </nav>
           <div>
            <MovieList />
           </div>
        </div>
    <div id="mySidenav" class="sidenav">
        <div style="color:white">
          <hr style="border: solid 1px #f0ad4e;">
          <p style=" font-weight:bold"> MOVING은 뭔가요? </p>
          <hr style="border: solid 1px #f0ad4e;">
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
          <hr style="border: solid 1px #f0ad4e;">
          <p style=" font-weight:bold"> 흔들리는 포스터는 뭔가요? </p>
          <hr style="border: solid 1px #f0ad4e;">
          <p style="display:block">
            당신이 최근 좋게 평가한 영화를  <br>
            기준으로 맞춤 추천된 영화입니다. <br>
            <br>
            혹시 흔들리는 포스터가 없다면, <br>
            좋아하는 영화에 평가를 남겨보세요! <br>
            더 좋은 영화를 추천받을 수 있을거에요.
          </p>
          <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
        </div>
    </div>
      </div>
    </div>
</template>

<script>
import MovieList from '../../components/movieComponents/MovieList.vue'


export default {
  name: 'Main',
  data() {
    return {
      nowopen: false
    }
  },
  components: {
    MovieList
  },
  methods: {
    logout() {
      // console.log('logout')
      this.login =false
      this.$store.dispatch('emptyUser')
      localStorage.removeItem('jwt')
      this.$router.push({name: 'Home' })
    },
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("goleft").style.marginRight = "250px";
      this.nowopen = true
      // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("goleft").style.marginRight = "0";
      this.nowopen = false
      // document.body.style.backgroundColor = "white";
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

.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#goleft {
  transition: margin-right .5s;
  padding: 20px;
}
</style>