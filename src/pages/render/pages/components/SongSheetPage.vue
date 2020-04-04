<template>
  <div class="SongSheetPage">
    <div class="loading_Box" ref="loading_Box" v-show="isloading_Box">
      <loading></loading>
    </div>
    <div class="bg_text" v-if="cdlist">
      <span v-html="cdlist.dissname"></span>
    </div>
    <div class="album_info" v-if="cdlist">
      <div class="album_name">
        <span v-html="cdlist.dissname"></span>
      </div>
      <div class="album_author"></div>
      <div class="album_desc">
        <p v-html="cdlist.desc"></p>
      </div>
    </div>
    <div class="song_list_box" v-if="cdlist">
      <ul class="song_list" ref="songList">
        <li class="songlist_item_th">
          <div class="song_index"></div>
          <div class="song_Name">
            <span>歌名</span>
          </div>
          <div class="song_songer">
            <span>歌手</span>
          </div>
          <div class="song_album">
            <span>专辑</span>
          </div>
          <div class="song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="songlist_item" v-for="(songlist,index) in cdlist.songlist" :key="index">
          <div class="song_index">{{index + 1}}.</div>
          <div class="song_Name" @click="playMusic($event)">
            <a  @click="playMusic(songlist.mid)">{{songlist.title}}</a>
            <i class="im_mv"
             @click="intoMVPlayPage(songlist.mv.vid)" v-if="songlist.mv.id !=0"></i>
          </div>
          <div class="song_songer">
            <a
              v-for="(s_singer,index) in songlist.singer"
              :key="index"
              @click="intoSingerPage(s_singer.mid)"
            >
              <span>{{s_singer.title}}</span>
              <label v-if="index==songlist.singer.length - 1"></label>
              <label v-else>/</label>
            </a>
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
  </div>
</template>
<script>
import loading from "./../loading";
export default {
  name: "SongSheetPage",
  data: function() {
    return {
      sheet_id: "",
      cdlist: [],
      isloading_Box: true
    };
  },
  components: {
    loading
  },
  watch: {
    $route() {
      this.init();
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.sheet_id = this.$route.params.sheet_id;
      if (
        this.sheet_id !== undefined &&
        this.sheet_id != null &&
        this.sheet_id != ""
      ) {
        this.$http
          .get(
            "http://39.108.229.8:3200/getSongListDetail?disstid=" +
              this.sheet_id
          )
          .then(response => {
            this.cdlist = response.data.response.cdlist[0];
            this.isloading_Box = false;
            console.log(this.cdlist);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    playMusic: async function(el) {
      let p_list = [];
      let smid = el.target.attributes["data-song-id"].value;
      let actIndex = -1;
      for (let i = 0; i < this.cdlist.songlist.length; i++) {
        if (this.cdlist.songlist[i].mid == smid) actIndex = i;
        await p_list.push({
          title: this.cdlist.songlist[i].title,
          singer: this.cdlist.songlist[i].singer[0].title,
          songMid: this.cdlist.songlist[i].mid,
          interval: this.cdlist.songlist[i].interval,
          albumMid: this.cdlist.songlist[i].album.id
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
    intoSingerPage(mid) {
      this.$router.push(`/SingerInfoPage/${mid}`);
    },
    intoAlbumPage(mid) {
      this.$router.push(`/AlbumPage/${mid}`);
    },
     intoMVPlayPage(vid) {
      this.$router.push(`/MVPlayPage/${vid}`);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "PageContent") {
      to.meta.keepAlive = true;
      this.isloading_Box = true;
      this.cdlist = [];
    }
    next();
  }
};
</script>
<style scoped>
.SongSheetPage {
  width: 100%;
  height: calc(100% - 160px);
  position: relative;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
}
.bg_text {
  position: absolute;
  left: -10%;
  z-index: -1;
  top: 12%;
  width: 1000%;
}
.bg_text span {
  font-family: "宋体-简";
  font-size: 172px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.01);
}
.loading_Box {
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  font-size: 72px;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.overloading_Box {
  animation: overloading_BoxAni 0.2s linear forwards;
}
@keyframes overloading_BoxAni {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
    height: 0;
  }
}
.album_info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album_name span {
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 3px;
  position: relative;
}
.album_name {
  position: relative;
}
.album_author {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.album_author .im {
  font-size: 14px;
  margin: 0 5px;
}
.album_author a {
  color: #414141;
  mix-blend-mode: exclusion;
  cursor: pointer;
}
.album_desc {
  width: 700px;
  margin-top: 20px;
  letter-spacing: 3px;
  text-indent: 2em;
  text-align: center;
  line-height: 1.5em;
}
.album_page_backfround {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
.album_image {
  width: 700px;
}
.song_list_box {
  padding-top: 40px;
  width: 700px;
  height: 400px;
}
.song_list {
  list-style: none;
  padding-left: 20px;
}
.songlist_item,
.songlist_item_th {
  display: flex;
  padding: 10px 0;
  /* background: white; */
  align-items: baseline;
}
.songlist_item {
  transition: all 0.1s ease-in-out;
  border-radius: 8px;
  padding: 10px 10px;
}
.songlist_item_th .song_index {
  margin-right: 36px;
}
.songlist_item_th span {
  color: rgb(119, 119, 119);
  font-size: 12px;
}
.songlist_item a {
  cursor: pointer;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
.song_index {
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
  width: 200px;
}
.song_songer {
  width: 200px;
}
.song_album {
  width: 200px;
}
.songlist_item:hover {
  background-color: rgb(49, 122, 255);
}
.songlist_item:hover a,
.songlist_item:hover span,
.songlist_item:hover .song_index {
  color: white;
}

.im_mv {
  background-image: url("./../../assets/icon_sprite.png");
  display: inline-block;
  width: 33px;
  height: 16px;
  background-position: -40px -280px;
  vertical-align: middle;
  margin-right: 6px;
  margin-left: 6px;
  cursor: pointer;
}
</style>