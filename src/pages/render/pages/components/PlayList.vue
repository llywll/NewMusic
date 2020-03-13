<template>
    <div class="playViewListBox">
        <div :class="is_p?'song_list_box':'song_list_box off_box'">
          <div class="title_and_cont">
            <div class="list_info">
              <span>播放列表</span>
              <span>共{{ playList.length }}首歌</span>
            </div>

            <div class="list_con">
              <button class="intoBtn">
                <i class="im im-plus"></i>
                添加到
              </button>
              <button class="removeBtn">
                <i class="im im-trash-can"></i>清空
              </button>
            </div>
          </div>
          <div class="song_list">
            <ul class="songs_ul" ref="songs">
              <li
                :class="index==playListIndex?'song_item act_item': 'song_item'"
                v-for="(item,index) in playList"
                :key="index"
                @click="playSong(index)"
              >
                <div class="album_img_box" :data-song-id="item.songMid">
                  <img :src="item.url" />
                </div>
                <div class="song_name">
                  <span>{{ item.title }}</span>
                  <span>{{ item.singer }}</span>
                </div>
                <span class="song_time">{{comtime(item.interval)}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
</template>