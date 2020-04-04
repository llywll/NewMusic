<template>
  <div class="singerAlbumPage">
    <div class="singer_head_box" v-if="singerInfo">
      <div class="singer_img_box">
        <img
          class="singer_img"
          :src="'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+singerId+'.jpg?max_age=2592000'"
        />
      </div>
      <div class="singer_info_box">
        <div class="singer_name" v-if="singerInfo.basic">
          <span>{{singerInfo.basic.item[0].value}}</span>
        </div>
        <div class="singer_desc">
          <span>{{singerInfo.desc}}</span>
        </div>
      </div>
    </div>
    <ul class="singer_album_list" ref="album_list" v-if="singer_album_list">
      <li class="album_title_li">
        <span>专辑</span>
      </li>
      <li class="album_item" v-for="(item,index) in singer_album_list" :key="index">
        <div class="item_cover" :style="item.albumImg" @click="intoAlbumPage(item.album_mid)">
          <i class="im im-play"></i>
        </div>
        <div class="item_cover_after" :style="item.albumImg"></div>
        <div class="album_info">
          <span class="albums_title">{{item.album_name}}</span>
          <span class="albums_username">{{item.pub_time }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SingerAlbumPage",
  data() {
    return {
      singerId: "",
      singerInfo: [],
      singer_album_list: [],
      playing: {}
    };
  },
  watch: {
    $route() {
      if (this.$route.name == "SingerAlbumPage") {
        this.singerId = this.$route.params.singerId;
      }
    },
    singerId() {
      this.init(this.singerId);
    }
  },
  mounted() {
    this.singerId = this.$route.params.singerId;
    // this.init(this.singerId);
  },
  computed: {
    getPlaying() {
      return this.$store.state.playing.playing;
    }
  },
  methods: {
    init: function(singerId) {
      console.log("正在初始化,歌手参数是：", singerId);
      //获取歌手信息
      this.$http
        .get(`http://39.108.229.8:3300/singer/desc?singermid=${singerId}&raw=1`)
        .then(res => {
          this.singerInfo = res.data.result.data.info;
        });
      //获取歌手专辑
      this.$http
        .get(
          `http://39.108.229.8:3300/singer/album?singermid=${singerId}&raw=1`
        )
        .then(async res => {
          this.singer_album_list = res.data.singerAlbum.data.list;
          await this.singer_album_list.forEach(item => {
            item.albumImg = `background-image:url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000);`;
          });
          console.log(res.data.singerAlbum.data.list);
        })
        .catch(err => console.log(err));
    },
    playMusic: async function(mid) {
      let p_list = [];
      let smid = mid;
      let actIndex = -1;
      for (let i = 0; i < this.singer_hot_songs.length; i++) {
        if (this.singer_hot_songs[i].mid == smid) actIndex = i;
        await p_list.push({
          title: this.singer_hot_songs[i].title,
          singer: this.singer_hot_songs[i].singer[0].title,
          songMid: this.singer_hot_songs[i].mid,
          interval: this.singer_hot_songs[i].interval,
          albumMid: this.singer_hot_songs[i].album.id
        });
      }

      this.$store.commit("changeIsRadioState", {
        radioId: -1,
        isplay: false
      });
      this.$store.commit("replacePlayList", p_list);
      let tempList = p_list[actIndex];
      this.$store.dispatch("chageplayingStateAsync", {
        tempList: tempList,
        actIndex: actIndex
      });
    },
    intoAlbumPage(album_id) {
      this.$router.push(`/AlbumPage/${album_id}`);
    },

    intoMVPlayPage(vid) {
      this.$router.push(`/MVPlayPage/${vid}`);
    },
    changeSingerId(mid) {
      this.singerId = mid;
    },
    loadXML: function(xmlString) {
      //构建xmldoc对象
      let domParser = new DOMParser();
      let xmlDoc = domParser.parseFromString(xmlString, "text/xml");

      return xmlDoc;
    }
  }
};
</script>
<style scoped>
.singerAlbumPage {
  margin-top: 80px;
  /* margin-left: 30px; */
  overflow-y: auto;
  height: 78vh;
}
.singer_head_box {
  margin-left: 30px;
  display: flex;
}
.singer_img {
  border-radius: 50%;
  width: 200px;
}
.singer_info_box {
  margin: 0 50px 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.singer_name span {
  font-size: 26px;
  /* font-weight: lighter; */
}
.singer_desc {
  margin: 10px 0;
}
.singer_desc span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 14px;
}
.singer_func_btns {
  display: flex;
  margin-top: 20px;
}
.sfc_btn {
  padding: 6px 15px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.349);
  margin-right: 30px;
  background: none;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
}

.sfc_btn .im {
  font-size: 12px;
  margin-right: 5px;
}
.play_hot_song {
  border: 0;
  background: rgb(19, 118, 255);
  color: white;
}
.singer_hot_songs_box {
  margin-top: 45px;
  margin-left: 30px;
}
.hot_song_title {
  font-size: 26px;
}
.song_list {
  padding: 0;
  margin-left: 30px;
  margin-right: 50px;
  /* height: 41vh; */
}
.songlist_item,
.songlist_item_th {
  display: flex;
  padding: 10px 0;
  align-items: baseline;
  justify-content: space-between;
}
.songlist_item {
  transition: all 0.1s ease-in-out;
  border-radius: 8px;
  padding: 10px 10px;
}

.isplay {
  border-left: 5px solid rgb(49, 122, 255);
  border-top-left-radius: unset;
  border-bottom-left-radius: unset;
}
.songlist_item_th .song_index {
  margin-right: 35px;
}
.songlist_item_th span {
  color: rgb(119, 119, 119);
  font-size: 12px;
}
.songlist_item_th .song_time {
  position: relative;
  left: -15px;
}

.songlist_item_th .song_album {
  position: relative;
  left: -5px;
}
.songlist_item a {
  cursor: pointer;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
.song_index {
  text-align: right;
  width: 5px;
  font-size: 14px;
  margin-right: 25px;
  color: rgb(119, 119, 119);
  transition: all 0.1s ease-in-out;
}
.song_time {
  font-size: 14px;
  color: rgb(119, 119, 119);
  width: 40px;
  text-align: center;
  transition: all 0.1s ease-in-out;
}
.song_Name {
  width: 50%;
}
.song_album {
  width: 49%;
}
.songlist_item:hover {
  background-color: rgb(49, 122, 255);
}
.songlist_item:hover a,
.songlist_item:hover span,
.songlist_item:hover .song_index {
  color: white;
}

/****** */
.singer_album_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  transition: all 0.5s ease-out;
  margin-left: 30px;
  margin-top: 30px;
}
.album_title_li {
  width: 100%;
  margin-bottom: 20px;
  font-size: 24px;
}
.album_item {
  margin-right: 25px;
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

.album_info {
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
  width: 130px;
  color: rgb(43, 43, 43);
}
.albums_username {
  font-size: 10px;
  margin-top: 3px;
  color: rgb(158, 158, 158);
}
</style>