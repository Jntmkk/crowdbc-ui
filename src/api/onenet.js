// create an axios instance
import axios from 'axios'

let baseUrl = 'http://api.heclouds.com/devices/'

const request = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  },
  baseURL: baseUrl, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 100 * 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    config.headers['api-key'] = '4ooXCWYrQGFybSMhCs3xDiZeW8I='
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // config.headers['Access-Control-Allow-Credentials'] = 'true'
    // config.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

export function sendCommand(deviceId, cmd) {
  let data = {
    datastreams: [{
      id: 'code',
      datapoints: [{
        value: cmd
      }]
    }]
  }
  return request({
    url: deviceId + '/datapoints',
    method: 'post',
    data
  })
}
