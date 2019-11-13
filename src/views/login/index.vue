<template>
  <div class="login">
    <div class="bg"></div>
    <div class="wrap">
      <div class="form-title">后台管理系统</div>
      <el-form ref="loginForm"
               :rules="rules"
               :model="ruleForm">
        <el-form-item prop="user">
          <el-input placeholder="请输入账号"
                    prefix-icon="el-icon-user"
                    v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    v-model="ruleForm.password"
                    show-password></el-input>
        </el-form-item>
        <el-button type="primary"
                   class="loginBtn"
                   @click="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        user: 'admin',
        password: '123456'
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    async handleLogin () {
      try {
        await this.$store.dispatch('user/login')
        this.$router.push('/')
      } catch (err) {
        throw err
      }
    }
  },

  computed: {
    ...mapState('permission', {
      routes: state => state.routes,
      addRoutes: state => state.addRoutes
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.6;
    background: linear-gradient(to bottom right, #000000, #cccccc);
  }
  .wrap {
    box-sizing: border-box;
    width: 500px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .form-title{
      font-size: 26px;
      text-align: center;
      padding:0 0 50px;
      color: #f1f1f1;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
