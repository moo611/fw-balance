import { watchEffect } from "vue";
import { getUser } from "./auth"; 

export default {
  mounted(el, binding) {
    // 先隐藏元素，防止权限未加载时误显示
    el.style.display = "none";

    watchEffect(() => {
      const user = getUser(); // 获取用户信息
      if (user && user.permissions) {
        const userPermissions = user.permissions;
        const requiredPermission = binding.value;

        console.log("用户权限：", userPermissions);

        if (userPermissions.includes(requiredPermission) || userPermissions.includes("*")) {
          console.log("有权限，显示元素");
          el.style.display = "";
        } else {
          console.log("无权限，隐藏元素");
          el.style.display = "none";
        }
      }
    });
  }
};
