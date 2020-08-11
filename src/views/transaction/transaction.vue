<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="transactionList"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row>
      <el-table-column align="center" label="序号">
        <template v-slot="scope">
          {{parseInt(scope.row.txnHash)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Block">
        <template v-slot="scope">
          {{parseInt(scope.row.block)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="From">
        <template v-slot="scope">
          {{parseInt(scope.row.from)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="To">
        <template v-slot="scope">
          {{parseInt(scope.row.to)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Value">
        <template v-slot="scope">
          {{parseInt(scope.row.value)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="TxnFee">
        <template v-slot="scope">
          {{parseInt(scope.row.txnFee)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="GasPrice">
        <template v-slot="scope">
          {{parseInt(scope.row.gasPrice)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="GasLimit">
        <template v-slot="scope">
          {{parseInt(scope.row.gasLimit)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="TimeStamp">
        <template v-slot="scope">
          {{parseInt(scope.row.timestamp)}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import { getBalance, getTransaction } from '../../api/user'

  export default {
    name: 'transaction.vue',
    data() {
      return {
        transactionList: [],
        listLoading: true,
        balance: -1
      }

    },
    methods: {
      fetchData() {
        getTransaction().then(response => {
          this.transactionList = response.data
        })
        getBalance().then(response => {
          this.balance = response.data
        })
        this.listLoading = false
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style scoped>

</style>
