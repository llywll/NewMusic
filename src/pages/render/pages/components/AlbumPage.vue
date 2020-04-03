<template>
  <div class="AlbumPage">
    <div class="album_head_box">
      <div class="album_img_box" v-if="album_info">
        <img class="album_img" :src="album_info.picUrl" />
        <img class="def_img_bg" src="../../assets/album_cover.png" />
        <div class="alubm_num">
          <span>此专辑共有{{album_song_num}}首歌曲</span>
        </div>
        <div class="album_desc">
          <span class="desc_title">简介</span>
          <span class="desc_context">{{ album_info.desc}}</span>
        </div>
      </div>
      <div class="album_info_box" v-if="album_info">
        <div class="album_title">
          <span>{{album_info.name}}</span>
        </div>
        <div class="album_singer_name" v-for="(albumItem,index) in album_info.ar" :key="index">
          <a @click="intoSingerPage(albumItem.mid)">
            <i class="im im-user-settings"></i>
            <span>{{ albumItem.name }}</span>
          </a>
          <span v-if="index==album_info.ar.length-1"></span>
          <span v-else>/</span>
        </div>
        <div class="album_publishTime">
          <span>发行时间：{{ album_info.publishTime}}</span>
        </div>
        <div class="album_company">
          <span>唱片公司：{{ album_info.company}}</span>
        </div>
        <div class="album_func_btns">
          <button
            class="func_btn play_all_song"
            @click="playMusic(album_song_list[0].songInfo.mid)"
          >
            <i class="im im-play"></i>
            <span>播放全部</span>
          </button>
          <button class="func_btn sc_all_song">
            <i class="im im-heart"></i>
            <span>收藏</span>
          </button>
          <button class="func_btn more_func">
            <i class="im im-menu-dot-h"></i>
            <span>更多</span>
          </button>
        </div>
      </div>
    </div>
    <div class="album_song_list_box">
      <ul class="s_list_ul" v-if="Object.keys(album_song_list).length>0">
        <li class="s_list_item s_th">
          <div class="song_index"></div>
          <div class="song_name">
            <span>歌曲</span>
          </div>
          <div class="song_singer">
            <span>艺人</span>
          </div>
          <div class="song_time">
            <span>时长</span>
          </div>
        </li>
        <li
          class="s_list_item s_td"
          v-for="(item,index) in album_song_list"
          :key="index"
          :class="getPlaying.songMid == item.songInfo.mid?'s_list_item s_td isplay':'s_list_item s_td'"
        >
          <div class="song_index">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="song_name">
            <span @click="playMusic(item.songInfo.mid)">{{item.songInfo.title}}</span>
          </div>
          <div class="song_singer">
            <div v-for="(al_singer,al_index) in item.songInfo.singer" :key="al_index">
              <a @click="intoSingerPage(al_singer.mid)">{{ al_singer.title }}</a>
              <span v-if="al_index== item.songInfo.singer.length-1"></span>
              <span v-else>/</span>
            </div>
          </div>
          <div class="song_time">
            <span
              v-if="item.songInfo.interval % 60 < 10"
            >0{{parseInt(item.songInfo.interval / 60)}}:0{{item.songInfo.interval % 60}}</span>
            <span v-else>0{{parseInt(item.songInfo.interval / 60)}}:{{item.songInfo.interval % 60}}</span>
          </div>
        </li>
      </ul>
      <ul class="s_list_ul" v-else>
        <li class="s_list_item s_th">
          <div class="song_index"></div>
          <div class="song_name">
            <span>歌曲</span>
          </div>
          <div class="song_singer">
            <span>艺人</span>
          </div>
          <div class="song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="s_list_item s_td null_td">
          <img class="tip_ani" src="./../../assets/blank.gif" />
          <div class="null_tip_box">
            <span class="null_title">啊哦，空空如也！</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumPage",
  data() {
    return {
      album_id: "",
      album_info: {},
      album_song_list: [],
      album_song_num: -1
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      console.log(this.$route);
      if (this.$route.name == "AlbumPage") this.init();
    }
  },
  computed: {
    getPlaying() {
      return this.$store.state.playing.playing;
    }
  },
  methods: {
    init: function() {
      this.album_id = this.$route.params.album_id;
      this.$http
        .get(`http://39.108.229.8:3300/album?albummid=${this.album_id}&raw=1`)
        .then(res => {
          console.log(res);
          this.album_info = res.data.data;
        })
        .catch(err => console.log(err));
      this.$http
        .get(
          `http://39.108.229.8:3300/album/songs?albummid=${this.album_id}&raw=1`
        )
        .then(res => {
          console.log(res);
          this.album_song_num = res.data.albumSonglist.data.totalNum;
          this.album_song_list = res.data.albumSonglist.data.songList;
        })
        .catch(err => console.log(err));
    },
    playMusic: async function(mid) {
      let p_list = [];
      let smid = mid;
      let actIndex = -1;
      for (let i = 0; i < this.album_song_list.length; i++) {
        if (this.album_song_list[i].songInfo.mid == smid) actIndex = i;
        await p_list.push({
          title: this.album_song_list[i].songInfo.title,
          singer: this.album_song_list[i].songInfo.singer[0].title,
          songMid: this.album_song_list[i].songInfo.mid,
          interval: this.album_song_list[i].songInfo.interval,
          albumMid: this.album_song_list[i].songInfo.album.id
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
    intoSingerPage(singer_id) {
      this.$router.push(`/SingerInfoPage/${singer_id}`);
    }
  }
};
</script>

<style scoped>
.AlbumPage {
  margin-top: 100px;
  margin-left: 30px;
  height: 76vh;
  position: relative;
  overflow-y: auto;
}
.album_head_box {
  display: flex;
}
.album_img_box {
  position: relative;
}
.album_img {
  height: 250px;
  border: 1px solid rgba(0, 0, 0, 0.137);
  /* border-radius: 5px; */
}
.def_img_bg {
  height: 250px;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  box-shadow: -20px 0 20px -10px rgba(0, 0, 0, 0.411);
}
.album_info_box {
  margin-left: 50px;
  height: 250px;
}
.alubm_num {
  font-size: 12px;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.685);
}
.album_title {
  font-size: 26px;
}
.album_singer_name {
  font-size: 12px;
  margin: 10px 0;
}
.album_singer_name a {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s linear;
}
.album_singer_name a:hover {
  color: rgb(49, 115, 225);
}
.album_singer_name .im {
  font-size: 12px;
  margin: 0 5px;
}
.album_desc {
  border-top: 1px solid rgba(0, 0, 0, 0.192);
  margin-top: 15px;
  width: 250px;
  display: flex;
  flex-direction: column;
}
.desc_title {
  font-size: 22px;
  margin: 10px 0;
}
.desc_context {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  font-size: 14px;
}
.album_publishTime,
.album_company {
  font-size: 12px;
  margin: 10px;
  margin-left: 0;
}
.album_func_btns {
  display: flex;
  margin-top: 100px;
}
.func_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  width: 130px;
  padding: 5px 0;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.418);
  background: none;
  cursor: pointer;
  outline: none;
}
.func_btn .im {
  font-size: 16px;
  margin: 0 5px;
  padding: 3px;
  padding-left: 0;
  position: relative;
  top: 1px;
}
.func_btn span {
  font-size: 14px;
}
.play_all_song {
  background: rgb(49, 115, 225);
  border: 0;
}
.play_all_song .im,
.play_all_song span {
  color: white;
}

