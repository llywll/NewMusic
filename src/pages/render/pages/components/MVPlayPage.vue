<template>
  <div class="mvplay_page">
    <div class="mv_play_box">
      <video-player
        v-if="isLoadingOver"
        ref="videoPlayer"
        class="video-player vjs-custom-skin ts"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event,'play')"
        @pause="onPlayerPlay($event,'pause')"
      />
    </div>
    <div class="bg_in_box">
      <div class="mv_info_box" v-if="mvInfo">
        <span class="mv_song_name">{{mvInfo.name}}</span>
        <label class="mv__line">-</label>
        <div v-for="(singerItem,index) in mvInfo.singers" :key="index">
          <span class="mv_singer" @click="intoSingerPage(singerItem.mid)">{{singerItem.name}}</span>
          <span v-if="index!=mvInfo.singers.length -1">/</span>
        </div>
        <div class="playNum">播放量：{{ mvInfo.playcnt /10000 }}万</div>
      </div>

      <span class="desc_title">视频简介</span>
      <div class="mv_desc">
        <div class="desc_singer">
          <div v-for="(singerItem,index) in mvInfo.singers" :key="index">
            <span class="mv_singer" @click="intoSingerPage(singerItem.mid)">{{singerItem.name}}</span>
            <span v-if="index!=mvInfo.singers.length -1">/</span>
          </div>
        </div>
        <div class="pub_time">发行时间：{{pubdate}}</div>
      </div>
      <div class="jianjie">
        <pre class="jianjie_text" v-html="mvInfo.desc"></pre>
      </div>
    </div>
    <div class="re_mv_list_box" v-if="mv_recommend && mv_recommend.length>0">
      <ul class="singer_mv_list" ref="mv_list">
        <li class="mv_title_li">
          <span>大家都在看</span>
        </li>
        <li class="mv_item" v-for="(item,index) in mv_recommend" :key="index">
          <div class="item_cover">
            <img class="mv_pic" :src="item.cover_pic" @click="mvId =item.vid" />
            <i class="im im-play"></i>
          </div>
          <div class="mv_info">
            <span class="mv_title">{{item.name}}</span>
            <span class="mv_username">播放量：{{item.playcnt /10000 }} 万</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MVPlayPage",
  data() {
    return {
      mvId: "",
      mvInfo: {},
      mv_recommend: [],
      mvSrc: {},
      isLoadingOver: false,
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 视频格式
            src: "" // url地址
          }
        ],
        hls: true,
        poster: "", // 封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    };
  },
  watch: {
    $route() {
      if (this.$route.name == "MVPlayPage") {
        this.mvId = this.$route.params.vId;
      }
    },
    mvId() {
      this.init(this.mvId);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player; //自定义播放
    },
    pubdate() {
      var date = new Date(this.mvInfo.pubdate * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    }
  },
  mounted() {
    this.mvId = this.$route.params.vId;
  },

  methods: {
    init(mvId) {
      this.$http
        .get(`http://39.108.229.8:3300/mv?id=${mvId}&raw=1`)
        .then(res => {
          for (let key in res.data.mvinfo.data) {
            this.mvInfo = res.data.mvinfo.data[key];
            this.mv_recommend = res.data.other.data.list;
          }
          this.playerOptions.poster = this.mvInfo.cover_pic;
        })
        .catch(err => console.log(err));
      this.$http
        .get(`http://39.108.229.8:3300/mv/url?id=${mvId}&raw=1`)
        .then(res => {
          for (let urlKey in res.data.getMvUrl.data) {
            this.mvSrc = res.data.getMvUrl.data[urlKey].mp4;
          }
          this.playerOptions.sources[0].src = this.mvSrc[2].freeflow_url[0];
          this.isLoadingOver = true;
        })
        .catch(err => console.log(err));
    },
    onPlayerPlay(el, state) {
      console.log(el, state);
      if(state == "play")
      this.$MainWinodw.send("playMusic",false)
    },

    intoSingerPage(mid) {
      this.$router.push(`/SingerInfoPage/${mid}`);
    }
  }
};
</script>

<style scoped>
.mvplay_page {
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 60px;
  /* margin-left: 10px; */
  height: 81vh;
}
.mv_play_box {
  width: 100%;
  /* margin: 20px 0; */
  padding-top: 20px;
  /* background: #333; */
}
.ts {
  margin: 0 auto;
  overflow: hidden;
  width: 95%;
  border-radius: 5px;
  max-width: 1000px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.158);
}
.mv_info_box,
.mv_desc,
.re_mv_list_box {
  display: flex;
  align-items: center;
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
}
.bg_in_box {
  padding: 20px 0;
  width: 100%;
  /* background-color: #333; */
  /* color: white; */
  color: black;
}
.mv_desc {
  margin-top: 10px;
}
.mv_desc .mv_singer {
  line-height: 50px;
  font-size: 14px;
}
.desc_title {
  font-size: 24px;
  width: 95%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  display: block;
}
.pub_time {
  margin-left: 15px;
  font-size: 14px;
}
.mv__line {
  margin: 0 10px;
  font-size: 24px;
}
.mv_song_name {
  font-size: 24px;
}
.mv_singer {
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s linear;
}
.desc_singer {
  display: flex;
  align-items: center;
}
.desc_singer div {
  display: flex;
  align-items: center;
}
.mv_singer:hover {
  color: rgb(131, 131, 131);
}
.playNum {
  font-size: 12px;
  color: rgb(177, 177, 177);
  margin-left: 10px;
  position: relative;
  bottom: -2px;
}
.singer_mv_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  transition: all 0.5s ease-out;
  /* margin-left: 30px; */
  margin-top: 30px;
}
.mv_title_li {
  width: 95%;
  margin-bottom: 20px;
  font-size: 24px;
  margin-left: 0;
}
.mv_item {
  margin-right: 25px;
  margin-bottom: 30px;
  position: relative;
}
.item_cover {
  background-size: cover;
  width: 250px;
  height: 140px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
}
.singer_mv_list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 20px;
}
.mv_item {
  /* display: flex; */
  /* margin:0 20px; */
}
.mv_info {
  width: 250px;
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
}
.mv_pic {
  width: 250px;
  border-radius: 5px;
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
.mv_title {
  font-weight: bold;
  font-size: 12px;
  color: rgb(43, 43, 43);
}
.albums_username,
.mv_username {
  font-size: 10px;
  margin-top: 3px;
  color: rgb(158, 158, 158);
}
.jianjie {
  max-width: 1000px;
  width: 95%;
  margin: 20px auto;
}
.jianjie_text {
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* -webkit-line-clamp: 3; */
  overflow: hidden;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>