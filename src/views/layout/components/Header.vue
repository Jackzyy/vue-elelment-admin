<template>
  <div class="header">
    <div class="header-l">
      <div id="domColapse" class="open-icon">
        <i v-if="opened" class="el-icon-s-unfold" @click="handleClose"></i>
        <i v-else class="el-icon-s-fold" @click="handleOpen"></i>
      </div>
      <BreadCrumb id="domBread"></BreadCrumb>
    </div>

    <div class="header-r">
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
export default {
  components: {
    BreadCrumb,
    UserDropdown,
    FullScreen
  },

  methods: {
    handleOpen() {
      this['SET_OPENED'](true)
    },
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
