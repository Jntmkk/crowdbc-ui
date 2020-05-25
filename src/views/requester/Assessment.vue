<template>
  <div class="container">
    <p class="content-title">评估</p>
    <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
      <!--      <el-form-item label="任务名称" prop="name">-->
      <!--        <el-input v-model="form.name" class="half-container" />-->
      <!--      </el-form-item>-->
      <el-row>
        <el-col :span="8">
          <el-form-item label="任务操作" prop="category">
            <el-select v-model="form.category" placeholder="请选择操作">
              <el-option label="申诉" value="appeal" />
              <el-option label="评价" value="access" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="选择任务" prop="category">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in workList"
                :key="item.id"
                :label="item.title"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="form.category==='appeal'" label="申诉理由" prop="appealDesc">
        <el-input v-model="form.appealDesc" type="textarea" placeholder="请输入您的申诉理由" />
      </el-form-item>
      <template v-if="form.category==='access'">
        <el-form-item label="评分">
          <el-rate
            v-model="form.score"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="10"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item label="评价" prop="accessDesc">
          <el-input v-model="form.accessDesc" type="textarea" placeholder="请输入您的评价" />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">立即提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialog.dialogVisible"
      width="30%"
    >
      <span>{{ dialog.tips }}</span>
      <span slot="footer" class="dialog-footer" />
      <el-button :disabled="dialog.isDone" @click="dialog.dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="!dialog.isDone" @click="dialog.dialogVisible = false">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog/index'
import { getTaskList } from '@/api/table'

export default {
  name: 'Assessment',
  components: {
    // eslint-disable-next-line vue/no-unused-components
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
        name: '',
        appealDesc: '',
        accessDesc: '',
        category: '',
        score: ''
      },
      rules: {
        name: [{ required: true, message: '请输入任务名称' }],
        category: [{ required: true, message: '请选择要评估的任务' }],
        appealDesc: [{ required: true, message: '请输入理由' }],
        accessDesc: [{ required: true, message: '请输入评价' }],
        desc: [{ required: true, message: '该项不能为空' }]

      },
      value: '',
      form: {
        name: '',
        appealDesc: '',
        accessDesc: '',
        category: '',
        score: ''
      },
      workList: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialog.dialogVisible = true
        } else {
          return false
        }
      })
    },
    fetchList: function() {
      getTaskList().then(response => {
        this.workList = response.data.items
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
