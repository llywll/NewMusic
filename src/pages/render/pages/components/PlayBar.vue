<template>
  <div id="playBar" :class="playBar">
    <div class="songInfo">
      <div id="ilikeStaru">
        <i class="im im-heart"></i>
      </div>
      <div id="songName">
        <span id="songTitle">{{ playing.title }}</span>
        <span id="ather">{{playing.singer}}</span>
      </div>
    </div>
    <div id="player">
      <div id="player_btns">
        <span class="playbox" @click="lastSong()">
          <i class="im im-previous"></i>
        </span>
        <span class="playbox act" @click="music_Play()">
          <i :class="pause?'im im-play':'im im-pause'" ref="isplayIcon" id="isplay"></i>
          <audio
            autoplay
            id="music_play"
            ref="music_player"
            @click="music_Play()"
            @timeupdate="timeUp()"
            @loadstart="loading()"
            @pause="pauseState()"
            @play="playState()"
            @ended="playEnded()"
          >
            <source :src="playing.playLists[0]" type="audio/flac" />
          </audio>
        </span>
        <span class="playbox" @click="nextSong()">
          <i class="im im-next"></i>
        </span>
      </div>
      <!-- <div class="wave_box">
        <div class="pre" ref="pre"></div>
        <div id="waveform" ref="waveform"></div>
      </div> -->
      <div id="player_pressBar">
        <span class="time" id="played_time">{{ already_time }}</span>
        <div id="progress_box" v-on:click.stop="changeProgress($event)">
          <div id="cached" ref="cached_press"></div>
          <div id="already_played" ref="already_press">
            <div
              class="dref_pre_btn"
              ref="dref_bt"
              @mousedown="dragChageProgress($event)"
              @mousemove="moveChageProgress($event)"
              @mouseover="mouse_stop"
            ></div>
          </div>
        </div>
        <span class="time" id="total_time">{{comtime(playing.interval)}}</span>
      </div>
    </div>
    <div id="vcon">
      <div class="playViewListBox">
        <div :class="is_p?'song_list_box':'song_list_box off_box'">
          <div class="title_and_cont">
            <div class="list_info">
              <span>播放列表</span>
              <span>共{{ playList.length }}首歌</span>
            </div>

            <div class="list_con">
              <button class="intoBtn">
                <i class="im im-plus"></i>
                添加到
              </button>
              <button class="removeBtn">
                <i class="im im-trash-can"></i>清空
              </button>
            </div>
          </div>
          <div class="song_list">
            <ul class="songs_ul">
              <li class="song_item" v-for="(item,index) in playList" :key="index">
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
        <button class="view_lyric_btn" @click="showLyric()">
          <span>歌词</span>
        </button>
        <button class="view_list_btn" @click="isPlayListPage()">
          <i class="im im-data"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// import WaveSurfer from "wavesurfer.js"; //导入wavesurfer.js
