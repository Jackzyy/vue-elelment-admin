<template>
  <div class="layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside id="domSideBar">
        <el-scrollbar>
          <Aside />
        </el-scrollbar>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header>
          <Header />
        </el-header>

        <!-- 内容主体 -->
        <el-main>
          <el-scrollbar>
            <PageMain />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './components/Aside/index'
import Header from './components/Header'
import PageMain from './components/PageMain'
import driver from '@/mixins/guide/driver'
export default {
  mixins: [driver],
  components: {
    Aside,
    Header,
    PageMain
  }
}
</script>

<style lang="scss" scoped></style>
