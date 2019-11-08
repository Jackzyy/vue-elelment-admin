import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/views/layout'

Vue.use(VueRouter)

/* common routers */
export const currencyRoutes = [{
  path: '/',
  name: 'Home',
  component: Layout,
  redirect: '/dashbord',
  children: [{
    path: 'dashbord',
    name: 'Dashbord',
    component: () => import('@/views/dashboard'),
    meta: {
      title: '首页',
      icon: 'el-icon-s-data'
    }
  }]
}]

/* async routers */
export const asyncRoutes = [{
  path: '/permission',
  name: 'Permission',
  component: Layout,
  redirect: '/permission/page-user',
  meta: {
    title: '权限许可',
    icon: 'el-icon-lock'
  },
  children: [{
    path: 'page-user',
    name: 'PageUser',
    component: () => import('@/views/permission/page-user'),
    meta: {
      title: '用户页面',
      icon: 'el-icon-user'
    }
  }, {
    path: 'page-admin',
    name: 'PageAdmin',
    component: () => import('@/views/permission/page-admin'),
    meta: {
      title: '管理员页面',
      icon: 'el-icon-user-solid'
    }
  }, {
    path: 'roles',
    name: 'Roles',
    component: () => import('@/views/permission/roles'),
    meta: {
      title: '权限设置',
      icon: 'el-icon-s-tools'
    }
  }]
}]

const router = new VueRouter({
  routes: currencyRoutes,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})

// router.beforeEach((to, from, next) => {
//   next()
// })

// 页面重载
window.onload = async () => {
  const addRoutes = await store.dispatch('permission/getAsyncRoutes')
  console.log(addRoutes)
  router.addRoutes(addRoutes)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
