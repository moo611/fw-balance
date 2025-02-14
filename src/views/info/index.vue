<template>
  <div>
    <div class="header">
      <el-button v-show="false" type="primary" @click="getBalanceInfoList">查询</el-button>
      <el-button @click="handleAdd" type="primary" class="btn-add" v-permission="'dashboard.info.add'">新增</el-button>
    </div>
    <el-table class="my-table" :data="state.data.list">

      <el-table-column prop="balanceName" label="天平代号" />
      <el-table-column prop="balanceType" label="天平类型" />
      <el-table-column prop="balanceClassify" label="天平分类" />
      <el-table-column prop="balanceMaterial" label="天平材质" />
      <el-table-column prop="balanceSupport" label="支杆数量" />
      <el-table-column prop="balanceInferface" label="接口形式" />
      <el-table-column prop="balanceDesigner" label="设计人员" />
      <el-table-column prop="balanceDtime" label="设计时间" />
      <el-table-column prop="balanceFactory" label="加工单位" />
      <el-table-column prop="balanceFtime" label="加工时间" />
      <el-table-column prop="balanceX" label="量程X" />
      <el-table-column prop="balanceY" label="量程Y" />
      <el-table-column prop="balanceZ" label="量程Z" />
      <el-table-column prop="balanceMx" label="量程MX" />
      <el-table-column prop="balanceMy" label="量程MY" />
      <el-table-column prop="balanceMz" label="量程MZ" />
      <el-table-column prop="balanceTnum" label="试验总车次" />
      <el-table-column prop="balanceState" label="天平现状" />
      <el-table-column prop="status" label="出入库状态" :formatter="statusFormatter"/>

      <el-table-column label="操作" width="200">
        <template #default="scope">
         
          <el-button type="primary" size="small" @click="handleView(scope.$index, scope.row)">
            详情
          </el-button>
          <el-button v-permission="'dashboard.info.del'" type="danger" size="small" @click="handleDel(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    <el-dialog v-model="dialogVisible1" width="500" @close="clearData">

      <el-form class="form" :model="form" label-width="auto" style="max-width: 600px">

        <el-form-item label="天平代号">
          <el-input v-model="form.balanceName" />
        </el-form-item>
        <el-form-item label="天平类型">
          <el-input v-model="form.balanceType" />
        </el-form-item>
        <el-form-item label="天平分类">
          <el-input v-model="form.balanceClassify" />
        </el-form-item>
        <el-form-item label="天平材质">
          <el-input v-model="form.balanceMaterial" />
        </el-form-item>
        <el-form-item label="支杆数量">
          <el-input v-model="form.balanceSupport" type="number" />
        </el-form-item>
        <el-form-item label="接口形式">
          <el-input v-model="form.balanceInferface" />
        </el-form-item>
        <el-form-item label="设计人员">
          <el-input v-model="form.balanceDesigner" />
        </el-form-item>

        <el-form-item label="设计时间">
          <el-date-picker v-model="form.balanceDtime" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="加工单位">
          <el-input v-model="form.balanceFactory" />
        </el-form-item>
        <el-form-item label="加工时间">
          <el-date-picker v-model="form.balanceFtime" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="量程X">
          <el-input v-model="form.balanceX" type="number" />
        </el-form-item>
        <el-form-item label="量程Y">
          <el-input v-model="form.balanceY" type="number" />
        </el-form-item>
        <el-form-item label="量程Z">
          <el-input v-model="form.balanceZ" type="number" />
        </el-form-item>
        <el-form-item label="量程MX">
          <el-input v-model="form.balanceMx" type="number" />
        </el-form-item>
        <el-form-item label="量程MY">
          <el-input v-model="form.balanceMy" type="number" />
        </el-form-item>
        <el-form-item label="量程MZ">
          <el-input v-model="form.balanceMz" type="number" />
        </el-form-item>

        <el-form-item label="试验总车次">
          <el-input v-model="form.balanceTnum" type="number" />
        </el-form-item>
        <el-form-item label="天平现状">
          <el-input v-model="form.balanceState" />
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
import { getUser } from '../../utils/auth';
const router = useRouter()
let mode = '0'

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,

})
const state = reactive({
  data: {},
  curBalanceInfo: {},

})

const form = reactive({
  balanceCode: '',
  balanceName:'',
  balanceType: '',
  balanceClassify: '',
  balanceMaterial: '',
  balanceSupport: null,
  balanceInferface: '',
  balanceDesigner: '',
  balanceDtime: '',
  balanceFactory: '',
  balanceFtime: '',
  balanceX: null,
  balanceY: null,
  balanceZ: null,
  balanceMx: null,
  balanceMy: null,
  balanceMz: null,
  balanceTnum: null,
  balanceState: '',
  

})
const dialogVisible1 = ref(false)

const clearData = () => {

  form.balanceCode = ''
  form.balanceType = ''
  form.balanceName=''
  form.balanceClassify = ''
  form.balanceMaterial = ''
  form.balanceSupport = null
  form.balanceInferface = ''
  form.balanceDesigner = ''
  form.balanceDtime = ''
  form.balanceFactory = ''
  form.balanceFtime = ''
  form.balanceX = null
  form.balanceY = null
  form.balanceZ = null
  form.balanceMx = null
  form.balanceMy = null
  form.balanceMz = null
  form.balanceTnum = null
  form.balanceState = ''
  mode = '0'

}

const statusFormatter=(row,col,cellValue)=>{
  if(cellValue === '0'){
    return '已入库'
  }
  return '已出库'
}


const getBalanceInfoList = () => {

  axios.get('balanceInfo/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}



const saveOrUpdate = () => {

  if (mode == '0') {
    axios.post('balanceInfo', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('新增成功')
      getBalanceInfoList()

    })
  } else {
    axios.put('balanceInfo', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('修改成功')
      getBalanceInfoList()

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
  axios.delete('balanceInfo/' + row.balanceCode).then(res => {
    ElMessage.success("删除成功")
    getBalanceInfoList()
  })
}

const handleView=(index,row)=>{

  router.push('/details?balanceCode='+row.balanceCode)
}

const onPageChange = (page, size) => {
  queryParams.pageNum = page
  getBalanceInfoList()
}

getBalanceInfoList()


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