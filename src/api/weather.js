import request from 'axios'

export function getLocation(data) {
  return request({
    url:
      '//restapi.amap.com/v3/weather/weatherInfo?key=14dcb445f62016425436e2b7296a2705',
    method: 'get',
    params: {
      data
    }
  })
}

export function getWeather(data) {
  return request({
    url:
      '//restapi.amap.com/v3/weather/weatherInfo?key=14dcb445f62016425436e2b7296a2705',
    method: 'get',
    params: {
      data
    }
  })
}
