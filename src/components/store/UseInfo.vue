<template>

  <div class="div-main">

    <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;">
      <el-form-item label="试验型号" class="form-item">
        <el-input v-model="state.form.testType"/>
      </el-form-item>
      <el-form-item label="支撑装置" class="form-item">
        <el-input v-model="state.form.support"/>
      </el-form-item>
      <el-form-item label="模型" class="form-item">
        <el-input v-model="state.form.mdl" />
      </el-form-item>
      <el-form-item label="责任人" class="form-item">
        <el-input v-model="state.form.person" />
      </el-form-item>
      <el-form-item label="设计时间" class="form-item">
        <el-date-picker v-model="state.form.ctime" type="date" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="使用周期" class="form-item">
        <el-input v-model="state.form.useTime" />
      </el-form-item>
    </el-form>
    
    <div class="div-btn">
      <el-button type="primary" @click="saveOrUpdate" style="width: 200px;">
        保存
      </el-button>
    </div>

    
  </div>
</template>

<script setup lang="js">
import myaxios from '../../axios'

import { ElMessage } from 'element-plus'
import { reactive, defineProps, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const props = defineProps(['balanceCode','outId'])
console.log(props)

const uploadRef = ref(null)


const state = reactive({
  form: {
    id: null,
    balanceCode: '',
    testType: '',
    support: '',
    mdl: '',
    person:'',
    ctime:'',
    useTime:''
  },
  
})



//保存尺寸信息
const saveOrUpdate = () => {
  state.form.outId = props.outId
  state.form.balanceCode = props.balanceCode
  myaxios.post('balanceUse/saveOrUpdate', state.form).then(res => {

    ElMessage.success('保存成功')
    getInfo()

  })

}



//console.log(state)
const getInfo = () => {

  myaxios.get('balanceUse/info',{params:{balanceCode:props.balanceCode,outId:props.outId}}).then(res => {
    if (res) {
      state.form = res
    }
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

.avatar {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
</style>