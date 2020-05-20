<template>
  <div class="app-container">
    <div class="filter-wrapper">
      <el-input  place-holder="标题" style="width: 200px;"
                class="filter-item" />
<!--      <el-input v-model="listQuery.title" place-holder="标题" style="width: 200px;"-->
<!--                class="filter-item" @keyup.enter.native="handleFilter"/>-->
    </div>

  </div>
</template>

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  export default {
    name: 'ComplexTable',
    components: { Pagination }
  }
</script>
