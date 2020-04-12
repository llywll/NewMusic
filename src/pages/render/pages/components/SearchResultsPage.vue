<template>
  <div class="resulet_box">
    <div class="sreach_info">
      <span class="info_title">{{stext.trim()}}</span>
    </div>
    <div class="resulet_type">
      <span
        :class="isSearchType=='song'?'type_tab act_tab':'type_tab'"
        @click="changeSreachType('song')"
      >单曲</span>
      <span
        :class="isSearchType=='songSheet'?'type_tab act_tab':'type_tab'"
        @click="changeSreachType('songSheet')"
      >歌单</span>
      <span
        :class="isSearchType=='album'?'type_tab act_tab':'type_tab'"
        @click="changeSreachType('album')"
      >专辑</span>
      <span
        :class="isSearchType=='mv'?'type_tab act_tab':'type_tab'"
        @click="changeSreachType('mv')"
      >MV</span>
    </div>'
    <div class="resulet_list_box">
      <div class="loading_Box" ref="loading_Box" v-show="isloading_Box">
        <loading></loading>
      </div>
      <ul class="resulet_list_ul song_list" v-if="searchSongResults && isSearchType=='song'">
        <li class="res_list_th">
          <div class="d_th song_name">
            <span>歌名</span>
          </div>
          <div class="d_th song_singer">
            <span>艺人</span>
          </div>
          <div class="d_th song_album">
            <span>专辑</span>
          </div>
          <div class="d_th song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="res_list_item" v-for="(item,index) in searchSongResults" :key="index">
          <div class="d_li song_name" :data-id="item.mid" @click="playOne(item.mid)">
            <span v-html="item.title_hilight"></span>
          </div>

          <div class="d_li song_singer">
            <div v-for="(s_singer,index) in item.singer" :key="index">
              <a @click="intoSingerPage(s_singer.mid)">
                <span>{{s_singer.title_hilight}}</span>
              </a>
              <label v-if="index!=item.singer.length - 1">/</label>
            </div>
          </div>
          <div class="d_li song_album">
            <span v-html="item.album.title_hilight" @click="intoAlbumPage(item.album.mid)"></span>
          </div>
          <div class="d_li song_time">
            <span>{{ item.interval }}</span>
          </div>
        </li>
      </ul>
      <ul class="resulet_list_ul album_list" v-if="searchAlbumResults && isSearchType=='album'">
        <li class="res_list_th">
          <div class="d_th song_album">
            <span>专辑</span>
          </div>
          <div class="d_th song_singer">
            <span>艺人</span>
          </div>
          <div class="d_th album_publishTime">
            <span>发行时间</span>
          </div>
        </li>
        <li class="res_list_item" v-for="(item,index) in searchAlbumResults" :key="index">
          <div class="d_li song_album">
            <span v-html="item.albumName_hilight" @click="intoAlbumPage(item.albumMID)"></span>
          </div>
          <div class="d_li song_singer">
            <div v-for="(s_singer,index) in item.singer_list" :key="index">
              <a @click="intoSingerPage(s_singer.mid)">
                <span v-html="s_singer.name_hilight"></span>
              </a>
              <label v-if="index!=item.singer_list.length - 1">/</label>
            </div>
          </div>
          <div class="d_li album_publishTime">
            <span>{{ item.publicTime }}</span>
          </div>
        </li>
      </ul>
      <ul
        class="resulet_list_ul songSheet_list"
        v-if="searchSongSheetResults  && isSearchType=='songSheet'"
      >
        <li class="res_list_th">
          <div class="d_th song_album">
            <span>歌单</span>
          </div>
          <div class="d_th song_singer">
            <span>创建者</span>
          </div>
          <div class="d_th album_publishTime">
            <span>关注量</span>
          </div>
        </li>
        <li class="res_list_item" v-for="(item,index) in searchSongSheetResults" :key="index">
          <div class="d_li song_album">
            <span v-html="item.dissname" @click="intoSongSheetPage(item.dissid)"></span>
          </div>
          <div class="d_li song_singer">
            <span v-html="item.creator.name"></span>
          </div>
          <div class="d_li album_publishTime">
            <span>{{ item.listennum /10000 }}万</span>
          </div>
        </li>
      </ul>
      <ul class="resulet_list_ul" v-if="searchMVResults && isSearchType=='mv'">
        <li class="res_list_th">
          <div class="d_th song_name">
            <span>歌名</span>
          </div>
          <div class="d_th song_singer">
            <span>艺人</span>
          </div>
          <div class="d_th song_album">
            <span>专辑</span>
          </div>
          <div class="d_th song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="res_list_item" v-for="(item,index) in searchMVResults" :key="index">
          <div class="d_li song_name" :data-id="item.mid" @click="playOne(item.mid)">
            <span v-html="item.title_hilight"></span>
          </div>

          <div class="d_li song_singer">
            <div v-for="(s_singer,index) in item.singer" :key="index">
              <a @click="intoSingerPage(s_singer.mid)">
                <span>{{s_singer.title_hilight}}</span>
              </a>
              <label v-if="index!=item.singer.length - 1">/</label>
            </div>
          </div>
          <div class="d_li song_album">
            <span v-html="item.album.title_hilight" @click="intoAlbumPage(item.album.mid)"></span>
          </div>
          <div class="d_li song_time">
            <span>{{ item.interval }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import loading from "./../loading";
export default {
  name: "SearchResultsPage",
  data: function() {
    return {
      searchSongResults: [],
      searchAlbumResults: [],
      searchSongSheetResults: [],
      searchMVResults: [],
      isloading_Box: true,
      page: 1,
      limit: 50,
      isSearchType: "album"
    };
  },
  components: {
    loading
  },
  mounted() {
    if (Object.keys(this.searchSongResults).length < 1) {
      this.getSongResults(false, this.$store.state.search.searchKey);
    }
  },
  watch: {
    stext() {
      (this.searchSongResults = []),
        (this.searchAlbumResults = []),
        (this.searchSongSheetResults = []),
        (this.isloading_Box = true);
      switch (this.isSearchType) {
        case "song":
          this.getSongResults(false, this.$store.state.search.searchKey);
          break;
        case "album":
          this.getAlbumResults(false, this.$store.state.search.searchKey);
          break;
        case "songSheet":
          this.getSongSheetResults(false, this.$store.state.search.searchKey);
          break;
      }
    },
    isSearchType() {
      switch (this.isSearchType) {
        case "song":
          if (Object.keys(this.searchSongResults).length < 1)
            this.getSongResults(false, this.$store.state.search.searchKey);
          break;
        case "album":
          if (Object.keys(this.searchAlbumResults).length < 1)
            this.getAlbumResults(false, this.$store.state.search.searchKey);
          break;
        case "songSheet":
          if (Object.keys(this.searchSongSheetResults).length < 1)
            this.getSongSheetResults(false, this.$store.state.search.searchKey);
          break;
      }
    },
    page() {
      if (this.$store.state.search.searchKey.length > 0) {
        if (Object.keys(this.searchSongResults).length > 0) {
          if (this.page > 0)
            this.getSongResults(false, this.$store.state.search.searchKey);
        }
      }
    }
  },
  computed: {
    stext() {
      return this.$store.state.search.searchKey;
    }
  },
  methods: {
    getSongResults: function(isloadingbox = false, stext) {
      this.searchSongResults = [];
      this.$http
        .get(
          `http://39.108.229.8:3200/getSearchByKey?key= ${stext}&&page=${this.page}&&limit=${this.limit}`
        )
        .then(res => {
          let temp = res.data.response.data.song.list;
          for (let i = 0; i < Object.keys(temp).length; i++) {
            if (temp[i].title_hilight) {
              temp[i].title_hilight = temp[i].title_hilight.replace(
                /<\s?em/,
                "<span class='emt'"
              );
              temp[i].title_hilight = temp[i].title_hilight.replace(
                /<\/\s?em/,
                "</span"
              );
            }
            if (temp[i].singer[0]) {
              temp[i].singer[0].title_hilight = temp[
                i
              ].singer[0].title_hilight.replace(/<\s?em/, "<span class='emt'");
              temp[i].singer[0].title_hiligh = temp[
                i
              ].singer[0].title_hilight.replace(/<\/\s?em/, "</span");
            }
            if (temp[i].album.title_hilight) {
              temp[i].album.title_hilight = temp[i].album.title_hilight.replace(
                /<\s?em/,
                "<span class='emt'"
              );
              temp[i].album.title_hilight = temp[i].album.title_hilight.replace(
                /<\/\s?em/,
                "</span"
              );
            }
          }
          this.searchSongResults = temp;
          this.isloading_Box = isloadingbox;
        })
        .catch(err => {
          console.log("axios:", err);
        });
    },
    getAlbumResults: function(isloadingbox = false, stext) {
      this.searchAlbumResults = [];
      this.$http
        .get(
          `http://39.108.229.8:3300/search?key=${stext}&pageNo=${this.page}&pageSize=${this.limit}&t=8&raw=1`
        )
        .then(res => {
          console.log(res);
          this.searchAlbumResults = res.data.data.album.list;
          // let temp = res.data.response.data.song.list;
          for (
            let i = 0;
            i < Object.keys(this.searchAlbumResults).length;
            i++
          ) {
            if (this.searchAlbumResults[i].albumName_hilight) {
              this.searchAlbumResults[
                i
              ].albumName_hilight = this.searchAlbumResults[
                i
              ].albumName_hilight.replace(/<\s?em/, "<span class='emt'");
              this.searchAlbumResults[
                i
              ].albumName_hilight = this.searchAlbumResults[
                i
              ].albumName_hilight.replace(/<\/\s?em/, "</span");
            }
            if (this.searchAlbumResults[i].singer_list[0]) {
              this.searchAlbumResults[
                i
              ].singer_list[0].title_hilight = this.searchAlbumResults[
                i
              ].singer_list[0].title_hilight.replace(
                /<\s?em/,
                "<span class='emt'"
              );
              this.searchAlbumResults[
                i
              ].singer_list[0].title_hiligh = this.searchAlbumResults[
                i
              ].singer_list[0].title_hilight.replace(/<\/\s?em/, "</span");
            }
          }
          // this.searchSongResults = temp;
          this.isloading_Box = isloadingbox;
        })
        .catch(err => {
          console.log("axios:", err);
        });
    },
    getSongSheetResults: function(isloadingbox = false, stext) {
      this.searchSongSheetResults = [];
      this.$http
        .get(
          `http://39.108.229.8:3300/search?key=${stext}&pageNo=${this.page}&pageSize=${this.limit}&t=2&raw=1`
        )
        .then(res => {
          console.log(res);
          this.searchSongSheetResults = res.data.data.list;
          // this.searchSongResults = temp;
          this.isloading_Box = isloadingbox;
        })
        .catch(err => {
          console.log("axios:", err);
        });
    },
    changeSreachType(type) {
      this.isSearchType = type;
    },
    playOne(mid) {
      this.$http
        .get(`http://39.108.229.8:3200/getSongInfo?songmid=${mid}`)
        .then(res => {
          console.log(res.data.response.songinfo.data.track_info);
          let tempItem = res.data.response.songinfo.data.track_info;
          let p_list = {
            title: tempItem.title,
            singer: tempItem.singer[0].title,
            songMid: tempItem.mid,
            interval: tempItem.interval,
            albumMid: tempItem.album.id
          };

          this.$store.commit("changeIsRadioState", {
            radioId: -1,
            isplay: false
          });
          this.$store.commit("addToListHead", p_list);
          this.$store.dispatch("chageplayingStateAsync", {
            p_ing: p_list,
            actIndex: 0
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    intoSingerPage(mid) {
      this.$router.push(`/SingerInfoPage/${mid}`);
    },
    intoAlbumPage(mid) {
      this.$router.push(`/AlbumPage/${mid}`);
    },
    intoSongSheetPage(dissid) {
      this.$router.push(`/SongSheetPage/${dissid}`);
    }
  },
  activated() {
    if (Object.keys(this.searchSongResults).length < 1) {
      this.isSearchType = "song";
      this.getSongResults(false, this.$store.state.search.searchKey);
    }
  }
};
</script>
<style scoped>
.resulet_box {
  margin: 80px 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.sreach_info {
  margin: 0px 0 10px 30px;
}
.info_title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(90, 90, 90);
}
.resulet_type {
  width: calc(100% - 60px);
  /* border-bottom: 1px solid rgb(236, 236, 236); */
  /* padding-bottom: 10px; */
  margin: 20px 30px 8px 30px;
}
.type_tab {
  font-size: 14px;
  margin-right: 40px;
  color: rgb(71, 71, 71);
  cursor: pointer;
  padding-bottom: 5px;
}
.act_tab {
  color: rgb(43, 43, 43);
  font-weight: bold;
  padding-left: 3px;
  padding-right: 5px;
  border-bottom: 2px solid pink;
}
.resulet_list_box {
  position: relative;
  height: 71%;
  overflow-y: auto;
}
.loading_Box {
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.resulet_list_ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}
.res_list_th,
.res_list_item {
  display: flex;
  flex-direction: row;
}
.d_th {
  width: 180px;
  padding-left: 10px;
  /* margin-left: 20px; */
}

.d_th span {
  font-size: 12px;
  color: rgb(116, 116, 116);
}
.song_name {
  width: 50%;
  cursor: pointer;
}
.song_singer,
.song_album {
  width: 20%;
  cursor: pointer;
}

.album_list .song_album,
.album_list .song_singer,
.songSheet_list .song_album,
.songSheet_list .song_singer {
  width: 40%;
}
.song_singer {
  display: flex;
  cursor: pointer;
  flex-direction: row;
}
.song_singer div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.song_time {
  width: 50px;
}

.res_list_item {
  margin: 10px 0;
  transition: all 0.2s linear;
  border-radius: 5px;
}
.res_list_item:hover {
  background: rgb(49, 122, 255);
}
.d_li {
  padding: 10px 0 13px 10px;
}
.d_li span {
  font-size: 12px;
  transition: all 0.1s linear;
  color: rgb(61, 61, 61);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  display: block;
}
.res_list_item:hover .d_li span,
.res_list_item:hover label {
  color: white;
}

.album_list .album_publishTime {
  width: 150px;
}
span >>> .emt {
  color: rgb(49, 122, 255);
}
</style>