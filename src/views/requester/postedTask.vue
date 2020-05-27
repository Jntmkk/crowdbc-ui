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
          {{scope.row.category}}
        </template>
      </el-table-column>
      <el-table-column label="奖励" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.reward}}
        </template>
      </el-table-column>
      <el-table-column label="荣誉要求" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.repLimit}}
        </template>
      </el-table-column>
      <el-table-column label="人数限制" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.selectedNum}}/{{scope.row.numLimit}}
        </template>

      </el-table-column>
      <!--      <el-table-column label="创建时间" header-align="center" align="center" mini-width="90">-->
      <!--        <template v-slot="scope">-->
      <!--          {{scope.row.createdTime}}-->
      <!--        </template>-->

      <!--      </el-table-column>-->
      <!--      <el-table-column label="确认时间" header-align="center" align="center" mini-width="90">-->
      <!--        <template v-slot="scope">-->
      <!--          {{scope.row.confirmTime}}-->
      <!--        </template>-->

      <!--      </el-table-column>-->
      <el-table-column label="截止时间" header-align="center" align="center" min-width="120">
        <template v-slot="scope">
          {{scope.row.deadline|timeFilter}}
        </template>

      </el-table-column>
      <el-table-column label="任务状态" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          <el-button round :type="statusMap(scope.row.status)">{{scope.row.status}}</el-button>
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
<!--      <el-table-column label="操作" header-align="center" align="center" min-width="250">-->
<!--        <template v-slot="scope">-->
<!--          &lt;!&ndash;          <el-tag :type="scope.row"&ndash;&gt;-->
<!--          <el-button size="mini" type="info" :key="scope.$index">-->
<!--            详情<i class="el-icon-arrow-right"></i>-->
<!--          </el-button>-->
<!--          <el-button v-if="!scope.row.alreadyReceived" size="mini" type="info" :disabled="!repRequiredMap(scope.row)"-->
<!--                     style="width: 20%"-->
<!--                     @click="receive(scope.row)">-->
<!--            接收<i class="el-icon-arrow-right"></i>-->
<!--          </el-button>-->
<!--          <el-button v-if="scope.row.alreadyReceived" size="mini" type="info" :disabled="!repRequiredMap(scope.row)"-->
<!--                     @click="receive(scope.row)"-->
<!--                     style="width: 20%">-->
<!--            已接收<i class="el-icon-arrow-right"></i>-->
<!--          </el-button>-->
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
      reputationFilter(rep) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return 'success'
      },
      timeFilter(tm) {
        let arr = tm.split(' ')
        return arr[0]
      }
    },
    data() {
      return {
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
      fetchData() {
        this.listLoading = true
        getTaskList().then(response => {
          this.list = response.data.items
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
