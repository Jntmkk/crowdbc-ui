import Mock from 'mockjs'
import { config } from '@vue/test-utils'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
const task = Mock.mock({
  'items|30': [{
    createDate: 1597385828,
    currentWorkerNum: 1,
    deadline: 1598630400000,
    deposit: '@integer(100)',
    description: '@sentence(5,10)',
    deviceId: '@integer(10,99)',
    deviceToken: '@sentence(5,10)',
    id: '@id',
    maxWorkerNum: '@integer(10,99)',
    minReputation: '@integer(10,99)',
    platform: 'OneNet',
    pointer: '@sentence(5,10)',
    reward: '@integer(100000,99000000000)',
    status: 'UNACCEPTED',
    taskType: 0,
    title: '@sentence(5,10)'
  }

  ]
})
const taskData = Mock.mock({
  'items|30': [
    {
      createDate: 1597385828,
      currentWorkerNum: 1,
      deadline: 1598630400000,
      deposit: 555,
      description: 'des',
      deviceId: '123',
      deviceToken: '456',
      id: 0,
      maxWorkerNum: 3,
      minReputation: 60,
      platform: 'OneNet',
      pointer: 'n1',
      reward: 66666666666666660000,
      status: 'UNACCEPTED',
      taskType: 0,
      title: 'test1'
    }
  ]
})

export default [
  {
    url: '/api/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: '200',
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }, {
    url: '/api/task',
    type: 'post',
    response: config => {
      return {
        code: '200',
        msg: 'success',
        data: null
      }
    }
  },
  {
    url: '/api/task',
    type: 'get',
    response: config => {
      // const items = taskData.items
      // const items = [{
      //   id: '1',
      //   title: '物联网LED',
      //   'category|1': ['物联网测试'],
      //   reward: '30',
      //   deposit: '30',
      //   repLimit: '70',
      //   selectedNum: '1',
      //   numLimit: '3',
      //   createdTime: '"2020-05-15 13:34:54"',
      //   confirmTime: '2020-05-15 13:40:17',
      //   deadline: '2020-06-1 13:34:54',
      //   rPublicKey: '',
      //   rAddress: '',
      //   status: 'finished',
      //   alreadyReceived: 'false',
      //   'interface': '@url'
      // }, {
      //   id: '2',
      //   title: '物联网LED2',
      //   'category|1': ['物联网测试'],
      //   reward: '30',
      //   deposit: '30',
      //   repLimit: '70',
      //   selectedNum: '1',
      //   numLimit: '3',
      //   createdTime: '"2020-05-16 12:43:54"',
      //   confirmTime: '2020-05-16 12:50:11',
      //   deadline: '2020-06-1 12:43:54',
      //   rPublicKey: '',
      //   rAddress: '',
      //   status: 'accepted',
      //   alreadyReceived: 'false',
      //   'interface': '@url'
      // }, {
      //   id: '3',
      //   title: '物联网设备',
      //   'category|1': ['物联网设备邮寄'],
      //   reward: '0',
      //   deposit: '0',
      //   repLimit: '70',
      //   selectedNum: '1',
      //   numLimit: '1',
      //   createdTime: '"2020-05-17 12:43:54"',
      //   confirmTime: '2020-05-17 12:50:11',
      //   deadline: '2020-06-1 12:43:54',
      //   rPublicKey: '',
      //   rAddress: '',
      //   status: 'delivery',
      //   alreadyReceived: 'true',
      //   'interface': '@url'
      // }
      // ]
      const { action } = config.body
      return {
        code: '200',

        message: 'success-kk',
        data: task.items

      }

    }
  }
  // {
  //   url:'/vue-admin-template/',
  //   type: 'get',
  //   response:config => {
  //     const items = taskData.items
  //     return {
  //       code:200,
  //       data:{
  //         total: items.length,
  //         items:items
  //       }
  //     }
  //   }
  // }
]
