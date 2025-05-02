<template>
  <div>
    <div class="header">
      <el-button v-show="false" type="primary" @click="getBalanceCalibrationList">查询</el-button>
      <el-button @click="handleAdd" type="primary" class="btn-add"
        v-permission="'details.calibration.add'">新增</el-button>
    </div>
    <el-table class="my-table" :data="state.data.list">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="bcalibrationCode" label="证书编号" />
      <el-table-column prop="bcalibrationName" label="证书名称" />
      <el-table-column prop="bcalibrationTime" label="证书有效期" />
      <el-table-column prop="bcalibrationVersion" label="证书版本" />

      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)"
            v-permission="'details.calibration.edit'">
            编辑
          </el-button>
          <el-button type="primary" size="small" @click="handleDownload(scope.$index, scope.row)">
            下载
          </el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)"
            v-permission="'details.calibration.del'">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    <el-dialog v-model="dialogVisible1" width="500" @close="clearData">

      <el-form class="form" :model="form" label-width="auto" style="max-width: 600px">

        <el-form-item label="证书名称(加后缀)">
          <el-input v-model="form.bcalibrationName" />
        </el-form-item>
        <el-form-item label="证书有效期">
          <el-date-picker v-model="form.bcalibrationTime" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="上传">
          <el-upload ref="uploadRef" class="avatar-uploader" action="http://localhost:8081/file/upload"
            :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>


        <el-form-item label="证书版本">
          <el-input v-model="form.bcalibrationVersion" />
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
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import myaxios from '../../axios';
import axios from 'axios'
import { ElMessage } from 'element-plus';

const props = defineProps(['balanceCode'])

let mode = '0'
const uploadRef = ref(null)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,

})
const state = reactive({
  data: {},
  curBalanceCalibration: {},

})

const form = reactive({
  bcalibrationCode: '',
  balanceCode: '',
  bcalibrationName: '',
  bcalibrationTime: null,
  bcalibrationVersion: '',
  bcalibrationFile: ''
})
const dialogVisible1 = ref(false)

const clearData = () => {

  form.bcalibrationCode = ''
  form.balanceCode = ''
  form.bcalibrationName = ''
  form.bcalibrationTime = null
  form.bcalibrationVersion = ''
  form.bcalibrationFile = ''
  mode = '0'
  uploadRef.value.clearFiles()
}

const handleDownload = (index, row) => {


  // axios({
  //   url: row.bcalibrationFile, // 后端的 API 路径

  //   method: 'GET',
  //   responseType: 'blob' // 指定响应类型为 blob，处理二进制数据
  // }).then(response => {
  //   // 创建一个 Blob 对象
  //   const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  //   // 创建下载链接
  //   const link = document.createElement('a');
  //   const url = URL.createObjectURL(blob);
  //   link.href = url;
  //   link.setAttribute('download', row.bcalibrationName); // 设置下载文件名

  //   // 触发下载
  //   document.body.appendChild(link);
  //   link.click();

  //   // 移除链接
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // }).catch(error => {
  //   console.error("Download failed:", error);
  // });
  const url = `http://localhost:8081/file/download?path=${encodeURIComponent(row.filePath)}`
  const link = document.createElement('a')
  link.href = url
  link.download = ''
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

}
const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response)
  form.bcalibrationFile = response.data
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片不能超过 5MB!');
    return false;
  }

  return true;
};

const getBalanceCalibrationList = () => {
  queryParams.balanceCode = props.balanceCode
  myaxios.get('balanceCalibration/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}



const saveOrUpdate = () => {
  form.balanceCode = props.balanceCode
  if (mode == '0') {
    myaxios.post('balanceCalibration', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('新增成功')
      getBalanceCalibrationList()

    })
  } else {
    myaxios.put('balanceCalibration', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('修改成功')
      getBalanceCalibrationList()

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
  myaxios.delete('balanceCalibration/' + row.bcalibrationCode).then(res => {
    ElMessage.success("删除成功")
    getBalanceCalibrationList()
  })
}


const onPageChange = (page, size) => {
  queryParams.pageNum = page
  getBalanceCalibrationList()
}

getBalanceCalibrationList()


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