export default {
  name: "playBar",
  data: function() {
    return {
      is_p: false,
      alr_width: 0,
      already_time: "",
      isdown: false,
      boxele: "",
      dishX: 0,
      isShow: false,
      wavesurfer: null
    };
  },
  mounted: function() {
    this.boxele = document.getElementById("progress_box");

  },
  computed: {
    playBar() {
      if (this.$store.state.state.isThePlaybackPageAlreadyOpen) {
        return "playBar act_playBar";
      } else {
        // console.log(this.$store.state.state.count)
        return this.$store.state.state.count > 0
          ? "playBar over_playBar"
          : "playBar";
      }
    },
    playList() {
      let tempList = this.$store.state.playList.playList;
      for (let i = 0; i < Object.keys(tempList).length; i++) {
        tempList[i].url = this.toUrl(tempList[i].albumMid);
      }
      return tempList;
    },
    playing() {
      if (Object.keys(this.$store.state.playing.playing).length < 1)
        return {
          title: "新音乐，聆听生活",
          singer: "---",
          songMid: "",
          interval: "0",
          albumMid: "",
          playLists: ""
        };
      else {
        // this.wavesurfer.load(this.$store.state.playing.playing.playLists[0]);
        // this.wavesurfer.load(
        //   "http://m7.music.126.net/20200312171004/7af33136ee68be141272ad3920136c49/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
        // );
        this.$refs.music_player.load();
        return this.$store.state.playing.playing;
      }
    },
    pause() {
      return this.$store.state.playing.pause;
    }
  },
  methods: {
    timeUp: function() {
      if (Object.keys(this.$store.state.playing.playing.lyric).length === 0) {
        this.$ipc.send("chageLyric", { text: "暂无歌词" });
        console.log("暂无歌词");
      } else if (
        Object.keys(this.$store.state.playing.playing.lyric).length === 1
      ) {
        document.getElementById("lyric_lines").children[0].className =
          "lyric_line act_line";
        this.$ipc.send("chageLyric", {
          text: this.$store.state.playing.playing.lyric[0].text
        });
      } else {
        let lyricLineTemp = this.$store.state.playing.lyricLine;
        if (
          this.$store.state.playing.playing.lyric[lyricLineTemp].time <=
            this.$refs.music_player.currentTime &&
          lyricLineTemp <
            Object.keys(this.$store.state.playing.playing.lyric).length
        ) {
          let lines = document.getElementById("lyric_lines").childNodes;

          for (let i = 0; i < lines.length; i++) {
            if (i != lyricLineTemp) lines[i].className = "lyric_line";
          }
          document.getElementById("lyric_lines").children[
            lyricLineTemp
          ].className = "lyric_line act_line";
          document
            .getElementById("lyric_lines")
            .children[lyricLineTemp].scrollIntoView({
              block: "center",
              inline: "center"
            });

          this.$ipc.send("chageLyric", {
            text: this.$store.state.playing.playing.lyric[lyricLineTemp].text
          });
          if (lyricLineTemp != this.$store.state.playing.lyricLine)
            lyricLineTemp = this.$store.state.playing.lyricLine;
          else
            lyricLineTemp <
            Object.keys(this.$store.state.playing.playing.lyric).length - 1
              ? lyricLineTemp++
              : lyricLineTemp;
          this.$store.commit("chagelyricLine", lyricLineTemp);
        }
      }
      this.$refs.already_press.style =
        "width:" +
        (parseInt(this.$refs.music_player.currentTime) /
          this.$store.state.playing.playing.interval) *
          100 +
        "%";
      if (this.$refs.music_player.buffered.length != 0)
        this.$refs.cached_press.style =
          "width:" +
          (parseInt(
            this.$refs.music_player.buffered.end(
              this.$refs.music_player.buffered.length - 1
            )
          ) /
            this.$store.state.playing.playing.interval) *
            100 +
          "%";
      this.already_time = this.comtime(
        parseInt(this.$refs.music_player.currentTime)
      );
    },
    toUrl: function(albumId) {
      if (isNaN(albumId)) return "";
      return (
        "http://imgcache.qq.com/music/photo/album_300/" +
        (albumId % 100) +
        "/300_albumpic_" +
        albumId +
        "_0.jpg"
      );
    },
    showLyric: function() {
      this.isShow = !this.isShow;
      this.$ipc.send("showlyirc", this.isShow);
    },
    comtime: function(stime) {
      if (stime % 60 < 10) return parseInt(stime / 60) + ":0" + (stime % 60);
      return parseInt(stime / 60) + ":" + (stime % 60);
    },
    isPlayListPage() {
      this.is_p = !this.is_p;
    },
    music_Play: function() {
      if (this.$store.state.playing.pause) {
        this.$store.commit("chageplayState", false);
        this.$refs.music_player.play();
      } else {
        this.$store.commit("chageplayState", true);
        this.$refs.music_player.pause();
      }
    },
    loading: function() {
      // console.log("音乐正在加载中");
      document.getElementById("lyric_lines").children[0].scrollIntoView({
        block: "center",
        inline: "center"
      });
    },
    nextSong() {
      this.$store.dispatch("nextSongAsync");
    },
    lastSong() {
      this.$store.dispatch("lastSongAsync");
    },
    pauseState() {
      this.$store.commit("chageplayState", true);
    },
    playState() {
      this.$store.commit("chageplayState", false);
    },
    playEnded() {
      this.nextSong();
    },
    changeProgress(el) {
      this.$refs.already_press.style =
        "width : " + (el.offsetX / el.toElement.offsetWidth) * 100 + "%";
      let ysline = Object.keys(this.$store.state.playing.playing.lyric).length;
      let tempLine = el.offsetX / el.toElement.offsetWidth;
      this.$store.commit("chagelyricLine", parseInt(ysline * tempLine));

      this.$refs.music_player.currentTime = parseInt(
        (el.offsetX / el.toElement.offsetWidth) *
          this.$store.state.playing.playing.interval
      );
    },
    dragChageProgress(el) {
      console.log("按下");
      this.dishX = el.clientX;
      this.t_stop = true;
    },
    moveChageProgress(el) {
      if (this.t_stop) {
        console.log(el);
        console.log(this.boxele.event);
        // this.$refs.already_press.style =
        //   "width : " + (el.m_clientX / this.box_width) * 100 + "%";
        // console.log(el.offsetX);
        // console.log(el.clientX - el.offsetLeft);
      }
    },
    mouse_stop() {
      this.t_stop = false;
    }
  }
};
</script>
<style scoped>
/******* */
.playBar {
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: -1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  width: 200px;
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s ease-out;
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
  cursor: pointer;
}
.im {
  /* transition: all 0.5s ease-in-out; */
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
  top: 35%;
  left: 35%;
  z-index: 100;
  font-size: 16px;
  color: white;
}
.act .im-pause {
  left: 30%;
}
/**** */
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
  height: 6px;
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
}
#cached {
  width: 100%;
  height: 3px;
  background: rgb(194, 194, 194);
  border-radius: 10px;
  pointer-events: none;
}
#already_played {
  width: 0;
  height: 3px;
  background: rgb(73, 73, 73);
  border-radius: 10px;
  position: absolute;
  top: 1.5px;
  left: 0;
  pointer-events: none;
}
#progress_box:hover .dref_pre_btn {
  display: block;
}
.dref_pre_btn {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 5px solid rgb(73, 73, 73);
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: -5px;
  right: -2.5px;
  display: none;
  pointer-events: all;
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
    top: -45%;
  }
  100% {
    left: -185px;
    top: -160%;
    flex-direction: column-reverse;
  }
}
.over_playBar .songInfo {
  animation: down_songName 0.3s ease-in-out forwards;
}
@keyframes down_songName {
  0% {
    left: -185px;
    top: -160%;
    flex-direction: column-reverse;
  }
  100% {
    left: 0;
    top: 0;
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
  width: 300px;
  white-space: unset;
  text-overflow: unset;
}

.act_playBar #songName #ather {
  font-size: 16px;
}
#vcon {
  z-index: 15;
}
.playViewListBox {
  margin: 0 20px;
  position: relative;
}
.song_list_box {
  background: white;
  width: 330px;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 80vh;
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
  border-radius: 5px;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  transition: all 0.1s linear;
}
.song_item:hover {
  background-color: rgb(49, 122, 255);
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
/*** */
.view_list_btn {
  cursor: pointer;
  background: none;
  border: 0;
  outline: none;
}
.view_list_btn .im {
  pointer-events: none;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.589);
  transition: all 0.1s linear;
}
.view_list_btn:hover .im {
  color: black;
}
/*** */
.wave_box {
  width: 400px;
  height: 30px;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 auto;
  border-bottom: 1px dashed #0000004f;
}
.pre {
  height: 100%;
  width: 0;
  background: rgba(0, 0, 0, 0.534);
}
#waveform {
  width: 2000px;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.1s linear;
  z-index: -1;
}
</style>