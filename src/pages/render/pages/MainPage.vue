<template>
  <div id="content">
    <nav :class="sidebar_a" ref="siderbar_a">
      <div id="menu_backgroud">
        <span class="list_title s1_title">懂你</span>
        <ul class="s_menu" id="top_nav">
          <li class="s1_li li_activity" @click="topage('PageContent')">
            精选
            <span>为你准备</span>
          </li>
          <li class="s1_li">
            排行
            <span>今日榜单</span>
          </li>
          <li class="s1_li">
            歌单
            <span>歌单广场</span>
          </li>
          <li class="s1_li">
            电台
            <span>在线FM</span>
          </li>
        </ul>
        <span class="list_title s2_title">我的音乐</span>
        <ul class="s_menu" id="song_nav">
          <li class="s2_li">
            <i class="im im-heart"></i>
            <span>我喜欢</span>
          </li>
          <li class="s2_li">
            <i class="im im-monitor-o"></i>
            <span>本地歌曲</span>
          </li>
          <li class="s2_li">
            <i class="im im-download"></i>
            <span>下载歌曲</span>
          </li>
          <li class="s2_li">
            <i class="im im-history"></i>
            <span>播放历史</span>
          </li>
        </ul>
        <span class="list_title s2_title">创建的歌单</span>
        <ul class="s_menu" id="song_nav">
          <li class="s3_li">
            <span>精品冷门 | 牵动神经的电子</span>
          </li>
          <li class="s3_li">
            <span>Riot Grrrl | 女性变革呐喊</span>
          </li>
          <li class="s3_li">
            <span>日式活力 嘟嘟</span>
          </li>
          <li class="s3_li">
            <span>精品冷门 | 牵动神经的电子</span>
          </li>
          <li class="s3_li">
            <span>Riot Grrrl | 女性变革呐喊</span>
          </li>
          <li class="s3_li">
            <button id="createSongList_btn">
              <i class="im im-plus"></i>
              <span>创建新的歌单</span>
            </button>
          </li>
        </ul>
      </div>

      <div :class="cover_box" ref="cover_box" @animationend="full_down()">
        <div class="albumCover" @click="intoPlayPage()" :style="coverImgUrl"></div>
        <div class="albumCover_sub" :style="coverImgUrl"></div>
      </div>
      <div :class="play_page">
        <div class="mubu" @click="downplay()"></div>
        <div class="song_play_page">
          <div class="downPage" @click="downplay()">
            <i class="im im-angle-down"></i>
          </div>
          <div class="lyric_area_box">
            <div class="top_zz"></div>
            <ul class="lyric_lines" id="lyric_lines" ref="lyricbox">
              <li
                class="lyric_line"
                v-for="(lyricLine,index) in lyric"
                :key="index"
                v-html="lyricLine.text"
              ></li>
            </ul>
            <div class="bottom_zz"></div>
          </div>
        </div>
      </div>
    </nav>
    <main id="right_mainContent">
      <p_header></p_header>
      <keep-alive :max="10">
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
      <playBar></playBar>
    </main>
  </div>
