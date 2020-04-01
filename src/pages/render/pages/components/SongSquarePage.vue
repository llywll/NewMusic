<template>
  <div class="SongSquare">
    <div class="square_info">
      <div class="square_title_box">
        <span class="square_title">歌单广场</span>
      </div>
      <div class="square_type_box" v-if="songTypeList.length>0">
        <div class="open_square_type_papel_box">
          <button class="o_s_t_p_btn" @click="isOpenPapel=!isOpenPapel">
            <i class="im im-angle-down"></i>
            <span v-html="showSelectText"></span>
          </button>
          <div class="square_type_papel" v-show="isOpenPapel">
            <div class="st_p_item st_p_all">
              <button
                class="st_p_all_btn"
                @click="selectType(songTypeList[0].items[0].categoryName,songTypeList[0].items[0].categoryId)"
              >
                <span>全部歌单</span>
                <span class="ischeck" v-show="selectTypeId == songTypeList[0].items[0].categoryId">
                  <i class="im im-check-mark"></i>
                </span>
              </button>
            </div>

            <div
              class="st_p_item tc_teem"
              v-for="(typeItem,typeindex) in songTypeList.slice(1,songTypeList.length)"
              :key="typeindex"
            >
              <div class="st_p_title">{{ typeItem.categoryGroupName }}</div>
              <div class="st_p_list_box">
                <div
                  class="st_p_l_item"
                  v-for="(st_item,st_index) in typeItem.items"
                  :key="st_index"
                >
                  <button
                    class="st_p_item_btn"
                    @click="selectType(st_item.categoryName,st_item.categoryId)"
                  >
                    <span v-html="st_item.categoryName"></span>
                    <span class="ischeck" v-show="selectTypeId == st_item.categoryId">
                      <i class="im im-check-mark"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hot_song_type">
          <span class="hst_label hst_title">热门标签:</span>
          <span
            class="hst_label"
            @click="selectType(songTypeList[5].items[0].categoryName,
           songTypeList[5].items[0].categoryId)"
            v-html="songTypeList[5].items[0].categoryName"
          ></span>
          <span
            class="hst_label"
            @click="selectType(songTypeList[1].items[0].categoryName,
           songTypeList[1].items[0].categoryId)"
            v-html="songTypeList[1].items[0].categoryName"
          ></span>
          <span
            class="hst_label"
            @click="selectType(songTypeList[2].items[0].categoryName,
           songTypeList[2].items[0].categoryId)"
            v-html="songTypeList[2].items[0].categoryName"
          ></span>
          <span
            class="hst_label"
            @click="selectType(songTypeList[3].items[0].categoryName,
           songTypeList[3].items[0].categoryId)"
            v-html="songTypeList[3].items[0].categoryName"
          ></span>
          <span
            class="hst_label"
            @click="selectType(songTypeList[4].items[0].categoryName,
           songTypeList[4].items[0].categoryId)"
            v-html="songTypeList[4].items[0].categoryName"
          ></span>
        </div>
      </div>
    </div>
    <ul class="square_songList" ref="square_list">
      <li
        class="squareList_item"
        v-for="(item,index) in songListres"
        :key="index"
        @click="toAlbumInfoPage(item.dissid)"
      >
        <div class="item_cover" :data-diss-id="item.dissid" :style="item.imgurl">
          <i class="im im-play"></i>
        </div>
        <div class="item_cover_after" :style="item.imgurl"></div>
        <div class="square_info_box">
          <span class="albums_title">{{item.dissname}}</span>
          <span class="albums_username">播放量：{{item.listennum /10000 }} 万</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SongSquarePage",
  data() {
    return {
      songTypeList: [],
      selectTypeId: -1,
      isOpenPapel: false,
      showSelectText: "",
      songListres: []
    };
  },
  mounted() {
    this.$http
      .get("http://39.108.229.8:3200/getSongListCategories")
      .then(res => {
        this.songTypeList = res.data.response.data.categories;
        this.selectTypeId = this.songTypeList[0].items[0].categoryId;
        this.showSelectText = this.songTypeList[0].items[0].categoryName;
        console.log(this.songTypeList);
      })
      .catch(err => console.log(err));
  },
  methods: {
    selectType: function(categoryName, categoryId) {
      this.showSelectText = categoryName;
      this.selectTypeId = categoryId;
      this.isOpenPapel = false;
    },
    toAlbumInfoPage: function(dissid) {
      this.$router.push(`/AlbumPage/${dissid}`);
    }
  },
  watch: {
    selectTypeId() {
      if (this.selectTypeId > -1) {
        this.$http
          .get(
            `http://39.108.229.8:3200/getSongLists?categoryId=${this.selectTypeId}`
          )
          .then(res => {
            this.songListres = res.data.response.data.list;
            res.data.response.data.list.forEach((item, index) => {
              this.songListres[
                index
              ].imgurl = `background-image: url(${item.imgurl})`;
            });
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style scoped>
.SongSquare {
  margin-top: 80px;
  padding-left: 30px;
  overflow-y: auto;
}
.square_title {
  font-size: 24px;
  font-weight: bold;
}
.square_type_box {
  margin-top: 20px;
}
.o_s_t_p_btn {
  border-radius: 3px;
  border: 1px solid rgb(49, 112, 255);
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 5px 8px;
  cursor: pointer;
  transition: all 0.2s linear;
}
.o_s_t_p_btn:hover {
  background: rgb(49, 112, 255);
  /* border: 1px solid white; */
}
.o_s_t_p_btn .im {
  font-size: 10px;
  color: rgb(49, 112, 255);
  margin: 0 3px;
  transition: all 0.1s linear;
}
.o_s_t_p_btn span {
  transition: all 0.1s linear;
  color: rgb(49, 112, 255);
}
.o_s_t_p_btn:hover .im,
.o_s_t_p_btn:hover span {
  color: white;
}
.open_square_type_papel_box {
  position: relative;
  z-index: 1;
}
.square_type_papel {
  position: absolute;
  left: -2%;
  top: 40px;
  width: 90%;
  /* height: 300px; */
  background: white;
  border-radius: 5px;
  z-index: 1;
  padding: 10px 15px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.square_type_papel::before {
  content: "";
  width: 30px;
  height: 30px;
  background: white;
  position: absolute;
  left: 50px;
  top: -4px;
  transform: rotate(45deg);
  z-index: -1;
  pointer-events: none;
}
.st_p_item {
  width: 95%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
}
.st_p_title {
  font-size: 18px;
  margin: 0 20px;
  font-size: 14px;
  width: 100px;
}
.st_p_list_box {
  /* border-radius: 5px; */
  /* border: 1px solid rgb(49, 112, 255); */
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: calc(100% - 100px);
}
.st_p_l_item {
  border: 1px solid rgb(49, 112, 255);
  margin: 2px;
}
.st_p_item_btn {
  background: none;
  border: 0;
  outline: none;
  padding: 5px 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  /* width: 95px; */
  border-bottom: 1px;
}
.st_p_title {
  width: 50px;
}
.ischeck {
  position: absolute;
  right: -17px;
  bottom: -17px;
  transform: rotate(45deg);
  background: rgb(49, 112, 255);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 3px;
  padding-bottom: 2px;
}
.ischeck .im {
  transform: rotate(-45deg);
  font-size: 8px;
  color: white;
}
.st_p_all_btn {
  width: 100%;
  padding: 12px 0px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  background: none;
  position: relative;
  overflow: hidden;
  /* color: rgb(49, 112, 255); */
  border: 1px solid rgb(49, 112, 255);
}
.tc_teem {
}
/**********************  */
.square_songList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  height: 60vh;
  transition: all 0.5s ease-out;
  /* margin-left: 30px; */
}
.square_type_title_li {
  width: 100%;
  margin-bottom: 20px;
  font-size: 24px;
}
.squareList_item {
  margin-right: 18px;
  margin-bottom: 30px;
  position: relative;
}

.hot_song_type {
  margin-top: 10px;
}
.hst_label {
  font-size: 12px;
  margin: 0 5px;
  cursor: pointer;
  color: rgb(49, 112, 255);
  border-bottom: 1px solid rgb(49, 112, 255);
}
.hst_title {
  margin-right: 5px;
  cursor: unset;
  color: rgba(0, 0, 0, 0.719);
  border: unset;
}
/***/
.item_cover {
  background-size: cover;
  width: 150px;
  height: 150px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
}

.item_cover_after {
  content: "";
  pointer-events: none;
  position: absolute;
  content: "";
  top: 15%;
  left: 5%;
  background-size: cover;
  width: 130px;
  height: 130px;
  transform: scale(1.25);
  filter: blur(15px) brightness(100%) opacity(0.4);
  z-index: -1;
}

.item_cover .im {
  position: absolute;
  bottom: 2px;
  right: 2px;
  color: white;
  opacity: 0;
  pointer-events: none;
}

.item_cover:hover {
  transform: scale(1.05);
}

.square_info_box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  justify-content: space-between;
  height: 50px;
  width: 155px;
}

.albums_title {
  font-weight: bold;
  font-size: 12px;
  color: rgb(43, 43, 43);
}

.albums_username {
  font-size: 10px;
  margin-top: 3px;
  color: rgb(158, 158, 158);
}
</style>