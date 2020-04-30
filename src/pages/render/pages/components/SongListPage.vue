<template>
  <div class="SonglistPage">
    <div class="bg_img">
      <div class="bg_zhezhao"></div>
    </div>
    <div class="list_content">
      <div class="list_img_box">
        <img class="list_img" src="../../assets/fin.jpg" />
        <div class="info_count">
          <span class="c_count">12首歌曲，约45分钟</span>
        </div>
        <div class="desc_box">
          <span class="span_jianjie">简介</span>
          <span class="span_desc" v-html="listInfo.lDesc"></span>
        </div>
      </div>
      <div class="info_songlist_box">
        <div class="text_info">
          <div class="title_box">
            <span class="span_title" v-html=" listInfo.lListname"></span>
          </div>
          <div class="at_box">
            <i class="im im-user-circle"></i>
            <span class="span_at" v-html="listInfo.lCreator"></span>
          </div>
          <div class="at_box">
            <span class="span_at">2019年3月27日创建</span>
          </div>
        </div>
        <div class="song_func_btns">
          <button
            class="s_btn s_btn_1"
            v-if="listInfo.songs"
          >
            <i class="im im-play"></i>
            <span>播放全部</span>
          </button>
          <button class="s_btn s_btn_2">
            <i class="im im-menu-dot-v"></i>
          </button>
        </div>
        <ul class="s_list_ul" v-if="listInfo.songs">
          <li class="s_list_item s_th">
            <div class="song_index"></div>
            <div class="song_name">
              <span>歌曲</span>
            </div>
            <div class="song_singer">
              <span>艺人</span>
            </div>
            <div class="song_album">
              <span>专辑</span>
            </div>
            <div class="song_time">
              <span>时长</span>
            </div>
          </li>
          <li class="s_list_item s_td" v-for="(item,index) in listInfo.songs" :key="index">
            <div class="song_index">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="song_name" @click="playSong(item.sMid)">
              <span>{{item.sName}}</span>
            </div>
            <div class="song_singer">
              <span>{{ item.sSinger }}</span>
            </div>
            <div class="song_album">
              <span>{{ item.sAlbumName }}</span>
            </div>
            <div class="song_time">
              <span
                v-if="item.sTime % 60 < 10"
              >0{{parseInt(item.sTime / 60)}}:0{{item.sTime % 60}}</span>
              <span
                v-else
              >0{{parseInt(item.sTime / 60)}}:{{item.sTime % 60}}</span>
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
            <div class="song_album">
              <span>专辑</span>
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
  </div>
</template>
<script>
export default {
  name: "SonglistPage",
  data() {
    return {
      list_id: ""
    };
  },
  mounted() {
    this.list_id = this.$route.params.list_id;
  },
  watch: {
    list_id() {
      this.init(this.list_id);
    },
    $route() {
      if (this.$route.name == "SonglistPage")
        this.list_id = this.$route.params.list_id;
    }
  },
  computed: {
    listInfo() {
      for (
        let i = 0;
        i < this.$store.state.suser.collectionSonglist.length;
        i++
      ) {
        if (this.$store.state.suser.collectionSonglist[i].lId == this.list_id)
          return this.$store.state.suser.collectionSonglist[i];
      }
      return {};
    }
  },
  methods: {
    init: function(list_id) {
      this.$httpV
        .get(`http://localhost:9649/songList/getSongListInfo?lId= ${list_id}`)
        .then(response => {
          console.log(
            this.$store.state.suser.collectionSonglist,
            response.data.data[0]
          );
          this.$store.dispatch("upSTSonglist", response.data.data[0]);
        })
        .catch(error => {
          console.log(error);
        });
    },
    playSong:function(sMid){
      console.log(sMid)
    }
  }
};
</script>
<style scope>
.SonglistPage {
  width: 100%;
  /* margin-top: 80px; */
  position: relative;
}
.bg_img {
  width: 100%;
  height: 400px;
  /* border:1px solid pink; */
  /* background-image: url(../../assets/fin.jpg); */
  background-size: cover;
  background-position-y: 50%;
  position: absolute;
  z-index: -1;
  top: 0;
}
.bg_zhezhao {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}
.list_content {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding-top: 100px;
}
.list_img_box {
  margin: 20px;
  width: 340px;
}
.list_img {
  width: 240px;
  border-radius: 10px;
  pointer-events: none;
  border: 1px solid rgba(0, 0, 0, 0.103);
  /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.212); */
}
.info_count {
  margin: 12px 0;
}
.c_count {
  font-size: 12px;
  color: rgb(97, 97, 97);
}
.desc_box {
  margin-top: 5px;
  padding-top: 16px;
  font-size: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.096);
  display: flex;
  flex-direction: column;
}
.span_jianjie {
  font-size: 22px;
  font-weight: bold;
}
.span_desc {
  margin-top: 5px;
  color: rgb(56, 56, 56);
}

/*** */
.info_songlist_box {
  width: 100%;
  position: relative;
}
.text_info {
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 20px;
  /* justify-content:space-between;  */
}
.span_title {
  font-size: 26px;
  font-weight: bold;
}
.at_box {
  display: flex;
  align-items: center;
  margin: 2px 0;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.575);
}
.at_box .im {
  font-size: 12px;
  margin-right: 3px;
}
.span_at {
  font-size: 14px;
}

.song_func_btns {
  position: absolute;
  right: 30px;
  top: 62px;
  display: flex;
}
.s_btn {
  cursor: pointer;
  outline: none;
  background: rgb(49, 112, 255);
  color: white;
  border: 0;
  padding: 8px 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-right: 16px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.212);
}
.s_btn .im {
  font-size: 14px;
  margin-right: 5px;
}
.s_btn_1 {
  margin-right: 8px;
}
.s_btn_1 .im {
  position: relative;
}
.s_btn_2 {
  padding: 18px;
  position: relative;
}
.s_btn_2 .im {
  position: absolute;
  left: 30%;
  top: 32%;
}

/** */
.list_ul_box {
  /* position: absolute;
  top: 35%;
  left: 360px; */
  /* width: 100%; */
}
.s_list_ul {
  list-style: none;
  margin-right: 50px;
  padding-left: 20px;
}
.s_list_item {
  display: flex;
  flex-direction: row;
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
.s_td:hover span {
  color: white;
}
.song_index span {
  position: relative;
  top: 2px;
}
.s_list_item .song_index {
  width: 20px;
  font-size: 14px;
}
.s_list_item span {
  font-size: 12px;
  color: rgb(107, 107, 107);
  transition: all 0.1s linear;
}
.s_list_item .song_name {
  width: 50%;
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
</style>