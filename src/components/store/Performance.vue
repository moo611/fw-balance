<template>

  <div class="div-main">

    <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;">
      <el-form-item label="桥路电阻" class="form-item">
        <el-input v-model="state.form.performanceRe" type="number"/>
      </el-form-item>
      <el-form-item label="绝缘性能" class="form-item">
        <el-input v-model="state.form.performanceInsulation" type="number"/>
      </el-form-item>
      <el-form-item label="零点时漂" class="form-item">
        <el-input v-model="state.form.performanceZero" />
      </el-form-item>
      <el-form-item label="加载检查" class="form-item">
        <el-input v-model="state.form.performanceLoad" />
      </el-form-item>
      <el-form-item label="检查结果" class="form-item">
        <el-input v-model="state.form.performanceResult" />
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
const props = defineProps(['balanceCode','outId','inId'])
console.log(props)

const uploadRef = ref(null)


const state = reactive({
  form: {
    id: null,
    balanceCode: '',
    performanceRe: null,
    performanceInsulation: null,
    performanceZero: '',
    performanceLoad:'',
    performanceResult:''
  },
  
})



//保存尺寸信息
const saveOrUpdate = () => {
  state.form.outId = props.outId
  state.form.inId = props.inId
  state.form.balanceCode = props.balanceCode
  myaxios.post('balancePerformance/saveOrUpdate', state.form).then(res => {

    ElMessage.success('保存成功')
    getInfo()

  })

}



//console.log(state)
const getInfo = () => {

  myaxios.get('balancePerformance/info',{params:{balanceCode:props.balanceCode,outId:props.outId,inId:props.inId}}).then(res => {
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