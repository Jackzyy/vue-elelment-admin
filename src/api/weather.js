import request from 'axios'

export function getLocation(data) {
  return request({
    url:
      'https://restapi.amap.com/v3/geocode/regeo?key=14dcb445f62016425436e2b7296a2705&radius=1000&extensions=all&batch=false&roadlevel=0',
    method: 'get',
    params: data
  })
}

export function getWeather(city) {
  return request({
    url:
      'https://restapi.amap.com/v3/weather/weatherInfo?key=14dcb445f62016425436e2b7296a2705',
    method: 'get',
    params: city
  })
}
