<template>
  <div class="SonglistPage">
    <div class="bg_img">
      <div class="bg_zhezhao"></div>
    </div>
    <div class="list_content">
      <div class="list_img_box">
        <img class="list_img" src="../../assets/fin.jpg" />
        <div class="info_count">
          <span class="c_count">12首歌曲，约45分钟</span>
        </div>
        <div class="desc_box">
          <span class="span_jianjie">简介</span>
          <span class="span_desc">
            世界上有两个可贵的词，一个叫认真，一个叫坚持。认真的人改变了自己，坚持的人改变了命运。很多人说单身久了，别说拧瓶盖了，消防栓我都能拧开。确实如此，宁缺毋滥，好过随便找个人相处一生。
            今天推荐的情歌，适合一个人安静聆听，或许感伤，或许孤单，或许寂寞，但是总有一首是你想要的情感，诉说着你的故事。
            一起来听歌！封面来源于网络，侵删！
          </span>
        </div>
      </div>
      <div class="info_songlist_box">
        <div class="text_info">
          <div class="title_box">
            <span class="span_title">我喜欢</span>
          </div>
          <div class="at_box">
            <i class="im im-user-circle"></i>
            <span class="span_at">迪丽热巴</span>
          </div>
          <div class="at_box">
            <span class="span_at">2019年3月27日创建</span>
          </div>
        </div>
        <div class="song_func_btns">
          <button class="s_btn s_btn_1">
            <i class="im im-play"></i>
            <span>播放全部</span>
          </button>
          <button class="s_btn s_btn_2">
            <i class="im im-menu-dot-v"></i>
          </button>
        </div>
        <ul class="s_list_ul">
          <li class="s_list_item s_th">
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
          <li class="s_list_item s_td">
            <div class="song_index">
              <span>1</span>
            </div>
            <div class="song_name">
              <span>Mine</span>
            </div>
            <div class="song_singer">
              <span>周杰伦</span>
            </div>
            <div class="song_album">
              <span>新十二新作</span>
            </div>
            <div class="song_time">
              <span>04:30</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SonglistPage",
  data() {
    return {
      list_id: ""
    };
  },
  methods: {
    init: function() {
      this.list_id = this.$route.params.list_id;
      this.$http
        .get(
          "http://39.108.229.8:3200/getSongListDetail?disstid=" + this.album_id
        )
        .then(response => {
          console.log(response);
          //   this.cdlist = response.data.response.cdlist[0];
          //   this.isloading_Box = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scope>
.SonglistPage {
  width: 100%;
  /* margin-top: 80px; */
  position: relative;
}
.bg_img {
  width: 100%;
  height: 400px;
  /* border:1px solid pink; */
  background-image: url(../../assets/fin.jpg);
  background-size: cover;
  background-position-y: 50%;
  position: absolute;
  z-index: -1;
  top: 0;
}
.bg_zhezhao {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}
.list_content {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding-top: 100px;
}
.list_info {
  /* background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px); */
  display: flex;
  flex-direction: row;
  padding-top: 100px;
}
.list_img_box {
  margin: 20px;
  width: 340px;
}
.list_img {
  width: 340px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.103);
  /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.212); */
}
.info_count {
  margin: 12px 0;
}
.c_count {
  font-size: 12px;
  color: rgb(97, 97, 97);
}
.desc_box {
  margin-top: 5px;
  padding-top: 16px;
  font-size: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.096);
  display: flex;
  flex-direction: column;
}
.span_jianjie {
  font-size: 22px;
  font-weight: bold;
}
.span_desc {
  margin-top: 5px;
  color: rgb(56, 56, 56);
}

/*** */
.info_songlist_box {
  width: 100%;
  position: relative;
}
.text_info {
  display: flex;
  flex-direction: column;
  margin: 20px 0 20px 20px;
  /* justify-content:space-between;  */
}
.span_title {
  font-size: 26px;
  font-weight: bold;
}
.at_box {
  display: flex;
  align-items: center;
  margin: 2px 0;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.575);
}
.at_box .im {
  font-size: 12px;
  margin-right: 3px;
}
.span_at {
  font-size: 14px;
}

.song_func_btns {
  position: absolute;
  right: 30px;
  top: 62px;
  display: flex;
}
.s_btn {
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
.s_btn .im {
  font-size: 14px;
  margin-right: 5px;
}
.s_btn_1 {
  margin-right: 8px;
}
.s_btn_1 .im{ 
  position: relative;
  top: 2px;
}
.s_btn_2 {
  padding: 18px;
  position: relative;
}
.s_btn_2 .im {
  position: absolute;
  left: 30%;
  top: 32%;
}

/** */
.list_ul_box {
  /* position: absolute;
  top: 35%;
  left: 360px; */
  /* width: 100%; */
}
.s_list_ul {
  list-style: none;
  margin-right: 50px;
  padding-left: 20px;
}
.s_list_item {
  display: flex;
  flex-direction: row;
}
.s_th {
  border-top: 1px solid rgba(0, 0, 0, 0.055);
  border-bottom: 1px solid rgba(0, 0, 0, 0.116);
  padding: 5px 0;
}
.s_td {
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.116);
}
.song_index span{
  position: relative;
  top: 2px;
}
.s_list_item .song_index {
  width: 20px;
  font-size: 14px;
}
.s_list_item span {
  font-size: 12px;
  color: rgb(107, 107, 107)
}
.s_list_item .song_name {
  width: 50%;
}
.s_td .song_name span{
  color: black ;
}
.s_list_item .song_singer,
.s_list_item .song_album {
  width: 20%;
}
</style>