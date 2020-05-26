<template>
  <el-card>
    <div slot="header">
      <el-tag>最新发布</el-tag>
    </div>
    <el-table :data="list" style="width: 100%;padding-top: 15px;" title="最新发布">
      <el-table-column label="序号" min-width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="195" align="center">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100" align="center">
        <template slot-scope="{row}" }>
          <el-tag :type="row.status|statusFilter">
            {{row.status}}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>
  </el-card>


</template>

<script>
  import { transactionList } from '../../api/remote-search'
  import { getTaskList } from '@/api/table'

  export default {
    name: 'TransactionTable',
    filters: {
      statusFilter(status) {
        const statusMap = {
          finished: 'success',
          accepted: 'danger'
        }
        return statusMap[status]
      },
      orderNoFilter(str) {
        return str.substring(0, 30)
      },
      toThousandFilter(num) {
        return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
      }
    },
    data() {
      return {
        list: null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getTaskList().then(response => {
          this.list = response.data.items.slice(0, 8)
        })
      }
    }
  }
</script>

<style scoped>

</style>
