const getters = {
  userName: state => state.user.userName,
  token: state => state.user.token,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  opened: state => state.app.opened,
  showDriver: state => state.app.showDriver
}

export default getters
