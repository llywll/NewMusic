<template>
  <div id="albumPage">
    <div class="album_info">
      <div class="album_name">
        <span>{{cdlist.dissname}}</span>
      </div>
      <div class="album_author"></div>
      <div class="album_desc">
        <p v-html="cdlist.desc"></p>
      </div>
    </div>

    <div class="song_list_box">
      <ul class="song_list" ref="songList">
        <li class="songlist_item_th">
          <div class="song_index"></div>
          <div class="song_Name">
            <span>歌名</span>
          </div>
          <div class="song_songer">
            <span>歌手</span>
          </div>
          <div class="song_album">
            <span>专辑</span>
          </div>
          <div class="song_time">
            <span>时长</span>
          </div>
        </li>
        <li class="songlist_item" v-for="(songlist,index) in cdlist.songlist" :key="index">
          <div class="song_index">{{index + 1}}.</div>
          <div class="song_Name" @click="playMusic($event)">
            <a :data-song-id="songlist.mid">{{songlist.title}}</a>
          </div>
          <div class="song_songer">
            <a>{{songlist.singer[0].title}}</a>
          </div>
          <div class="song_album">
            <a>{{songlist.title}}</a>
          </div>
          <div class="song_time">
            <span
              v-if="songlist.interval % 60 < 10"
            >0{{parseInt(songlist.interval / 60)}}:0{{songlist.interval % 60}}</span>
            <span v-else>0{{parseInt(songlist.interval / 60)}}:{{songlist.interval % 60}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlbumPage",
  data: function() {
    return {
      album_id: "",
      cdlist: []
    };
  },
  mounted: function() {
    this.$data.album_id = this.$route.params.album_id;
    this.$http
      .get("http://localhost:3200/getSongListDetail?disstid=" + this.album_id)
      .then(response => {
        this.cdlist = response.data.response.cdlist[0];
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    playMusic: async function(el) {
      let p_list =[];
      let smid = el.target.attributes["data-song-id"].value;
      let actIndex=-1;
      for (let i = 0; i < this.cdlist.songlist.length; i++) {
        if(this.cdlist.songlist[i].mid == smid)
       actIndex=i
      await p_list.push({
          title: this.cdlist.songlist[i].title,
          singer: this.cdlist.songlist[i].singer[0].title,
          songMid: this.cdlist.songlist[i].mid,
          interval: this.cdlist.songlist[i].interval,
          albumMid:this.cdlist.songlist[i].album.id
        });        
      }
      this.$store.commit('replacePlayList',p_list)
      let tempList=p_list[actIndex]
      tempList.playListIndex = actIndex
      this.$store.dispatch("chageplayingStateAsync",tempList)
    }
  },
  beforeRouteLeave(to, from, next){
    if(to.name === 'PageContent') {
      to.meta.keepAlive = true
    }
    next()
  }
};
</script>
<style scoped>
#albumPage {
  width: 100%;
  height: calc(100% - 160px);
  position: relative;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.album_info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.album_name span {
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 3px;
  position: relative;
}
.album_name {
  position: relative;
}
.album_author {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.album_author .im {
  font-size: 14px;
  margin: 0 5px;
}
.album_author a {
  color: #414141;
  mix-blend-mode: exclusion;
  cursor: pointer;
}
.album_desc {
  width: 700px;
  margin-top: 20px;
  letter-spacing: 3px;
  text-indent: 2em;
  text-align: center;
  line-height: 1.5em;
}
.album_page_backfround {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
.album_image {
  width: 700px;
}
.song_list_box {
  padding-top: 40px;
  width: 700px;
  height: 400px;
}
.song_list {
  list-style: none;
  padding-left: 20px;
}
.songlist_item,
.songlist_item_th {
  display: flex;
  padding: 10px 0;
  background: white;
  align-items: baseline;
}
.songlist_item {
  transition: all 0.1s ease-in-out;
  border-radius: 8px;
  padding: 10px 10px;
}
.songlist_item_th .song_index {
  margin-right: 36px;
}
.songlist_item_th span {
  color: rgb(119, 119, 119);
  font-size: 12px;
}
.songlist_item a {
  cursor: pointer;
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  transition: all 0.1s ease-in-out;
}
.song_index {
  font-size: 14px;
  margin-right: 25px;
  color: rgb(119, 119, 119);
  transition: all 0.1s ease-in-out;
}
.song_time {
  font-size: 14px;
  color: rgb(119, 119, 119);
  width: 40px;
  text-align: center;
  transition: all 0.1s ease-in-out;
}
.song_Name {
  width: 200px;
}
.song_songer {
  width: 200px;
}
.song_album {
  width: 200px;
}
.songlist_item:hover {
  background-color: rgb(49, 122, 255);
}
.songlist_item:hover a,
.songlist_item:hover span,
.songlist_item:hover .song_index {
  color: white;
}
</style>