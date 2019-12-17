<template>
  <div class="err-page">
    <div class="page-tips">
      <p>Oooops! Sorry The Page Not Found :(</p>
      <p>You can back to <router-link to="/">Home</router-link></p>
    </div>
    <div class="err-page-bg">
      <img src="@/assets/404/img-404.png" alt="404" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.err-page {
  width: auto;
  height: 100vh;
  position: relative;
  .page-tips {
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: 10;
  }
  .err-page-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
