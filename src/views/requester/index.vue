<template>
  <div class="container">
    <p style="text-align: center">发布任务</p>
    <el-form  ref="ruleForm" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item  label="任务类别" prop="category">
        <el-select v-model="form.category" placeholder="请选择任务类别">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="截止日期" prop="date1">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="发布时机" prop="delivery">
        <el-switch v-model="form.delivery" active-text="定时发布" inactive-text="即时发布"></el-switch>
        <div v-if="form.delivery" class="el-form--inline" style="display: inline;margin-left: 55px">
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item  label="押金" prop="deposit">
        <el-input v-model.number="form.deposit"/>
      </el-form-item>
      <el-form-item label="奖励" prop="reward">
        <el-input v-model.number="form.reward"/>
      </el-form-item>
      <el-form-item label="接收数量" prop="num">
        <el-input v-model.number="form.num"/>
      </el-form-item>
      <el-form-item label="最低信誉" prop="rep">
        <el-input v-model.number="form.rep"/>
      </el-form-item>
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
      <el-form-item label="任务描述" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
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
          num: [
            { required: true, message: '请输入数字' },
            { type: 'number', message: '必须为数字' }
          ],
          rep: [
            { required: true, message: '请输入数字' },
            { type: 'number', message: '必须为数字' }
          ],
          name: [
            { required: true, message: '请输入任务名称' }
          ],
          category: [{ required: true, message: '请选择'}],
          date1: [{ required: true, message: '请选择日期' }],
          date2: [{ required: true, message: '请选择时间' }],
          desc: [{ required: true, message: '请输入描述' }]

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
          rep: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          category: '',
          num: '',
          deposit: '',
          reward: ''
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit')
          } else {
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
