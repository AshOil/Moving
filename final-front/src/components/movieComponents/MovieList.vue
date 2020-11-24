<template>
  <div>
    <div class="container">
      <div class=" w-100">
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
                <div style="width=100% height=100%" v-if="moviedata.vote_average >= 8.5">
                  <img @click="clickImage(moviedata)" class="large veryhigh" :src="`https://image.tmdb.org/t/p/original/${moviedata.poster_path}`" alt="">
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
      moviedatas: null,
      show: false, 
      limit: 0,
      movielist:[],
      modalShow: false,
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
      axios.get(`${SERVER_URL}/moviedata/`+(this.limit + 20), config)
        .then((res) => {
          setTimeout(() => {
            if (res.data.length) {
              this.limit += 10
              this.movielist.push(res.data);
              $state.loaded();
              if (this.jobs.length / 10) {
                $state.complete();
                } else {
                  $state.complete();
                }
            }
          }, 1500)
          console.log(res.data)
          this.moviedatas = res.data
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

  },
  created() {
    this.getMovie(`${SERVER_URL}/moviedata/`+(this.limit + 1))
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
}
.small { 
  height: 12rem;
}
.medium { 
  height: 16rem;
}
.large { 
  height: 25rem;
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
