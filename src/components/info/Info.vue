<template>

  <div class="div-main">

    <el-form class="form" :inline="true" :model="state.data" label-width="auto" style="width: 100%;">
      <el-form-item label="天平代号" class="form-item" >
        <el-input v-model="state.data.balanceName" />
      </el-form-item>
      <el-form-item label="天平类型" class="form-item">
        <el-input v-model="state.data.balanceType" />
      </el-form-item>
      <el-form-item label="天平分类" class="form-item">
        <el-input v-model="state.data.balanceClassify" />
      </el-form-item>
      <el-form-item label="天平材质" class="form-item">
        <el-input v-model="state.data.balanceMaterial" />
      </el-form-item>
      <el-form-item label="支杆数量" class="form-item">
        <el-input v-model="state.data.balanceSupport" type="number" />
      </el-form-item>
      <el-form-item label="接口形式" class="form-item">
        <el-input v-model="state.data.balanceInferface" />
      </el-form-item>
      <el-form-item label="设计人员" class="form-item">
        <el-input v-model="state.data.balanceDesigner" />
      </el-form-item>

      <el-form-item label="设计时间" class="form-item">
        <el-date-picker v-model="state.data.balanceDtime" type="date" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="加工单位" class="form-item">
        <el-input v-model="state.data.balanceFactory" />
      </el-form-item>
      <el-form-item label="加工时间" class="form-item">
        <el-date-picker v-model="state.data.balanceFtime" type="date" value-format="YYYY-MM-DD" />
      </el-form-item>

      <el-form-item label="量程X" class="form-item">
        <el-input v-model="state.data.balanceX" type="number" />
      </el-form-item>
      <el-form-item label="量程Y" class="form-item">
        <el-input v-model="state.data.balanceY" type="number" />
      </el-form-item>
      <el-form-item label="量程Z" class="form-item">
        <el-input v-model="state.data.balanceZ" type="number" />
      </el-form-item>
      <el-form-item label="量程MX" class="form-item">
        <el-input v-model="state.data.balanceMx" type="number" />
      </el-form-item>
      <el-form-item label="量程MY" class="form-item">
        <el-input v-model="state.data.balanceMy" type="number" />
      </el-form-item>
      <el-form-item label="量程MZ" class="form-item">
        <el-input v-model="state.data.balanceMz" type="number" />
      </el-form-item>

      <!-- <el-form-item label="试验总车次" class="form-item">
        <el-input v-model="state.data.balanceTnum" type="number" />
      </el-form-item> -->
      <el-form-item label="天平现状" class="form-item">
        <el-input v-model="state.data.balanceState" />
      </el-form-item>

    </el-form>

    <div class="div-btn">
      <el-button v-permission="'details.info.save'" type="primary" @click="saveOrUpdate" style="width: 200px;">
        保存
      </el-button>
    </div>
  </div>
</template>

<script setup lang="js">
import axios from '../../axios'
import { ElMessage } from 'element-plus'
import { reactive, defineProps } from 'vue'
const props = defineProps(['balanceCode'])
console.log(props)
const state = reactive({
  data: {}
})

const saveOrUpdate = () => {

  axios.put('balanceInfo', state.data).then(res => {

    ElMessage.success('修改成功')
    getInfo()

  })

}


//console.log(state)
const getInfo = () => {

  axios.get('balanceInfo/' + props.balanceCode).then(res => {
    state.data = res
  })

}
getInfo()
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
</style>