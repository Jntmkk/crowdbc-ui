<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="reportList"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center" label="序号">
        <template v-slot="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="BelongsToTask">
        <template v-slot="scope">
          {{scope.row.belongsToTask}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Solution">
        <template v-slot="scope">
          {{scope.row.solution}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="To">
        <template v-slot="scope">
          {{scope.row.pointer}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Level">
        <template v-slot="scope">
          {{scope.row.level}}
        </template>
      </el-table-column>
      <el-table-column v-if="isRequester">
        <template v-slot="scope">
          <el-button round @click="download(scope.row)">下载报告</el-button>
          <!--          <a href="scope.pointer">下载</a>-->
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" label="TxnFee">-->
      <!--        <template v-slot="scope">-->
      <!--          {{parseInt(scope.row.txnFee)}}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column align="center" label="GasPrice">-->
      <!--        <template v-slot="scope">-->
      <!--          {{parseInt(scope.row.gasPrice)}}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column align="center" label="GasLimit">-->
      <!--        <template v-slot="scope">-->
      <!--          {{parseInt(scope.row.gasLimit)}}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column align="center" label="TimeStamp">-->
      <!--        <template v-slot="scope">-->
      <!--          {{parseInt(scope.row.timestamp)}}-->
      <!--        </template>-->
      <!--      </el-table-column>-->

    </el-table>
  </div>
</template>

<script>
  import { getBalance, downloadFile, getReport, getTransaction } from '../../api/user'
  import { getTaskList } from '../../api/table'
  import { Message } from 'element-ui'

  export default {
    name: 'Rep',
    data() {
      return {
        reportList: [],
        listLoading: true,
        balance: -1,
        taskList: []
      }
    },
    props: {
      isRequester: {
        type: Boolean
      }
    },
    methods: {
      download: function(row) {
        downloadFile(row.pointer).then(data => {
          if (!data) {
            this.$Message.error('下载内容为空')
            return
          }
          let url = window.URL.createObjectURL(new Blob([data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          let i = row.pointer.lastIndexOf('/')
          link.setAttribute('download', row.pointer.slice(i + 1, row.pointer.length))
          document.body.appendChild(link)
          link.click()
          //释放URL对象所占资源
          window.URL.revokeObjectURL(url)
          //用完即删
          document.body.removeChild(link)
        }).catch(err => {
          // console.log('err: ', err)
        })
      },
      fetchData: function() {
        getTaskList({ isall: true }).then(response => {
          response.data.every(o => {
            getReport({ taskId: o.id }).then(response2 => {
              console.info(JSON.stringify(response2.data))
              this.reportList.push.apply(this.reportList, response2.data)
            })
          })
        })
        this.listLoading = false
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style scoped>

</style>
