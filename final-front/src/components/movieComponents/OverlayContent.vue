<template>
  <div>
    <b-card no-body class="overflow-hidden w-100">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="`https://image.tmdb.org/t/p/original/${moviedata.fields.poster_path}`" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="`${moviedata.fields.title}`">
            <hr>
            <b-card-text>
              <p class="overflow-ellipsis">{{ moviedata.fields.overview }}</p>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card> 
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
</style>