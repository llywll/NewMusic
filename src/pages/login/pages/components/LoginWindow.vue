<template>
  <div id="loginWindow">
    <div class="bg_box">
      <img class="bg_img" src="../../assets/dribbble.gif" />
    </div>
    <div class="login">
      <div class="t_box login_title_box">
        <span class="login_title">账户登录</span>
      </div>
      <div class="t_box user_name_box">
        <div class="tip_box focus_tip">
          <span class="tip name_tip">用户名</span>
        </div>
        <div class="input_box name_box">
          <input type="text" class="name_input" />
        </div>
      </div>
      <div class="t_box user_pwd_box">
        <div class="tip_box">
          <span class="tip name_tip">密码</span>
        </div>
        <div class="input_box pwd_box">
          <input type="password" class="pwd_input" />
        </div>
      </div>
      <div class="t_box submit_box">
        <button class="login_btn"></button>
      </div>
      <div class="other_box">
        <div class="auto_login_box">
          <input type="checkbox" class="auto_login_checkbox" value="auto_login" />
          <span>自动登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginWindow",
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style>
#loginWindow {
  width: 650px;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  position: relative;
}
.bg_box {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
}
.bg_img {
  height: 100vh;
  position: relative;
  left: -70px;
}
/*** */

.login {
  background: rgba(255, 255, 255, 0.288);
  height: 100%;
  width: 280px;
}

.t_box {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px 20px 20px 10px;
}
.login_title_box {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.login_title {
  font-weight: lighter;
  font-size: 28px;
}
.tip_box {
  position: absolute;
  left: 0;
  top: 18px;
  transition: all 0.2s ease-in;
}
.focus_tip {
  top: 0px;
}
.input_box {
  border-bottom: 1px solid rgba(0, 0, 0, 0.062);
  /* border-radius: 5px; */
}
.name_input,
.pwd_input {
  margin: 20px 10px 0 8px;
  font-size: 14px;
  line-height: 25px;
  height: 20px;
  outline: none;
  border: 0;
  background: none;
  letter-spacing: 1px;
  color: rgb(85, 85, 85);
  width: calc(100% - 20px);
}
.name_input::selection {
  color: white;
  background: rgb(49, 112, 255);
}
.tip {
  color: rgb(128, 128, 128);
  font-size: 8px;
  margin-left: 10px;
}
</style>