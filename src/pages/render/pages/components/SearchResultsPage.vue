<template>
  <div class="resulet_box">
    <div class="sreach_info">
      <span class="info_title">{{stext.trim()}}</span>
    </div>
    <div class="resulet_type">
      <span class="type_tab act_tab">单曲</span>
      <span class="type_tab">艺人</span>
      <span class="type_tab">专辑</span>
      <span class="type_tab">MV</span>
    </div>

    <div class="resulet_list_box">
      <ul class="resulet_list_ul" v-if="!searchResults">
        <li class="res_list_th">
          <div class="d_th song_name">
            <span>歌名</span>
          </div>
          <div class="d_th song_singer">
            <span>艺人</span>
          </div>
          <div class="d_th song_album">
            <span>专辑</span>
          </div>
          <div class="d_th song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="res_list_item" v-for="(item,index) in searchResults" :key="index">
          <div class="d_li song_name" :data-id="item.mid">
            <span v-html="item.title_hilight"></span>
          </div>
          <div class="d_li song_singer">
            <span v-html="item.singer[0].title_hilight"></span>
          </div>
          <div class="d_li song_album">
            <span v-html="item.album.title_hilight"></span>
          </div>
          <div class="d_li song_time">
            <span>{{ item.interval }}</span>
          </div>
        </li>
      </ul>
      <ul class="resulet_list_ul" v-else>
        <li class="res_list_th">
          <div class="d_th song_name">
            <span>歌名</span>
          </div>
          <div class="d_th song_singer">
            <span>艺人</span>
          </div>
          <div class="d_th song_album">
            <span>专辑</span>
          </div>
          <div class="d_th song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="res_list_item" v-for="(item,index) in searchResults" :key="index">
          <div class="d_li song_name" :data-id="item.mid">
            <span v-html="item.title_hilight"></span>
          </div>
          <div class="d_li song_singer">
            <span v-html="item.singer[0].title_hilight"></span>
          </div>
          <div class="d_li song_album">
            <span v-html="item.album.title_hilight"></span>
          </div>
          <div class="d_li song_time">
            <span>{{ item.interval }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchResultsPage",
  data: function() {
    return {
      searchResults: ""
    };
  },
  watch: {
    stext() {
      this.$http
        .get(
          "http://localhost:3200/getSearchByKey?key=" +
            this.$store.state.search.searchKey
        )
        .then(res => {
          let temp = res.data.response.data.song.list;
          new Promise((resolve) => {
            for (let i = 0; i < Object.keys(this.searchResults).length; i++) {
              if ("<em>".indexOf(temp[i].title_hilight) > 0) {
                temp[i].title_hilight.replace("<em>", "<span class='em'>");
                temp[i].title_hilight.replace("</em>", "</span>");
              }
              if ("<em>".indexOf(temp[i].singer[0].title_hilight) > 0) {
                temp[i].singer[0].title_hilight.replace(
                  "<em>",
                  "<span class='em'>"
                );
                temp[i].singer[0].title_hilight.replace("</em>", "</span>");
              }

              if ("<em>".indexOf(temp[i].album.title_hilight) > 0) {
                temp[i].album.title_hilight.replace(
                  "<em>",
                  "<span class='em'>"
                );
                temp[i].album.title_hilight.replace("</em>", "</span>");
              }
            }
            resolve();
          })
            .then(() => {
              console.log(temp);
              this.searchResults = temp;
            })
            .catch(re => {
              console.log(re);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    stext() {
      return this.$store.state.search.searchKey;
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
.sreach_info {
  margin: 0px 0 10px 30px;
}
.info_title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(90, 90, 90);
}
.resulet_type {
  width: calc(100% - 60px);
  /* border-bottom: 1px solid rgb(236, 236, 236); */
  /* padding-bottom: 10px; */
  margin: 20px 30px 0 30px;
}
.type_tab {
  font-size: 14px;
  margin-right: 40px;
  color: rgb(71, 71, 71);
  cursor: pointer;
  padding-bottom: 5px;
}
.act_tab {
  color: rgb(43, 43, 43);
  font-weight: bold;
  padding-left: 3px;
  padding-right: 5px;
  border-bottom: 2px solid pink;
}
.resulet_list_ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}
.res_list_th,
.res_list_item {
  display: flex;
  flex-direction: row;
}
.d_th {
  width: 180px;
  padding-left: 10px;
  /* margin-left: 20px; */
}

.d_th span {
  font-size: 12px;
  color: rgb(116, 116, 116);
}
.song_name {
  width: 50%;
}
.song_singer,
.song_album {
  width: 20%;
}
.song_time {
  width: 50px;
}

.res_list_item {
  margin: 5px 0;
  transition: all 0.2s linear;
  border-radius: 5px;
}
.res_list_item:hover {
  background: rgb(49, 122, 255);
}
.d_li {
  padding: 5px 0 8px 10px;
}
.d_li span {
  font-size: 12px;
  transition: all 0.1s linear;
  color: rgb(61, 61, 61);
}
.res_list_item:hover .d_li span {
  color: white;
}
.em {
  color: rgb(49, 122, 255);
}
</style>