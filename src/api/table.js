import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function getTaskList(params) {
  return request({
    url: '/vue-admin-template/table/taskTable',
    method: 'get',
    params: params
  })
}
// export function getTaskList(params) {
//   return request({
//     url: '',
//     method: 'get',
//     params: params
//   })
// }
