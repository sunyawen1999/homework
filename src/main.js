import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './style/element-variables.scss'
import axios from 'axios'
import { parseTime } from "@/utils/index";
import globalVar from "@/utils/globalVar.js";

axios.defaults.baseURL='http://118.178.224.152:8080';


Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter("formatImg", function (value) {
  if (!value) return "";
  return globalVar.imgPath + value;
});

Vue.filter("formatTime", function (value) {
  if (!value) return "";
  return val ? parseTime(val) : "";
});

Vue.filter("formatDate", function (value) {
  if (!value) return "";
  return val ? parseTime(val, "YYYY-MM-DD") : "";
});

Vue.filter("formatRoleType", function (value) {
  if (!value) return "";
  return value === "customer"
      ? "用户"
      : value === "superAdmin"
          ? "管理者"
          : value;
});

Vue.filter("deliveryStatus", function (value) {
  if (!value) return "";
  return value === "cancel"
      ? "取消"
      : value === "received"
          ? "已收到"
          : value === "delivered"
              ? "已发出"
              : value === "un_delivered"
                  ? "未发出"
              : value;
});

Vue.filter("formatAuditStatus", function (value) {
  if (!value) return "";
  return value === "not_revienwed"
      ? "未审核"
      : value === "confirm_success"
          ? "通过"
          : value === "confirm_fail"
              ? "未通过"
              : value;
});


Vue.filter("itemTypre", function (value) {
  if (!value) return "";
  return value === "food"
      ? "食品"
      : value === "medical_supplies"
          ? "药品"
          : value === "daily_necessities"
              ? "日用品"
              : value === "clothing"
                  ? "衣物"
              : value;
});

axios.interceptors.request.use(
    function (config) {
      // debugger;
      return config;
    },
    function (error) {
      // 请求错误
      return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (!error.response) {
        return Promise.reject(error);
      } else {
        if (
            error.config.url !== "api/users/me" &&
            error.response.data !== "401"
        ) {
          // const msg = `Error: ${error.response.data.error || ''}, Message: ${error.response.data.message || ''} 请联系管理员`;
          // MessageBox.alert(msg, '出错了', {
          //   showClose: false,
          //   type: 'error'
          // });
        } else if (error.config.url !== "api/users/me") {
          // const msg = `请重新登录`;
          // MessageBox.alert(msg, '登陆超时', {
          //   showClose: false,
          //   type: 'error'
          // });
          sessionStorage.removeItem("user");
          router.replace("/login");
        }
        // this.onAlertError(error.response.data.message);
        return Promise.reject(error);
      }
    }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
