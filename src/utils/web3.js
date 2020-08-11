const filters = {
  taskStatusNameFilter:
    function(index) {
      const arr = ['PENDING', 'UNACCEPTED', 'ACCEPTED', 'EVALUATING', 'COMPLETED']
      return arr[index]
    }
  ,
  taskTypeFilter: function(taskType) {
    const typeArray = [
      '物联网测试', '物联网设备邮寄'
    ]
    return typeArray[taskType]
  }
  ,
  taskStatusFilter: function(status) {
    const statusArray = {
      PENDING: 'primary',
      UNACCEPTED: 'success',
      ACCEPTED: 'info',
      EVALUATING: 'danger',
      COMPLETED: 'warning'
    }
    return statusArray[status]
  }
  ,
  reputationFilter: function(rep) {
    const statusMap = {
      published: 'success',
      draft: 'gray',
      deleted: 'danger'
    }
    return 'success'
  }
  ,
  timeFilter: function(timestamp) {

    return new Date(timestamp)
  }
}
export default filters
