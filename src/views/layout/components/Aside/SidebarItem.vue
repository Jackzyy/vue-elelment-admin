<template>
  <fragment class="sidebar-container" v-if="!item.hidden">
    <!-- has only child -->
    <el-menu-item
      v-if="hasOnlyChild(item.children, item)"
      :index="resolvePath(childItem.path)"
    >
      <i :class="childItem.meta.icon"></i>
      <span slot="title">{{ childItem.meta.title }}</span>
    </el-menu-item>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <i :class="item.meta.icon"></i>
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
    hasOnlyChild(children = [], item) {
      // debugger
      let newChildren = children.filter(obj => {
        if (obj.hidden) {
          return false
        } else {
          return true
        }
      })
      if (newChildren.length === 1 && !item.meta) {
        this.childItem = newChildren[0]
        return true
      }
      if (newChildren.length === 0) {
        this.childItem = { ...item, path: '', noChild: true }
        return true
      }
      return false
    },

    resolvePath: function(router) {
      return path.join(this.basePath, router)
    }
  }
}
</script>

<style lang="scss" scoped></style>
