<template>
  <div class="app-container">
    <el-card style="margin: 50px 100px">
      <div slot="header" class="clearfix">
        <h2 style="margin-left: 30px">报告</h2>
        <el-table v-loading="listLoading" :data="reportList"
                  element-loading-text="Loading"
                  border
                  fit
                  highlight-current-row>
          <el-table-column align="center" label="序号" width="95">
            <template v-slot="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="任务ID" >
            <template v-slot="scope">
              {{scope.row.belongsToTask}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" width="300">
            <template v-slot="scope">
              {{scope.row.solution}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="附件" width="300">
            <template v-slot="scope">
              {{scope.row.pointer}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="评估" width="300">
            <template v-slot="scope">
              {{scope.row.level}}
            </template>
          </el-table-column>
          <el-table-column v-if="isRequester" width="150" align="center" label="操作">
            <template v-slot="scope">
              <el-button round @click="download(scope.row)">下载报告</el-button>
              <!--                    <a href="scope.pointer">下载</a>-->
            </template>
          </el-table-column>
          <el-table-column v-if="!isRequester" width="150" align="center" label="操作">
            <template v-slot="scope">
              <el-button round @click="appeal(scope.row)">申诉</el-button>
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
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span style="margin-left: 150px">智能硬件评估中，请等待自动评估结果...</span>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
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
        dialogVisible: false,
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
      appeal: function(row) {
        this.dialogVisible = true
        setTimeout(() => this.dialogVisible = false, 1000 * 2)
      },
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
          response.data.map(o => {
            console.info(JSON.stringify(o))
            getReport({ taskId: o.id }).then(response2 => {
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

<style lang="scss" scoped>
.app-container {
//margin: 0;
  padding: 0;
}
.el-table{
  margin: 60px 152px;
  width: auto;
}
.el-footer {
  margin-top: 100px;
  background-color: #2f2c2c;
  padding: 28px 0;
.cr {
  text-align: center;
  color: white;
}
}
</style>
