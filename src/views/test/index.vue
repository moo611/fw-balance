<template>
  <div style="width: 100%">
    <div class="div-top">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="天平性能检查记录" name="performance"></el-tab-pane>
      <el-tab-pane label="天平试验状态记录" name="health"></el-tab-pane>
      
    </el-tabs>
  </div>
  <div class="div-bottom">
    <BalancePerformance  v-show="activeName === 'performance'" />
    <BalanceHealth  v-show="activeName === 'health'"/>
   
  </div>
  </div>
  
</template>
<script setup lang="js">
import BalancePerformance from '../../components/test/BalancePerformance.vue'
import BalanceHealth from '../../components/test/BalanceHealth.vue'


import { onMounted, ref } from 'vue';

const activeName = ref('performance')


</script>

<style lang="css" scoped>
.div-top{
  display: flex;
  align-items: center;
  height: 80px;
}
.div-bottom{
  height: calc(100% - 80px);
}

</style>