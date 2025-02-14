<template>

  <div class="div-main">

    <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;">
      <el-form-item label="试验型号" class="form-item">
        <el-input v-model="state.form.healthType"/>
      </el-form-item>
      <el-form-item label="使用条件" class="form-item">
        <el-input v-model="state.form.healthCons"/>
      </el-form-item>
      <el-form-item label="故障状态" class="form-item">
        <el-input v-model="state.form.healthState" />
      </el-form-item>
      <el-form-item label="故障原因" class="form-item">
        <el-input v-model="state.form.healthReason" />
      </el-form-item>
      <el-form-item label="故障时间" class="form-item">
        <el-date-picker v-model="state.form.createTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" />
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
const props = defineProps(['balanceCode','inId'])
console.log(props)

const uploadRef = ref(null)


const state = reactive({
  form: {
    id: null,
    balanceCode: '',
    inId: null,
    healthType: '',
    healthCons: '',
    healthState:'',
    healthReason:'',
    createTime:null
  },
  
})



//保存尺寸信息
const saveOrUpdate = () => {
  state.form.inId = props.inId
  state.form.balanceCode = props.balanceCode
  myaxios.post('balanceHealth/saveOrUpdate', state.form).then(res => {

    ElMessage.success('保存成功')
    getInfo()

  })

}



//console.log(state)
const getInfo = () => {

  myaxios.get('balanceHealth/info',{params:{balanceCode:props.balanceCode,inId:props.inId}}).then(res => {
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