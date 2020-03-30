<template>
  <div id="page-content">
    <!-- 专属推荐 -->
    <div class="recom_list_box">
      <div class="info_and_pageTurning">
        <div class="recom_info_box">
          <span class="recom_title_sub">今日份已呈上</span>
          <span class="recom_title">精心准备的歌单</span>
        </div>
        <div class="recom_pageTurning" ref="tu_buts">
          <button class="turning" @click="le_left()">
            <i class="im im-angle-left"></i>
          </button>
          <button class="turning" @click="ne_right()">
            <i class="im im-angle-right"></i>
          </button>
        </div>
      </div>
      <div class="recom_songList_box">
        <ul class="recom_songList" ref="recomList">
          <li
            class="recomList_item"
            v-for="(item,index) in v_hot.slice(0, 10)"
            :key="index"
            @click="toAlbumInfoPage($event)"
          >
            <div class="item_cover" :data-album-id="item.content_id" :style="item.cover">
              <i class="im im-play"></i>
            </div>
            <div class="item_cover_after" :style="item.cover"></div>
            <div class="recom_info">
              <span class="albums_title">{{item.title}}</span>
              <span class="albums_username">{{item.username}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 新歌推荐 -->
    <div class="two_mod_box">
      <div class="newSong_box">
        <div class="info_and_menu">
          <div class="newSong_info_box">
            <span class="newSong_title_sub">新鲜出炉</span>
            <span class="newSong_title">来点新歌怎么样？</span>
          </div>
          <div class="newSong_menu">
            <button class="n_menu">
              <i class="im im-menu-dot-h"></i>
            </button>
          </div>
        </div>
        <div class="newSong_list_box">
          <ul class="newSong_list" ref="newSongList">
            <li class="newSong_list_th">
              <div class="newSong_albumCover"></div>
              <div class="newSong_SongName">歌名</div>
              <div class="newSong_songer">歌手</div>
              <div class="newSong_album">专辑</div>
              <div class="newSong_time"></div>
            </li>
            <li
              class="newSong_list_item"
              v-for="(song,index) in newSong_list.slice(0, 10)"
              :key="index"
            >
              <div class="newSong_albumCover">
                <img class="new_albumCover" :src="song.url" />
              </div>
              <div class="newSong_SongName">
                <a>{{song.title}}</a>
              </div>
              <div class="newSong_songer">
                <a>{{song.singer[0].title}}</a>
              </div>
              <div class="newSong_album">
                <a>{{song.album.title}}</a>
              </div>
              <div
                class="newSong_time"
                v-if=" song.interval % 60 <10"
              >{{parseInt(song.interval / 60)}}:0{{ song.interval % 60 }}</div>
              <div
                class="newSong_time"
                v-else
              >{{parseInt(song.interval / 60)}}:{{ song.interval % 60 }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mv_box">
        <div class="info_and_pageTurning">
          <div class="recom_info_box">
            <span class="recom_title_sub">让！我！康！康！</span>
            <span class="recom_title">MV</span>
          </div>
          <div class="recom_pageTurning" ref="tu_buts">
            <button class="turning" @click="le_left()">
              <i class="im im-angle-left"></i>
            </button>
            <button class="turning" @click="ne_right()">
              <i class="im im-angle-right"></i>
            </button>
          </div>
        </div>

        <div class="mv_list_box">
          <ul class="mv_list" ref="mvList">
            <li class="mv_list_item" v-for="(mvlist,index) in mv_list.slice(0,5)" :key="index">
              <div class="mv_cover">
                <img class="mv_cover_img" :src="mvlist.picurl" />
              </div>
              <div class="mv_info">
                <div class="mv_ablnum_name">
                  <span>{{mvlist.mvdesc}}</span>
                </div>
                <div class="mv_song_name">
                  <span>{{mvlist.mvtitle}}</span>
                  <span>{{mvlist.singer_name}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageContent",
  data: function() {
    return {
      v_hot: [],
      newSong_list: [],
      mv_list: []
    };
  },
  mounted: function() {
    this.$http
      .get("http://39.108.229.8:3200/getRecommend")
      .then(response => {
        this.$data.v_hot = response.data.response.recomPlaylist.data.v_hot;

        this.$data.v_hot.forEach((item, index) => {
          if (index < 12)
            item.cover = `background-image: url(${item.cover})`;
        });
        let tempList = response.data.response.new_song.data.songlist;
        for (
          let i = 0;
          i < Object.keys(response.data.response.new_song.data.songlist).length;
          i++
        ) {
          tempList[i].url = this.toUrl(tempList[i].album.id);
        }
        this.$data.newSong_list = tempList;
      })
      .catch(error => {
        console.log(error);
      });
    this.$http
      .get("http://39.108.229.8:3200/getMvByTag")
      .then(response => {
        this.mv_list = response.data.response.data.mvlist;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    /*newSong_list() {
      return this.newSong_list.map(key => ({

      }));
    }*/
  },
  methods: {
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
    toAlbumInfoPage: function(pef) {
      this.$router.push(
        "/AlbumPage/" + pef.target.attributes["data-album-id"].value
      );
    },
    le_left: function() {
      this.$refs.recomList.style =
        "left:-" + this.$refs.recomList.children[0].offsetLeft + "px";
      this.$refs.tu_buts.children[0].children[0].style =
        "color: rgb(175, 175, 175);";
      this.$refs.tu_buts.children[1].children[0].style = "color: black";
    },
    ne_right: function() {
      this.$refs.recomList.style =
        "left:-" + this.$refs.recomList.children[6].offsetLeft + "px";

      this.$refs.tu_buts.children[0].children[0].style = "color: black";
      this.$refs.tu_buts.children[1].children[0].style =
        "color: rgb(175, 175, 175);";
    }
  }
};
</script>
<style scoped>
#page-content {
  width: 100%;
  height: calc(100% - 120px);
  margin-top: 60px;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
}

.recom_list_box {
  margin: 20px 35px 5px 35px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(233, 233, 233);
}

.info_and_pageTurning {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.recom_info_box {
  display: flex;
  flex-direction: column;
}

.recom_title_sub {
  font-size: 12px;
  color: rgb(114, 114, 114);
  margin-bottom: 5px;
}

.recom_title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(39, 39, 39);
}

.turning {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  outline: none;
}

.turning .im {
  font-size: 12px;
  font-weight: bold;
  pointer-events: none;
}

.turning .im-angle-left {
  color: rgb(175, 175, 175);
}

.recom_songList {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  transition: all 0.5s ease-out;
}

.recomList_item {
  margin-right: 15px;
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

.recom_info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  justify-content: space-between;
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
/***


 */
.two_mod_box {
  display: flex;
}
/****
*
* 新歌推荐
*
**/
.newSong_box {
  margin: 20px 15px 5px 35px;
  padding-bottom: 10px;
  width: 50%;
  border-bottom: 1px solid rgb(233, 233, 233);
}
.info_and_menu {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.newSong_info_box {
  display: flex;
  flex-direction: column;
}
.newSong_title_sub {
  font-size: 12px;
  color: rgb(114, 114, 114);
  margin-bottom: 5px;
}
.newSong_title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(39, 39, 39);
}
.newSong_menu {
  margin-right: 15px;
}
.n_menu {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  outline: none;
}
.n_menu .im {
  font-size: 12px;
  color: rgb(148, 148, 148);

  pointer-events: none;
}
.newSong_list_box {
  height: 250px;
  overflow-x: hidden;
}
.newSong_list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.newSong_list_th,
.newSong_list_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.1s ease-in-out;
  border-radius: 8px;
}
.newSong_list_th {
  position: sticky;
  top: 0;
  left: 0;
  background: white;
  border-radius: unset;
}
.newSong_list_item {
  padding: 6px 0 3px 0;
}
.newSong_list_th div {
  font-size: 10px;
  color: rgb(141, 141, 141);
  margin: 10px 0;
}
.newSong_list_item div,
.newSong_list_item a {
  font-size: 12px;
  transition: all 0.1s ease-in-out;
}
.newSong_list_item div a {
  cursor: pointer;
  color: #252525;
}

.newSong_list_item:hover {
  background-color: rgb(49, 122, 255);
}
.newSong_list_item:hover div,
.newSong_list_item:hover a {
  color: white;
}
.newSong_list_th div:first-child {
  margin: 0 12px 0 10px;
}
.newSong_albumCover {
  width: 32px;
  margin: 0 12px 0 10px;
}
.new_albumCover {
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
}
.newSong_SongName {
  width: 130px;
}
.newSong_songer {
  width: 130px;
}
.newSong_album {
  width: 130px;
}
.newSong_time {
  width: 40px;
}

/***  MV */
.mv_box {
  margin: 20px 35px 5px 0px;
  padding-bottom: 10px;
  width: 50%;
  border-bottom: 1px solid rgb(233, 233, 233);
  display: flex;
  flex-direction: column;
}
.mv_list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
}
.mv_list_item {
  position: relative;
  margin-right: 10px;
}
.mv_cover {
  overflow: hidden;
  width: 420px;
  height: 220px;
  border-radius: 5px;
}
.mv_cover_img {
  border-radius: 5px;
  position: relative;
  /* left: -40%; */
  left: 0;
  top: 0%;
  width: 100%;
}

.mv_info {
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
}
.mv_ablnum_name {
  margin: 10px 0 0 15px;
}
.mv_ablnum_name span {
  color: rgba(255, 255, 255, 0.603);
  font-size: 12px;
}
.mv_song_name {
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 15px;
}
.mv_song_name span {
  color: rgba(255, 255, 255, 0.884);
}
.mv_song_name span:first-child {
  font-size: 16px;
}
.mv_song_name span:last-child {
  color: rgba(255, 255, 255, 0.603);
  font-size: 12px;
}
</style>