// Store State 统一出口
const getters = {
  userinfo: state => state.user.userinfo,
  token: state => state.user.token,
  rolePages: state => state.user.roleinfo.pages,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  opened: state => state.app.opened,
  showDriver: state => state.app.showDriver
}

export default getters
