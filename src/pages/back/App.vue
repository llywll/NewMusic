<template>
  <div id="app">
    <news></news>
  </div>
</template>

<script>
import news from './pages/components/NewWindow'
export default {
  name: "app",
  components :{
    news :news
  },
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
  border-radius: 5px;
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
  -webkit-user-select: none;
}
#app {
  -webkit-app-region: drag;
  overflow: hidden;
  border-radius: 5px;
}
</style>
