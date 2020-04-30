<template>
  <div class="toplistInfo">
    <div class="top_info_box" v-if="top_data">
      <div class="top_title">
        <span>{{ top_data.data.title }}</span>
        <label>{{ top_data.data.updateTime }}</label>
      </div>
      <div class="top_func_btns">
        <button class="func_btn play_all_song" @click="playMusic(top_data.songInfoList[0].mid)">
          <i class="im im-play"></i>
          <span>播放全部</span>
        </button>
        <button class="func_btn sc_all_song">
          <i class="im im-heart"></i>
          <span>收藏</span>
        </button>
        <button class="func_btn more_func">
          <i class="im im-menu-dot-h"></i>
          <span>更多</span>
        </button>
      </div>
    </div>
    <div class="top_list_box">
      <ul class="top_list_ul" v-if="top_data">
        <li class="top_item item_th">
          <div class="top_index"></div>
          <div class="top_up_value"></div>
          <div class="top_song">
            <span>歌曲</span>
          </div>
          <div class="top_singer">
            <span>歌手</span>
          </div>
          <div class="top_time">
            <span>时长</span>
          </div>
        </li>
        <li class="top_item item_td" v-for="(item,index) in top_data.data.song" :key="index">
          <div :class="item.rank<4?'top_index top_there':'top_index'">
            <span>{{ item.rank }}</span>
          </div>
          <div class="top_up_value">
            <i class="icm im_up" v-if="item.rankType ==1"></i>
            <i class="icm im_down" v-else-if="item.rankType ==2"></i>
            <i class="icm im_fair" v-else-if="item.rankType ==3"></i>
            <i class="icm im_new" v-else-if="item.rankType ==4"></i>
            <i class="icm im_at_up" v-else-if="item.rankType ==6"></i>
            <span>{{ item.rankValue ==0? '':item.rankValue }}</span>
          </div>
          <div class="top_song">
            <img
              @click="intoAlbumInfoPage(item.albumMid)"
              :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.albumMid+'.jpg?max_age=2592000'"
            />
            <span
              @click="playMusic(top_data.songInfoList[index].mid)"
            >{{ top_data.songInfoList[index].title }}</span>
            <i
              class="im_mv"
              @click="intoMVPlayPage(top_data.songInfoList[index].mv.vid)"
              v-if="top_data.songInfoList[index].mv.id !=0"
            ></i>
          </div>
          <div class="top_singer">
            <div v-for="(s_item,s_index) in top_data.songInfoList[index].singer" :key="s_index">
              <span @click="intoSingerPage(s_item.mid)">{{ s_item.title }}</span>
              <span v-if="s_index!=top_data.songInfoList[index].singer.length -1">/</span>
            </div>
          </div>
          <div class="top_time">
            <span
              v-if="top_data.songInfoList[index].interval % 60 < 10"
            >0{{parseInt(top_data.songInfoList[index].interval / 60)}}:0{{top_data.songInfoList[index].interval % 60}}</span>
            <span
              v-else
            >0{{parseInt(top_data.songInfoList[index].interval / 60)}}:{{top_data.songInfoList[index].interval % 60}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopListInfoPage",
  data() {
    return {
      topList_id: "",
      top_data: [],
      rankIcon: "im_up"
    };
  },
  mounted() {
    this.topList_id = this.$route.params.topList_id;
    this.init(this.topList_id);
  },
  watch: {
    $route() {
      if (this.$route.name == "TopListInfoPage") {
        this.topList_id = this.$route.params.topList_id;
        this.init(this.topList_id);
      }
    },
    topList_id() {
      this.init(this.topList_id);
    }
  },
  methods: {
    init() {
      console.log(this.topList_id);
      this.$http
        .get(
          `http://39.108.229.8:3300/top?id=${this.topList_id}&pageSize=20&raw=1`
        )
        .then(res => {
          this.top_data = res.data.detail.data;
          console.log(res.data.detail.data);
        })
        .catch(err => console.log(err));
    },
    playMusic: function(mid) {
      let p_list = [];
      let smid = mid;
      let actIndex = -1;
      new Promise((success, fail) => {
        try {
          for (let i = 0; i < this.top_data.songInfoList.length; i++) {
            if (this.top_data.songInfoList[i].mid == smid) actIndex = i;
            p_list.push({
              title: this.top_data.songInfoList[i].title,
              singer: this.top_data.songInfoList[i].singer[0].title,
              songMid: this.top_data.songInfoList[i].mid,
              interval: this.top_data.songInfoList[i].interval,
              albumMid: this.top_data.songInfoList[i].album.id
            });
          }
          success();
        } catch (e) {
          fail(e);
        }
      }).then(() => {
        this.$store.commit("changeIsRadioState", {
          radioId: -1,
          isplay: false
        });
        this.$store.commit("replacePlayList", p_list);
        this.$store.dispatch("chageplayingStateAsync", {
          p_ing: p_list[actIndex],
          actIndex: actIndex
        });
      }),
        err => console.log(err);
    },
    intoAlbumInfoPage(mid) {
      this.$router.push(`/AlbumPage/${mid}`);
    },
    intoSingerPage(mid) {
      this.$router.push(`/SingerInfoPage/${mid}`);
    },
    intoMVPlayPage(vid) {
      this.$router.push(`/MVPlayPage/${vid}`);
    }
  }
};
</script>

