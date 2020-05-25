<template>
  <div style="margin: 15px 30px">

    <el-row>
      <el-col :span="8">
        <label-wrap>
          <label>选择待处理任务:</label>
        </label-wrap>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in workList"
            :key="item.id"
            :label="item.title"
            :value="item"></el-option>
        </el-select>
      </el-col>
      <template v-if="value.length!==0&&value.category==='物联网测试'">
        <el-col span="7">
          <label-wrap>
            <label>类别:</label>
          </label-wrap>
          <el-tag type="primary">{{value.category}}</el-tag>
        </el-col>
        <el-col :span="8">
          <label-wrap>
            <label>测试接口:</label>
          </label-wrap>
          <el-tag type="primary">{{value.interface}}</el-tag>
        </el-col>
      </template>
    </el-row>

    <div class="main-container" style="margin: 30px 0px">
      <div v-if="value.category==='物联网测试'">
        <el-card>
          <div slot="header" class="clearfix">
            <label-wrap>
              <span>配置参数</span>
            </label-wrap>
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
        <el-card>
          <div slot="header">
            <span>测试</span>
          </div>
          <el-row type="flex" class="flex-container">
            <el-col :span="12">
              <el-input type="textarea" v-model="form.log" rows="10"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="nested-container">
                <el-tag type="primary">KK</el-tag>
                <el-tag type="primary">KK</el-tag>
                <el-tag type="primary">KK</el-tag>
                <el-tag type="primary">KK</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-card>
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
          iotPlatform: ''
        },
        options: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        workList: [],
        value: ''
      }
    },
    methods: {
      fetchList: function() {
        getTaskList().then(response => {
          this.workList = response.data.items
        })
      }
    },
    created() {
      this.fetchList()
    }

  }
</script>

<style lang="scss" scoped>
  .nested-container {
    display: flex;
    justify-content: space-between;
    margin: 5px 8px;
  }
</style>
