<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form" label-width="80px">

      <el-card>
        <div slot="header" class="clearfix">
          <span>用户设置</span>
          <el-button type="info" round  style="margin-left: 30px" @click="editAndApply">{{userSetting.editAndApplyText}}</el-button>
        </div>
        <el-row type="flex" :gutter="2">
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input v-model="form.userName" :disabled="userSetting.editAndApplyStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password" :disabled="userSetting.editAndApplyStatus"
                        placeholder="数字、字母组合的8字符"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>

    <el-card style="margin: 5px 0px">
      <div slot="header">
        <span>账户管理</span>
      </div>
      <el-table v-loading="table.loading" :data="table.listAccount"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template v-slot="scope">
            {{parseInt(scope.$index)+1}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="别名" width="70">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.alia}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="地址" min-width="125">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.addr}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="秘钥" min-width="180">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.privateKey}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="信誉" width="80">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.rep}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布任务数" width="100">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.postTaskNum}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已完成任务数" width="120">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.finishedTaskNum}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="累计奖励" width="80">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.totalReward}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加时间" width="125">
          <template v-slot="scope">
            <el-tag type="primary">{{scope.row.addTime}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template v-slot="scope">
            <el-button type="primary" round @click="deleteAccount(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="flex-direction: row-reverse;justify-content: space-between;margin: 10px 0px">
        <el-col :span="4">
          <el-button type="primary" @click="addAccount">添加账户</el-button>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
  import table from '../../../mock/table'

  export default {
    name: 'setting',
    data() {
      return {
        userSetting: {
          editAndApplyText: '修改',
          editAndApplyStatus: true
        },
        table: {
          loading: true,
          listAccount: [
            {
              alia: 'main',
              addr: '0xFa6df6188225050138e21100E47F24A6128330D2',
              privateKey: '65a9428785b0c68ec96b2822347c479ae4d5f660aa3bcd797d87b00af116b651',
              addTime: '2020-5-23',
              finishedTaskNum: '1',
              postTaskNum: '4',
              totalReward: '30',
              rep: '70'
            }
          ]
        },
        form: {
          userName: 'testAccount',
          password: ''
        }

      }
    },
    created() {
      this.table.loading = false

    },
    computed:{

    },
    methods: {
      deleteAccount(row) {
        this.table.listAccount = this.table.listAccount.filter((t, index) => {
          if (row.$index === index) {
            return false
          }
        })
      },
      addAccount() {

      },
      editAndApply() {
        if (this.userSetting.editAndApplyStatus == true) {
          this.userSetting.editAndApplyText = '应用'
          this.userSetting.editAndApplyStatus = false
          console.log(this.userSetting.editAndApplyText)
          return
        }
        if (this.userSetting.editAndApplyStatus == false) {
          this.userSetting.editAndApplyText = '修改'
          this.userSetting.editAndApplyStatus = true
        }

      }
    }
  }
</script>

<style scoped>

</style>
