<template>
  <div class="container">
    <el-card style="margin: 50px 100px">
      <div slot="header" class="clearfix">
        <h2 style="margin-left: 30px">评估</h2>
      </div>
      <el-form style="padding: 60px 150px;height: 600px" ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <!--      <el-form-item label="任务名称" prop="name">-->
        <!--        <el-input v-model="form.name" class="half-container" />-->
        <!--      </el-form-item>-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务操作" prop="category">
              <el-select v-model="form.category" placeholder="请选择操作">
                <el-option label="评价" value="access"/>
                              <el-option label="申诉" value="appeal"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="选择任务" prop="belongsToTaskId">
              <el-select v-model="form.belongsToTaskId" placeholder="请选择" @change="updateReportList">
                <el-option
                  v-for="item in taskList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="选择报告" prop="belongsToReportId">
              <el-select v-model="form.reportId" placeholder="请选择">
                <el-option
                  v-for="item in reportList"
                  :key="item.belongsToTask"
                  :label="item.solution"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="form.category==='appeal'" label="申诉理由" prop="appealDesc">
          <el-input v-model="form.comments" type="textarea" placeholder="请输入您的申诉理由"/>
        </el-form-item>
        <template v-if="form.category==='access'">
          <el-form-item label="评分">
            <el-rate
              v-model="form.level"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="10"
              style="margin-top:8px;"
            />
            <span>奖励金额=（奖金/工作者总数）*（评分/10）</span>
          </el-form-item>
          <el-form-item label="评价" prop="accessDesc">
            <el-input v-model="form.accessDesc" type="textarea" placeholder="请输入您的评价"/>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialog.dialogVisible"
      width="30%"
    >
      <span>{{ dialog.tips }}</span>
      <span slot="footer" class="dialog-footer"/>
      <el-button :disabled="dialog.isDone" @click="dialog.dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="!dialog.isDone" @click="dialog.dialogVisible = false">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import Dialog from '@/components/Dialog/index'
  import { getTaskList } from '@/api/table'
  import { submitEvaluation } from '@/api/user'
  import { getReport } from '@/api/user'
  import { MessageBox, Message } from 'element-ui'

  export default {
    name: 'Assessment',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Dialog
    },
    data() {
      return {
        dialog: {
          tips: '智能硬件检测中，请稍等...',
          dialogVisible: false,
          isDone: false
        },
        ruleForm: {
          name: '',
          appealDesc: '',
          accessDesc: '',
          category: '',
          score: ''
        },
        rules: {
          belongsToTask: [{ required: true, message: '请选择评估任务' }],
          belongToReport: [{ required: true, message: '请选择要评估的报告' }],
          level: [{ required: true, message: '请输入评价' }],
          type: [{ required: true, message: '请输入理由' }],
          comments: [{ required: true, message: '该项不能为空' }]

        },
        value: '',
        form: {
          category: null,
          belongsToTaskId: null,
          belongsToReportId: null,
          level: null,
          comments: '',
          reportId: null
        },
        reportList: [],
        taskList: []

      }
    },
    created() {
      this.fetchList()
    },
    methods: {
      upDateReportId(id) {
        this.form.reportId = this.reportList.find(o => o.belongsToTask === id).id
      },
      updateReportList(value) {
        getReport({ taskId: value }).then(response => {
          this.reportList = response.data
        })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialog.dialogVisible = true
            submitEvaluation(this.form).then(response => {
              Message({
                message: response.msg,
                type: 'info',
                duration: 3 * 1000

              })
            })
            this.dialog.dialogVisible = false
          } else {

            return false
          }
        })
      },
      fetchList: function() {
        getTaskList({ type: 'post' }).then(response => {
          this.taskList = response.data.filter(item => {
            if (item.currentWorkerNum > 0) {
              return true
            } else {
              return false
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
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

  }

</style>
