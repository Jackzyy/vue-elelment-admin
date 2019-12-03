import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      driver: null
    }
  },

  computed: {
    ...mapGetters(['showDriver'])
  },

  mounted() {
    this.driver = new Driver()
    if (this.showDriver) {
      this.guide()
      this.$store.commit('app/SET_DRIVER', false)
    }
  },

  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
