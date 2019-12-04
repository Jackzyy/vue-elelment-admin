<template>
  <div class="sidebar" :class="{ sidebarCloseWidth: !opened }">
    <el-menu
      :default-active="activeMenu"
      :collapse="!opened"
      :collapse-transition="false"
      background-color="#3a3f51"
      text-color="#b5b6bd"
      active-text-color="#4F94D4"
      router
    >
      <el-menu-item class="menu-title">
        <i class="el-icon-s-platform"></i>
        <span slot="title">Vue Admin</span>
      </el-menu-item>
      <SidebarItem
        v-for="item in routes"
        :key="item.path"
        :item="item"
        :base-path="item.path"
      >
      </SidebarItem>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: {
    SidebarItem
  },

  methods: {},

  computed: {
    ...mapGetters(['routes', 'addRoutes', 'opened']),

    // 默认激活项
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped></style>
