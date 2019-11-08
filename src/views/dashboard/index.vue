<template>
  <div class="dashboard">
    <el-button @click="handleLogin">Login</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },

  methods: {
    ...mapActions('permission', [
      'getAsyncRoutes'
    ]),

    async handleLogin () {
      let router = await this.getAsyncRoutes('admin')
      this.$router.addRoutes(router)
      console.log(router)
      console.log(this.routes)
      console.log(this.addRoutes)
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
