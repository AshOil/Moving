<template>
  <div>
    <div class="container">
      <div class=" w-100">
        <div v-if="!moviesforuser">
          <p style="color:yellow;"> 아직 평가된 영화가 없어요 <br> 처음이라면 좋아하는 영화를 먼저 평가해주세요! <br> 좋아할만한 영화를 추천해드릴게요!</p>
        </div>
            <stack
              :column-min-width="150"
              :gutter-width="15"
              :gutter-height="15"
              monitor-images-loaded
            >
              <stack-item
                v-for="(moviedata, idx) in moviedatas"
                :key="idx"
                style="transition: transform 300ms"
              >
                <div style="width=100% height=100%" v-if="movieidforuser.includes(moviedata.id)">
                  <img @click="clickImage(moviedata)" class="veryhigh" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div style="width=100% height=100%" v-else-if="moviedata.vote_average >= 8.5">
                  <img @click="clickImage(moviedata)" class="large" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div  style="width=100% height=100%" v-else-if="moviedata.vote_average >= 7">
                  <img @click="clickImage(moviedata)" class="medium" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div  style="width=100% height=100%" v-else-if="moviedata.vote_average >= 5">
                  <img @click="clickImage(moviedata)" class="small" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
                <div style="width=100% height=100%" v-else>
                  <img @click="clickImage(moviedata)" class="verysmall" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
                </div>
              </stack-item>
            </stack>
            <infinite-loading @infinite="getMovie" spinner="spiral"></infinite-loading>
            <b-modal v-model="modalShow" hide-footer title= "오늘의 추천 영화!">
              <div class="d-block text-center" @click="goToDetail">
                <OverlayContent 
                fixed
                :moviedata = moviedata
                />
              </div>
            </b-modal>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import {mapState} from 'vuex'
import { Stack, StackItem } from "vue-stack-grid"
import OverlayContent from './OverlayContent.vue' 
import InfiniteLoading from 'vue-infinite-loading';

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: "MovieList",
  components: {
    Stack, 
    StackItem,
    OverlayContent,
    InfiniteLoading,

  },
  data() {
    return {
      moviedata: null,
      moviedatas: [],
      show: false, 
      limit: 0,
      movielist:[],
      modalShow: false,
      pickmovie: 0,
      moviesforuser:null,
      movieidforuser: []
    }
  },
  methods: {
    setToken : function () {
      const token = localStorage.getItem('jwt')

      const config = {
        header: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    getMovie($state) {
      const config = this.setToken()
      axios.get(`${SERVER_URL}/moviedata/`, config)
        .then((res) => {
          setTimeout(() => {
            if (res.data.length) {
              this.moviedatas.push.apply(this.moviedatas, res.data);
              // console.log(this.moviedatas)
              if (this.moviesforuser) {
                this.moviedatas.push(this.moviesforuser[this.limit])
                // console.log(this.moviedatas)
              }
              this.limit += 1
              $state.loaded();
              if (this.jobs.length / 10) {
                $state.complete();
                } else {
                  $state.complete();
                }
            }
          }, 1500)
        }, 1000)
        .catch((err) => {
          console.log(err)
        })
    },
    goToDetail() {
      this.$store.dispatch('nowMovie',this.moviedata)
      this.$router.push("MovieDetail")
    },
    clickImage(moviedata) {
        this.modalShow = !this.modalShow
        this.moviedata = moviedata
        console.log(this.moviedata)
    },
    getProfile() {
      const config = this.setToken()
      // console.log(config)
      axios.get(`http://127.0.0.1:8000/moviedata/profile/${this.username}/`, config)
        .then(res => {
          console.log("사용자 유저정보")
          console.log(res.data)
          this.pickmovie = res.data
          axios.get(`https://api.themoviedb.org/3/movie/${this.pickmovie.movie_id}/recommendations?api_key=0a76d0b795d7b29081aedf5bd1a28297&language=ko-KR&page=1`)
            .then(res => {
              console.log("사용자가 좋아하는 영화 정보")
              console.log(res.data.results)
              this.moviesforuser = res.data.results
              this.moviesforuser.forEach(movieforuser => {
                // console.log(movieforuser)
                this.movieidforuser.push(movieforuser.id)
              }) 
              console.log("사용자가 좋아하는 영화 id정보")
              console.log(this.movieidforuser)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })

      console.log("계산해")
      console.log(this.movieidforuser)
      console.log("계산끝")
    },
  },
  computed: {
    ...mapState([
      'username'
    ]),
  },
  created() {
    this.getProfile()
    this.getMovie(`${SERVER_URL}/moviedata/`)
  }
}

</script>

<style>
.container { 
    width: 80rem; 
    margin: 0 auto; 
    display: inline-block;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
} 
img {
  width: 10rem; 
  border-radius: 12px; 
  margin: 1%;
}
.verysmall { 
  height: 8rem;
  border: solid red 2px;
}
.small { 
  height: 12rem;
  border: solid gray 2px;
}
.medium { 
  height: 16rem;
  border: solid gray 2px;
}
.large { 
  height: 25rem;
  border: solid yellow 2px;
}
.centerplz {
  position: fixed !important;
  top: 50%;
  left: 50%;
}
img {
  margin: 0 !important;
}

.veryhigh {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
  border: solid yellow 2px;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
