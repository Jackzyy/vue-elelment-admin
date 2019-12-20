<template>
  <div class="header">
    <div class="header-l">
      <div id="domColapse" class="open-icon">
        <i v-if="opened" class="el-icon-s-fold" @click="handleClose"></i>
        <i v-else class="el-icon-s-unfold" @click="handleOpen"></i>
      </div>
      <BreadCrumb id="domBread"></BreadCrumb>
    </div>

    <div class="header-r">
      <Weather></Weather>
      <FullScreen></FullScreen>
      <UserDropdown></UserDropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb'
import UserDropdown from '@/components/UserDropdown'
import FullScreen from '@/components/FullScreen'
import Weather from '@/components/Weather'
export default {
  components: {
    BreadCrumb,
    UserDropdown,
    FullScreen,
    Weather
  },

  methods: {
    // 侧边栏展开
    handleOpen() {
      this['SET_OPENED'](true)
    },

    // 侧边栏关闭
    handleClose() {
      this['SET_OPENED'](false)
    },

    ...mapMutations('app', ['SET_OPENED'])
  },

  computed: {
    ...mapState('app', {
      opened: state => state.opened
    })
  }
}
</script>

<style lang="scss" scoped></style>
