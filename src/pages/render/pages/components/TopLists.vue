<template>
  <div id="topLists">
    <div class="top_Title">
      <span class="top_title_text">排行榜</span>
    </div>
    <div class="topList_box">
      <div class="mod_top_item" v-for="(item,index) in topLists" :key="index">
        <div class="bg_cover">
          <img class="bg_cover_img" :src="item.picUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopLists",
  data() {
    return {
      topLists: []
    };
  },
  mounted() {
    this.$http
      .get(`http://39.108.229.8:3200/getTopLists`)
      .then(res => {
        this.topLists = res.data.response.data.topList;
      })
      .catch(err => console.log(err));
  },
  methods:{
      intoTopInfoPage(){

      }
  }
};
</script>
<style scoped>
#topLists {
  margin-top: 80px;
  margin-left: 30px;
  overflow-y: auto;
  overflow-x: hidden;
}
.top_Title {
  /* margin-left: 30px; */
  margin-bottom: 30px;
}
.top_title_text {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 2px;
}
.topList_box {
  display: flex;
  flex-wrap: wrap;
  height: 71vh;
}
.mod_top_item {
  position: relative;
  overflow: hidden;
  margin-right: 28px;
  margin-bottom: 28px;
  cursor: pointer;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.199);
}
.bg_cover {
  border:1px solid rgba(0, 0, 0, 0.336);
  border-radius: 5px;
  height: 148px;
  width: 148px;
  overflow: hidden;
}
.bg_cover_img {
  height: 150px;
  width: 150px;
  transition: transform 0.3s ease-in-out;
}
.mod_top_item:hover .bg_cover_img {
  transform: scale(1.05);
}
.item_title {
  width: 100%;
  height: 100%;
  /* background: rgba(114, 1, 124, 0.575); */
  /* backdrop-filter: blur(5px); */
  mix-blend-mode: color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item_title_text {
  color: rgba(255, 255, 255, 0.767);
  font-size: 14px;
}
.item_sub_title_text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 28px;
}
</style>