<template>
  <div>
    <div>
      <b-card class="rounded-0" id="aaa" :img-src="`https://image.tmdb.org/t/p/original/${moviedata.backdrop_path}`" img-alt="Card image" img-top>
      <b-card-text>
        {{moviedata.title}}
      </b-card-text>
      </b-card>
   </div>
  </div>
</template>

<script>
export default {
  name:"OverlayContent",
  props: {
    moviedata: {
      type : Object
    },
  },
  methods: {

    }
  }
</script>

<style>
p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
#aaa {
  margin: 0 !important;
}
</style>