<template>
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
      <span class="list_title s2_title" v-show="suser.isLogin">创建的歌单</span>
      <ul class="s_menu" id="song_nav" v-show="suser.isLogin">
        <li class="s3_li" v-for="(item,index) in collectionSonglist" :key="index">
          <span v-html="item.lListname"></span>
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
</template>
<script>
export default {
  name: "leftBox",
  data() {
    return {
      cover_box: "cover_box",
      sidebar_a: "sidebar_a",
      play_page: "play_page "
    };
  },
  watch: {
    "$store.state.suser.suser"() {
      if (this.$store.state.suser.suser.isLogin)
        this.$httpV
          .get("http://localhost:9649/songList/getSongList")
          .then(res => {
            console.log(res.data);
            if (res.data.state == "success") {
              this.$store.dispatch(
                "changeCollectionSonglist",
                res.data.data[0]
              );
            }
          })
          .catch(err => console.log(err));
      else this.$store.commit("setCollectionSonglist");
    }
  },
  computed: {
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
    },
    collectionSonglist() {
      return this.$store.state.suser.collectionSonglist;
    },
    suser(){
      console.log(this.$store.state.suser.suser)
      return this.$store.state.suser.suser
    }
  },
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
  }
};
</script>
<style scoped>
.sidebar_a {
  /*左边栏*/
  background-image: url(../../assets/IMG_0285.jpg);
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
  font-size: 12px;
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
  background-image: url(../../assets/fin.jpg);
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
  background: url(../../assets/fin.jpg) no-repeat;
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
</style>