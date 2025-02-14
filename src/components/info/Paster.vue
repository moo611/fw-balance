<template>
  <div>
    <div class="header">
      <el-button v-show="false" type="primary" @click="getBalancePasterList">查询</el-button>
      <el-button @click="handleAdd" type="primary" class="btn-add" v-permission="'details.paster.add'">新增</el-button>
    </div>
    <el-table class="my-table" :data="state.data.list">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="bpasterPos" label="贴片位置" />
      <el-table-column prop="bpasterTime" label="贴片时间" />
      <el-table-column label="组桥图" width="100">
        <template v-slot="scope">
          <img :src="scope.row.bprocessPhoto" alt="图片" style="width: 100px; height: 60px; object-fit: contain;" />
        </template>
      </el-table-column>

      <el-table-column prop="bridgePressure" label="桥压" />
      <el-table-column prop="bprocessPerson" label="贴片人员" />
      <el-table-column prop="tempCompensation" label="温度补偿" />
      <el-table-column prop="strainGaugeType" label="应变器型号" />
      <el-table-column prop="strainGaugeNorm" label="应变器规格" />
      <el-table-column prop="strainGaugeFactory" label="应变器制造商" />
      <el-table-column prop="bpasterPrcdata" label="贴片过程数据" />

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)" v-permission="'details.paster.edit'">
            编辑
          </el-button>

          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" v-permission="'details.paster.del'">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="state.data.total" :page-size="queryParams.pageSize"
      @change="onPageChange" />

    <el-dialog v-model="dialogVisible1" width="500" @close="clearData">

      <el-form class="form" :model="form" label-width="auto" style="max-width: 600px">

        <el-form-item label="贴片位置">
          <el-input v-model="form.bpasterPos" />
        </el-form-item>
        <el-form-item label="贴片时间">
          <el-date-picker v-model="form.bpasterTime" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="组桥图">
          <el-upload ref="uploadRef" class="avatar-uploader" action="http://8.155.12.207:8888/upload/avatar"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.bprocessPhoto" :src="form.bprocessPhoto" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>

          </el-upload>
        </el-form-item>

        <el-form-item label="桥压">
          <el-input v-model="form.bridgePressure" type="number" />
        </el-form-item>
        <el-form-item label="贴片人员">
          <el-input v-model="form.bprocessPerson" />
        </el-form-item>
        <el-form-item label="温度补偿">
          <el-input v-model="form.tempCompensation" type="number" />
        </el-form-item>
        <el-form-item label="应变器型号">
          <el-input v-model="form.strainGaugeType" />
        </el-form-item>
        <el-form-item label="应变器规格">
          <el-input v-model="form.strainGaugeNorm" />
        </el-form-item>


        <el-form-item label="应变器制造商">
          <el-input v-model="form.strainGaugeFactory" />
        </el-form-item>
        <el-form-item label="贴片过程数据">
          <el-input v-model="form.bpasterPrcdata" />
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
import axios from '../../axios';
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
  curBalancePaster: {},

})

const form = reactive({
  id: null,
  balanceCode: '',
  bpasterPos: '',
  bpasterTime: null,
  bprocessPerson: '',
  bprocessPhoto:'',
  bridgePressure: null,
  tempCompensation: null,
  strainGaugeType: '',
  strainGaugeNorm: '',
  strainGaugeFactory: '',
  bpasterPrcdata: ''
})
const dialogVisible1 = ref(false)

const clearData = () => {

  form.id = null
  form.balanceCode = ''
  form.bpasterPos = ''
  form.bpasterTime = null
  form.bprocessPhoto=''
  form.bprocessPerson = ''
  form.bridgePressure = null
  form.tempCompensation = null
  form.strainGaugeType = ''
  form.strainGaugeNorm = ''
  form.strainGaugeFactory = ''
  form.bpasterPrcdata = ''
  mode = '0'

}


const handleAvatarSuccess = (response, uploadFile) => {
  console.log(response)
  form.bprocessPhoto = response.data
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片不能超过 5MB!');
    return false;
  }

  return true;
};

const getBalancePasterList = () => {
  queryParams.balanceCode = props.balanceCode
  axios.get('balancePaster/list', { params: queryParams }).then(res => {

    state.data = res

    console.log(state.data)

  })

}



const saveOrUpdate = () => {
  form.balanceCode = props.balanceCode
  if (mode == '0') {
    axios.post('balancePaster', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('新增成功')
      getBalancePasterList()

    })
  } else {
    axios.put('balancePaster', form).then(res => {

      dialogVisible1.value = false
      ElMessage.success('修改成功')
      getBalancePasterList()

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
  axios.delete('balancePaster/' + row.id).then(res => {
    ElMessage.success("删除成功")
    getBalancePasterList()
  })
}


const onPageChange = (page, size) => {
  queryParams.pageNum = page
  getBalancePasterList()
}

getBalancePasterList()


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