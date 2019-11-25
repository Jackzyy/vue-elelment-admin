import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

import Layout from '@/views/layout'

Vue.use(VueRouter)

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

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
}, {
  path: '/login',
  name: 'Login',
  hidden: true,
  component: () => import('@/views/login')
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

const creatRouter = () => {
  return new VueRouter({
    routes: currencyRoutes,
    scrollBehavior () {
      return {
        x: 0,
        y: 0
      }
    }
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter () {
  const reset = creatRouter()
  router.matcher = reset.matcher
}

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (getToken()) {
      let hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('user/getUserRoles')
          const addRoutes = await store.dispatch('permission/getAsyncRoutes', roles)
          router.addRoutes(addRoutes)

          next({
            ...to,
            replace: true
          })
        } catch (err) {
          throw err
        }
      }
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

// vue-router 3.x 必需监听 错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
