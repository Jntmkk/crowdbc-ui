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
      title:'@sentence(6)',
      'category|1': ['Programmer', 'ImageRec', 'Scrapy'],
      reward: '@integer(1,15)',
      deposit: '@integer(1,15)',
      repLimit:'@integer(1,10)',
      numLimit:'@integer(1,10)',
      createdTime: '@datetime',
      confirmTime: '@datetime',
      deadline: '@datetime',
      rPublicKey: '@sentence(10)',
      rAddress: '@sentence(15)',
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
      const items = taskData.items
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
