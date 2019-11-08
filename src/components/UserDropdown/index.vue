<template>
  <div class="user-dropdown">
    <el-dropdown placement="bottom-start">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-s-home">
          首页
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-custom">
          个人信息
        </el-dropdown-item>
        <el-dropdown-item divided
                          icon="el-icon-switch-button">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-image style="width: 40px; height: 40px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="fill">
    </el-image>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  .el-dropdown{
    padding: 12px 0;
  }
  .el-image {
    border-radius: 50%;
    margin: 0 6px;
  }
}
</style>
