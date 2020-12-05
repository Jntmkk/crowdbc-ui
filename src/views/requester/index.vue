<template>
  <div class="container">
    <el-card style="margin: 50px 100px">
      <div slot="header" class="clearfix">
        <h2 style="margin-left: 30px">发布任务</h2>
      </div>
      <el-form style="padding: 60px 150px" ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="任务名称" prop="title">
          <el-input v-model="form.title" class="half-container"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span=6>
            <el-form-item label="任务类别" prop="taskType">
              <el-select v-model="form.taskType" placeholder="请选择任务类别" @changne="change">
                <el-option label="物联网测试" :value="0"></el-option>
                <el-option label="物联网设备邮寄" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <template v-if="form.taskType===0">
            <el-col span=6>
              <el-form-item label="平台">
                <el-select v-model="form.platform">
                  <el-option label="OneNet" value="OneNet"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span=6>
              <el-form-item label="设备ID" prop="deviceId">
                <el-input v-model="form.deviceId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span=6>
              <el-form-item label="Token" prop="deviceToken">
                <el-input v-model="form.deviceToken"></el-input>
              </el-form-item>
            </el-col>
          </template>

        </el-row>

        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker
            v-model="form.deadline"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="timestamp">
          </el-date-picker>
          <!--        <el-col :span="11">-->
          <!--          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
          <!--        </el-col>-->
          <!--        <el-col class="line" :span="2">-</el-col>-->
          <!--        <el-col :span="11">-->
          <!--          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
          <!--        </el-col>-->
        </el-form-item>
        <!--      <el-form-item label="接收时限" prop="date3">-->
        <!--        <el-col :span="11">-->
        <!--          <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" style="width: 100%;"></el-date-picker>-->
        <!--        </el-col>-->
        <!--        <el-col class="line" :span="2">-</el-col>-->
        <!--        <el-col :span="11">-->
        <!--          <el-time-picker placeholder="选择时间" v-model="form.date4" style="width: 100%;"></el-time-picker>-->
        <!--        </el-col>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item label="发布时机" prop="delivery">-->
        <!--        <el-switch v-model="form.delivery" active-text="定时发布" inactive-text="即时发布"></el-switch>-->
        <!--        <div v-if="form.delivery" class="el-form&#45;&#45;inline" style="display: inline;margin-left: 55px">-->
        <!--          <el-date-picker-->
        <!--            v-model="value2"-->
        <!--            type="datetime"-->
        <!--            placeholder="选择日期时间"-->
        <!--            align="right"-->
        <!--            :picker-options="pickerOptions">-->
        <!--          </el-date-picker>-->
        <!--        </div>-->
        <!--      </el-form-item>-->
        <el-row type="flex" class="row-bg">
          <el-col span=12>
            <el-form-item label="押金" prop="deposit" class="half-container">
              <el-input v-model.number="form.deposit"/>
            </el-form-item>
          </el-col>
          <el-col span=12>
            <el-form-item label="接收数量" prop="maxWorkerNum" class="half-container">
              <el-input v-model.number="form.maxWorkerNum"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span=12>
            <el-form-item label="奖励" prop="reward" class="half-container">
              <el-input v-model.number="form.reward"/>
            </el-form-item>
          </el-col>
          <el-col span=12>
            <el-form-item label="最低信誉" prop="minReputation" class="half-container">
              <el-input v-model.number="form.minReputation"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!--      <el-row>-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="选择账户" prop="account">-->
        <!--            <el-select v-model="form.account">-->
        <!--              <el-option label="main" value="main"></el-option>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->

        <!--        </el-col>-->
        <!--      </el-row>-->

        <!--      <el-form-item label="活动性质">-->
        <!--        <el-checkbox-group v-model="form.type">-->
        <!--          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
        <!--          <el-checkbox label="地推活动" name="type"></el-checkbox>-->
        <!--          <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
        <!--          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
        <!--        </el-checkbox-group>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item label="特殊资源">-->
        <!--        <el-radio-group v-model="form.resource">-->
        <!--          <el-radio label="线上品牌商赞助"></el-radio>-->
        <!--          <el-radio label="线下场地免费"></el-radio>-->
        <!--        </el-radio-group>-->
        <!--      </el-form-item>-->
        <el-form-item label="任务描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="附件地址" prop="pointer">
          <el-input type="textarea" v-model="form.pointer"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialog.dialogVisible"
      width="30%">
      <span>{{ dialog.tips }}</span>
      <span slot="footer" class="dialog-footer"/>
      <el-button @click="dialog.dialogVisible = false" :disabled="dialog.isDone">取 消</el-button>
      <el-button type="primary" @click="dialog.dialogVisible = false" :disabled="!dialog.isDone">确 定</el-button>
    </el-dialog>
  </div>

</template>

<script>
import Dialog from '@/components/Dialog/index'
import { submitTask } from '@/api/table'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'index',
  components: {
    Dialog
  },
  data() {
    return {
      dialog: {
        tips: '正在提交，请稍后...',
        dialogVisible: false,
        isDone: false
      },
      ruleForm: {
        rep: '',
        deposit: '',
        reward: '',
        num: ''
      },
      rules: {
        deposit: [
          { required: true, message: '请输入数字' },
          { type: 'number', message: '必须为数字' }
        ],
        reward: [
          { required: true, message: '请输入数字' },
          { type: 'number', message: '必须为数字' }
        ],
        maxWorkerNum: [
          { required: true, message: '请输入数字' },
          { type: 'number', message: '必须为数字' }
        ],
        minReputation: [
          { required: true, message: '请输入数字' },
          { type: 'number', message: '必须为数字' }
        ],
        title: [
          { required: true, message: '请输入任务名称' }
        ],
        taskType: [{ required: true, message: '请选择' }],
        // account: [{ required: true, message: '请选择' }],
        // date1: [{ required: true, message: '请选择日期' }],
        // date2: [{ required: true, message: '请选择时间' }],
        // date3: [{ required: true, message: '请选择时间' }],
        // date4: [{ required: true, message: '请选择时间' }],
        description: [{ required: true, message: '请输入描述' }],
        deadline: [{ required: true, message: '请选择截止日期' }]

      },
      value2: '',
      pickerOptions: {
        shortcuts: [{
          text: '一天后',
          onClick(picker) {
            picker.$emit('pick', new Date().getTime() + 3600 * 1000 * 24)
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: '一月后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
          }
        }]
      },
      form: {
        pointer: '',
        title: '',
        reward: null,
        deposit: null,
        deadline: null,
        maxWorkerNum: null,
        minReputation: null,
        taskType: null,
        status: 'UNACCEPTED',
        pointer: '',
        description: '',
        currentWorkerNum: 0,
        deviceId: '',
        deviceToken: '',
        platform: ''
      }
    }
  },
  methods: {
    change(value) {
      console.info(value)
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog.dialogVisible = true
          submitTask(this.form).then(response => {
            this.dialog.dialogVisible = false
            Message({
              message: response.msg,
              type: 'success',
              duration: 5 * 1000
            })
          })
          /**
           * 提交逻辑
           */
        } else {
          /**
           * 数据不符合规范
           */
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .el-card {
    margin: 8px 0px;
  }

  .content-title {
    text-align: center;
    font-size: larger;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .half-container {
    width: 50%;
  }

  margin: 80px 90px;

  .el-row {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
}

</style>
