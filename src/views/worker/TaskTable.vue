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
      <el-table-column label="类别" header-align="center" align="center" width="110">
        <template v-slot="scope">
          {{scope.row.category}}
        </template>
      </el-table-column>
      <el-table-column label="奖励" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.reward}}
        </template>
      </el-table-column>
      <el-table-column label="保证金" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.deposit}}
        </template>
      </el-table-column>
      <el-table-column label="荣誉要求" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.repLimit}}
        </template>
      </el-table-column>
      <el-table-column label="人数限制" header-align="center" align="center" mini-width="90">
        <template v-slot="scope">
          {{scope.row.numLimit}}
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
        <template v-slot="scope" >
          {{scope.row.deadline|timeFilter}}
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
      <el-table-column label="操作" header-align="center" align="center" min-width="250">
        <template v-slot="scope">
<!--          <el-tag :type="scope.row"-->
          <el-button size="mini" type="info" :key="scope.$index">
            详情<i class="el-icon-arrow-right"></i>
          </el-button>
          <el-button size="mini" type="info">
            资源地址<i class="el-icon-arrow-right"></i>
          </el-button>
        </template>
      </el-table-column>


    </el-table>
  </div>

</template>

<script>
  // import task
  import { getTaskList } from '@/api/table'

  export default {
    name: 'TaskTable',
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
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getTaskList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
