<template>
  <div class="resulet_box">
    <div class="sreach_info">
      <span class="info_title">“{{stext.trim()}}”的检索结果</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchResultsPage",
  data: function() {
    return {};
  },
  computed:{
    stext(){
      return this.$store.state.search.searchKey
    }
  }
};
</script>
<style scoped>
.resulet_box {
  margin: 80px 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.info_title {
  font-size: 28px;
  font-weight: bold;
  color: rgb(90, 90, 90);
}
</style>