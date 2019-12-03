<template>
  <div class="full-screen">
    <i
      id="domFullScreen"
      class="el-icon-full-screen"
      @click="handleFullScreen"
    ></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    handleFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.isFullscreen ? screenfull.exit() : screenfull.request()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.full-screen {
  font-size: 20px;
  padding: 0 10px;
  cursor: pointer;
}
</style>
