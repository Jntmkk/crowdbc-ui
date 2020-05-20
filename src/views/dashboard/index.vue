<template>
  <div class="dashboard-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background-color: #fff;padding: 16px 16px 0;margin-bottom: 32px">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" :xl="{span:12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:12}" :xl="{span:12}"
              style="padding-right:8px;margin-bottom:30px;">
        <todo-list />
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
    newTransaction: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    totalTransaction: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    reputation: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: 'Dashboard',
    components: { TransactionTable, LineChart, PanelGroup,TodoList},
    data() {
      return {
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
