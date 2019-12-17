export default {
  data() {
    return {
      sideBarDom: null
    }
  },

  mounted() {
    this.windowInitResize()
  },

  activated() {
    this.windowInitResize()
  },

  deactivated() {
    this.removeWindowInitResize()
  },

  destroyed() {
    this.removeWindowInitResize()
  },

  methods: {
    resizeChart() {
      this.mycharts.resize()
    },

    windowInitResize() {
      window.addEventListener('resize', this.resizeChart)
    },

    removeWindowInitResize() {
      window.removeEventListener('resize', this.resizeChart)
    },

    sideWidthHandle(e) {
      if (e.propertyName === 'width') {
        this.resizeChart()
      }
    }
  }
}
