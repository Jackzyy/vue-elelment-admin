<template>
  <div class="err-page">
    <div class="page-tips">
      <p>Oooops! Sorry The Page Not Found :(</p>
      <p>You can back to <router-link to="/">Home</router-link></p>
    </div>
    <img src="@/assets/404/img-404.png" alt="404" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.err-page {
  overflow: hidden;
  position: relative;
  background-color: #ccc;
  .page-tips {
    position: absolute;
    top: 10%;
    left: 10%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
