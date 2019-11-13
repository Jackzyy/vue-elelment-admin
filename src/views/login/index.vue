<template>
  <div class="login">
    <el-button @click="handleLogin">Login</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },

  methods: {
    async handleLogin () {
      try {
        const roles = await this.$store.dispatch('user/login')
        const addRoutes = await this.$store.dispatch('permission/getAsyncRoutes', roles)
        this.$router.addRoutes(addRoutes)
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
</style>
