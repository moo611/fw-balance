<template>
  <div style="width: 1000px; margin: 0 auto;">
    <div class="div-top">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基本信息" name="info"></el-tab-pane>
      <el-tab-pane label="天平尺寸" name="size"></el-tab-pane>
      <el-tab-pane label="加工信息" name="process"></el-tab-pane>
      <el-tab-pane label="贴片信息" name="paster"></el-tab-pane>
      <el-tab-pane label="支杆信息" name="support"></el-tab-pane>
      <el-tab-pane label="校准证书" name="calibration"></el-tab-pane>
      <el-tab-pane label="试验信息" name="performance"></el-tab-pane>
      <el-tab-pane label="出入库" name="store"></el-tab-pane>
      <el-tab-pane label="时间轴" name="timeline"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="div-bottom">
    <Info :balanceCode="balanceCode" v-show="activeName === 'info'"/>
    <Size :balanceCode="balanceCode" v-show="activeName === 'size'"/>
    <Process :balanceCode="balanceCode" v-show="activeName === 'process'"/>
    <Paster :balanceCode="balanceCode" v-show="activeName === 'paster'"/>
    <Calibration :balanceCode="balanceCode" v-show="activeName === 'calibration'"/>
    <Support :balanceCode="balanceCode" v-show="activeName === 'support'"/>
    <Performance :balanceCode="balanceCode" v-show="activeName === 'performance'"/>
    <Store :balanceCode="balanceCode" v-show="activeName === 'store'"/>
    <Timeline :balanceCode="balanceCode" v-show="activeName === 'timeline'"/>
  </div>
  </div>
  
</template>
<script setup lang="js">
import Info from '../../components/info/Info.vue'
import Size from '../../components/info/Size.vue'
import Process from '../../components/info/Process.vue'
import Paster from '../../components/info/Paster.vue'
import Calibration from '../../components/info/Calibration.vue'
import Support from '../../components/info/Support.vue'
import Performance from '../../components/info/Performance.vue'
import Store from '../../components/info/Store.vue'

import Timeline from '../../components/info/Timeline.vue'

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const activeName = ref('info')
const balanceCode = ref('')
balanceCode.value = route.query.balanceCode
console.log(balanceCode.value)



</script>

<style lang="css" scoped>
.div-top{
  display: flex;
  align-items: center;
  height: 100px;
}
.div-bottom{
  height: calc(100vh - 100px);
}

</style>