</template>
<script>
import p_header from "./components/PageHeader.vue";
import playBar from "./components/PlayBar.vue";
export default {
  components: {
    p_header,
    playBar
  },
  name: "MainPage",
  data: function() {
    return {
      cover_box: "cover_box",
      play_page: "play_page ",
      sidebar_a: "sidebar_a",
      songInfo: "songInfo",
      inPLaySongId: ""
    };
  },
  mounted: function() {},
  methods: {
    topage: function(page) {
      this.$router.push("/" + page);
    },

    intoPlayPage: function() {
      this.$store.commit("chageRement");
      this.$store.commit("openPlayPage");
      if (this.$store.state.state.isThePlaybackPageAlreadyOpen) {
        this.$data.cover_box = "cover_box act_cover_box";
        this.$data.play_page = "play_page start_play_page";
        this.$data.sidebar_a = "sidebar_a act_Sidebar";
      }
    },
    removeClick: function() {},
    downplay: function() {
      this.$store.commit("closePlayPage");
      if (!this.$store.state.state.isThePlaybackPageAlreadyOpen) {
        this.$data.cover_box = "cover_box over_clover";
        this.$data.play_page = "play_page over_play_page";
      }
    },
    full_down: function() {
      if (this.$data.cover_box == "cover_box over_clover") {
        this.$data.sidebar_a = "sidebar_a";
      }
    }
  },
  computed: {
    isThePlaybackPageAlreadyOpen() {
      return this.$store.state.state.isThePlaybackPageAlreadyOpen;
    },
    coverImgUrl() {
      if (
        (this.$store.state.playing.playing.albumMid === undefined) |
        isNaN(this.$store.state.playing.playing.albumMid) |
        (this.$store.state.playing.playing.albumMid == "0")
      ) {
        return "";
      }
      return (
        "background-image: url(http://imgcache.qq.com/music/photo/album_300/" +
        (this.$store.state.playing.playing.albumMid % 100) +
        "/300_albumpic_" +
        this.$store.state.playing.playing.albumMid +
        "_0.jpg)"
      );
    },
    lyric() {
      return this.$store.state.playing.playing.lyric == undefined
        ? "新音乐，聆听生活"
        : this.$store.state.playing.playing.lyric;
    }
  },

  beforeRouteLeave(to, from, next) {
    if (to.name === "PageContent") {
      to.meta.keepAlive = true;
    }
    next();
  }
};
</script>
<style scoped>
#content {
  /*主要窗口*/
  display: flex;
  flex-direction: row;
  height: 100%;
}
.sidebar_a {
  /*左边栏*/
  background-image: url(../assets/IMG_0285.jpg);
  background-size: contain;
  width: 240px;
  position: relative;
  overflow: hidden;
  transition: overflow 0.1s 0.3s linear;
}
#menu_backgroud {
  /**左边栏背景 */
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(25px);
}
.s_menu {
  /**列表共用 */
  margin: 12px 0;
  list-style: none;
  padding-left: 16px;
}
#top_nav {
  /**顶部列表 */
  display: flex;
  flex-direction: row;
}
.list_title {
  /**列表标题 */
  display: block;
  padding-left: 25px;
  margin-top: 15px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.582);
}
.s1_title {
  margin-top: 25px;
}
.s1_li {
  /*顶部列表**/
  background: white;
  color: rgb(138, 138, 138);
  padding: 5px 9px;
  border-radius: 5px;
  margin: 0 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.s1_li span {
  /***li内文字 */
  font-size: 8px;
}
.li_activity,
.s1_li:hover {
  /***活动的li选项 */
  color: white;
  background-color: rgb(49, 112, 255);
  box-shadow: -4px 6px 20px 0px rgba(0, 0, 0, 0.26);
}
.s2_title {
  /**中间标题 */
  padding-top: 14px;
}
.s2_li {
  /***发现音乐列表 */
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding-left: 7px;
}

.s2_li i {
  color: rgb(177, 177, 177);
  font-size: 12px;
}
.s2_li span {
  font-size: 12px;
  margin: 0 13px;
  color: rgb(58, 57, 57);
}
.s3_li {
  display: flex;
  align-items: center;
  margin: 12px 0;
  padding-left: 9px;
}
.s3_li span {
  font-size: 12px;
  color: rgb(58, 57, 57);
}
#createSongList_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 0;
  background-color: rgba(139, 147, 186, 0.9);
  margin-top: 10px;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
}
#createSongList_btn i {
  color: white;
  font-size: 10px;
  padding-right: 5px;
  position: relative;
  top: 1.3px;
}
#createSongList_btn span {
  color: white;
  font-size: 12px;
}
.cover_box {
  position: absolute;
  overflow: visible;
  bottom: 0;
  left: 0;
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s 0.1s linear;
}
.albumCover {
  width: 220px;
  height: 220px;
  border-radius: 5px;
  cursor: pointer;
  background-image: url(../assets/fin.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.2s 0.1s linear;
  z-index: 16;
  position: relative;
}
.albumCover_sub {
  transition: all 0.2s 0.1s linear;
  position: absolute;
  content: "";
  top: 10%;
  left: 0%;
  width: 220px;
  height: 220px;
  background: url(../assets/fin.jpg) no-repeat;
  background-size: 100% 100%;
  transform: scale(1.25);
  filter: blur(25px) brightness(80%) opacity(0.8);
  z-index: 15;
}
.albumCover:hover {
  transform: scale(1.05);
}

.act_Sidebar {
  overflow: unset;
}
.act_cover_box {
  animation: cover_box_anime 0.4s ease-in-out forwards;
}
@keyframes cover_box_anime {
  0% {
    width: 240px;
    height: 240px;
    bottom: 0;
  }
  100% {
    width: 400px;
    height: 400px;
    bottom: 25%;
    left: 10%;
  }
}
.over_clover {
  animation: over_cover_box_anime 0.3s ease-in-out forwards;
}
@keyframes over_cover_box_anime {
  0% {
    width: 400px;
    height: 400px;
    bottom: 25%;
    left: 10%;
  }
  100% {
    width: 240px;
    height: 240px;
    bottom: 0;
  }
}
.act_cover_box .albumCover {
  cursor: default;
  width: 300px;
  height: 300px;
}
.act_cover_box .albumCover_sub {
  left: 10%;
  top: 15%;
  width: 300px;
  height: 300px;
  transform: scale(1.05);
}
.act_cover_box .albumCover:hover {
  transform: scale(1);
}
.play_page {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0%;
  width: 100vw;
  z-index: 2;
}
.mubu {
  height: 100%;
  width: 100%;
}
.song_play_page {
  height: 0;
  border-radius: 8px;
  /* background: #ffffffe6; */
  background: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 20px);
  margin: 0 10px 10px 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.start_play_page {
  animation: start_op 0.3s ease-in-out forwards;
}
@keyframes start_op {
  0% {
    opacity: 0;
    background: rgba(0, 0, 0, 0);
    height: 100%;
  }
  100% {
    opacity: 1;
    background: rgba(0, 0, 0, 0.46);
    height: 100%;
  }
}
.start_play_page .song_play_page {
  animation: start_up 0.3s ease-in-out forwards;
}
@keyframes start_up {
  0% {
    height: 0%;
  }
  100% {
    height: 80%;
  }
}
@keyframes over_op {
  0% {
    height: 100%;
    background: rgba(0, 0, 0, 0.46);
  }
  99% {
    background: rgba(0, 0, 0, 0);
    height: 100%;
  }
  100% {
    height: 0;
  }
}
.over_play_page {
  animation: over_op 0.3s ease-in-out forwards;
}
.over_play_page .song_play_page {
  animation: over_down 0.3s ease-in-out forwards;
}
@keyframes over_down {
  0% {
    height: 80%;
  }
  100% {
    height: 0%;
  }
}
.downPage {
  position: absolute;
  top: 5px;
  left: 49%;
  height: 20px;
  color: rgb(119, 119, 119);
  cursor: pointer;
}
/*** */
.lyric_area_box {
  height: 65%;
  width: 400px;
  margin-left: 20%;
  margin-top: -5%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
}

.top_zz,
.bottom_zz {
  position: sticky;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 15%;
  background: linear-gradient(#fff, #ffffff00);
  pointer-events: none;
}
.bottom_zz {
  top: unset;
  bottom: -1px;
  background: linear-gradient(#ffffff00, #fff);
}
.lyric_area_box::-webkit-scrollbar {
  width: 0 !important;
}
.lyric_lines {
  list-style: none;
  padding: 0;
  margin: 50% 0;
  text-align: center;
}
.lyric_line {
  margin: 20px 0;
  font-size: 16px;
  transition: all 0.1s linear;
}
.act_line {
  color: pink;
}

/**** */
#right_mainContent {
  /**主体内容 */
  height: 100%;
  width: calc(100% - 240px);
  position: relative;
}

/****** */

/******* */
.playBar {
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: -1px;
  display: flex;
  flex-direction: row;
  z-index: 14;
  transition: all 0.3s linear;
  background: white;
}
.songInfo {
  position: relative;
  left: 0;
  /*bottom: 20%;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: -13px 25px 0 25px;
}
#ilikeStaru {
  margin: -10px 15px 0 10px;
}
#ilikeStaru i {
  font-size: 14px;
  color: red;
}
#songName {
  display: flex;
  flex-direction: column;
}
#songTitle {
  color: rgb(32, 32, 32);
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}
#ather {
  font-size: 10px;
  color: rgb(139, 139, 139);
  transition: all 0.3s ease-in-out;
}

#player {
  position: absolute;
  width: 100%;
  display: flex;
  bottom: 8px;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.act_playBar #player {
  animation: open_player 0.3s ease-in-out forwards;
}
@keyframes open_player {
  0% {
    bottom: 8px;
    left: 0;
  }
  100% {
    left: 0px;
    bottom: 25px;
  }
}
.over_playBar #player {
  animation: over_player 0.3s ease-in-out forwards;
}
@keyframes over_player {
  0% {
    left: 0px;
    bottom: 25px;
  }
  100% {
    bottom: 8px;
    left: 0;
  }
}
#player_btns {
  display: flex;
  align-items: center;
}
.playbox {
  margin: 0 13px;
}
.im {
  transition: all 0.5s ease-in-out;
}
.playbox i {
  font-size: 12px;
  font-weight: bold;
}
.act {
  position: relative;
  top: -2px;
  border-radius: 50%;
  padding: 20px;
  background-clip: border-box;
  background-color: rgb(49, 112, 255);
}
.act i {
  position: absolute;
  top: 33%;
  left: 33%;
  z-index: 100;
  font-size: 16px;
  color: white;
} /**** */
#wrap {
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
}

/*** */
#player_pressBar {
  display: flex;
  align-items: center;
  margin-top: 2px;
}
.time {
  font-size: 12px;
  font-weight: bold;
  margin: 0 5px;
}
#progress_box {
  width: 380px;
  background: rgb(221, 221, 221);
  height: 3px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}
