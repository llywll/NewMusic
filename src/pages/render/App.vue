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
    this.$userDb.find({},(err,res)=>{
      console.log(res)
    })
    this.$userDb.findOne({ name: "autoLogin" }, (err, res) => {
      console.log("aotologin检查:", res);
      if (!err)
        if (res !== null && res !== undefined && res !== "")
          if (res.autoLogin) {
            console.log("已开启自动登录:", res.autoLogin);
            this.$userDb.findOne(
              {
                name: "user"
              },
              (err, res) => {
                if (!err) if (res) this.$store.dispatch("loginIn", res.user);
              }
            );
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
                { name: "autoLogin", aotoLogin: val },
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
              if (!err)
                if (!queryDbres) {
                  this.$userDb.insert(
                    {
                      name: "user",
                      user: response.data.data[0]
                    },
                    (err, insertRes) => {
                      if (!err)
                        if (insertRes !== null) {
                          this.$store.dispatch("loginIn", insertRes.user);
                          this.$ipc.send("loginSuccess");
                        }
                    }
                  );
                } else {
                  this.$userDb.update(
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
                          this.$store.dispatch("loginIn", queryDbres.user);
                          this.$ipc.send("loginSuccess");
                        }
                    }
                  );
                }
            }
          );
        } else {
          this.$ipc.send("showError", response.data.message);
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
.res_list_item:hover .d_li span span {
  transition: all 0.1s linear;
  color: white;
}
</style>
