<template>
  <div id="loginWindow">
    <div class="bg_box">
      <img class="bg_img" src="../../assets/dribbble.gif" />
    </div>
    <div class="login">
      <div class="t_box login_title_box">
        <span class="login_title">登录</span>
      </div>
      <div class="t_box user_name_box" ref="name_box">
        <div :class="inName.length>0? 'tip_box focus_tip_box':'tip_box'">
          <span class="tip name_tip" ref="name_tip">用户名</span>
        </div>
        <div class="input_box">
          <input
            type="text"
            @focus="focusAct('name',true)"
            @blur="focusAct('name',false)"
            class="name_input"
            v-model="inName"
          />
        </div>
      </div>
      <div class="t_box user_pwd_box" ref="pwd_box">
        <div :class="inPwd.length>0? 'tip_box focus_tip_box':'tip_box'">
          <span class="tip pwd_tip" ref="pwd_tip">密码</span>
        </div>
        <div class="input_box user_pwd_box">
          <input
            type="password"
            class="pwd_input"
            @focus="focusAct('pwd',true)"
            @blur="focusAct('pwd',false)"
            @keyup.enter="enterLogin()"
            v-model="inPwd"
          />
        </div>
      </div>
      <div class="t_box submit_box">
        <button class="btn btn-pink btn-bubbles login_btn" @click="login()">登录</button>
      </div>
      <div class="other_box">
        <div class="auto_login_box">
          <div class="flow_checkbox" @click="check()">
            <i :class="isCheck?'im im-check-square-i':'im im-square-o'"></i>
          </div>
          <span>自动登录</span>

          <div class="REG_box">
            <span>
              沒有账户？
              <a class="reg_tg_btn" @click="intoREGPage(true)">立即注册</a>
            </span>
          </div>
        </div>
        <div class="xy_box">
          <span
            class="err_tip"
            style="margin-left:10px;color:red"
            v-if="errisShow"
            v-html="login_err_msg"
          ></span>
          <span>登录即同意《用户许可协议》《隐私政策》</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Qs from "qs";
export default {
  name: "LoginWindow",
  data() {
    return {
      inName: "",
      inPwd: "",
      isCheck: false,
      isfocus: false,
      login_err_msg: "",
      errisShow: false
    };
  },
  computed: {
    autoLogin() {
      return this.$store.state.suser.autoLogin;
    }
  },
  mounted() {
    this.$userDb.findOne({ name: "autoLogin" }, (err, res) => {
      if (!err)
        if (res) {
          this.isCheck = res.autoLogin;
        } else {
          console.log("autologin为空", res);
          this.$ipc.send("autoLogin", false);
        }
    });
    this.$ipc.on("showError", (e, message) => {
      console.log(e);
      this.errisShow = true;
      this.login_err_msg = `<i class="im im-warning-circle" style="margin-right:2px;font-size:10px"></i>${message}`;
    });
    this.$ipc.on("loginSuccess", (e, message) => {
      console.log(e, message);
      this.login_err_msg = "";
      this.errisShow = false;
      this.$ipc.send("offLoginWindow");
    });
  },
  methods: {
    focusAct: function(ele, isfocus = false) {
      this.isfocus = isfocus;
      this.$refs.name_tip.innerHTML = "用户名";
      this.$refs.pwd_tip.innerHTML = "密码";
      this.login_err_msg = "";
      if (ele == "name") {
        this.$refs.name_box.className = isfocus
          ? "t_box user_name_box focus_box"
          : "t_box user_name_box";
      } else if (ele == "pwd") {
        this.$refs.pwd_box.className = isfocus
          ? "t_box user_pwd_box focus_box"
          : "t_box user_pwd_box";
      }
    },
    check() {
      this.isCheck = !this.isCheck;
      console.log(this.isCheck);
      this.$ipc.send("autoLogin", this.isCheck);
    },
    enterLogin() {
      if (this.isfocus) {
        this.isfocus = !this.isfocus;
        this.$refs.pwd_box.className = "t_box user_pwd_box";
        this.$refs.pwd_box.blur();
        this.login();
      }
    },
    login() {
      if (this.inName.length == 0) {
        this.$refs.name_tip.innerHTML = `<i class="im im-warning-circle" style='color: red; font-size: 10px;margin-right:2px'></i><span style='color:red'>用户名不能为空</span>`;
      }
      if (this.inPwd.length == 0) {
        this.$refs.pwd_tip.innerHTML = `<i class="im im-warning-circle" style='color: red; font-size: 10px;margin-right:2px'></i><span style='color:red'>密码不能为空</span>`;
      }
      if (this.inName.length > 0 && this.inPwd.length > 0) {
        this.errisShow = true;
        this.login_err_msg = "登录中...";
        this.$ipc.send("loginIn", {
          userName: this.inName,
          password: this.inPwd
        });
      }
    },
    intoREGPage: function(val) {
      this.$parent.changeRegWindowState(val);
    }
  }
};
</script>
<style>
@import "https://fonts.googleapis.com/css?family=Lato";
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
  border: 2px solid rgba(255, 255, 255, 0);
  transition: all 0.2s ease-in;
}
.login_title_box {
  display: flex;
  align-items: center;
  margin-top: 30px;
  border: 0;
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

.name_input,
.pwd_input {
  margin-top: 20px;
  padding: 0 10px 5px 9px;
  font-size: 14px;
  line-height: 25px;
  height: 20px;
  outline: none;
  border: 0;
  background: none;
  letter-spacing: 1px;
  color: rgb(85, 85, 85);
  width: calc(100% - 20px);
  transition: all 0.2s ease-in;
  border-bottom: 1px solid rgba(0, 0, 0, 0.158);
}
.name_input::selection,
.pwd_input::selection {
  color: white;
  background: rgba(49, 111, 255);
}
.pwd_input {
  letter-spacing: 2px;
}
.tip {
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: lighter;
  transition: all 0.2s ease-in;
  margin-left: 10px;
}
.focus_box {
  border: 2px solid rgb(49, 112, 255);
  border-radius: 5px;
  box-shadow: -3px 8px 20px 0 #dadada;
  /* margin: 20px 20px 19px 10px; */
}
.focus_box .tip_box,
.focus_tip_box {
  top: 0px;
}
.focus_tip_box .tip,
.focus_box .tip {
  font-size: 8px;
}
.focus_box .name_input,
.focus_box .pwd_input {
  border-bottom: 1px solid rgb(0, 0, 0, 0);
}
.input_box {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.062); */
  /* border-radius: 5px; */
}
.focus_box .input_box {
  border: 0;
}

