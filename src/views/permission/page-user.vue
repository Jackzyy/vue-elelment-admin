<template>
  <div class="page-user">
    <el-card>
      <div class="tag-title">你当前可进入的页面是：</div>
      <el-tag v-for="item in allowRoutes"
              :key="item">
        {{item}}
      </el-tag>
    </el-card>
  </div>
</template>

<script>
import { currencyRoutes } from '@/router'
import { mapGetters } from 'vuex'
import { getRoutesMeta } from '@/utils/auth'
export default {
  data () {
    return {
      allowRoutes: []
    }
  },

  methods: {
    getAllowRoutes () {
      let permissionRoutes = [...this.addRoutes, ...currencyRoutes]
      this.allowRoutes = getRoutesMeta(permissionRoutes)
    }
  },

  computed: {
    ...mapGetters(['addRoutes'])
  },

  created () {
    this.getAllowRoutes()
  }
}
</script>

<style lang="scss" scoped>
.page-user {
  .tag-title {
    margin: 16px 0;
  }
  .el-tag {
    margin-right: 4px;
  }
}
</style>
