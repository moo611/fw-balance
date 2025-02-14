<template>

  <div class="div-main">

    <el-form class="form" :inline="true" :model="state.form" label-width="auto" style="width: 100%;">
      <el-form-item label="制造材料" class="form-item">
        <el-input v-model="state.form.bprocessMaterials" />
      </el-form-item>
      <el-form-item label="加工厂商名称" class="form-item">
        <el-input v-model="state.form.bprocessFactory" />
      </el-form-item>
      <el-form-item label="加工工艺" class="form-item">
        <el-input v-model="state.form.bprocessCraft" />
      </el-form-item>
      <el-form-item label="加工时间" class="form-item">
        <el-date-picker v-model="state.form.bprocessCtime" type="date" value-format="YYYY-MM-DD" />
      </el-form-item>

    </el-form>
    <div style="position: relative; height: 50px;">
      <el-button type="primary" @click="handleAdd" style="position: absolute; right: 20px;" v-permission="'details.process.upload'">文件上传</el-button>
    </div>
    <el-table class="my-table" :data="state.fileList">

      <el-table-column prop="fileName" label="文件名" />
      <el-table-column prop="fileType" label="文件类型" :formatter="typeFormatter" />

      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleDownload(scope.$index, scope.row)">
            下载
          </el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-permission="'details.process.del'">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="div-btn">
      <el-button type="primary" @click="saveOrUpdate" style="width: 200px;" v-permission="'details.process.save'">
        保存
      </el-button>
    </div>

    <el-dialog v-model="dialogVisible1" width="500" @close="clearData">

      <el-form class="form" :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="文件名(需要加后缀)">
          <el-input v-model="form.fileName" />
        </el-form-item>

        <el-form-item label="文件类型">
          <el-select v-model="form.fileType" placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="上传">
          <el-upload ref="uploadRef" class="avatar-uploader" action="http://8.155.12.207:8888/upload/avatar"
            :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="saveFile">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="js">
import myaxios from '../../axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { reactive, defineProps, ref } from 'vue'

const props = defineProps(['balanceCode'])
console.log(props)
const dialogVisible1 = ref(false)
const uploadRef = ref(null)
const form = reactive({
  id: null,
  fileName: '',
  filePath: '',
  fileType: '',
  fileBelong: '1',
  balanceCode: '',
})

const state = reactive({
  form: {
    id: null,
    balanceCode: '',
    bprocessMaterials: '',
    bprocessFactory: '',
    bprocessCraft: '',
    bprocessCtime:''
  },
  fileList: []
})
const typeOptions = [{ value: '3', label: '实物图片' }, { value: '4', label: '质检报告' }, { value: '5', label: '验收合同' },{ value: '6', label: '加工合同' }]

const typeFormatter = (row, col, cellValue,) => {

  if (cellValue == '3') {
    return '实物图片'
  }

  if (cellValue == '4') {
    return '质检报告'
  }
  if (cellValue == '5') {
    return '验收合同'
  }
  if (cellValue == '6') {
    return '加工合同'
  }

  return ''
}

//保存尺寸信息
const saveOrUpdate = () => {
  state.form.balanceCode = props.balanceCode
  myaxios.post('balanceProcess/saveOrUpdate', state.form).then(res => {

    ElMessage.success('保存成功')
    getInfo()

  })

}
//保存文件
const saveFile=()=>{
  form.balanceCode = props.balanceCode
  myaxios.post('balanceFile',form).then(res=>{
    ElMessage.success("上传成功")
    dialogVisible1.value=false
    getFiles()
  })

}


const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response)
  form.filePath = response.data
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('文件不能超过 5MB!');
    return false;
  }

  return true;
};

const clearData = () => {
  form.fileName = ''
  form.fileType = ''
  form.filePath = ''
  form.fileBelong = '1'
  form.balanceCode = ''
  form.id = null
  uploadRef.value.clearFiles()
}

const handleAdd = () => {

  dialogVisible1.value = true
}

const handleDownload = (index, row) => {

  
  axios({
    url: row.filePath, // 后端的 API 路径
    
    method: 'GET',
    responseType: 'blob' // 指定响应类型为 blob，处理二进制数据
  }).then(response => {
    // 创建一个 Blob 对象
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // 创建下载链接
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', row.fileName); // 设置下载文件名

    // 触发下载
    document.body.appendChild(link);
    link.click();

    // 移除链接
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }).catch(error => {
    console.error("Download failed:", error);
  });

}

const handleDel = (index, row) => {
  myaxios.delete('balanceFile/' + row.id).then(res => {
    ElMessage.success("删除成功")
    getFiles()
  })
}

//console.log(state)
const getInfo = () => {

  myaxios.get('balanceProcess/info?balanceCode=' + props.balanceCode).then(res => {
    if (res) {
      state.form = res
    }
  })

}

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10000,

})

const getFiles = () => {
  queryParams.balanceCode = props.balanceCode
  queryParams.fileBelong = '1'
  myaxios.get('balanceFile/list', { params: queryParams }).then(res => {
    state.fileList = res.list
  })

}

getInfo()
getFiles()
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