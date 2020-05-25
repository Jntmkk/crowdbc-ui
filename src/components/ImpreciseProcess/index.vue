<template>
  <el-progress type="circle" show-text="false" :percentage="percentage"></el-progress>
</template>

<script>
  export default {
    name: 'ImpreciseProcess',
    props: {
      isDone: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    data() {
      return {
        percentage: 0
      }

    },
    watch: {
      isDone: function(m, n) {
        if (n === true) {
          this.percentage = 100
        }
      }
    }
  }
</script>

<style scoped>

</style>
