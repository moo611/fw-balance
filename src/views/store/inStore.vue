<template>
  <div style="width: 1000px; margin: 0 auto;">
    <div class="div-top">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="性能检查" name="performance" ></el-tab-pane>
        <el-tab-pane label="健康状态" name="health" ></el-tab-pane>

      </el-tabs>
    </div>
    <div class="div-bottom">
      <Performance v-show="activeName === 'performance'" :inId="route.query.inId" :balanceCode="route.query.balanceCode"/>
      <Health v-show="activeName === 'health'" :inId="route.query.inId" :balanceCode="route.query.balanceCode"/>

    </div>
  </div>

</template>
<script setup lang="js">
import { useRoute } from 'vue-router';
import Performance from '../../components/store/Performance.vue'
import Health from '../../components/store/Health.vue'


import { onMounted, ref } from 'vue';

const activeName = ref('performance')
const route = useRoute()

</script>

<style lang="css" scoped>
.div-top {
  display: flex;
  align-items: center;
  height: 100px;
}

.div-bottom {
  height: calc(100vh - 100px);
}
</style>