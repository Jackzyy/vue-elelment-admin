let baseFn = {
  /**
   * Vue注册函数
   * @param {Object} Vue
   */
  install(Vue) {
    Vue.prototype.$baseFn = baseFn
  },

  /**
   * H5获取经纬度
   * 谷歌浏览器需要在HTTPS下才能正常获取参数
   */
  getPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('1', position)
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            let data = {
              latitude,
              longitude
            }
            console.log(data)
            resolve(data)
          },
          err => {
            reject(err)
          }
        )
      } else {
        reject('你的浏览器不支持当前地理位置信息获取')
      }
    })
  }
}

export default baseFn
