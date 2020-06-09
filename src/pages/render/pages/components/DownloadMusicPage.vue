<template>
  <div class="DownloadMusic">
    <div class="down_title_box">
      <span class="down_title">
        下载歌曲
        <label>共{{ Object.keys(this.fileList).length }}首</label>
      </span>
    </div>
    <div class="down_music_list_box">
      <ul class="down_music_list">
        <li class="d_m_item d_m_th">
          <div class="song_index"></div>
          <div class="song_name">
            <span>文件名</span>
          </div>
        </li>
        <li
          class="d_m_item d_m_td"
          v-for="(item,index) in fileList"
          :key="index"
        >
          <div class="song_index">
            <span>{{ index +1 }}</span>
          </div>
          <div class="song_name">
            <span>{{item}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "DownloadMusicPage",
  data() {
    return {
      fileList: []
    };
  },
  mounted() {
    this.$fs.readdir(`${this.$home}\\Music\\NewMusic`, (err, res) => {
      if (!err) {
        let musicList = [];
        res.forEach(item => {
          if (this.$fs.lstatSync(`${this.$home}\\Music\\NewMusic\\${item}`).isFile()) {
            if (item.lastIndexOf(".mp3") >= 0) musicList.push(item);
          }
        });
        this.fileList = musicList;
      }
    });
    // console.log(this.fileList)
  }
};
</script>
<style scoped>
.DownloadMusic {
  margin-top: 80px;
  padding: 0 30px;
}
.down_title {
  font-size: 24px;
  font-weight: bold;
}
.down_title label {
  font-weight: unset;
  font-size: 12px;
  margin-left: 5px;
}
.down_title_box {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.26);
}
.select_local {
  position: relative;
}
.local_btn {
  /* margin-right: 30px; */
  border: 0;
  /* border-bottom: 1px solid rgb(49, 112, 255); */
  color: rgb(49, 112, 255);
  background: none;
  outline: none;
  cursor: pointer;
}
.local_sel_popel {
  display: flex;
  position: absolute;
  background: white;
  width: 200px;
  height: 100px;
  top: 30px;
  right: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* border: 1px solid rgba(0, 0, 0, 0.432); */
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.349);
  padding: 15px;
  display: none;
}
.local_sel_popel span {
  color: rgb(49, 112, 255);
  margin-bottom: 20px;
  font-size: 12px;
}
.local_sel_popel button {
  border: 0;
  background: rgb(49, 112, 255);
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  width: 100px;
  cursor: pointer;
  outline: none;
}

.down_music_list_box{
    margin-top: 30px;
}
.down_music_list{
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
}
.d_m_item{
    display: flex;
    flex-direction: row;
}
.d_m_item span {
  transition: color 0.1s linear;
  font-size: 12px;
}
.song_index {
  font-size: 12px;
  margin-top: 2px;
}
.d_m_item .song_index {
  width: 20px;
}
.d_m_item .song_name {
  width: 40%;
}
.d_m_th span {
  color: rgb(102, 102, 102);
}
.d_m_td {
  padding: 8px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.11); */
  transition: background 0.1s linear;
}
.d_m_td:hover {
  background: rgb(49, 112, 255);
  border-radius: 5px;
}
.d_m_td:hover span {
  color: white;
}
</style>