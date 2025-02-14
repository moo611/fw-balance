<template>
  <div style="width: 100%">
    <div class="div-top">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="出库管理" name="outstore"></el-tab-pane>
        <el-tab-pane label="入库管理" name="instore"></el-tab-pane>

      </el-tabs>
    </div>
    <div class="div-bottom">
      <InStore v-show="activeName === 'instore'" />
      <OutStore v-show="activeName === 'outstore'" />

    </div>
  </div>

</template>
<script setup lang="js">
import InStore from '../../components/store/InStore.vue'
import OutStore from '../../components/store/OutStore.vue'


import { onMounted, ref } from 'vue';

const activeName = ref('outstore')


</script>

<style lang="css" scoped>
.div-top {
  display: flex;
  align-items: center;
  height: 80px;
}

.div-bottom {
  height: calc(100% - 80px);
}
</style>