<template>
  <div id="domPersonal" class="user-dropdown">
    <el-dropdown placement="bottom-start">
      <span class="el-dropdown-link">
        {{ userinfo.user }}
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-s-home" @click.native="handleGoHome">
          首页
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-custom">
          个人信息
        </el-dropdown-item>
        <el-dropdown-item
          divided
          icon="el-icon-switch-button"
          @click.native="handleLoginOut"
        >
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-image
      style="width: 40px; height: 40px"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      fit="fill"
    >
    </el-image>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userinfo'])
  },

  methods: {
    handleLoginOut() {
      this.$store.dispatch('user/loginOut')
      this.$message({
        message: '用户退出登陆',
        type: 'warning',
        center: true
      })
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    },

    handleGoHome() {
      this.$router.push('/dashbord')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-dropdown {
  padding: 2px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .el-dropdown {
    padding: 12px 0;
  }

  .el-image {
    border-radius: 50%;
    margin-left: 6px;
  }
}
</style>
