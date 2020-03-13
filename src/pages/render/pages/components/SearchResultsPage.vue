<template>
  <div class="resulet_box">
    <!-- <div class="sreach_info">
      <span class="info_title">“{{stext.trim()}}”的检索结果</span>
    </div>-->
    <div class="wave_box">
      <div class="pre" ref="pre"></div>
      <div id="waveform" ref="waveform"></div>
    </div>
    <button @click="play()" style="margin-top: 200px">play</button>
  </div>
</template>
<script>
// import WaveSurfer from "wavesurfer.js"; //导入wavesurfer.js
export default {
  name: "SearchResultsPage",
  data: function() {
    return {
      // wavesurfer: null
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.wavesurfer = WaveSurfer.create({
  //       container: this.$refs.waveform,
  //       waveColor: "#DDD",
  //       progressColor: "#DDD",
  //       backend: "MediaElement",
  //       cursorWidth: 0,
  //       mediaControls: false,
  //       audioRate: 1,
  //       barWidth: 2, //条纹宽度
  //       height: 60,
  //       hideScrollbar: true,
  //       minPxPerSec: 6,
  //       forceDecode: true
  //     });
  //     // 特别提醒：此处需要使用require(相对路径)，否则会报错
  //     this.wavesurfer.load(require("../../assets/ingrosso.flac"));
  //     this.wavesurfer.on("audioprocess", () => {
  //       console.log(this.wavesurfer.getCurrentTime());
  //       let temp =
  //         (parseInt((this.wavesurfer.getCurrentTime() / 190) * 10000) / 10000) *
  //         this.$refs.waveform.firstChild.offsetWidth;
  //       console.log(temp);
  //       this.$refs.pre.style =
  //         "width:" +
  //         parseInt((this.wavesurfer.getCurrentTime() / 190) * 10000) / 100 +
  //         "%";
  //       this.$refs.waveform.style = "left:-" + temp + "px";
  //     });
  //   });
  //   // },
  //   // computed: {
  //   //   stext() {
  //   //     return this.$store.state.search.searchKey
  //   //   }
  // },
  // methods: {
  //   play: function() {
  //     this.wavesurfer.playPause.bind(this.wavesurfer)();
  //   }
  // }
};
</script>
<style scoped>
.resulet_box {
  margin: 80px 0;
  width: 100%;
  height: 100%;
  position: relative;
}
/* .info_title {
  font-size: 28px;
  font-weight: bold;
  color: rgb(90, 90, 90);
}
.wave_box {
  width: 400px;
  height: 30px;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 auto;
  border-bottom: 1px dashed #0000004f;
}
.pre {
  height: 100%;
  width: 0;
  background: rgba(0, 0, 0, 0.534);
}
#waveform {
  width: 2000px;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.1s linear;
  z-index: -1;
}
wave {
  transition: all 0.1s linear;
} */
</style>