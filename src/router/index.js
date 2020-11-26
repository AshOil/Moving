import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Main from '../views/moviecontents/Main.vue'
import MovieDetail from '../views/moviecontents/MovieDetail.vue'
import ArticleList from '../components/article/ArticleList'
import Profile from '../views/Profile.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path:'/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/main',
    name: 'Main',
    component: Main
  },
  {
    path:'/moviedetail',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path:'/articlelist',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path:'/profile',
    name: 'Profile',
    component: Profile
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
