import request from '@/utils/request'

/**
 * 获取当前用户角色
 */
export function getRoles(data) {
  return request({
    url: '/user/query_role',
    method: 'get',
    params: data
  })
}

/**
 * 编辑当前用户角色
 */
export function editUserRole(data) {
  return request({
    url: '/user/edit_role',
    method: 'post',
    data
  })
}

/**
 * 查询所有用户
 */
export function queryUser(data) {
  return request({
    url: '/user/query',
    method: 'get',
    params: data
  })
}

/**
 * 删除用户
 */
export function delUser(data) {
  return request({
    url: '/user/query',
    method: 'get',
    params: data
  })
}

/**
 * 查询所有角色
 */
export function queryRoles(data) {
  return request({
    url: '/role/query',
    method: 'get',
    params: data
  })
}

/**
 * 创建角色
 */
export function createRoles(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}

/**
 * 删除角色
 */
export function delRoles(data) {
  return request({
    url: '/role/del',
    method: 'post',
    data
  })
}

/**
 * 编辑角色
 */
export function editRoles(data) {
  return request({
    url: '/role/edit',
    method: 'post',
    data
  })
}
