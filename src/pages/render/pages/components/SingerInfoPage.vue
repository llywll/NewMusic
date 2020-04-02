<template>
  <div class="singerInfoPage">
    <div class="singer_head_box">
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
        <div class="singer_func_btns">
          <button class="sfc_btn play_hot_song">
            <i class="im im-play"></i>
            <span>播放歌手热门歌曲</span>
          </button>
          <button class="sfc_btn">
            <i class="im im-plus"></i>
            <span>收藏歌手热门歌曲</span>
          </button>
        </div>
      </div>
    </div>
    <div class="singer_hot_songs_box">
      <span class="hot_song_title">热门歌曲</span>
    </div>
    <ul class="song_list" ref="singer_hot_song_list">
      <li class="songlist_item_th">
        <div class="song_index"></div>
        <div class="song_Name">
          <span>歌名</span>
        </div>
        <div class="song_album">
          <span>专辑</span>
        </div>
        <div class="song_time">
          <span>时长</span>
        </div>
      </li>
      <li class="songlist_item" v-for="(songlist,index) in singer_hot_songs" :key="index">
        <div class="song_index">{{index + 1}}.</div>
        <div class="song_Name" @click="playMusic($event)">
          <a :data-song-id="songlist.mid">{{songlist.title}}</a>
        </div>
        <div class="song_album">
          <a @click="intoAlbumPage(songlist.album.mid)">{{songlist.album.title}}</a>
        </div>
        <div class="song_time">
          <span
            v-if="songlist.interval % 60 < 10"
          >0{{parseInt(songlist.interval / 60)}}:0{{songlist.interval % 60}}</span>
          <span v-else>0{{parseInt(songlist.interval / 60)}}:{{songlist.interval % 60}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SingerInfoPage",
  data() {
    return {
      singerId: "",
      singerInfo: [],
      singer_hot_songs: []
    };
  },
  watch: {
    $route() {
      if (this.$route.name == "SingerInfoPage") this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.singerId = this.$route.params.singerId;
      this.$http
        .get(
          `http://39.108.229.8:3300/singer/desc?singermid=${this.singerId}&raw=1`
        )
        .then(res => {
          this.singerInfo = res.data.result.data.info;
        });
      this.$http
        .get(
          `http://39.108.229.8:3300/singer/songs?singermid=${this.singerId}&raw=1`
        )
        .then(res => {
          this.singer_hot_songs = res.data.singer.data.songlist;
          console.log(this.singer_hot_songs);
        })
        .catch(err => console.log(err));
    },
    playMusic: async function(el) {
      let p_list = [];
      let smid = el.target.attributes["data-song-id"].value;
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
.singerInfoPage {
  margin-top: 80px;
  margin-left: 30px;
  overflow-y: auto;
}
.singer_head_box {
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
}
.hot_song_title {
  font-size: 26px;
}
.song_list {
  padding: 0;
  margin-right: 50px;
  height: 41vh;
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
</style>