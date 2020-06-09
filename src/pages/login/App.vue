<template>
  <div id="app">
    <div class="derg"></div>
    <LoginWindow v-if="!regWindowState" />
    <RegisterWindow v-if="regWindowState" />
  </div>
</template>

<script>
import LoginWindow from "./pages/components/LoginWindow";
import RegisterWindow from "./pages/components/RegisterWindow";
export default {
  name: "app",
  data() {
    return {
      regWindowState: false
    };
  },
  components: {
    LoginWindow,
    RegisterWindow
  },
  methods: {
    changeRegWindowState: function(val) {
      console.log(val);
      this.regWindowState = val;
    }
  }
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
  right: 0;
  width: 88vw;
  height: 20px;
  z-index: 3;
}
.acc_err_top {
  color: red;
  font-size: 10px;
  margin-top: 5px;
  width: 282px;
  position: absolute;
}
.acc_err_top .im {
  font-size: 10px;
  margin-right: 5px;
}
</style>
