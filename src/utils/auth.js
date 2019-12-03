/**
 * 获取Token
 */
export function getToken() {
  if (localStorage.getItem('vuex')) {
    return JSON.parse(localStorage.getItem('vuex')).user.token
  }
  return ''
}

/**
 * 递归扁平化路由 获取meta信息
 * @param {Array} routes
 */
export function getRoutesMeta(routes) {
  let routesTitle = []
  for (let index = 0; index < routes.length; index++) {
    if (routes[index].children) {
      routesTitle = [...routesTitle, ...getRoutesMeta(routes[index].children)]
    }
    routesTitle.push(routes[index].name)
  }
  return routesTitle
}
