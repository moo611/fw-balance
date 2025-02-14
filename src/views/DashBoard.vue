<template>
  <div class="main">
    <div class="header">
      <h3 style="margin-left: 30px;">风洞试验天平信息管理系统</h3>
      <div class="btn-logout">
        <el-popover v-model:visible="popoverVisible" placement="bottom" width="200">
          <el-button type="warning" @click="logout">退出登录</el-button>
          <template #reference>
            <div @click="popoverVisible = !popoverVisible" style="display: flex; align-items: center; cursor: pointer;">

              <img style="width: 40px; height: 40px;" src="../assets/avt_default.png" />
              <span style="margin-left: 8px;">{{ curName }}</span>
            </div>
          </template>
        </el-popover>
      </div>

    </div>
    <div style="height: 1px; width: 100%; background-color: #f0f0f0;"></div>
    <div class="content">
      <div class="sidebar">

        <el-menu :default-active="activeMenu" router class="custom-menu">

          <el-menu-item v-for="item, index in menuList" :index="item.value">
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </div>

      <router-view class="container">
      </router-view>


    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { clear, getUser, setUser } from '../utils/auth';
import axios from '../axios'
const popoverVisible = ref(false)
const menuList = ref([])
const router = useRouter();
const route = useRoute();
const activeMenu = ref(route.path);
const curName = ref('')
watch(route, (newRoute) => {
  activeMenu.value = newRoute.path;
});
function logout() {
  clear(); // 清除缓存的用户名
  router.push('/login'); // 重定向到登录页
}


const getInfo = () => {

  axios.get('user/info').then(res => {
    let user = res
    curName.value = user.nickname

    //动态获取路由
    let menus = []
    if (user.role == '0') {
      //管理员
      menus.push({ label: '天平基本信息管理', value: '/dashboard/info' })
      menus.push({ label: '天平试验状态信息', value: '/dashboard/test' })
      menus.push({label: '天平出入库管理', value: '/dashboard/store'})
      menus.push({label: '参试天平智能选择', value: '/dashboard/select' })

      let permissions = ['*']
      user.permissions = permissions

    } else if(user.role == '1'){
      //普通用户
      menus.push({ label: '天平基本信息管理', value: '/dashboard/info' })
      menus.push({ label: '天平试验状态信息', value: '/dashboard/test' })
      menus.push({label: '参试天平智能选择', value: '/dashboard/select' })
      
      let permissions = []
      user.permissions = permissions
      

    }else if(user.role == '2'){
      menus.push({ label: '天平基本信息管理', value: '/dashboard/info' })
      menus.push({ label: '天平试验状态信息', value: '/dashboard/test' })
      // menus.push({label: '天平出入库管理', value: '/dashboard/store'})
      menus.push({label: '参试天平智能选择', value: '/dashboard/select' })
      
      let permissions = ['details.calibration.edit','details.calibration.add','details.calibration.del']
      user.permissions = permissions  
    }else{
      menus.push({ label: '天平基本信息管理', value: '/dashboard/info' })
      menus.push({ label: '天平试验状态信息', value: '/dashboard/test' })
      menus.push({label: '天平出入库管理', value: '/dashboard/store'})
      menus.push({label: '参试天平智能选择', value: '/dashboard/select' })
    }
    menuList.value = menus
    setUser(user)
  })
}

getInfo()

</script>
<style lang="css" scoped>
/* 使用 ::v-deep 来覆盖 el-menu 的样式 */
::v-deep .custom-menu {
  font-size: 16px;
  /* 设置菜单的字体大小 */
  font-weight: 600;
  background-color: transparent;
}

::v-deep .custom-menu .el-menu-item {
  font-size: 16px;
  /* 覆盖子元素 el-menu-item 的字体大小 */
  font-weight: 600;
  background-color: transparent;
}

.main {
  /* max-width: 1280px;
  margin: 0 auto;
  background-color: transparent; */
  width: 100%;
  
}

.header {
  height: 80px;
  /* background-color: #409eff; */
  position: relative;
  background-color: transparent;
  display: flex;
  align-items: center;
}

.btn-logout {
  position: absolute;
  right: 30px;

}

.sidebar {
  width: 20%;
  max-width: 200px;
}

.content {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  height: calc(100vh - 100px);
}

.container {

  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 20px;
  /* margin: 30px; */
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
