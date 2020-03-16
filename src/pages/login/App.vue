<template>
  <div id="app">
    <div class="derg"></div>
    <login></login>
  </div>
</template>

<script>
import login from "./pages/components/LoginWindow";
export default {
  name: "app",
  components: {
    login: login
  },
  // mounted: function() {
  //   console.log(this.$store.state.playList);
  // },
  created: function() {}
};
</script>

<style>
@import "../../../public/css/iconmonstr-iconic-font.css";
/* CSS */
html {
  overflow: hidden;
  border-radius: 5px;
  -webkit-user-select: none;
}
/*******滑动条******/
::-webkit-scrollbar {
  width: 8px;
  height: 2px;
  background-color: white;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(100, 99, 99, 0.308);
}

/*****************/
body {
  margin: 0;
  border-radius: 5px;
}
#app {
  overflow: hidden;
  border-radius: 5px;
}
.derg {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 20px;
  z-index: 3;
}
</style>
