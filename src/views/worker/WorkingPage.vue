<template>
  <div style="margin: 80px 150px">
    <el-card style="margin: 50px 100px;height: 800px">
      <div slot="header" class="clearfix">
        <h2 style="margin-left: 30px">测试</h2>
      </div>
      <el-row>
        <el-col :span=6>
          <el-tag>选择待处理任务:</el-tag>
          <el-select v-model="title" placeholder="请选择" v-on:change="getValue(title)">
            <el-option
              v-for="item in workList"
              :key="item.id"
              :label="item.title"
              :value="item.title"></el-option>
          </el-select>
        </el-col>
        <template v-if="value.taskType===0">
          <el-col span=6>
            <el-tag>
              <label>类别:</label>
            </el-tag>
            <el-tag type="primary">{{ value.taskType|taskTypeFilter }}</el-tag>
          </el-col>
          <el-col span=6>
            <el-tag>
              <label>平台:</label>
            </el-tag>
            <el-tag type="primary">{{ value.platform }}</el-tag>
          </el-col>
          <el-col span=6>
            <el-tag>
              <label>设备ID:</label>
            </el-tag>
            <el-tag type="primary">{{ value.deviceId }}</el-tag>
          </el-col>
        </template>
      </el-row>

      <div class="main-container" style="margin: 30px 0px">
        <div v-if="value.taskType===0">
          <!--        <el-card>-->
          <!--          <div slot="header" class="clearfix">-->
          <!--            <el-tag>-->
          <!--              <span>配置参数</span>-->
          <!--            </el-tag>-->
          <!--          </div>-->
          <!--          <el-form :model="form" label-width="80px">-->

          <!--            <el-row>-->
          <!--              <el-col :span="4">-->
          <!--                <el-form-item label="请求方式">-->
          <!--                  <el-select v-model="form.requestType">-->
          <!--                    <el-option label="GET" value="get"></el-option>-->
          <!--                    <el-option label="POST" value="post"></el-option>-->
          <!--                  </el-select>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--              <el-col :span="4">-->
          <!--                <el-form-item label="接入平台">-->
          <!--                  <el-select v-model="form.iotPlatform">-->
          <!--                    <el-option label="中国移动OneNet" value="onenet"></el-option>-->
          <!--                  </el-select>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--              <el-col :span="4">-->
          <!--                <el-form-item label="设备类型">-->
          <!--                  <el-select v-model="form.deviceType">-->
          <!--                    <el-option label="LED" value="led"></el-option>-->
          <!--                    <el-option label="其它" value="other"></el-option>-->
          <!--                  </el-select>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--              <template v-if="form.deviceType=='other'">-->
          <!--                <el-col :span="4">-->
          <!--                  <el-form-item label="请求参数">-->
          <!--                    <el-input type="text" v-model="form.params" placeholder="例如:page=2;total=10"></el-input>-->
          <!--                  </el-form-item>-->
          <!--                </el-col>-->
          <!--                <el-col :span="4">-->
          <!--                  <el-form-item label="控制字段">-->
          <!--                    <el-input type="text" v-model="form.ledKey"></el-input>-->
          <!--                  </el-form-item>-->
          <!--                </el-col>-->
          <!--                <el-col :span="4">-->
          <!--                  <el-form-item label="生效值">-->
          <!--                    <el-input type="text" v-model="form.ledValue"></el-input>-->
          <!--                  </el-form-item>-->
          <!--                </el-col>-->
          <!--              </template>-->
          <!--            </el-row>-->
          <!--          </el-form>-->
          <!--        </el-card>-->
          <el-row style="margin: 15px 0px">
            <el-card>
              <div slot="header">
                <el-tag>测试</el-tag>
              </div>
              <el-col :span="12">
                <el-card style="margin-bottom: 20px;margin-right: 10px">
                  <div slot="header">
                    <el-tag>日志</el-tag>
                  </div>
                  <el-input type="textarea" disabled="true" v-model="form.log" rows="15"></el-input>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card style="margin-bottom: 20px;margin-left: 10px">
                  <div slot="header">
                    <el-tag>控制</el-tag>
                  </div>
                  <el-input type="textarea" v-model="form.cmd" rows="13"></el-input>
                  <el-button style="width: 100%;margin-top:5px" type="primary" @click="send_command">发送指令</el-button>
                </el-card>
              </el-col>
            </el-card>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>处理中...</span>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskList } from '@/api/table'
import { sendCommand } from '../../api/user'

export default {
  name: 'WorkingPage',
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      form: {
        requestType: '',
        params: '',
        log: '',
        deviceType: '',
        ledKey: '',
        ledValue: '',
        iotPlatform: '',
        cmd: 'GPIO.output(17,GPIO.HIGH)\nGPIO.output(27,GPIO.HIGH)'
      },
      title: '',
      workList: [],
      value: ''
    }
  },
  filters: {
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
  },
  watch: {},
  methods: {

    send_command: function() {
      this.dialogVisible = true
      sendCommand({
        deviceId: '601093847',
        cmd: this.form.cmd,
        apiKey: '4ooXCWYrQGFybSMhCs3xDiZeW8I='
      }).then(response => {
        console.log(JSON.stringify(response))
        this.form.log = this.form.log + JSON.stringify(response)
        setTimeout(() => this.dialogVisible = false, 1000 * 1.5)
        // this.dialogVisible = false
      })
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

<style lang="scss" scoped>

</style>
