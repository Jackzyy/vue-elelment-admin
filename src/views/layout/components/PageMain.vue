<template>
  <div class="page-main">
    <transition name="fade-page" mode="out-in">
      <keep-alive>
        <router-view v-if="!$route.meta.noCache" />
      </keep-alive>
      <router-view v-if="$route.meta.noCache" />
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
