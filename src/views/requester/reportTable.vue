<template>
  <div class="app-container">
    <rep :is-requester="true"></rep>
  </div>
</template>

<script>
  import Rep from '../transaction/reportTable'

  export default {
    name: 'reportTable',
    components: { Rep }
  }
</script>

<style scoped>

</style>
