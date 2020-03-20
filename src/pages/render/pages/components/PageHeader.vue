<template>
  <div id="page-header">
    <div id="left_box">
      <div class="router_control">
        <button class="ctl_btn" @click="goback">
          <i class="im im-angle-left"></i>
        </button>
        <button class="ctl_btn">
          <i class="im im-angle-right" @click="goforward"></i>
        </button>
        <button class="ctl_btn" @click="refreshPage">
          <i class="im im-sync"></i>
        </button>
      </div>
      <div id="logo_box">
        <img src="../../assets/logo.png" />
      </div>
      <div
        id="se_box"
        @mousedown="offEvent($event)"
        :class="isfoucs?'search_box focus_search':isCount>0?'search_box over_search':'search_box'"
      >
        <div id="search_input_box">
          <input
            id="search_input"
            type="text"
            ref="se_input"
            @focus="showHotKey(true)"
            @blur="showHotKey(false)"
            v-model="inText"
            @keyup.enter="search()"
            :placeholder="placeholderText"
          />
          <button id="search_button" @click="search">
            <i class="im im-magnifier"></i>
          </button>
        </div>

        <div
          :class="Object.keys(tipList).length>0 && inText.length>0?'hotkey_box smt_box':'hotkey_box'"
        >
          <div v-show="inText.length==0" class="hotkeyList">
            <span class="key_title">热搜</span>
            <div class="keyList">
              <span
                class="key_text"
                v-for="(item,index) in hotkey.slice(0, 10)"
                :key="index"
                @click="intoInput(item.k)"
              >{{item.k}}</span>
            </div>
          </div>
          <div v-show="inText.length==0" class="search_history">
            <span class="key_title">搜索历史</span>
            <div class="keyList">
              <span
                class="key_text"
                v-for="(item,index) in searchHistory.slice(0, 20)"
                :key="index"
                @click="intoInput(item.queryText)"
              >{{item.queryText}}</span>
            </div>
          </div>
          <div v-show="Object.keys(tipList).length>0 && inText.length>0" class="smartTip_box">
            <div class="smart_songs" v-show="Object.keys(tipList.song.itemlist).length>0">
              <div class="tip_title">
                <span>单曲</span>
              </div>
              <ul class="s_t s_songs_list" v-if="Object.keys(tipList).length>0">
                <li
                  class="list_item"
                  v-for="(item,index) in tipList.song.itemlist"
                  :key="index"
                  @click="intoInput(item.name + ' - '+item.singer)"
                >
                  <span>{{ item.name }} - {{ item.singer }}</span>
                </li>
              </ul>
            </div>
            <div class="smart_album">
              <div class="tip_title" v-show="Object.keys(tipList.album.itemlist).length>0">
                <span>专辑</span>
              </div>
              <ul class="s_t s_album_list" v-if="Object.keys(tipList).length>0">
                <li
                  class="list_item"
                  v-for="(item,index) in tipList.album.itemlist"
                  :key="index"
                  @click="intoInput(item.name + ' - '+item.singer)"
                >
                  <span>{{ item.name }} - {{ item.singer }}</span>
                </li>
              </ul>
            </div>
            <div class="smart_singer" v-show="Object.keys(tipList.singer.itemlist).length>0">
              <div class="tip_title">
                <span>歌手</span>
              </div>
              <ul class="s_t s_singer_list" v-if="Object.keys(tipList).length>0">
                <li
                  class="list_item"
                  v-for="(item,index) in tipList.singer.itemlist"
                  :key="index"
                  @click="intoInput(item.name + ' - '+item.singer)"
                >
                  <span>{{ item.name }}</span>
                </li>
              </ul>
            </div>
            <div class="smart_mv" v-show="Object.keys(tipList.mv.itemlist).length>0">
              <div class="tip_title">
                <span>MV</span>
              </div>
              <ul class="s_t s_mv_list" v-if="Object.keys(tipList).length>0">
                <li
                  class="list_item"
                  v-for="(item,index) in tipList.mv.itemlist"
                  :key="index"
                  @click="intoInput(item.name + ' - '+item.singer)"
                >
                  <span>{{ item.name }} - {{ item.singer }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="isHeadPapel?'right_box hover_box':'right_box'">
      <div class="name_box">
        <i class="im im-angle-down"></i>
        <span class="user_name" @click="showLogin(true)">{{ suser.info.userName }}</span>
      </div>
      <div class="head_img_box" @mouseover="showOverPapel(true)" @mouseout="showOverPapel(false)">
        <img class="head" :src="suser.info.headImgLink" @click="showLogin(true)" />
        <div
          class="head_hover"
          v-show="isHeadPapel"
          @mouseover="switchFlag(true)"
          @mouseout="switchFlag(false)"
        >
          <div class="song_overview">
            <div class="ov_box like_ov_box">
              <span class="count like_count">49</span>
              <span class="title like_title">喜欢的歌</span>
            </div>

            <div class="ov_box established_ov_box">
              <span class="count established_count">6</span>
              <span class="title established_title">收藏的歌单</span>
            </div>

            <div class="ov_box collection_ov_box">
              <span class="count collection_count">12</span>
              <span class="title collection_title">建立的歌单</span>
            </div>
          </div>
          <div class="func_btns">
            <button class="func_btn edit_userdata_btn" @click="testv()">编辑资料</button>
            <button class="func_btn exit_user_btn" @click="userExit">登出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vbus from "./../../vbus/vbus";
// import Qs from "qs";
export default {
  name: "PageHeader",
  data() {
    return {
      // isShow: false
      isfoucs: false,
      isCount: 0,
      hotkey: [],
      inText: "",
      isSeach: 0,
      isHeadPapel: false,
      isHeadFlag: false,
      placeholderText: "搜索",
      searchHistory: [],
      tipList: {
        song: {
          itemlist: []
        },
        album: {
          itemlist: []
        },
        mv: {
          itemlist: []
        },
        singer: {
          itemlist: []
        }
      }
    };
  },
  mounted() {
    this.$http
      .get("http://39.108.229.8:3200/getHotkey")
      .then(res => {
        this.hotkey = res.data.response.data.hotkey;
      })
      .catch(err => {
        console.log(err);
      });
    this.$db.find({ name: "queryText" }, (err, ret) => {
      if (!err) this.searchHistory = ret;
    });
  },
  computed: {
    suser() {
      let userData = this.$store.state.suser.suser;
      if (userData.info.headImgLink == "")
        userData.info.headImgLink = require("../../assets/user.png");
      return userData;
    }
  },
  watch: {
    isSeach() {
      let q = {
        name: "queryText",
        queryText: this.inText
      };
      new Promise((resolve, reject) => {
        this.$db.count(q, (err, ret) => {
          if (!err)
            if (ret < 1)
              this.$db.insert(
                { ...q, time: Number(new Date()) },
                (err, ret) => {
                  if (!err) resolve(ret);
                  else reject(err);
                }
              );
        });
      })
        .then(() => {
          this.$db
            .find({ name: "queryText" })
            .sort({ time: -1 })
            .exec((err, ret) => {
              if (!err) this.searchHistory = ret;
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    inText() {
      if (this.inText.length > 0 && this.isfoucs) {
        this.$http
          .get("http://39.108.229.8:3200/getSmartbox?key=" + this.inText)
          .then(res => {
            if (
              res.data.response.data.song.count == 0 &&
              res.data.response.data.album.count == 0 &&
              res.data.response.data.mv.count == 0 &&
              res.data.response.data.singer.count == 0
            ) {
              console.log("诶嘿嘿，是空的，我要拿上一次的数据来骗你");
            } else {
              this.tipList = res.data.response.data;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  methods: {
    showOverPapel: function(val) {
      if (val) {
        if (this.$store.state.suser.suser.isLogin) {
          this.isHeadPapel = true;
          this.isHeadFlag = true;
        }
      } else {
        if (!this.isHeadFlag)
          setTimeout(() => {
            this.isHeadPapel = false;
          }, 1500);
      }
    },
    switchFlag: function(val) {
      if (val) this.isHeadFlag = true;
      else this.isHeadFlag = false;
    },
    openLoginWindow: function() {
      // this.isShow = !this.isShow;
      // this.$ipc.send("showlyirc", this.isShow);
    },
    showHotKey: function(e = false) {
      this.isCount++;
      this.isfoucs = e;
      if (this.isfoucs) this.placeholderText = "";
      else if (!this.isfoucs && this.inText.length == 0) {
        this.tipList = {
          song: {
            itemlist: []
          },
          album: {
            itemlist: []
          },
          mv: {
            itemlist: []
          },
          singer: {
            itemlist: []
          }
        };
        this.placeholderText = "搜索";
      }
      if (this.isfoucs && this.inText) {
        let textt = this.inText;
        this.inText = textt;
      }
    },
    offEvent: function(enent) {
      if (enent.target.id !== "search_input") event.preventDefault();
    },
    intoInput(text) {
      this.inText = text;
    },
    search: function() {
      if (this.isfoucs & (this.inText != "")) {
        this.$store.commit("chageSearchKey", {
          searchKey: this.inText,
          ladding: true
        });
        this.isSeach++;
        this.$router.push("/searchResultsPage");
      }
    },
    inspectionRecord: async function(text) {
      let rt = "";
      await this.$db.count(
        { name: "queryText", queryText: text },
        (err, ret) => {
          if (!err) {
            rt = ret > 0 ? true : false;
          }
        }
      );
      return rt;
    },
    goback: function() {
      this.$router.go(-1);
    },
    goforward: function() {
      this.$router.go(1);
    },
    refreshPage: function() {
      vbus.$emit("refresh");
      this.$db.remove({}, { multi: true }, (err, ret) => {
        if (!err) console.log(ret);
      });
      this.$db.find({}, (err, ret) => {
        if (!err) console.log(ret);
      });
    },
    showLogin: function(val) {
      this.$store.commit("changeLoginWindwState", val);
      this.$ipc.send(
        "showLoginWindow",
        this.$store.state.state.loginWindowIsShow
      );
    },
    testv: function() {
      this.$httpV({
        method: "post",
        url: "http://localhost:9649/songList/getUserList",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    userExit: function() {
      this.$httpV({
        method: "post",
        url: "http://localhost:9649/user/exit",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          console.log(res);
          this.$userDb.remove({}, { multi: true }, (err, res) => {
            if (!err) if (res > 0) this.$store.commit("destructionUser");
          });
          this.$userDb.find({}, (err, res) => {
            if (!err) console.log(res);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
#page-header {
  height: 40px;
  width: calc(100% - 240px);
  background: white;
  position: fixed;
  padding: 20px 0;
  right: 0;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/******** */
#left_box {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
.router_control {
  margin: 0 15px 0 20px;
}
.ctl_btn {
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  margin: 0 2px;
}
.ctl_btn .im {
  font-size: 12px;
  font-weight: lighter;
}
#logo_box {
  /* margin: 0 15px 0 30px; */
  position: relative;
  top: 2px;
}
#logo_box img {
  width: 70px;
}
.search_box {
  /* position: absolute;
  top: 0; */
  left: 240px;
  width: 220px;
  margin: 0 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: column;

  background: white;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 20px;

  transition: all 0.2s linear;
}
.focus_search {
  border-radius: 20px;
}
#search_input_box {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0px;
  width: 100%;
  z-index: 14;
}
#search_input {
  height: 15px;
  width: 100%;
  margin: 3px 5px;
  font-size: 12px;
  padding-left: 8px;
  outline: none;
  border: none;
  background: none;
}
#search_input::-webkit-input-placeholder {
  color: rgb(156, 156, 156);
}
#search_button {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  margin-right: 5px;
}
#search_button i {
  color: rgb(136, 136, 136);
  font-size: 12px;
  position: relative;
  top: 2px;
}

.hotkey_box {
  position: absolute;
  overflow: hidden;
  top: 40%;
  width: calc(220px - 40px);
  height: 0;
  background: white;
  padding: 0 20px;
  border: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 13;
}
.smt_box {
  padding: 0;
  width: 220px;
}
.focus_search .hotkey_box {
  height: unset;
  border-right: 1px solid rgb(230, 230, 230);
  border-left: 1px solid rgb(230, 230, 230);
  /* border-bottom: 1px solid rgb(230, 230, 230); */
  box-shadow: 0px 13px 20px -5px #00000029;
  /* animation: hotkey_foucs 0.2s 0.1s linear both; */
}
/* .over_search .hotkey_box {
  animation: hotkey_over 0.2s 0.1s linear both;
} */
@keyframes hotkey_foucs {
  0% {
    height: 0px;
    bordeer: 0;
  }
  100% {
    height: unset;
    border-right: 1px solid rgba(0, 0, 0, 0.062);
    border-left: 1px solid rgba(0, 0, 0, 0.062);
    border-bottom: 1px solid rgba(0, 0, 0, 0.062);
    box-shadow: 0px 13px 20px -5px #00000029;
  }
}
@keyframes hotkey_over {
  0% {
    height: 200px;
  }
  100% {
    height: 0px;
  }
}
.hotkeyList {
  width: 100%;
  margin-top: 15px;
  border-top: 1px solid rgb(231, 231, 231);
  transition: 0.2s linear;
}
.key_title {
  font-size: 10px;
}
.keyList {
  margin: 10px 0;
  flex-wrap: wrap;
  display: flex;
}
.key_text {
  font-size: 10px;
  border-radius: 20px;
  margin: 5px;
  padding: 4px 6px;
  border: 1px solid rgb(206, 206, 206);
  color: rgb(61, 61, 61);
  transition: all 0.1s linear;
  cursor: pointer;
}
.key_text:hover {
  background: rgb(248, 248, 248);
}
.smartTip_box {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid rgb(231, 231, 231);
  transition: 0.2s linear;
}
.s_t {
  list-style: none;
  padding: 0;
  margin-top: 5px;
}
.tip_title {
  font-size: 10px;
  padding-left: 20px;
}
.list_item {
  transition: 0.2s linear;
  cursor: pointer;
  padding-left: 20px;
}
.list_item:hover {
  background: rgb(240, 240, 240);
}
.list_item span {
  color: rgb(61, 61, 61);
  font-size: 12px;
}
/*** */
.right_box {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.name_box {
  position: relative;
  margin-right: 12px;
  cursor: pointer;
}
.name_box .im {
  font-size: 10px;
  margin-right: 5px;
  transition: all 0.1s linear;
}
.user_name {
  font-size: 12px;
  color: rgb(83, 83, 83);
  transition: all 0.1s linear;
}
.name_box:hover .user_name,
.name_box:hover .im {
  color: rgb(49, 122, 255);
}
.head_img_box {
  position: relative;
}
.head {
  width: 30px;
  height: 30px;
  position: relative;
  top: 3px;
  cursor: pointer;
  background: rgb(212, 212, 212);
  border-radius: 50%;
}
.head_hover {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 240px;
  /* height: 140px; */
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 #00000024;
  background: url("./../../assets/bb-king.gif") no-repeat;
  background-color: white;
  background-size: cover;
  background-position-y: -88px;
  background-position-x: -135px;
}
.hover_box .head,
.hover_box .name_box {
  z-index: 2;
  pointer-events: none;
}
.hover_box .name_box .im {
  opacity: 0;
}

.song_overview {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25%;
  overflow: hidden;
}
.ov_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  /* border-right: 1px solid rgb(221, 221, 221); */
}
.collection_ov_box {
  border: 0;
}
.ov_box .count {
  font-size: 16px;
}
.ov_box .title {
  margin-top: 3px;
  font-size: 10px;
}
.func_btns {
  pointer-events: all;
  width: 100%;
  margin-top: 15px;
  /* border-top: 1px solid rgb(221, 221, 221); */
  transition: all 0.2s linear;
}
.func_btn {
  width: 50%;
  background: none;
  outline: none;
  height: 30px;
  border: 0;
  cursor: pointer;
}

.edit_userdata_btn {
  /* border-right: 1px solid rgb(221, 221, 221); */
}
.func_btn:hover {
  color: rgb(49, 112, 255);
}
</style>