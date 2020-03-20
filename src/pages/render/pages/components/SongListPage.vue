<template>
  <div class="SonglistPage">SongListPage {{ $route.params.list_id }}</div>
</template>
<script>
export default {
  name: "SonglistPage",
  data() {
    return {
      list_id: ""
    };
  },
  methods: {
    init: function() {
      this.list_id = this.$route.params.list_id;
      this.$http
        .get(
          "http://39.108.229.8:3200/getSongListDetail?disstid=" + this.album_id
        )
        .then(response => {
            console.log(response)
        //   this.cdlist = response.data.response.cdlist[0];
        //   this.isloading_Box = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>