import request from '@/utils/request'

export function submitCommand(data) {
  return request({
    url: '/api/command',
    method: 'post',
    data: data
  })
}

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params: params
  })
}

export function getTaskList(params) {
  return request({
    url: '/api/task',
    method: 'get',
    params: params
  })
}

export function submitTask(data) {
  return request({
    url: '/api/task',
    method: 'post',
    data: data
  })
}

// export function getTaskList(params) {
//   return request({
//     url: '',
//     method: 'get',
//     params: params
//   })
// }
