<template>
  <div class="login">
    <div class="wrap">
      <div class="wrap-form">
        <div class="form-title">后台管理系统</div>
        <el-form ref="loginForm" :model="ruleForm" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入账号"
              prefix-icon="el-icon-username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            v-loading.fullscreen.lock="fullscreenLoading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      loadingColor: '#000',
      ruleForm: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    async handleLogin() {
      try {
        this.fullscreenLoading = true
        await this.$store.dispatch('user/_login', this.ruleForm)
        // await this.$store.dispatch('user/getUserRoles')
        this.fullscreenLoading = false
        this.$message({
          message: '用户登陆成功',
          type: 'success',
          center: true
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } catch (err) {
        this.fullscreenLoading = false
        throw err
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url('https://demos.creative-tim.com/vuetify-material-dashboard-pro/img/login.d6d3bb09.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  .wrap {
    width: 500px;
    height: 280px;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
    background: inherit;
    position: relative;
    top: 25%;
    .wrap-form {
      padding: 30px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      .form-title {
        font-size: 26px;
        text-align: center;
        padding: 0 0 30px;
        color: #f1f1f1;
      }
      .el-button {
        width: 100%;
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: inherit;
      filter: blur(10px);
    }
  }
}
</style>
