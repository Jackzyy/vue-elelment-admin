<template>
  <div class="guide">
    <el-card>
      <div class="tag-title">
        <i class="el-icon-s-opportunity"></i>
        点击按钮可查看本管理系统的基本操作：
      </div>
      <el-button type="primary" @click.stop="guide">导航指引</el-button>
    </el-card>
  </div>
</template>

<script>
import driver from '@/mixins/guide/driver'
export default {
  mixins: [driver]
}
</script>

<style lang="scss" scoped></style>
