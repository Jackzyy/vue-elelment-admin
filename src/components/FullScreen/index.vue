<template>
  <div class="full-screen">
    <i class="el-icon-full-screen" @click="handleFullScreen"></i>
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
  margin: 0 18px;
  cursor: pointer;
}
</style>
