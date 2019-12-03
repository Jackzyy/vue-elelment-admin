<template>
  <div class="dashboard">
    <el-button @click="handleLogin">Login</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {}
  },

  methods: {
    ...mapActions('user', ['login']),

    async handleLogin() {
      this.login()
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

<style lang="scss" scoped></style>
