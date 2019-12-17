import request from '@/utils/request'

export function getTableList() {
  return request({
    url: '/tableData',
    method: 'get'
  })
}
