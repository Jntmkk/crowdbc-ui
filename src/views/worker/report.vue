<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-tag>选择提交报告任务:</el-tag>
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
    <el-card style="margin: 5px 0px">
      <div slot="header">
        <el-tag>提交报告</el-tag>
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        style="text-align: center">
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
</template>

<script>
  import { getTaskList } from '@/api/table'

  export default {
    name: 'report',
    data() {
      return {
        value: Object,
        fileList: [],
        title: '',
        workList: []
      }
    },
    methods: {
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

<style scoped>

</style>
