<template>
  <div id="app">
    <video class="bg_video" autoplay loop muted>
      <source src="../../../public/andrade.mp4" type="video/mp4" />
      <source src="movie.ogg" type="video/ogg" />您的浏览器不支持Video标签。
    </video>
    <div id="region"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  // mounted: function() {
  //   console.log(this.$store.state.playList);
  // },
  created: function() {
    
  }
};
</script>

<style>
@import "../../../public/css/iconmonstr-iconic-font.css";
/* CSS */
html {
  overflow: hidden;
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
  height: 100vh;
  -webkit-user-select: none;
}
#region {
  /*background-color: rgba(255, 192, 203, 0.575);*/
  position: absolute;
  width: 100%;
  height: 40px;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  z-index: 1000;
  pointer-events: none;
}
#app {
  height: 100%;
  overflow: hidden;
}
.bg_video {
  display: none;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
