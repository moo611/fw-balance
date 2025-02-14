<template>
  <div>
    <el-select v-model="queryParams.pageType" placeholder="请选择" @change="onChange" style="width: 200px;">
      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-table v-if="queryParams.pageType === '0'" class="my-table" :data="state.data.list">

      <el-table-column type="index" label="序号" />
      <el-table-column prop="wholeName" label="风洞名称" />
      <el-table-column prop="wholeCode" label="风洞代号" />
      <el-table-column prop="hasChecked" label="出库性能检查记录" :formatter="getCheckStatus" />
      <el-table-column prop="pName" label="借用人签名" />
      <el-table-column prop="createTime" label="出库日期" />


    </el-table>

    <el-table v-else class="my-table" :data="state.data.list">

      <el-table-column type="index" label="序号" />
      <el-table-column prop="duration" label="试验时长" />
      <el-table-column prop="bus" label="试验车次" />
      <el-table-column prop="useState" label="使用状况" />
      <el-table-column prop="evaluation" label="统合评价" />
      <el-table-column prop="hasChecked" label="入库性能检查记录" :formatter="getCheckStatus" />
      <el-table-column prop="pName" label="交接签名" />
      <el-table-column prop="createTime" label="入库日期" />

      
    </el-table>

    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />
  </div>
</template>
<script setup lang="js">
import { reactive } from 'vue';
import axios from '../../axios'

const props = defineProps(['balanceCode'])
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  pageType: '0'
})

const state = reactive({
  data: {}
})

const typeOptions = [{ label: '出库', value: '0' }, { label: '入库', value: '1' }]
const onChange=(value)=>{

  if(value === '0'){
    getBalanceOutRecordList()
  }else{
    getBalanceInRecordList()
  }

}

const getCheckStatus = (row, col, cellValue) => {
  if (cellValue) {
    return '已检查'
  }
  return '未检查';
}

const getBalanceOutRecordList = () => {
  queryParams.balanceCode = props.balanceCode
  axios.get('balanceOutRecord/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}

const getBalanceInRecordList = () => {
  queryParams.balanceCode = props.balanceCode
  axios.get('balanceInRecord/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}

const onPageChange = (page, size) => {
  queryParams.pageNum = page
  if (queryParams.pageType === '0') {
    getBalanceOutRecordList()
  } else {
    getBalanceInRecordList()
  }

}

getBalanceOutRecordList()

</script>