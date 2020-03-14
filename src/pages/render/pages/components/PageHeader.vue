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
          />
          <button id="search_button" @click="search">
            <i class="im im-magnifier"></i>
          </button>
        </div>
        <div class="hotkey_box">
          <div class="hotkeyList">
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
          <div class="search_history">
            <span class="key_title">搜索历史</span>
            <div class="keyList">
              <span
                class="key_text"
                v-for="(item,index) in searchHistory.slice(0, 10)"
                :key="index"
                @click="intoInput(item.queryText)"
              >{{item.queryText}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right_box">
      <div class="name_box">
        <i class="im im-angle-down"></i>
        <span class="user_name">跌落人间</span>
      </div>
      <div class="head_img_box">
        <img class="head" src="../../assets/fin.jpg" />
      </div>
    </div>
  </div>
</template>
<script>
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
      searchHistory: []
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3200/getHotkey")
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
        console.log(this.inText.length);
      }
    }
  },
  methods: {
    openLoginWindow: function() {
      // this.isShow = !this.isShow;
      // this.$ipc.send("showlyirc", this.isShow);
    },
    showHotKey: function(e = false) {
      this.isCount++;
      this.isfoucs = e;
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
      this.$db.remove({}, { multi: true }, (err, ret) => {
        if (!err) console.log(ret);
      });
      this.$db.find({}, (err, ret) => {
        if (!err) console.log(ret);
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
.focus_search .hotkey_box {
  height: unset;
  border-right: 1px solid rgb(230, 230, 230);
  border-left: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
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
.head {
  width: 30px;
  border-radius: 50%;
  position: relative;
  top: 3px;
  cursor: pointer;
}
</style>