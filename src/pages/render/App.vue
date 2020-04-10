<template>
  <div id="app">
    <div id="region"></div>
    <router-view />
  </div>
</template>

<script>
import Qs from "qs";
export default {
  name: "app",
  created() {
    this.$userDb.find({}, (err, res) => {
      console.log("检索用户数据：", res);
    });
    this.$userDb.findOne({ name: "autoLogin" }, (err, res) => {
      if (!err)
        if (res !== null && res !== undefined && res !== "") {
          if (res.autoLogin) {
            console.log("已开启自动登录:", res.autoLogin);
            this.$userDb.findOne(
              {
                name: "user"
              },
              (err, res) => {
                if (!err)
                  if (res) {
                    this.$store.dispatch("loginIn", res.user);
                  }
              }
            );
          }
        }
    });
  },
  mounted() {
    this.$ipc.on("autoLogin", (e, val) => {
      console.log("autologin:", val);
      if (val !== null && val !== undefined && val !== "")
        this.$userDb.findOne({ name: "autoLogin" }, (err, res) => {
          console.log("findOne:", res);
          if (!err)
            if (res)
              this.$userDb.update(
                { name: "autoLogin" },
                { name: "autoLogin", autoLogin: val },
                (uperr, upres) => {
                  console.log("update:", upres);
                  if (!uperr)
                    if (upres > 0) this.$store.commit("setAutoLogin", val);
                }
              );
            else
              this.$userDb.insert(
                { name: "autoLogin", autoLogin: val },
                (err, insres) => {
                  console.log("inster:", insres);
                  if (!err)
                    if (insres > 0) this.$store.commit("setAutoLogin", val);
                }
              );
        });
    });
    this.$ipc.on("loginIn", (e, userData) => {
      this.$httpV({
        method: "post",
        url: "http://localhost:9649/user/login",
        data: Qs.stringify({
          userName: userData.userName,
          password: userData.password
        })
      }).then(response => {
        if (response.data.state === "success") {
          this.$userDb.findOne(
            {
              name: "user",
              user: response.data.data[0]
            },
            (err, queryDbres) => {
              //查找是有此用户
              if (!err)
                if (!queryDbres) {
                  this.$userDb.insert(
                    //没有就插入
                    {
                      name: "user",
                      user: response.data.data[0]
                    },
                    (err, insertRes) => {
                      if (!err)
                        if (insertRes !== null) {
                          //存入运行时数据，返回登录成功状态
                          this.$store.dispatch("loginIn", insertRes.user);
                          this.$ipc.send("loginSuccess");
                        }
                    }
                  );
                } else {
                  this.$userDb.update(
                    //有就更新
                    {
                      name: "user"
                    },
                    {
                      name: "user",
                      user: response.data.data[0]
                    },
                    (err, upres) => {
                      if (!err)
                        if (upres > 0) {
                          //存入运行时数据，返回登录成功状态
                          this.$store.dispatch("loginIn", queryDbres.user);
                          this.$ipc.send("loginSuccess");
                        }
                    }
                  );
                }
            }
          );
        } else {
          this.$ipc.send("showError", response.data.message); //登录出错，返回失败原因
        }
      });
    });
    this.$ipc.on("signUp", (e, userData) => {
      this.$httpV({
        method: "post",
        url: "http://localhost:9649/user/register",
        data: Qs.stringify({
          nAccount: userData.account,
          nPassword: userData.password,
          nName: userData.userName
        })
      }).then(response => {
        if (response.data.state === "success") {
          this.$userDb.findOne(
            {
              name: "user",
              user: response.data.data[0]
            },
            (err, queryDbres) => {
              //查找是有此用户
              if (!err)
                if (!queryDbres) {
                  this.$userDb.insert(
                    //没有就插入
                    {
                      name: "user",
                      user: response.data.data[0]
                    },
                    (err, insertRes) => {
                      if (!err)
                        if (insertRes !== null) {
                          //存入运行时数据，返回登录成功状态
                          this.$store.dispatch("loginIn", insertRes.user);
                          this.$ipc.send("signUpSuccess");
                        }
                    }
                  );
                } else {
                  this.$userDb.update(
                    //有就更新
                    {
                      name: "user"
                    },
                    {
                      name: "user",
                      user: response.data.data[0]
                    },
                    (err, upres) => {
                      if (!err)
                        if (upres > 0) {
                          //存入运行时数据，返回登录成功状态
                          this.$store.dispatch("loginIn", queryDbres.user);
                          this.$ipc.send("signUpSuccess");
                        }
                    }
                  );
                }
            }
          );
        } else {
          this.$ipc.send("showRegError", response.data.message); //登录出错，返回失败原因
        }
      });
    });
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
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;
}
#region {
  /*background-color: rgba(255, 192, 203, 0.575);*/
  position: absolute;
  width: 94%;
  right: 0;
  height: 25px;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  z-index: 30;
  pointer-events: none;
}
#app {
  background-color: white;
  height: 98%;
  width: 98%;
  /* overflow: hidden; */
  border-radius: 5px;
  z-index: 12;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.24);
}
.bg_video {
  display: none;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
.res_list_item:hover .d_li span span {
  transition: all 0.1s linear;
  color: white;
}
</style>
