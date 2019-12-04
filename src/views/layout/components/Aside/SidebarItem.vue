<template>
  <fragment class="sidebar-container" v-if="!item.hidden">
    <!-- has only child -->
    <template v-if="hasOnlyChild(item.children, item)">
      <el-menu-item v-if="childItem.meta" :index="resolvePath(childItem.path)">
        <i :class="childItem.meta.icon ? childItem.meta.icon : ''"></i>
        <span slot="title">{{ childItem.meta.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <i :class="item.meta.icon ? item.meta.icon : ''"></i>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- component recursion -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </fragment>
</template>

<script>
import path from 'path'
import { Fragment } from 'vue-fragment'
export default {
  name: 'SidebarItem',
  components: {
    Fragment
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      childItem: null
    }
  },

  methods: {
    // 路由处理 hidden、只有一个children
    hasOnlyChild(children = [], item) {
      let newChildren = children.filter(obj => {
        return obj.hidden ? false : true
      })
      if (newChildren.length === 1) {
        this.childItem = newChildren[0]
        return true
      }
      if (newChildren.length === 0) {
        this.childItem = { ...item, path: '', noChild: true }
        return true
      }
      return false
    },

    // 路由地址拼接
    resolvePath: function(router) {
      return path.join(this.basePath, router)
    }
  }
}
</script>

<style lang="scss" scoped></style>
