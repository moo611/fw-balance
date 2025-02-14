<template>
  <div>
    
    <el-table class="my-table" :data="state.data.list">

      <el-table-column prop="balanceName" label="天平代号" />
      <el-table-column prop="history" label="参试历史" />
      <el-table-column prop="evaluation" label="综合评价" />
      <el-table-column prop="balanceState" label="当前状态" />
      <el-table-column prop="healthState" label="健康状态" />
      <el-table-column prop="createTime" label="更新时间" />
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    
  </div>
</template>

<script lang="js" setup>

import { reactive, ref } from 'vue';
import axios from '../../axios';


const props = defineProps(['readMode'])  
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,

})
const state = reactive({
  data: {},

})

const getBalancePerformanceList = () => {

  axios.get('balanceHealth/latest', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}


const onPageChange = (page, size) => {
  queryParams.pageNum = page
  getBalancePerformanceList()
}



getBalancePerformanceList()


</script>

<style lang="css" scoped>
.header {
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

}

.btn-add {
  position: absolute;
  right: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>