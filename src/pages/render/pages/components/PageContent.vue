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
          <button class="turning fg" @click="le_left()">
            <i class="im im-angle-left"></i>
          </button>
          <button class="turning" @click="ne_right()">
            <i class="im im-angle-right"></i>
          </button>
        </div>
      </div>
      <div class="recom_songList_box" ref="rebox">
        <ul class="recom_songList" ref="recomList">
          <li
            :class="index==5?'recomList_item big_margin':'recomList_item'"
            v-for="(item,index) in v_hot.slice(0, 12)"
            :key="index"
            @click="intoSongSheetPage($event)"
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

    <div class="two_mod_box">
    <!-- 新歌推荐 -->
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
                <a @click="playMusic(song.mid)">{{song.title}}</a>
                <i class="im_mv" @click="intoMVPlayPage(song.mv.vid)" v-if="song.mv.id !=0"></i>
              </div>
              <div class="newSong_songer">
                <div
                  v-for="(songItem,songIndex) in song.singer"
                  :key="songIndex"
                  v-show="songIndex<2"
                >
                  <a @click="intoSingerPage(songItem.mid)">
                    <span>{{songItem.title}}</span>
                  </a>
                  <span v-if="songIndex!=song.singer.length-1 && songIndex<1">/</span>
                </div>
              </div>
              <div class="newSong_album">
                <a @click="intoAlbumInfoPage(song.album.mid)">{{song.album.title}}</a>
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
    <!-- MV推荐 -->
      <div class="mv_box">
        <div class="mv_info_and_pageTurning">
          <div class="mv_info_box">
            <span class="mv_title_sub">让！我！康！康！</span>
            <span class="mv_title">MV</span>
          </div>
          <div class="mv_pageTurning" ref="mv_btn">
            <button class="mv_turning" @click="mv_left()">
              <i class="im im-angle-left"></i>
            </button>
            <button class="mv_turning" @click="mv_right()">
              <i class="im im-angle-right"></i>
            </button>
          </div>
        </div>

        <div class="mv_list_box" ref="mvbox">
          <ul class="mv_list" ref="mvList">
            <li class="mv_list_item" v-for="(mvlist,index) in mv_list.slice(0,5)" :key="index">
              <div class="mv_cover" @click="intoMVPlayPage(mvlist.vid)">
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
    <!--歌手推荐-->
    <div class="singer_mod_box">
      <div class="singer_info_mod_box">
        <div class="recom_info_box">
          <span class="recom_title_sub">有些歌手在偷偷喵你哟</span>
          <span class="recom_title">歌手推荐~</span>
        </div>
        <div class="more_singer" @click="intoCategorySingerPage()">
          <span>全部</span>
          <i class="im im-angle-right"></i>
        </div>
      </div>
      <div class="singer_mod_list_box">
        <ul class="singer_mod_list">
          <li
            class="similar_item"
            v-for="(singer_item,singer_index) in singer_list"
            :key="singer_index"
          >
            <div class="item_cover" @click="intoSingerPage(singer_item.singer_mid)">
              <img class="similar_pic" :src="singer_item.singer_pic" />
            </div>
            <div class="similar_info">
              <span class="similar_title">{{ singer_item.singer_name }}</span>
            </div>
          </li>
        </ul>
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
      mv_list: [],
      singer_list: [],
      recom_iscroll: "",
      mv_iscroll: "",
      act_mv_pap: 0
    };
  },
  watch: {
    act_mv_pap() {
      this.mv_iscroll.scrollToElement(
        this.$refs.mvList.children[this.act_mv_pap]
      );

      if (this.act_mv_pap == 0) {
        this.$refs.mv_btn.children[0].children[0].style =
          "color: rgb(175, 175, 175);";
      } else if (this.act_mv_pap == 4) {
        this.$refs.mv_btn.children[1].children[0].style =
          "color: rgb(175, 175, 175);";
      } else {
        this.$refs.mv_btn.children[0].children[0].style = "color: black";
        this.$refs.mv_btn.children[1].children[0].style = "color: black";
      }
    }
  },
  mounted: function() {
    this.$http
      .get("http://39.108.229.8:3200/getRecommend")
      .then(response => {
        this.$data.v_hot = response.data.response.recomPlaylist.data.v_hot;

        this.$data.v_hot.forEach((item, index) => {
          if (index < 12) item.cover = `background-image: url(${item.cover})`;
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
        this.$nextTick(() => {
          this.recom_iscroll = new this.$iscroll(this.$refs.rebox, {
            scrollbars: false,
            scrollX: true
          });
          this.mv_iscroll = new this.$iscroll(this.$refs.mvbox, {
            scrollbars: false,
            scrollX: true
          });
          console.log(this.mv_iscroll);
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.$http
      .get("http://39.108.229.8:3200/getMvByTag")
      .then(response => {
        this.mv_list = response.data.response.data.mvlist;
        console.log(this.mv_list);
      })
      .catch(error => {
        console.log(error);
      });
    this.$http.get(`http://39.108.229.8:3300/singer/list?raw=1`).then(res => {
      this.singer_list = res.data.singerList.data.singerlist.slice(0, 5);
    });
  },
  methods: {
    toUrl: function(albumId) {
      if (isNaN(albumId)) return "";
      return `http://imgcache.qq.com/music/photo/album_300/${albumId %
        100}/300_albumpic_${albumId}_0.jpg`;
    },
    intoSongSheetPage: function(pef) {
      this.$router.push(
        `/SongSheetPage/${pef.target.attributes["data-album-id"].value}`
      );
    },
    intoSingerPage: function(mid) {
      this.$router.push(`/SingerInfoPage/${mid}`);
    },
    intoAlbumInfoPage: function(mid) {
      this.$router.push(`/AlbumPage/${mid}`);
    },
    le_left: function() {
      this.recom_iscroll.scrollToElement(
        this.$refs.recomList.children[0],
        1000,
        -40
      );
      this.$refs.tu_buts.children[0].children[0].style =
        "color: rgb(175, 175, 175);";
      this.$refs.tu_buts.children[1].children[0].style = "color: black";
    },
    ne_right: function() {
      this.recom_iscroll.scrollToElement(
        this.$refs.recomList.children[6],
        1000,
        -40
      );

      this.$refs.tu_buts.children[0].children[0].style = "color: black";
      this.$refs.tu_buts.children[1].children[0].style =
        "color: rgb(175, 175, 175);";
    },
    mv_left: function() {
      if (this.act_mv_pap > 0) this.act_mv_pap -= 1;
    },
    mv_right: function() {
      if (this.act_mv_pap < 4) this.act_mv_pap += 1;
    },
    intoCategorySingerPage() {
      this.$router.push("/CategorySingerPage");
    },
    intoMVPlayPage(vid) {
      this.$router.push(`/MVPlayPage/${vid}`);
    },
    playMusic: async function(mid) {
      let p_list = [];
      let smid = mid;
      let actIndex = -1;
      for (let i = 0; i < this.newSong_list.length; i++) {
        if (this.newSong_list[i].mid == smid) actIndex = i;
        await p_list.push({
          title: this.newSong_list[i].title,
          singer: this.newSong_list[i].singer[0].title,
          songMid: this.newSong_list[i].mid,
          interval: this.newSong_list[i].interval,
          albumMid: this.newSong_list[i].album.id
        });
      }

      this.$store.commit("changeIsRadioState", {
        radioId: -1,
        isplay: false
      });
      this.$store.commit("replacePlayList", p_list);
      let tempList = p_list[actIndex];
      this.$store.dispatch("chageplayingStateAsync", {
        p_ing: tempList,
        actIndex: actIndex
      });
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

.recom_list_box,
.singer_mod_box {
  /* max-width: 100%; */
  margin: 20px 0 5px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(233, 233, 233);
}
.singer_mod_box {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
}
.info_and_pageTurning {
  display: flex;
  margin: 0 35px;
  padding: 0 40px;
  /* justify-content: space-between; */
  align-items: flex-end;
  max-width: 1000px;
  margin: 0 auto;
}

.recom_pageTurning {
  margin-left: 690px;
  z-index: 20;
}
.recom_info_box {
  display: flex;
  flex-direction: column;
}

.mv_title_sub,
.recom_title_sub {
  font-size: 12px;
  color: rgb(114, 114, 114);
  margin-bottom: 5px;
}
.mv_title,
.recom_title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(39, 39, 39);
}
.mv_turning,
.turning {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  outline: none;
}
.mv_turning .im,
.turning .im {
  font-size: 12px;
  font-weight: bold;
  pointer-events: none;
}
.mv_turning .im-angle-left,
.turning .im-angle-left {
  color: rgb(175, 175, 175);
}
.fg {
  font-size: 24px;
}
.recom_songList_box {
  max-width: 1000px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 10px;
}
.recom_songList {
  display: flex;
  padding-left: 40px;
  flex-direction: row;
  justify-content: flex-start;
  list-style: none;
  width: calc(200% + 500px);
  transition: all 0.5s ease-out;
}

.recomList_item {
  margin-right: 15px;
  width: 130px;
  position: relative;
}

.big_margin {
  margin-right: 150px;
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
.mv_info_box,
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px;
}
/****
*
* 新歌推荐
*
**/
.newSong_box {
  margin: 20px 15px 5px 0;
  padding-bottom: 10px;
  /* width: 80%; */
  height: 33vh;
  overflow-y: auto;
  border-bottom: 1px solid rgb(233, 233, 233);
}
.mv_info_and_pageTurning,
.info_and_menu {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 45px;
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
  /* height: 250px; */
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
  display: flex;
  overflow: hidden;
}
.newSong_album {
  width: 130px;
}
.newSong_time {
  width: 40px;
}

/***  MV */

.mv_info_and_pageTurning {
  /* padding-right: 40px; */
}
.mv_box {
  margin: 20px 0px 5px 0px;
  padding-bottom: 10px;
  /* width: 50%; */
  height: 33vh;
  border-bottom: 1px solid rgb(233, 233, 233);
  display: flex;
  flex-direction: column;
}
.mv_list_box {
  width: 400px;
  overflow-y: hidden;
  position: relative;
}
.mv_list {
  list-style: none;
  width: 500%;
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
  width: 380px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
}
.mv_cover_img {
  border-radius: 5px;
  position: relative;
  /* left: -40%; */
  left: 0;
  top: 0%;
  width: 100%;
}
.mv_pageTurning {
  /* position: relative;
  right: -60px; */
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
.singer_mod_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  transition: all 0.5s ease-out;
  margin-top: 30px;
  /* margin-left: 30px; */
}
.singer_info_mod_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more_singer {
  display: flex;
  align-items: center;
}
.more_singer span {
  font-size: 14px;
  color: #555;
  cursor: pointer;
  transition: all 0.2s linear;
}
.more_singer .im {
  font-size: 12px;
  margin-left: 3px;
  transition: all 0.2s linear;
}
.more_singer:hover span,
.more_singer:hover .im {
  color: rgb(49, 122, 255);
}
.similar_title_li {
  width: 100%;
  margin-bottom: 20px;
  font-size: 24px;
}
.similar_item {
  /* background: rgb(241, 241, 241); */
  margin-right: 8px;
  padding: 20px 5px 15px 5px;
  position: relative;
}
.item_cover {
  background-size: cover;
  width: 130px;
  height: 130px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.2s linear;
}
.similar_info {
  width: 150px;
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
}
.similar_pic {
  width: 130px;
  border-radius: 50%;
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

.similar_title {
  font-weight: bold;
  font-size: 12px;
  width: 130px;
  color: rgb(43, 43, 43);
}
.similar_info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.similar_title {
  text-align: center;
  font-size: 14px;
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