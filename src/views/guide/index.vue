<template>
  <div class="guide">
    <el-button type="primary" @click.stop="guide">导航指引</el-button>
  </div>
</template>

<script>
import driver from '@/mixins/guide/driver'
export default {
  mixins: [driver]
}
</script>

<style lang="scss" scoped></style>