.submit_box {
  border: 0;
}
/*** */
.btn {
  --hue: 190;
  --btn-bg-color: rgb(49, 112, 255);
  --btn-bg-color-darker: rgb(49, 112, 255);
  position: relative;
  /*padding: 0.75rem 1.5rem;
  margin: 1rem; */
  font-size: 1rem;
  font-family: Lato, sans-serif;
  line-height: 1.5;
  color: white;
  text-decoration: none;
  background-color: var(--btn-bg-color);
  border: 1px solid var(--btn-bg-color);
  border-radius: 4px;
  box-shadow: 0 0.1px 0.7px rgba(233, 30, 99, 0.141),
    0 0.1px 1.7px rgba(233, 30, 99, 0.202),
    0 0.3px 3.1px rgba(233, 30, 99, 0.25),
    0 0.4px 5.6px rgba(233, 30, 99, 0.298),
    0 0.8px 10.4px rgba(233, 30, 99, 0.359), 0 2px 25px rgba(233, 30, 99, 0.5);
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: 0.25s;
}
.btn-pink {
  --hue: 330;
}
.btn-bubbles {
  overflow: visible;
  transition: transform ease-in 0.1s, background-color ease-in 0.1s,
    box-shadow ease-in 0.25s;
}
.btn-bubbles::before {
  position: absolute;
  content: "";
  left: -2em;
  right: -2em;
  top: -2em;
  bottom: -2em;
  transition: ease-in-out 0.5s;
  background-repeat: no-repeat;
  background-image: radial-gradient(
      circle,
      var(--btn-bg-color) 20%,
      transparent 20%
    ),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(
      circle,
      transparent 20%,
      var(--btn-bg-color) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--btn-bg-color) 20%, transparent 20%);
  background-size: 11% 14%, 12% 18%, 20% 20%, 13% 12%, 14% 19%, 17% 10%, 12% 13%,
    10% 18%, 17% 15%, 11% 17%, 11% 18%, 17% 19%, 15% 16%, 16% 20%, 18% 14%,
    19% 19%;
  background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
    65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
    64% 70%, 80% 71%;
  animation: bubbles ease-in-out 0.75s forwards;
}
.btn-bubbles:active {
  transform: scale(0.95);
  background: var(--btn-bg-color-darker);
}
.btn-bubbles:active::before {
  animation: none;
  background-size: 0;
}

@keyframes bubbles {
  0% {
    background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
      65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
      64% 70%, 80% 71%;
  }
  50% {
    background-position: 10% 44%, 0% 20%, 15% 5%, 30% 0%, 42% 0%, 62% -2%,
      75% 0%, 95% -2%, 0% 80%, 95% 55%, 7% 100%, 24% 100%, 41% 100%, 55% 95%,
      68% 96%, 95% 100%;
  }
  100% {
    background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%,
      100% -2%, -5% 80%, 100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%,
      100% 100%;
    background-size: 0% 0%;
  }
}
/*** */
.login_btn {
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  font-weight: lighter;
  margin-top: 10px;
  padding: 8px 0;
  border: 0;
  color: white;
  box-shadow: 2px 1px 20px 2px rgba(49, 111, 255, 0.5);
}

/*** */

.other_box {
  padding-left: 10px;
}
.auto_login_box {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
.other_box span {
  font-size: 10px;
  color: rgba(0, 0, 0, 0.726);
}
.flow_checkbox {
  /* border: 1px solid black; */
  height: 15px;
  width: 15px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flow_checkbox .im {
  font-size: 14px;
  z-index: 2;
  color: rgb(49, 112, 255);
  cursor: pointer;
}
.flow_checkbox .im-square-o {
  color: black;
}
.REG_box {
  position: absolute;
  right: 25px;
  top: -5px;
}
.REG_box span {
  font-size: 10px;
}
.reg_tg_btn {
  color: rgb(49, 112, 255);
  cursor: pointer;
}
.xy_box {
  width: calc(100% - 30px);
  text-align: center;
  margin: 10px 20px 0 10px;
  display: flex;
  flex-direction: column;
}
.err_tip {
  margin: 3px 0;
  align-self: flex-start;
  position: relative;
  left: 15px;
  height: 15px;
}
.xy_box span {
  font-size: 10px;
}
</style>