<template>
  <div id="content">
    <leftbox></leftbox>
    <main class="right_mainContent">
      <p_header></p_header>
      <transition mode="out-in" name="mk">
        <keep-alive :max="10" exclude="MVPlayPage">
          <router-view v-if="!refresh" />
        </keep-alive>
      </transition>
      <playBar></playBar>
    </main>
    <div class="alert_bg_zhezhao" v-show="isAlert">
      <div class="alert_box">
        <div class="tip_head">
          <span>提醒</span>
        </div>
        <div class="tip_body">
          <i class="im im-warning"></i>
          <span>{{ wraningText }}</span>
        </div>
        <div class="tip_fouter">
          <button class="pr_btn pr_cancel_btn" @click="submitRes(false)">
            <span>取消</span>
          </button>
          <button class="pr_btn pr_ok_btn" @click="submitRes(true)">
            <span>确定</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import p_header from "./components/PageHeader.vue";
import playBar from "./components/PlayBar.vue";
import leftbox from "./components/LeftBox.vue";
import vbus from "../vbus/vbus";
export default {
  components: {
    p_header,
    playBar,
    leftbox
  },
  name: "MainPage",
  data: function() {
    return {
      cover_box: "cover_box",
      play_page: "play_page ",
      sidebar_a: "sidebar_a",
      songInfo: "songInfo",
      refresh: false,
      isAlert: false,
      wraningText: "",
      caller: ""
    };
  },
  mounted() {
    this.$ipc.send("showMainWindow");
    vbus.$on("refresh", () => {
      this.refresh = true;
      this.$nextTick(() => {
        this.refresh = false;
      });
    });
    this.$ipc.on("ShowAlertBox", (e, val) => {
      if (!e) console.log(e);
      if (val.type == "warning") {
        this.wraningText = val.text;
        this.caller = val.caller;
        this.isAlert = true;
      }
    });
  },
  methods: {
    submitRes: function(res) {
      this.$MainWinodw.send(this.caller, res);
      this.wraningText = "";
      this.isAlert = false;
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

/**** */
.right_mainContent {
  /**主体内容 */
  height: 100%;
  width: calc(100% - 240px);
  position: relative;
  /* overflow: hidden; */
}
.act_mian {
  overflow: unset;
}
/****** */
.mk-enter,
.mk-leave-to {
  /* transform: translate3d(-100%, 0, 0); */
  opacity: 0;
}
.mk-leave,
.mk-enter-to {
  /* transform: translate3d(0, 0, 0); */
  opacity: 1;
}
.mk-enter-active,
.mk-leave-active {
  transition: all 0.2s linear;
}
.alert_bg_zhezhao {
  background: rgba(0, 0, 0, 0.158);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert_box {
  width: 450px;
  height: 200px;
  background: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.24);
  border-left: 5px solid rgb(49, 112, 255);
}
.tip_head {
  width: calc(100% - 20px);
  padding: 5px 0;
  padding-left: 20px;
  letter-spacing: 3px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
}
.tip_body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: 65%;
  letter-spacing: 3px;
  font-size: 24px;
  padding-left: 20px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.075); */
}
.tip_body .im {
  position: relative;
  left: -5%;
  top: 2px;
  font-size: 24px;
}
.tip_body span{
  width: 70%;
}
.tip_fouter {
  display: flex;
  justify-content: flex-end;
  /* background: pink; */
  padding-right: 10px;
}
.pr_btn {
  border: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.11);
  outline: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 2px;
  width: 100px;
  cursor: pointer;
  transition: all 0.1s linear;
}
.pr_ok_btn {
  background: rgb(49, 112, 255);
}
.pr_ok_btn span {
  color: white;
}
.pr_cancel_btn:hover {
  background: rgb(240, 240, 240);
}
.pr_ok_btn:hover {
  background: rgb(49, 112, 200);
}
/******* */
</style>