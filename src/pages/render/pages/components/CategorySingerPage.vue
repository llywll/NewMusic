<template>
  <div class="category_singer">
    <div class="category_list_box">
      <span class="category_page_title">歌手</span>
      <ul class="category_list">
        <li
          :class="categoryParam.index==in_item.id?'category_item item_ac':'category_item'"
          v-for="(in_item,in_index) in categoryList.index"
          :key="in_index"
          @click="changeCategory('index',in_item.id)"
        >
          <span>{{ in_item.name }}</span>
        </li>
      </ul>
      <ul class="category_list">
        <li
          :class="categoryParam.area==ar_item.id?'category_item item_ac':'category_item'"
          v-for="(ar_item,ar_index) in categoryList.area"
          :key="ar_index"
          @click="changeCategory('area',ar_item.id)"
        >
          <span>{{ ar_item.name }}</span>
        </li>
      </ul>
      <ul class="category_list">
        <li
          :class="categoryParam.sex==sex_item.id?'category_item item_ac':'category_item'"
          v-for="(sex_item,sex_index) in categoryList.sex"
          :key="sex_index"
          @click="changeCategory('sex',sex_item.id)"
        >
          <span>{{ sex_item.name }}</span>
        </li>
      </ul>
      <ul class="category_list">
        <li
          :class="categoryParam.genre==genre_item.id?'category_item item_ac':'category_item'"
          v-for="(genre_item,genre_index) in categoryList.genre"
          :key="genre_index"
          @click="changeCategory('genre',genre_item.id)"
        >
          <span>{{ genre_item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="category_list_ul_box">
      <ul class="singer_catefory_list" v-if="singerList">
        <li class="category_singer_item" v-for="(item,index) in singerList" :key="index">
          <div class="item_cover" @click="intoSingerPage(item.singer_mid)" v-if="index<10">
            <img class="category_pic" :src="item.singer_pic" @error="defImg()" />
          </div>
          <div class="category_info">
            <span
              class="category_title"
              @click="intoSingerPage(item.singer_mid)"
            >{{item.singer_name}}</span>
          </div>
        </li>
      </ul>
      <span v-if="singerList.length==0" class="cate_null_tip">该分类下暂无歌曲</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategorySingerPage",
  data() {
    return {
      categoryList: [],
      singerList: [],
      categoryParam: {
        area: -100,
        genre: -100,
        index: -100,
        sex: -100,
        pageNo: 1
      },
      defaultImg: require("./../../assets/user.png")
    };
  },
  mounted() {
    this.$http
      .get("http://39.108.229.8:3300/singer/category")
      .then(res => {
        console.log(res.data.data);
        this.categoryList = res.data.data;
        this.categoryParam = {
          area: -100,
          genre: -100,
          index: -100,
          sex: -100,
          pageNo: 1
        };
      })
      .catch(err => console.log(err));
  },
  watch: {
    categoryParam: {
      handler() {
        this.$http
          .get(
            `http://39.108.229.8:3300/singer/list?raw=1&area=${this.categoryParam.area}&index=${this.categoryParam.index}&sex=${this.categoryParam.sex}&genre=${this.categoryParam.genre}&pageNo=${this.categoryParam.pageNo}`
          )
          .then(res => {
            console.log(res.data.singerList.data.singerlist);
            this.singerList = res.data.singerList.data.singerlist;
          })
          .catch(err => console.log(err));
      },
      deep: true
    }
  },
  methods: {
    changeCategory(type, value) {
      switch (type) {
        case "sex":
          this.categoryParam.sex = value;
          break;
        case "area":
          this.categoryParam.area = value;
          break;
        case "index":
          this.categoryParam.index = value;
          break;
        case "genre":
          this.categoryParam.genre = value;
          break;
        default:
          console.log("啊哦");
          break;
      }
    },
    intoSingerPage: function(mid) {
      this.$router.push(`/SingerInfoPage/${mid}`);
    },
    defImg: function() {
      let img = event.srcElement;
      img.src = this.defaultImg;
      img.style ="background-color:rgb(233,233,233)"
      img.onerror = null;
    }
  }
};
</script>

<style scoped>
.category_singer {
  margin-left: 30px;
  margin-top: 80px;
  height: 81vh;
  overflow-y: auto;
}
.category_page_title {
  font-size: 26px;
  font-weight: bold;
}
.category_list {
  padding: 0;
  list-style: none;
  display: flex;
}
.category_item span {
  cursor: pointer;
  transition: all 0.2s linear;
  padding: 3px 6px;
  margin: 5px;
  border-radius: 3px;
  font-size: 14px;
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;
  transition: all 0.2s linear;
}
.category_item span:hover {
  color: rgb(49, 112, 255);
}
.item_ac span {
  background-color: rgb(49, 112, 255);
  color: white;
  cursor: unset;
  pointer-events: none;
}
.item_ac span:hover {
  color: unset;
}
.singer_catefory_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  position: relative;
  left: 0;
  transition: all 0.5s ease-out;
  /* margin-left: 30px; */
  margin-top: 30px;
}
.category_title_li {
  width: 100%;
  margin-bottom: 20px;
  font-size: 24px;
}
.album_item {
  margin-right: 25px;
  margin-bottom: 30px;
  position: relative;
}
.category_singer_item {
  /* background: rgb(241, 241, 241); */
  margin-right: 8px;
  padding: 20px 10px 30px 10px;
  position: relative;
}
.item_cover {
  background-size: cover;
  width: 150px;
  height: 130px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s linear;
}
.category_pic {
  border-radius: 50%;
  width: 130px;
  margin: 0 auto;
}
.category_info {
  width: 250px;
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
}
.category_info {
  width: 150px;
}
.mv_pic {
  width: 250px;
  border-radius: 5px;
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

.album_info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  /* justify-content: space-between; */
  height: 50px;
}
.category_title {
  font-weight: bold;
  font-size: 12px;
  width: 130px;
  color: rgb(43, 43, 43);
}
.category_info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.category_title {
  text-align: center;
  font-size: 14px;
}
.cate_null_tip {
  text-align: center;
  font-size: 24px;
  display: block;
  margin-right: 50px;
}
</style>