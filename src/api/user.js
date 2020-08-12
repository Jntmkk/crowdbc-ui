import request from '@/utils/request'

export function sendCommand(data) {
  return request({
    url: '/api/onenet/command',
    method: 'post',
    data
  })
}

export function getTransaction() {
  return request({
    url: '/api/transaction',
    method: 'get'
  })
}

export function getBalance() {
  return request({
    url: '/api/balance',
    method: 'get'
  })
}

// export function getAcceptedTask(params) {
//   return request({
//     url: '/api/task/acceptance',
//     method: 'get',
//     params
//   })
// }

export function acceptTask(params) {
  return request({
    url: '/api/task/acceptance',
    method: 'get',
    params
  })
}

export function sendReportInfo(data) {
  return new request({
    url: 'api/task/report',
    method: 'post',
    data
  })
}

export function getReport(params) {
  return request({
    url: '/api/task/report',
    method: 'get',
    params
  })
}

export function submitReport(data) {
  return request({
    url: '/api/task/report',
    method: 'post',
    data
  })
}

export function submitEvaluation(data) {
  return request({
    url: '/api/task/evaluation',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/api/auth/signin',
    method: 'post',
    data
  })
}

export function signup(data) {
  return request({
    url: '/api/auth/signup',
    method: 'post',
    data
  })

}

export function register(data) {
  return request({
    url: '/vue-admin-template/user/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}
