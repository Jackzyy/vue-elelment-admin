<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"
                          v-show="!isIndex">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadList"
                          :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadList: []
    }
  },

  watch: {
    $route (route) {
      let filterList = route.matched.filter(item => {
        if (item.meta && item.meta.title) {
          return item
        }
      })
      this.breadList = filterList
    }
  },

  computed: {
    isIndex () {
      let isIndexPage = false
      this.breadList.forEach(item => {
        if (item.path === '/' || item.path === '/dashbord') {
          isIndexPage = true
        } else {
          isIndexPage = false
        }
      })
      return isIndexPage
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
