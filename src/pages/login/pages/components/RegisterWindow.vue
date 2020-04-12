<template>
  <div class="registerPage">
    <div class="reg_bg_box">
      <img class="reg_bg_img" src="../../assets/t_music.gif" />
    </div>
    <div class="back_login_box">
      <button class="back_btn" @click="intoLoginPage()" v-if="stepNum ==1">
        <i class="im im-arrow-left"></i>
        <span>登录</span>
      </button>
      <button class="back_btn" @click="stepNum-=1" v-if="stepNum >1">
        <i class="im im-arrow-left"></i>
        <span>上一步</span>
      </button>
    </div>
    <div class="register">
      <div class="r_box reg_title_box">
        <span class="reg_title" v-if="stepNum==4">即将提交</span>
        <span class="reg_title" v-else-if="stepNum==3">最后一步</span>
        <span class="reg_title" v-else-if="stepNum==2">等待密文</span>
        <span class="reg_title" v-else v-html="fromData.account.length<1?'注册':'起始步骤'"></span>
      </div>
      <transition name="fade" mode="out-in">
        <div class="r_box acc_box" v-if="stepNum == 1">
          <div class="r_tip_box">
            <span
              :class="isfocus.accIsfocus?'r_tip r_acc_tip r_focus_tip':'r_tip r_acc_tip'"
              v-if="isfocus.accIsfocus"
            >键入您的账户以继续</span>
            <span
              :class="fromData.account.length >0?'r_tip r_acc_tip r_focus_tip':'r_tip r_acc_tip'"
              v-else
            >键入您的账户以继续</span>
          </div>
          <div :class="isfocus.accIsfocus?'r_input_box r_focus':'r_input_box'">
            <input
              type="text"
              class="acc_input"
              @blur="isfocus.accIsfocus=false"
              @focus="isfocus.accIsfocus=true;accerrisshow=false"
              v-model="fromData.account"
              @keydown.enter="enterInto(2)"
            />
            <button class="nt_next_btn" @click="inNext(2)">
              <i class="im im-arrow-right"></i>
            </button>
          </div>
          <div class="acc_err_top" v-if="accerrisshow">
            <i class="im im-warning-circle"></i>
            <span>{{acc_err_msg}}</span>
          </div>
        </div>
        <div class="r_box pwd_box" v-else-if="stepNum == 2">
          <div class="r_tip_box">
            <span
              :class="isfocus.pwdIsfocus?'r_tip r_acc_tip r_focus_tip':'r_tip r_acc_tip'"
              v-if="isfocus.pwdIsfocus"
            >现在，输入你的密码</span>
            <span
              :class="fromData.password.length >0?'r_tip r_acc_tip r_focus_tip':'r_tip r_acc_tip'"
              v-else
            >现在，输入你的密码</span>
          </div>
          <div :class="isfocus.pwdIsfocus?'r_input_box r_focus':'r_input_box'">
            <input
              type="password"
              class="acc_input"
              @blur="isfocus.pwdIsfocus=false"
              @focus="isfocus.pwdIsfocus=true;pwderrisshow=false"
              v-model="fromData.password"
              @keydown.enter="enterInto(3)"
            />
            <button class="nt_next_btn" @click="inNext(3)">
              <i class="im im-arrow-right"></i>
            </button>
          </div>

          <div class="acc_err_top" v-if="pwderrisshow">
            <i class="im im-warning-circle"></i>
            <span>密码必须大于6位</span>
          </div>
        </div>
        <div class="r_box un_box" v-else-if="stepNum == 3">
          <div class="r_tip_box">
            <span
              :class="isfocus.unIsfocus?'r_tip r_acc_tip r_focus_tip':'r_tip r_acc_tip'"
              v-if="isfocus.unIsfocus"
            >取一个名字吧</span>
            <span
              :class="fromData.userName.length >0?'r_tip r_acc_tip r_focus_tip':'r_tip r_acc_tip'"
              v-else
            >取一个名字吧</span>
          </div>
          <div :class="isfocus.unIsfocus?'r_input_box r_focus':'r_input_box'">
            <input
              type="text"
              class="acc_input"
              @blur="isfocus.unIsfocus=false"
              @focus="isfocus.unIsfocus=true;unerrisshow=false"
              v-model="fromData.userName"
              @keydown.enter="enterInto(4)"
            />
            <button class="nt_next_btn" @click="inNext(4)">
              <i class="im im-arrow-right"></i>
            </button>
          </div>

          <div class="acc_err_top" v-if="unerrisshow">
            <i class="im im-warning-circle"></i>
            <span>名称不得为空</span>
          </div>
        </div>
        <div class="r_box smt_box" v-else>
          <span class="sun_title" ref="reg_error_message">请留意下列提醒</span>
          <span class="sun_title">
            注册即同意
            <a style="color:rgba(49,112,255)">《用户协议》</a>
            <a style="color:rgba(49,112,255)">《用户隐私协议》</a>
          </span>
          <div class="r_box submit_box">
            <button class="btn btn-pink btn-bubbles reg_btn" @click="signup">现在注册</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "RigisterWindow",
  data() {
    return {
      isfocus: {
        accIsfocus: false,
        pwdIsfocus: false,
        unIsfocus: false
      },
      accerrisshow: false,
      acc_err_msg: "账户名包括A-Z，a-z，0-9在内不少于6个字符，不多于30个字符",
      pwderrisshow: false,
      unerrisshow: false,
      smtisshow: false,
      stepNum: 1,
      fromData: {
        account: "",
        password: "",
        userName: ""
      }
    };
  },
  mounted() {
    this.$ipc.on("showRegError", (e, message) => {
      this.smtisshow = true;
      console.log(e);
      this.$refs.reg_error_message.style = "color:red;";

      this.$refs.reg_error_message.innerHTML = `<i class="im im-warning-circle" style="margin-right:2px;font-size:10px"></i>${message}`;
    });
    this.$ipc.on("signUpSuccess", (e, message) => {
      console.log(e, message);
      console.log(this.$refs.reg_error_message);
      this.$refs.reg_error_message.innerHTML = "";
      this.$ipc.send("offLoginWindow");
    });
  },
  methods: {
    intoLoginPage() {
      this.$parent.changeRegWindowState(false);
    },
    async inNext(stepNum) {
      if (this.stepNum == 1) {
        if (
          (this.fromData.account.length < 6) |
          (this.fromData.account.length > 30)
        ) {
          this.accerrisshow = true;
        } else {
            await  this.$httpV
            .get(
              `http://localhost:9649/user/finduserbynaccount?nAccount=${this.fromData.account}`
            )
            .then(res => {
              console.log(res.data.state, res.data.state === "error");
              if (res.data.state === "error") {
                console.log(res.data.state, res.data.state === "error");
                this.accerrisshow = true;
                this.acc_err_msg = `${res.data.message}`;
                return;
              }
            })
            .catch(err => {
              console.log(err);
              return;
            });
        }
      }
      if(this.accerrisshow)return;
      switch (this.stepNum) {
        case 2:
          if (this.fromData.password.length < 6) {
            this.pwderrisshow = true;
            return;
          }
          break;
        case 3:
          if (this.fromData.userName.length < 1) {
            this.unerrisshow = true;
            return;
          }
          break;
      }
      this.stepNum = stepNum;
    },
    enterInto(stepNum) {
      this.inNext(stepNum);
    },
    signup() {
      this.$ipc.send("signUp", this.fromData);
      this.$refs.reg_error_message.style = "color:red;";
      this.$refs.reg_error_message.innerHTML = "正在等待来自M78星云的响应";
    }
  }
};
</script>

