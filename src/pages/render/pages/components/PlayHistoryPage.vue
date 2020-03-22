<template>
  <div class="playHistoryPage">
    <div class="history_info_box">
      <div class="history_title">
        <span>播放历史</span>
        <label>共计{{historyList.length}}首歌曲</label>
      </div>
      <div class="his_func_btns">
        <button class="his_btn his_btn_1">
          <i class="im im-play"></i>
          <span>播放全部</span>
        </button>
        <button class="his_btn his_btn_2">
          <i class="im im-menu-dot-v"></i>
        </button>
      </div>
    </div>
    <div class="history_list_box">
      <ul class="history_list">
        <li class="history_item his_th">
          <div class="song_index"></div>
          <div class="song_name">
            <span>歌曲</span>
          </div>
          <div class="song_singer">
            <span>艺人</span>
          </div>
          <div class="song_album">
            <span>专辑</span>
          </div>
          <div class="song_time">
            <span>时长</span>
          </div>
        </li>
        <li
          class="history_item his_td"
          v-for="(item,index) in historyList"
          :key="index"
          @contextmenu="hisRightMenu(item._id)"
        >
          <div class="song_index">
            <span>{{ index +1 }}</span>
          </div>
          <div class="song_name">
            <span>{{item.title}}</span>
          </div>
          <div class="song_singer">
            <span>{{ item.singer }}</span>
          </div>
          <div class="song_album">
            <span>{{ item.album }}</span>
          </div>
          <div class="song_time">
            <span>{{ item.interval }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "playHistoryPage",
  data() {
    return {
      historyList: []
    };
  },
  watch: {
    "$store.state.playing.playing"() {
      this.initList();
    }
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      this.$db
        .find({
          name: "playHistory"
        })
        .sort({ time: -1 })
        .exec((err, res) => {
          console.log(res);
          if (!err) this.historyList = res;
        });
    },
    hisRightMenu: function(_sid) {
      const menuTempList = [
        {
          label: "播放",
          click: () => {
            console.log("click me");
          }
        },
        {
          label: "下一首播放",
          click: () => {
            console.log("click me");
          }
        },
        {
          type: "separator"
        },
        {
          label: "收藏到我喜欢",
          click: () => {
            console.log(this.historyList);
          }
        },
        {
          label: "添加到...",
          submenu: [
            {
              label: "播放列表"
            },
            {
              type: "separator"
            },
            {
              label: "水果月生"
            }
          ]
        },
        {
          type: "separator"
        },
        {
          label: "删除",
          click: () => {
            this.$ipc.once("questionResult", (e, val) => {
              if (val)
                this.$db.remove({ _id: _sid }, (reErr, reRes) => {
                  if (!reErr) if (reRes > 0) this.initList();
                });
            });
           this.$MainWinodw.send("ShowAlertBox", {
              type: "warning",
              text: "确认要删除吗？",
              caller: "questionResult"
            });
          }
        }
      ];
      const menu = this.$Menu.buildFromTemplate(menuTempList);
      menu.popup(this.$remote.getCurrentWindow());
    }
  },
  activated() {
    this.$db
      .find({
        name: "playHistory"
      })
      .sort({ time: -1 })
      .exec((err, res) => {
        console.log(res);
        if (!err) this.historyList = res;
      });
  }
};
</script>
<style scoped>
.playHistoryPage {
  margin-top: 80px;
}
.history_info_box {
  margin: 0 30px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.11); */
}
.history_title span {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 2px;
}
.history_title label {
  margin-left: 10px;
  font-size: 12px;
}
.his_func_btns {
  /* margin-right: 10px; */
  display: flex;
}
.his_btn {
  cursor: pointer;
  outline: none;
  background: rgb(49, 112, 255);
  color: white;
  border: 0;
  padding: 8px 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  margin-right: 16px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.212);
}
.his_btn .im {
  font-size: 14px;
  margin-right: 5px;
}
.his_btn_1 {
  margin-right: 8px;
}
.his_btn_1 .im {
  position: relative;
}
.his_btn_2 {
  padding: 18px;
  position: relative;
}
.his_btn_2 .im {
  position: absolute;
  left: 30%;
  top: 32%;
}

.history_list_box {
  margin: 0 30px;
}
.history_list {
  padding: 0;
  list-style: none;
}
.history_item {
  display: flex;
  flex-direction: row;
}
.history_item span {
  transition: color 0.1s linear;
  font-size: 12px;
}
.song_index {
  font-size: 12px;
  margin-top: 2px;
}
.history_item .song_index {
  width: 20px;
}
.history_item .song_name {
  width: 40%;
}
.history_item .song_singer,
.history_item .song_album {
  width: 25%;
}
.his_th span {
  color: rgb(102, 102, 102);
}
.his_td {
  padding: 8px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.11); */
  transition: background 0.1s linear;
}
.his_td:hover {
  background: rgb(49, 112, 255);
  border-radius: 5px;
}
.his_td:hover span {
  color: white;
}
</style>