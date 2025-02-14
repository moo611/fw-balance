<template>
  <div>
    
    <el-table class="my-table" :data="state.data.list">

      <el-table-column prop="balanceName" label="天平代号" width="180" />
      <el-table-column prop="outId" label="出库索引" />
      <el-table-column prop="inId" label="入库索引" />
      <el-table-column prop="performanceRe" label="桥路电阻" />
      <el-table-column prop="performanceInsulation" label="绝缘性能" />
      <el-table-column prop="performanceZero" label="零点时漂" />
      <el-table-column prop="performanceLoad" label="加载检查" />
      <el-table-column prop="performanceResult" label="检查结果" />
      <el-table-column prop="createTime" label="检查时间" />
      
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    
  </div>
</template>

<script lang="js" setup>

import { reactive, ref } from 'vue';
import axios from '../../axios';

 
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,

})
const state = reactive({
  data: {},

})

const getBalancePerformanceList = () => {

  axios.get('balancePerformance/latest', { params: queryParams }).then(res => {

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