#cached {
  width: 100%;
  height: 100%;
  background: rgb(194, 194, 194);
  border-radius: 10px;
}
#already_played {
  width: 40%;
  height: 100%;
  background: rgb(73, 73, 73);
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
}
.act_playBar {
  /*animation: left_wr 0.3s 0.3s ease-in-out forwards;*/
  background: none;
}
@keyframes left_wr {
  0% {
    left: 240px;
  }
  100% {
    left: 0;
  }
}
.act_playBar .songInfo {
  animation: up_songName 0.3s 0.1s ease-in-out forwards;
}
@keyframes up_songName {
  0% {
    left: 0;
    bottom: 45%;
  }
  100% {
    left: -185px;
    bottom: 190%;
    flex-direction: column-reverse;
  }
}
.over_playBar .songInfo {
  animation: down_songName 0.3s ease-in-out forwards;
}
@keyframes down_songName {
  0% {
    left: -185px;
    bottom: 190%;
    flex-direction: column-reverse;
  }
  100% {
    left: 0;
    bottom: 0;
  }
}
.act_playBar .songInfo i {
  animation: herat_none 0.3s ease-in-out forwards;
}
@keyframes herat_none {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    pointer-events: none;
  }
}
.over_playBar .songInfo i {
  animation: herat_dis 0.3s ease-in-out forwards;
}
@keyframes herat_dis {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    pointer-events: unset;
  }
}

.act_playBar #songName #songTitle {
  font-size: 30px;
}

.act_playBar #songName #ather {
  font-size: 16px;
}
</style>