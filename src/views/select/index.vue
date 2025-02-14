<template>

  <div class="div-main">

    <div>
      <div style="margin-bottom: 10px;">尺寸</div>
      <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;">
        <el-form-item label="X" class="form-item">
          <el-input v-model="form.sizeX" type="number" />
        </el-form-item>
        <el-form-item label="Y" class="form-item">
          <el-input v-model="form.sizeY" type="number" />
        </el-form-item>
        <el-form-item label="Z" class="form-item">
          <el-input v-model="form.sizeZ" type="number" />
        </el-form-item>

      </el-form>
    </div>

    <div>
      <div style="margin-bottom: 10px;">载荷</div>
      <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;" label-position="left">

        <el-form-item label="X" class="form-item">
          <el-input v-model="form.balanceX" type="number" />
        </el-form-item>
        <el-form-item label="MX" class="form-item">
          <el-input v-model="form.balanceMx" type="number" />
        </el-form-item>
        <el-form-item label="Y" class="form-item">
          <el-input v-model="form.balanceY" type="number" />
        </el-form-item>
        <el-form-item label="MY" class="form-item">
          <el-input v-model="form.balanceMy" type="number" />
        </el-form-item>
        <el-form-item label="Z" class="form-item">
          <el-input v-model="form.balanceZ" type="number" />
        </el-form-item>
        <el-form-item label="MZ" class="form-item">
          <el-input v-model="form.balanceMz" type="number" />
        </el-form-item>

      </el-form>
    </div>
    <div style="display: flex; width: 100%; align-items: center;justify-content: center; height: 50px;">
      <el-button type="primary" @click="handleSelect" style="width: 200px;">开始智选</el-button>
    </div>

    <el-table class="my-table" :data="state.data">

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

    </el-table>


  </div>
</template>

<script setup lang="js">
import axios from '../../axios'

import { ElMessage } from 'element-plus'
import { reactive, defineProps, ref } from 'vue'

const props = defineProps(['balanceCode'])
console.log(props)


const form = reactive({
  topN:1,
  balanceX: null,
  balanceY: null,
  balanceZ: null,
  sizeX: null,
  sizeY: null,
  sizeZ: null,
  balanceMx: null,
  balanceMy: null,
  balanceMz: null
})

const state = reactive({

  data: []
})


const getBalanceInfoList = () => {

  if(!form.balanceX){
    ElMessage.error("请输入载荷X")
    return
  }
  if(!form.balanceY){
    ElMessage.error("请输入载荷Y")
    return
  }
  if(!form.balanceZ){
    ElMessage.error("请输入载荷Z")
    return
  }
  if(!form.balanceMx){
    ElMessage.error("请输入MX")
    return
  }
  if(!form.balanceMy){
    ElMessage.error("请输入MY")
    return
  }
  if(!form.balanceMz){
    ElMessage.error("请输入MZ")
    return
  }

  if(!form.sizeX){
    ElMessage.error("请输入尺寸X")
    return
  }
  if(!form.sizeY){
    ElMessage.error("请输入尺寸Y")
    return
  }
  if(!form.sizeZ){
    ElMessage.error("请输入尺寸Z")
    return
  }

  axios.post('balanceInfo/select', form).then(res => {

    state.data = res

    console.log(state.data)

  })

}

const handleSelect=()=>{
  getBalanceInfoList()
}
</script>

<style lang="css" scoped>
.div-main {
  width: 100%;
  height: 100%;


}

.form {
  margin: 0 auto;

}


/* .form-item {
  width: 200px;
} */

.div-btn {
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>