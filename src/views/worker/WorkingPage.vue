<template>
  <div style="margin: 15px 30px">
    <el-row>
      <el-col :span="8">
        <el-tag>选择待处理任务:</el-tag>
        <el-select v-model="title" placeholder="请选择" v-on:change="getValue(title)">
          <el-option
            v-for="item in workList"
            :key="item.id"
            :label="item.title"
            :value="item.title"></el-option>
        </el-select>
      </el-col>
      <template v-if="value.length!==0&&value.category==='物联网测试'">
        <el-col span="7">
          <el-tag>
            <label>类别:</label>
          </el-tag>
          <el-tag type="primary">{{value.category}}</el-tag>
        </el-col>
        <el-col :span="8">
          <el-tag>
            <label>测试接口:</label>
          </el-tag>
          <el-tag type="primary">{{value.interface}}</el-tag>
        </el-col>
      </template>
    </el-row>

    <div class="main-container" style="margin: 30px 0px">
      <div v-if="value.category==='物联网测试'">
        <el-card>
          <div slot="header" class="clearfix">
            <el-tag>
              <span>配置参数</span>
            </el-tag>
          </div>
          <el-form :model="form" label-width="80px">

            <el-row>
              <el-col :span="4">
                <el-form-item label="请求方式">
                  <el-select v-model="form.requestType">
                    <el-option label="GET" value="get"></el-option>
                    <el-option label="POST" value="post"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="接入平台">
                  <el-select v-model="form.iotPlatform">
                    <el-option label="中国移动OneNet" value="onenet"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="设备类型">
                  <el-select v-model="form.deviceType">
                    <el-option label="LED" value="led"></el-option>
                    <el-option label="其它" value="other"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <template v-if="form.deviceType=='other'">
                <el-col :span="4">
                  <el-form-item label="请求参数">
                    <el-input type="text" v-model="form.params" placeholder="例如:page=2;total=10"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="控制字段">
                    <el-input type="text" v-model="form.ledKey"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="生效值">
                    <el-input type="text" v-model="form.ledValue"></el-input>
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
          </el-form>
        </el-card>

        <el-row style="margin: 5px 0px">
          <el-card>
            <div slot="header">
              <el-tag>测试</el-tag>
            </div>
            <el-col :span="12">
              <el-card>
                <div slot="header">
                  <el-tag>日志</el-tag>
                </div>
                <el-input type="textarea" disabled="true" v-model="form.log" rows="10"></el-input>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card style="margin: 0px 5px">
                <div slot="header">
                  <el-tag>控制</el-tag>
                </div>
                <el-input type="textarea" v-model="form.cmd" rows="7"></el-input>
                <el-button style="width: 100%;margin-top:5px" type="primary">发送指令</el-button>
              </el-card>
            </el-col>
          </el-card>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTaskList } from '@/api/table'

  export default {
    name: 'WorkingPage',
    data() {
      return {
        form: {
          requestType: '',
          params: '',
          log: '',
          deviceType: '',
          ledKey: '',
          ledValue: '',
          iotPlatform: '',
          cmd: ''
        },
        title: '',
        workList: [],
        value: ''
      }
    },
    watch: {},
    methods: {
      fetchList: function() {
        getTaskList().then(response => {
          this.workList = response.data.items
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
