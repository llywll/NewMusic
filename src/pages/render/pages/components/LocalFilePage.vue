<template>
  <div class="LocalFile">
    <div class="local_title_box">
      <span class="local_title">
        本地歌曲
        <label>共{{ Object.keys(this.fileList).length }}首</label>
      </span>
      <div class="select_local">
        <button class="local_btn">更換目錄</button>
        <div class="local_sel_popel">
          <span>當前目錄：C:/User/jocode/Music</span>
          <button>選擇目錄</button>
        </div>
      </div>
    </div>
    <div class="file_music_list_box">
      <ul class="file_music_list">
        <li class="f_m_item f_m_th">
          <div class="song_index"></div>
          <div class="song_name">
            <span>文件名</span>
          </div>
        </li>
        <li
          class="f_m_item f_m_td"
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
  name: "LocalFilePage",
  data() {
    return {
      fileList: []
    };
  },
  mounted() {
    this.$fs.readdir(`${this.$home}\\Music`, (err, res) => {
      if (!err) {
        let musicList = [];
        res.forEach(item => {
          if (this.$fs.lstatSync(`${this.$home}\\Music\\${item}`).isFile()) {
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
.LocalFile {
  margin-top: 80px;
  padding: 0 30px;
}
.local_title {
  font-size: 24px;
  font-weight: bold;
}
.local_title label {
  font-weight: unset;
  font-size: 12px;
  margin-left: 5px;
}
.local_title_box {
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

.file_music_list_box{
    margin-top: 30px;
}
.file_music_list{
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
}
.f_m_item{
    display: flex;
    flex-direction: row;
}
.f_m_item span {
  transition: color 0.1s linear;
  font-size: 12px;
}
.song_index {
  font-size: 12px;
  margin-top: 2px;
}
.f_m_item .song_index {
  width: 20px;
}
.f_m_item .song_name {
  width: 40%;
}
.f_m_th span {
  color: rgb(102, 102, 102);
}
.f_m_td {
  padding: 8px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.11); */
  transition: background 0.1s linear;
}
.f_m_td:hover {
  background: rgb(49, 112, 255);
  border-radius: 5px;
}
.f_m_td:hover span {
  color: white;
}
</style>