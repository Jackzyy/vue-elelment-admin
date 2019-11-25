<template>
  <div class="roles">
    <el-card>
      <el-button type="primary"
                 @click="handleAddRoles">添加权限</el-button>
      <el-button type="primary"
                 @click="handleGetNodes">获取权限</el-button>
      <el-tree :data="allRoutes"
               show-checkbox
               :render-after-expand="false"
               node-key="name"
               :props="defaultProps"
               ref="tree">
      </el-tree>
      {{selectRoutes}}
    </el-card>
  </div>
</template>

<script>
import { asyncRoutes } from '@/router'
export default {
  data () {
    return {
      allRoutes: [...asyncRoutes], // 只需要异步路由即可
      defaultProps: {
        children: 'children',
        label: item => item.meta.title
      },
      selectRoutes: []
    }
  },
  methods: {
    handleAddRoles () {

    },

    handleGetNodes () { // 获取路由Tree选中的节点
      let selectRoutes = []
      let routes = this.$refs.tree.getCheckedNodes(false, true)
      for (let i = 0; i < routes.length; i++) {
        selectRoutes.push(routes[i].meta.title)
      }

      this.selectRoutes = selectRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
