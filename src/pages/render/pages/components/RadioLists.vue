<template>
  <div id="RadioLists">
    <div class="radio_list_box">
      <ul
        class="radio_songList"
        ref="radio_list"
        v-for="(r_list,r_index) in radioList"
        :key="r_index"
      >
        <li class="redio_type_title_li">
          <span>{{ r_list.name }}</span>
        </li>
        <li
          class="radioList_item"
          v-for="(item,index) in r_list.radioList"
          :key="index"
          v-show="item.radioId != 99"
        >
          <div
            class="item_cover"
            :data-album-id="item.radioId"
            :style="item.radioImg"
            @click="playRadio(item.radioId)"
          >
            <i class="im im-play"></i>
          </div>
          <div class="item_cover_after" :style="item.radioImg"></div>
          <div class="radio_info">
            <span class="albums_title">{{item.radioName}}</span>
            <span class="albums_username">播放量：{{item.listenNum /10000 }} 万</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "RadioLists",
  data() {
    return {
      radioList: []
    };
  },
  mounted() {
    this.$http
      .get(`http://39.108.229.8:3200/getRadioLists`)
      .then(res => {
        this.radioList = res.data.response.data.data.groupList;
        this.radioList.forEach((item, index) => {
          item.radioList.forEach((r_item, r_index) => {
            this.radioList[index].radioList[
              r_index
            ].radioImg = `background-image: url(${r_item.radioImg})`;
          });
        });
        console.log(this.radioList);
      })
      .catch(err => console.log(err));
  },
  methods: {
    playRadio: function(radioId) {
      this.$http
        .get(`http://39.108.229.8:3300/radio?id=${radioId}&raw=1`)
        .then(res => {
          console.log(res.data.songlist.data.tracks);
          let p_list = [];
          let actIndex = 0;
          for (let i = 0; i < res.data.songlist.data.tracks.length; i++) {
            p_list.push({
              title: res.data.songlist.data.tracks[i].title,
              singer: res.data.songlist.data.tracks[i].singer[0].title,
              songMid: res.data.songlist.data.tracks[i].mid,
              interval: res.data.songlist.data.tracks[i].interval,
              albumMid: res.data.songlist.data.tracks[i].album.id
            });
          }
          this.$MainWinodw.send("upPlayPapel")
          this.$store.commit("changeIsRadioState", {
            radioId: radioId,
            isplay: true
          });
          this.$store.commit("replacePlayList", p_list);
          let tempList = p_list[actIndex];
          this.$store.dispatch("chageplayingStateAsync", {
            p_ing: tempList,
            actIndex: actIndex
          });
        })
        .catch(err => console.log(err));
      //  let p_list = [];
      // let smid = mid;
      // let actIndex = -1;
      // for (let i = 0; i < this.album_song_list.length; i++) {
      //   if (this.album_song_list[i].songInfo.mid == smid) actIndex = i;
      //   await p_list.push({
      //     title: this.album_song_list[i].songInfo.title,
      //     singer: this.album_song_list[i].songInfo.singer[0].title,
      //     songMid: this.album_song_list[i].songInfo.mid,
      //     interval: this.album_song_list[i].songInfo.interval,
      //     albumMid: this.album_song_list[i].songInfo.album.id
      //   });
      // }
      // this.$store.commit("replacePlayList", p_list);
      // let p_ing = p_list[actIndex];
      // this.$store.dispatch("chageplayingStateAsync", {
      //   p_ing: p_ing,
      //   actIndex: actIndex
      // });
    }
  }
};
</script>
<style scoped>
#RadioLists {
  margin-top: 80px;
  overflow-y: auto;
  overflow-x: hidden;
}
.radio_list_box {
  height: 78vh;
}
.radio_songList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  transition: all 0.5s ease-out;
  margin-left: 30px;
}
.redio_type_title_li {
  width: 100%;
  margin-bottom: 20px;
  font-size: 24px;
}
.radioList_item {
  margin-right: 28px;
  margin-bottom: 30px;
  position: relative;
}

.item_cover {
  background-size: cover;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
}

.item_cover_after {
  content: "";
  pointer-events: none;
  position: absolute;
  content: "";
  top: 15%;
  left: 5%;
  background-size: cover;
  width: 130px;
  height: 130px;
  transform: scale(1.25);
  filter: blur(15px) brightness(100%) opacity(0.4);
  z-index: -1;
}

.item_cover .im {
  position: absolute;
  bottom: 2px;
  right: 2px;
  color: white;
  opacity: 0;
  pointer-events: none;
}

.item_cover:hover {
  transform: scale(1.05);
}

.radio_info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  /* justify-content: space-between; */
  height: 50px;
}

.albums_title {
  font-weight: bold;
  font-size: 12px;
  color: rgb(43, 43, 43);
}

.albums_username {
  font-size: 10px;
  margin-top: 3px;
  color: rgb(158, 158, 158);
}
</style>