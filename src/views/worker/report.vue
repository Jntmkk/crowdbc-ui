<template>
  <div class="app-container">
    <el-card style="margin: 50px 100px">
      <div slot="header" class="clearfix">
        <h2 style="margin-left: 30px">提交报告</h2>
      </div>
      <div style="padding: 30px 50px">
        <el-row>
          <el-col :span="8">
            <el-tag>选择提交报告任务:</el-tag>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in workList"
                :key="item.id"
                :label="item.title"
                :value="item.id"></el-option>
            </el-select>
          </el-col>

          <template v-if="getTaskType(value)===0">
            <el-col span="7">
              <el-tag>
                <label>类别:</label>
              </el-tag>
              <el-tag type="primary">{{ getTaskType(value)|taskTypeFilter }}</el-tag>
            </el-col>
            <!--        <el-col :span="8">-->
            <!--          <el-tag>-->
            <!--            <label>测试接口:</label>-->
            <!--          </el-tag>-->
            <!--          <el-tag type="primary">{{value.interface}}</el-tag>-->
            <!--        </el-col>-->
          </template>
        </el-row>
        <el-form v-model="form">
          <el-form-item label="任务名称" prop="title" style="color: #20a0ff">
            <el-input v-model="form.solution" class="half-container"></el-input>
          </el-form-item>
        </el-form>
        <el-card style="margin: 15px 0px">
          <div slot="header">
            <el-tag>提交报告</el-tag>
          </div>
          <el-upload
            class="upload-demo"
            drag
            :data="{belongsToTask:this.value,username:this.$store.state.user.name,solution:this.form.solution}"
            :before-upload="checkId"
            action="/api/file_upload"
            style="text-align: center;margin: 100px 0">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <!--        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
          <!--      <el-upload-->
          <!--        class="upload-demo"-->
          <!--        ref="upload"-->
          <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--        :on-preview="handlePreview"-->
          <!--        :on-remove="handleRemove"-->
          <!--        :file-list="fileList"-->
          <!--        :auto-upload="false">-->
          <!--        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
          <!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          <!--      </el-upload>-->
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTaskList } from '@/api/table'
import { Message } from 'element-ui'
import { sendReportInfo } from '../../api/user'

export default {
  name: 'report',
  data() {
    return {
      value: '',
      fileList: [],
      title: '',
      workList: [],
      form: {
        solution: ''
      }
    }
  }, filters: {

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
  methods: {
    getTaskType: function(taskId) {
      let item = this.getItem(taskId)
      if (item === undefined) {
        return 'none'
      } else {
        return item.taskType
      }
    },
    sendReportInfo: function() {
      sendReportInfo({
        belongsToTask: this.value,
        solution: this.form.solution,
        pointer: '',
        level: -1
      }).then(response => {
        Message({
          message: '提交成功',
          type: 'info',
          duration: 3 * 1000
        })
      })
    },
    checkId(file) {
      if (this.value.length === 0) {
        Message({
          message: '请选择任务',
          type: 'info',
          duration: 3 * 1000
        })
        return false
      } else {
        return true
      }
    },
    getItem(value) {
      return this.workList.find(o => o.id === value)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    fetchList: function() {
      getTaskList({ type: 'received' }).then(response => {
        this.workList = response.data
      })
    },
    getValue: function(prop) {
      this.value = this.workList.find(v => {
        console.log(v.title)
        if (v.title === prop) {
          return true
        }
      })
    }
  },
  created() {
    this.fetchList()
  }
}
</script>

<style scoped>
.app-container{
  /*margin: 80px 150px;*/
}
</style>
