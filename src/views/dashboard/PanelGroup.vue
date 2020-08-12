<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('postedTask')">
        <div class="card-panel-icon-wrapper icon-posted-task">
          <svg-icon icon-class="task" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已发布任务
          </div>
          <count-to :start-val="0" :end-val=this.postedNum :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('receivedTask')">
        <div class="card-panel-icon-wrapper icon-received-task">
          <svg-icon icon-class="task" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已接收任务
          </div>
          <count-to :start-val="0" :end-val=this.receivedNum :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('reputation')">
        <div class="card-panel-icon-wrapper icon-reputation">
          <svg-icon icon-class="rep" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            荣誉
          </div>
          <count-to :start-val="0" :end-val=this.reputation :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('reward')">
        <div class="card-panel-icon-wrapper icon-reward">
          <svg-icon icon-class="reward" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            余额
          </div>
          <count-to :start-val="0" :end-val=this.balance :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'
  import { getTaskList } from '../../api/table'
  import { getBalance, getInfo } from '../../api/user'

  export default {
    name: 'PanelGroup',
    data() {
      return {
        postedNum: -1,
        receivedNum: -1,
        reputation: 70,
        balance: -1
      }
    },
    components: {
      CountTo
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData: function() {
        getTaskList({ type: 'post' }).then(response => {
          this.postedNum = response.data.length
        })
        getTaskList({ type: 'received' }).then(response => {
          this.receivedNum = response.data.length
        })
        getInfo().then(response => {
          this.reputation = response.data.reputation
        })
        getBalance().then(response => {
          this.balance = response.data
        })
      },
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-posted-task {
          background: #40c9c6;
        }

        .icon-received-task {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-reward {
          background: #34bfa3
        }

        .icon-reputation {
          background-color: #f4516c;
        }
      }

      .icon-reputation {
        color: #f4516c;
      }

      .icon-posted-task {
        color: #40c9c6;
      }

      .icon-received-task {
        color: #36a3f7;
      }

      .icon-reputation {
        color: #f4516c;
      }

      .icon-reward {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
