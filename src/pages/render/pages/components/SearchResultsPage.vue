<template>
  <div class="resulet_box">
    <div class="sreach_info">
      <span class="info_title">{{stext.trim()}}</span>
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
.sreach_info{
  margin-left: 20px;
}
.info_title {
  font-size: 24px;
  font-weight: bold;
  color: rgb(90, 90, 90);
}
</style>