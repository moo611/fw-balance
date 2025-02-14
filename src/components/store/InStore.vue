<template>
  <div>
    <div class="header">
      <el-button v-show="false" type="primary" @click="getBalanceInRecordList">查询</el-button>
      <el-button @click="handleAdd" type="primary" class="btn-add">新增</el-button>
    </div>
    <el-table class="my-table" :data="state.data.list">

      <el-table-column prop="balanceName" label="天平代号" />
      <el-table-column prop="duration" label="试验时长"/>
      <el-table-column prop="bus" label="试验车次" />
      <el-table-column prop="useState" label="使用状况" />
      <el-table-column prop="evaluation" label="统合评价" />
      <el-table-column prop="hasChecked" label="入库性能检查记录" :formatter="getCheckStatus" />
      <el-table-column prop="pName" label="交接签名" />
      <el-table-column prop="createTime" label="入库日期" />

      <el-table-column label="操作" width="200" v-if="!props.readMode">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button type="primary" size="small" @click="handleView(scope.$index, scope.row)">
            详情
          </el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    <el-dialog v-model="dialogVisible1" width="500" @close="clearData">

      <el-form class="form" :model="form" label-width="auto" style="max-width: 600px">

        <el-form-item label="天平">
          <el-select v-model="form.balanceCode" placeholder="请选择">
            <el-option v-for="item in state.balanceList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
       
        <el-form-item label="试验时长">
          <el-input v-model="form.duration" type="number"/>
        </el-form-item>
        <el-form-item label="试验车次">
          <el-input v-model="form.bus" />
        </el-form-item>
        <el-form-item label="使用情况">
          <el-input v-model="form.useState" />
        </el-form-item>
        <el-form-item label="统合评价">
          <el-input v-model="form.evaluation" />
        </el-form-item>

        <el-form-item label="交接签名">
          <el-input v-model="form.pName" />
        </el-form-item>


      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="saveOrUpdate">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="js" setup>

import { reactive, ref } from 'vue';
import axios from '../../axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter()
let mode = '0'
const props = defineProps(['readMode'])  
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,

})
const state = reactive({
  data: {},

  balanceList: []
})

const form = reactive({
  id: null,
  balanceCode: '',
  duration: null,
  bus: '',
  useState:'',
  evaluation:'',
  pName: '',
  hasChecked: false

})
const dialogVisible1 = ref(false)

const clearData = () => {
  form.id = null
  form.balanceCode = ''
  form.duration = null
  form.bus=''
  form.useState=''
  form.evaluation = ''
  form.pName = ''
  form.hasChecked = false

  mode = '0'

}

const getCheckStatus = (row, col, cellValue) => {
  if (cellValue) {
    return '已检查'
  }
  return '未检查';
}

const getBalanceInRecordList = () => {

  axios.get('balanceInRecord/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}



const saveOrUpdate = () => {

  if(!form.bus){
    ElMessage.error('请输入试验车次')
    return
  }
  if(!form.duration){
    ElMessage.error('请输入试验时长')
    return
  }

  if (mode == '0') {
    axios.post('balanceInRecord', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('新增成功')
      getBalanceInRecordList()

    })
  } else {
    axios.put('balanceInRecord', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('修改成功')
      getBalanceInRecordList()

    })
  }


}

const copyValue = (src, target) => {
  // 遍历 target 中的 key，并将 src 对应属性赋值给 target
  Object.keys(target).forEach((key) => {
    if (src[key] !== undefined) {
      target[key] = src[key] // 仅赋值存在于 src 中的属性
    }
  })
}

const handleAdd = () => {
  mode = '0'
  dialogVisible1.value = true
}

const handleEdit = (index, row) => {
  mode = '1'
  copyValue(row, form)
  dialogVisible1.value = true

}
const handleDel = (index, row) => {
  axios.delete('balanceInRecord/' + row.id).then(res => {
    ElMessage.success("删除成功")
    getBalanceInRecordList()
  })
}

const handleView = (index, row) => {

  router.push({path:'/instore',query:{inId:row.id,balanceCode:row.balanceCode}})
}

const onPageChange = (page, size) => {
  queryParams.pageNum = page
  getBalanceInRecordList()
}

const getBalanceList = () => {

  axios.get('balanceInfo/list').then(res => {
    state.balanceList = res.list.map(item=>{
      return{
        value:item.balanceCode,
        label:item.balanceName
      }
    })
  })

}

getBalanceInRecordList()
getBalanceList()

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