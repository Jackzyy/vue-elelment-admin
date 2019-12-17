<template>
  <div
    class="pie-charts"
    ref="myCharts"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script>
import resize from '@/mixins/echarts/resize'
import echarts from 'echarts'
import 'echarts/theme/macarons' // echarts theme
export default {
  mixins: [resize],
  props: {
    // eCharts 配置
    options: {
      type: Object
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },

  data() {
    return {
      mycharts: null
    }
  },

  watch: {
    options: {
      handler(newValue) {
        this.mycharts.setOption(newValue)
      },
      deep: true
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts()
    })
  },

  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.myCharts, 'macarons')
      this.setOption(this.options)
    },

    setOption(options) {
      this.mycharts.setOption(options)
    }
  }
}
</script>

<style lang="scss" scoped></style>
