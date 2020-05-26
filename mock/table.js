import Mock from 'mockjs'

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
const taskData = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(6)',
      'category|1': ['提交报告', '物联网测试'],
      reward: '@integer(1,15)',
      deposit: '@integer(1,15)',
      repLimit: '@integer(1,10)',
      selectedNum: '@integer(1,10)',
      numLimit: '@integer(1,10)',
      createdTime: '@datetime',
      confirmTime: '@datetime',
      deadline: '@datetime',
      rPublicKey: '@sentence(10)',
      rAddress: '@sentence(15)',
      'status|1': ['delivery', 'accepted', 'finished', 'canceled'],
      alreadyReceived: '@boolean',
      'interface': '@url'
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
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/taskTable',
    type: 'get',
    response: config => {
      // const items = taskData.items
      const items = [{
        id: '1',
        title: '物联网LED',
        'category|1': ['物联网测试'],
        reward: '30',
        deposit: '30',
        repLimit: '70',
        selectedNum: '1',
        numLimit: '3',
        createdTime: '"2020-05-15 13:34:54"',
        confirmTime: '2020-05-15 13:40:17',
        deadline: '2020-06-1 13:34:54',
        rPublicKey: '',
        rAddress: '',
        status: 'finished',
        alreadyReceived: 'false',
        'interface': '@url'
      }, {
        id: '2',
        title: '物联网LED2',
        'category|1': ['物联网测试'],
        reward: '30',
        deposit: '30',
        repLimit: '70',
        selectedNum: '1',
        numLimit: '3',
        createdTime: '"2020-05-16 12:43:54"',
        confirmTime: '2020-05-16 12:50:11',
        deadline: '2020-06-1 12:43:54',
        rPublicKey: '',
        rAddress: '',
        status: 'accepted',
        alreadyReceived: 'false',
        'interface': '@url'
      }]
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
  // {
  //   url:'/vue-admin-template/',
  //   type: 'get',
  //   response:config => {
  //     const items = taskData.items
  //     return {
  //       code:20000,
  //       data:{
  //         total: items.length,
  //         items:items
  //       }
  //     }
  //   }
  // }
]
