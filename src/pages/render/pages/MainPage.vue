<template>
  <div id="content">
    <leftbox></leftbox>
    <main class="right_mainContent">
      <p_header></p_header>
      <transition mode="out-in" name="mk">
        <keep-alive :max="10">
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>
      <transition mode="out-in">
        <router-view v-if="!$route.meta.keepAlive" />
      </transition>
      <playBar></playBar>
    </main>
  </div>
</template>
<script>
import p_header from "./components/PageHeader.vue";
import playBar from "./components/PlayBar.vue";
import leftbox from "./components/LeftBox.vue";
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
      songInfo: "songInfo"
    };
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
.act_mian{
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
/******* */
</style>