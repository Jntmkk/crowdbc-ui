<template>
  <div class="dashboard-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background-color: #fff;padding: 16px 16px 0;margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" :legend-name="legendName"/>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" :xl="{span:12}"
              style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" :xl="{span:12}"
              style="padding-right:8px;margin-bottom:30px;">
        <todo-list/>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import PanelGroup from './PanelGroup'
  import LineChart from './LineChart'
  import TransactionTable from './TransactionTable'
  import TodoList from './TodoList'

  const lineChartData = {
    postedTask: {
      expectedData: [0, 0, 0, 1, 2, 3, 3]
      // actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    receivedTask: {
      expectedData: [0, 0, 0, 1, 1, 1, 1]
      // actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    reputation: {
      expectedData: [70, 70, 70, 70, 75, 75, 75]
      // actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    reward: {
      expectedData: [0, 0, 0, 0, 0, 30, 30]
      // actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: 'Dashboard',
    components: { TransactionTable, LineChart, PanelGroup, TodoList },
    data() {
      return {
        legendName: ['PostedTask'],
        lineChartData: lineChartData.newTransaction
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
        this.legendName[0] = type
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

  }

  @media (max-width: 1024px) {

  }
</style>