/*** */

.album_song_list_box {
  width: calc(100% - 250px);
  position: absolute;
  right: 0;
  top: 249px;
}
.s_list_ul {
  list-style: none;
  margin-right: 50px;
  padding-left: 20px;
  height: 38vh;
}
.s_list_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.s_th {
  border-top: 1px solid rgba(0, 0, 0, 0.055);
  border-bottom: 1px solid rgba(0, 0, 0, 0.116);
  padding: 5px 0;
  transition: all 0.2s linear;
}
.s_td {
  padding: 10px 0;
  transition: background 0.1s linear;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.116);
}

.s_td:hover {
  background: rgb(49, 112, 255);
  border-radius: 5px;
}
.s_td:hover span,
.s_td:hover a {
  color: white;
}
.song_index span {
  position: relative;
  top: 2px;
}
.s_list_item .song_index {
  width: 10px;
  font-size: 14px;
}
.s_list_item span {
  font-size: 12px;
  color: rgb(107, 107, 107);
  transition: all 0.1s linear;
}
.s_list_item .song_name {
  width: 50%;
  cursor: pointer;
}
.s_td .song_name span {
  color: black;
}
.s_td:hover .song_name span {
  color: white;
}
.s_list_item .song_singer,
.s_list_item .song_album {
  width: 20%;
}
.song_singer {
  display: flex;
}
.song_singer a {
  transition: all 0.1s linear;
  color: black;
  font-size: 12px;
  cursor: pointer;
}
.null_td {
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.null_td:hover {
  background: unset;
}
.null_td:hover span {
  color: unset;
}
.tip_ani {
  margin-top: 150px;
  width: 200px;
  pointer-events: none;
}
.null_tip_box {
  /* margin-top: 350px; */
}
.null_td span {
  font-size: 14px;
}
.isplay {
  border-left: 5px solid rgb(49, 122, 255);
  border-top-left-radius: unset;
  border-bottom-left-radius: unset;
}
</style>