<template>
  <div id="newWindow">
    <div class="lyric" v-html="lyric"></div>
  </div>
</template>
<script>
export default {
  name: "newWindow",
  data() {
    return {
      lyric: "新音乐，聆听生活"
    };
  },
  mounted() {
    this.$ipc.on("showlyirc", (e, message) => {
      console.log(message);
      this.lyric = message.text;
    });
  }
};
</script>
<style>
#newWindow {
  background: rgba(0, 0, 0, 0.384);
  height: 65px;
  width: 800px;
  display: flex;
  align-items: center;
  justify-self: center;
}
.lyric {
  pointer-events: none;
  font-size: 28px;
  font-weight: lighter;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  color: white;
}
</style>