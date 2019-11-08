const getters = {
  userName: state => state.user.userName,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  opened: state => state.app.opened
}

export default getters
