<template>
  <div class="playViewListBox">
    <div id="bbox" @click.stop class="song_list_box">
      <div class="title_and_cont">
        <div class="list_info">
          <span>播放列表</span>
          <span v-if="playList.length==0">暂无歌曲哦</span>
          <span v-else>共{{ playList.length }}首歌</span>
        </div>

        <div class="list_con">
          <button class="intoBtn">
            <i class="im im-plus"></i>
            添加到
          </button>
          <button class="removeBtn" @click="removeAllSongs">
            <i class="im im-trash-can"></i>清空
          </button>
        </div>
      </div>
      <div class="song_list">
        <ul class="songs_ul" ref="songs">
          <li
            :class="index==playListIndex?'song_item act_item': 'song_item'"
            v-for="(item,index) in playList"
            :key="index"
            @click="playSong(index)"
          >
            <div class="album_img_box" :data-song-id="item.songMid">
              <img :src="item.url" />
            </div>
            <div class="song_name">
              <span>{{ item.title }}</span>
              <span>{{ item.singer }}</span>
            </div>
            <span class="song_time">{{comtime(item.interval)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "playList",
  data() {
    return {};
  },
  computed: {
    playListIndex() {
      return this.$store.state.playList.playListIndex;
    },
    playList() {
      let tempList = this.$store.state.playList.playList;
      for (let i = 0; i < Object.keys(tempList).length; i++) {
        tempList[i].url = this.toUrl(tempList[i].albumMid);
      }
      return tempList;
    }
  },
  methods: {
    playSong: function(index) {
      this.$store.dispatch("chageplayingStateAsync", {
        p_ing: this.$store.state.playList.playList[index],
        actIndex: index
      });
    },
    toUrl: function(albumId) {
      if ((albumId === undefined) | isNaN(albumId) | (albumId == "0"))
        return "";
      return (
        "http://imgcache.qq.com/music/photo/album_300/" +
        (albumId % 100) +
        "/300_albumpic_" +
        albumId +
        "_0.jpg"
      );
    },

    comtime: function(stime) {
      if (stime % 60 < 10) return parseInt(stime / 60) + ":0" + (stime % 60);
      return parseInt(stime / 60) + ":" + (stime % 60);
    },
    removeAllSongs(){
       this.$store.dispatch("chageplayingStateAsync", {
        p_ing: null,
        actIndex: null
      });
    }
  }
};
</script>
<style scoped>
.playViewListBox {
  position: absolute;
  right: 10px;
  bottom: 20px;
  height: 100vh;
}
.song_list_box {
  background: white;
  width: 330px;
  position: absolute;
  right: 0;
  bottom: 0;
  height: calc(80% - 50px);
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 1px 0px 20px 0px #00000042;
}
.title_and_cont {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin: 10px;
}
.list_info {
  display: flex;
  flex-direction: column;
}
.list_info span:first-child {
  color: rgb(44, 44, 44);
  font-size: 24px;
}
.list_info span:last-child {
  color: rgb(44, 44, 44);
  font-size: 14px;
  margin-top: 2px;
}
.list_con {
  display: flex;
  flex-direction: row;
}
.list_con button {
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(44, 44, 44);
  transition: all 0.1s linear;
}
.list_con button .im {
  font-size: 10px;
  margin: 1px 2px 0px 2px;
  color: rgb(44, 44, 44);
  transition: all 0.1s linear;
}
.list_con button:hover .im,
.list_con button:hover {
  color: rgb(49, 112, 255);
}

.song_list {
  overflow: hidden;
  overflow-y: auto;
  height: calc(100% - 80px);
}
.songs_ul {
  padding: 0;
  list-style: none;
}
.song_item {
  /* border-radius: 5px; */
  cursor: pointer;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  transition: all 0.1s linear;
}
.song_item:hover {
  background-color: rgb(49, 122, 255);
}
.act_item {
  border-left: 2px solid rgb(49, 122, 255);
}
.act_item span {
  color: rgb(49, 122, 255);
}
.song_item:hover span {
  color: white;
}
.album_img_box img {
  width: 35px;
  border-radius: 3px;
}
.song_name {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  width: 80%;
}
.song_name span,
.song_time {
  font-size: 12px;
  transition: all 0.1s linear;
}
.song_time {
  align-self: flex-end;
  margin: 5px 0;
}
.off_box {
  display: none;
}
</style>