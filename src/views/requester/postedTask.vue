<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template v-slot="scope">
          {{parseInt(scope.$index)+1}}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="left" width="320" label="标题">
        <template v-slot="scope">
          <span style="overflow: hidden;white-space: nowrap;text-overflow-ellipsis: true">
            {{scope.row.title}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="类别" header-align="center" align="center" width="120">
        <template v-slot="scope">
          {{scope.row.taskType|taskTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="奖励" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.reward}}
        </template>
      </el-table-column>
      <el-table-column label="荣誉要求" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.minReputation}}
        </template>
      </el-table-column>
      <el-table-column label="人数限制" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.currentWorkerNum}}/{{scope.row.maxWorkerNum}}
        </template>

      </el-table-column>
      <!--            <el-table-column label="创建时间" header-align="center" align="center" mini-width="90">-->
      <!--              <template v-slot="scope">-->
      <!--                {{scope.row.createdTime}}-->
      <!--              </template>-->

      <!--            </el-table-column>-->
      <!--            <el-table-column label="确认时间" header-align="center" align="center" mini-width="90">-->
      <!--              <template v-slot="scope">-->
      <!--                {{scope.row.confirmTime}}-->
      <!--              </template>-->

      <!--            </el-table-column>-->
      <el-table-column label="截止时间" header-align="center" align="center" min-width="120">
        <template v-slot="scope">
          {{scope.row.deadline|timeFilter}}
        </template>

      </el-table-column>
      <el-table-column label="任务状态" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          <el-button round :type="scope.row.status|taskStatusFilter">
            {{scope.row.status}}
          </el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column label="发布者公钥" header-align="center" align="center" mini-width="90">-->
      <!--        <template v-slot="scope">-->
      <!--         <span style="overflow: hidden;white-space: nowrap;text-overflow-ellipsis: true">-->
      <!--            {{scope.row.rPublicKey}}-->
      <!--          </span>-->
      <!--        </template>-->

      <!--      </el-table-column>-->
      <!--      <el-table-column label="发布者地址" header-align="center" align="center" mini-width="90">-->
      <!--        <template v-slot="scope">-->
      <!--          <span style="overflow: hidden;white-space: nowrap;text-overflow-ellipsis: true">-->
      <!--            {{scope.row.rAddress}}-->
      <!--          </span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
<!--      <el-table-column label="操作" header-align="center" align="center" min-width="100">-->
<!--        <template v-slot="scope">-->
<!--          <el-button type="primary" :disabled="scope.row.status|operationFilter" @click="gotoAssessment(scope.row.id)"-->
<!--                     round>评估-->
<!--          </el-button>-->
<!--          &lt;!&ndash;          <el-tag :type="scope.row"&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-button size="mini" type="info" :key="scope.$index">&ndash;&gt;-->
<!--          &lt;!&ndash;            详情<i class="el-icon-arrow-right"></i>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-button v-if="!scope.row.alreadyReceived" size="mini" type="info" :disabled="!repRequiredMap(scope.row)"&ndash;&gt;-->
<!--          &lt;!&ndash;                     style="width: 20%"&ndash;&gt;-->
<!--          &lt;!&ndash;                     @click="receive(scope.row)">&ndash;&gt;-->
<!--          &lt;!&ndash;            接收<i class="el-icon-arrow-right"></i>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-button v-if="scope.row.alreadyReceived" size="mini" type="info" :disabled="!repRequiredMap(scope.row)"&ndash;&gt;-->
<!--          &lt;!&ndash;                     @click="receive(scope.row)"&ndash;&gt;-->
<!--          &lt;!&ndash;                     style="width: 20%">&ndash;&gt;-->
<!--          &lt;!&ndash;            已接收<i class="el-icon-arrow-right"></i>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-button type="primary" :disabled="scope.row.reports.length==0" round>下载报告</el-button>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-row style="margin-left: 80px;margin-top: 8px" :gutter="1">
      <el-col :span="2" :offset="16">
        <el-button type="primary" round :disabled="tableControl.isFirst" @click="lastPage">上一页</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" round @click="nextPage">下一页</el-button>
      </el-col>
      <el-col :span="3">
        <el-input type="number" v-model="tableControl.goto">
          <el-button round type="primary" slot="append" @click="gotoPage">跳转</el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  // import task
  import { getTaskList } from '@/api/table'
  export default {
    name: 'PostedTask',
    filters: {
      taskStatusNameFilter: function(index) {
        const arr = ['PENDING', 'UNACCEPTED', 'ACCEPTED', 'EVALUATING', 'COMPLETED']
        return arr[index]
      },
      taskTypeFilter: function(taskType) {
        const typeArray = [
          '物联网测试', '物联网设备邮寄'
        ]
        return typeArray[taskType]
      },
      operationFilter: function(operation) {
        if (operation === 'EVALUATING') {
          return false
        } else {
          return true
        }
      },
      taskStatusFilter: function(status) {
        const statusArray = {
          PENDING: 'primary',
          UNACCEPTED: 'success',
          ACCEPTED: 'info',
          EVALUATING: 'danger',
          COMPLETED: 'warning'
        }
        return statusArray[status]
      },
      reputationFilter: function(rep) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return 'success'
      },
      timeFilter: function(timestamp) {

        return new Date(timestamp)
      }
    },
    data() {
      return {
        username: '',
        dialog: {
          dialogVisible: false,
          isDone: false
        },
        tableControl: {
          goto: 1,
          isFirst: true
        },
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      gotoAssessment: function(taskId) {
        this.$router.push({ name: 'assessment', params: { id: taskId } })
      },
      fetchData() {
        this.listLoading = true
        let name = this.$store.state.user.name
        getTaskList({ type: 'post', username: name }).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      nextPage: function() {
        this.fetchData()
      },
      gotoPage: function() {

      },
      lastPage: function() {

      },
      statusMap: function(status) {
        const mapper = {
          'delivery': 'primary',
          'accepted': 'info',
          'finished': 'success',
          'canceled': 'warn'
        }
        return mapper[status]
      },
      repRequiredMap: function(row) {
        return row.numLimit - row.selectedNum > 0
      },
      receive: function(scope) {
        this.$message({
          showClose: true,
          message: '接收成功',
          type: 'success'
        })
        scope.alreadyReceived = true
      }
    }
  }
</script>

<style scoped>

</style>
