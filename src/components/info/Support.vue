<template>

  <div class="div-main">

    <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;">
      <el-form-item label="安装支撑类型" class="form-item">
        <el-input v-model="state.form.supportType" />
      </el-form-item>
      <el-form-item label="安装支撑名称" class="form-item">
        <el-input v-model="state.form.supportName" />
      </el-form-item>
      <el-form-item label="弹性角" class="form-item">
        <el-input v-model="state.form.supportAng" />
      </el-form-item>
      <el-form-item label="结构图">
          <el-upload ref="uploadRef" class="avatar-uploader" action="http://localhost:8081/file/upload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="state.form.supportPic" :src="state.form.supportPic" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>

          </el-upload>
        </el-form-item>

    </el-form>
    
    <div class="div-btn">
      <el-button type="primary" @click="saveOrUpdate" style="width: 200px;" v-permission="'details.support.save'">
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
const props = defineProps(['balanceCode'])
console.log(props)

const uploadRef = ref(null)


const state = reactive({
  form: {
    id: null,
    balanceCode: '',
    supportType: '',
    supportName: '',
    supportAng: '',
    supportPic:''
  },
  
})



//保存尺寸信息
const saveOrUpdate = () => {
  state.form.balanceCode = props.balanceCode
  myaxios.post('balanceSupport/saveOrUpdate', state.form).then(res => {

    ElMessage.success('保存成功')
    getInfo()

  })

}


const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response)
  state.form.supportPic = response.data
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('文件不能超过 5MB!');
    return false;
  }

  return true;
};



//console.log(state)
const getInfo = () => {

  myaxios.get('balanceSupport/info?balanceCode=' + props.balanceCode).then(res => {
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