<style scoped>
.registerPage {
  position: relative;
  width: 650px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  position: relative;
}
.reg_bg_box {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
  background-color: rgb(230, 228, 230);
}
.reg_bg_img {
  height: 100%;
  top: 75px;
  position: absolute;
  right: -80px;
  /* left: -50px; */
}
.back_login_box {
  position: fixed;
  top: 10px;
  left: 20px;
}
.back_btn {
  display: flex;
  align-items: center;
  color: rgb(49, 112, 255);
  cursor: pointer;
  border: 0;
  background: none;
  outline: none;
}
.back_btn .im {
  font-size: 12px;
  font-weight: lighter;
  margin-right: 5px;
}
.back_btn span {
  letter-spacing: 2px;
  font-size: 12px;
}
/*** */
.register {
  width: calc(100% -40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
}
.r_box {
  margin: 5px 0;
}
.reg_title {
  margin-left: 5px;
  font-size: 28px;
}
.acc_box {
  /* border: 1px solid red; */
}
.r_tip {
  letter-spacing: 1px;
  font-size: 12px;
  margin-left: 5px;
  transition: all 0.15s linear;
  position: relative;
  top: 20px;
  pointer-events: none;
}
.r_tip_box {
  /* margin-bottom: 10px; */
}
.r_focus_tip {
  top: 0px;
  font-size: 10px;
}
.r_input_box {
  padding: 0px 5px 0 5px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.219);
  /* border-radius: 5px; */
  transition: all 0.2s ease-in;
}
.r_focus {
  border-bottom: 2px solid rgb(49, 112, 255);
  box-shadow: 0px 18px 20px -9px rgba(0, 0, 0, 0.219);
}
.acc_input {
  border: 0;
  background: none;
  outline: none;
  font-size: 16px;
  height: 25px;
  width: 250px;
  line-height: 25px;
  letter-spacing: 2px;
  color: rgb(0, 0, 0);
  transition: all 0.2s ease-in;
  font-family: "等线";
  font-weight: bold;
}
.nt_next_btn {
  border: 0;
  padding: 0 5px;
  background: none;
  cursor: pointer;
  outline: none;
}
.nt_next_btn .im {
  font-size: 12px;
}
.back_last {
  border: 0;
  margin-top: 10px;
  display: flex;
  position: absolute;
  align-items: center;
  background: none;
  /* background-color: rgb(49, 112, 255); */
  /* border-radius: 5px; */
  /* color: white; */
  padding: 5px 15px;
  cursor: pointer;
  outline: none;
}
.back_last .im {
  font-size: 12px;
  margin-right: 5px;
}
.back_last span {
  font-size: 12px;
}
.sun_title {
  display: block;
  margin-top: 20px;
  margin-left: 5px;
  font-size: 12px;
}
.reg_btn {
  width: 200px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  font-weight: lighter;
  margin-top: 10px;
  margin-left: 5px;
  padding: 8px 0;
  border: 0;
  color: white;
  box-shadow: 2px 1px 20px 2px rgba(49, 111, 255, 0.5);
}
</style>