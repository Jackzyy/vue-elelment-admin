<template>
  <div class="weather">
    <i class="el-icon-cloudy"></i>
  </div>
</template>

<script>
import { getWeather, getLocation } from '@/api/weather'
export default {
  data() {
    return {
      weatherInfo: {}
    }
  },

  created() {
    this.getWeather()
  },

  methods: {
    async getWeather() {
      // 经纬度
      let position = await this.$baseFn.getPosition()
      // 地区码
      let adcode = (
        await getLocation({
          location: `${position.longitude},${position.latitude}`
          // location: JSON.stringify('39.9657822,116.3066858')
        })
      ).data.regeocode.addressComponent.adcode
      // 天气信息
      this.weatherInfo = await getWeather({ city: adcode })
    }
  }
}
</script>

<style lang="scss" scoped>
.weather {
  font-size: 20px;
  padding: 0 10px;
  cursor: pointer;
}
</style>