<style scoped>
.toplistInfo {
  margin-top: 80px;
  margin-left: 30px;
  height: 80vh;
  overflow-y: auto;
}
.top_title span {
  font-size: 26px;
  font-weight: bold;
}
.top_info_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 50px;
}
.top_title label {
  font-size: 14px;
  margin-left: 20px;
}
.top_func_btns {
  display: flex;
  /* margin-top: 20px; */
}
.func_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  /* width: 130px; */
  padding: 5px 8px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.418);
  background: none;
  cursor: pointer;
  outline: none;
}
.func_btn .im {
  font-size: 10px;
  margin: 0 5px;
  padding: 3px;
  padding-left: 0;
  position: relative;
  top: 1px;
}
.func_btn span {
  font-size: 12px;
}
.play_all_song {
  background: rgb(49, 115, 225);
  border: 0;
}
.play_all_song .im,
.play_all_song span {
  color: white;
}

/***** */

.top_list_box {
  margin-top: 30px;
}
.top_list_ul {
  padding: 0;
  list-style: none;
  margin-right: 50px;
}
.top_item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.item_th span {
  font-size: 14px;
  color: #999;
}
.item_th .top_song span {
  margin: 0;
}
.top_index {
  width: 20px;
  margin-left: 10px;
  font-size: 20px;
  text-align: right;
}
.top_up_value {
  width: 72px;
  font-size: 10px;
  text-align: center;
  color: #999;
}
.top_there span {
  color: #ff4222;
}
.top_song {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 50%;
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;
}
.top_singer {
  display: flex;
  cursor: pointer;
  width: 40%;
  font-size: 12px;
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;
}
.top_time {
  font-size: 12px;
  width: 5%;
  color: #999;
}
.top_song img {
  cursor: pointer;
  width: 50px;
}
.item_td .top_song span {
  margin-left: 15px;
  font-size: 12px;
}
.icm {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15px;
  height: 15px;
  /* margin-top: 15px; */
  background-image: url("./../../assets/icon_rank.png");
}
.im_at_up {
  background-position: 0 -60px;
}
.im_down {
  margin-top: 8px;
  background-position: 0 -15px;
}
.im_up {
  margin-top: 8px;
  background-position: 0 0;
}
.im_fair {
  background-position: 0 -30px;
  height: 5px;
}
.im_new {
  margin-top: 5px;
  width: 24px;
  height: 10px;
  background-position: 0 -40px;
}
.im_mv {
  background-image: url("./../../assets/icon_sprite.png");
  display: inline-block;
  width: 33px;
  height: 16px;
  background-position: -40px -280px;
  vertical-align: middle;
  margin-right: 6px;
  margin-left: 6px;
  cursor: pointer;
}
</style>