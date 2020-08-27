import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import axios from 'axios'
import { parseTime } from "@/utils/index";
import globalVar from "@/utils/globalVar.js";

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
  return value == "customer"
      ? "用户"
      : value == "expert"
          ? "专家"
          : value == "helper"
              ? "助老员"
              : value == "nurse"
                  ? "护理员"
                  : value == "shopManager"
                      ? "店长"
                      : value == "administration"
                          ? "行政"
                          : value == "hr"
                              ? "hr"
                              : value == "finance"
                                  ? "财务"
                                  : value == "outreach"
                                      ? "外联"
                                      : value == "after_sales"
                                          ? "售后"
                                          : value;
});

Vue.filter("formatWorkingStatus", function (value) {
  if (!value) return "";
  return value == "busy"
      ? "忙碌"
      : value == "resignation"
          ? "离职"
          : value == "free"
              ? "空闲"
              : value;
});

Vue.filter("formatAuditStatus", function (value) {
  if (!value) return "";
  return value == "not_revienwed"
      ? "未审核"
      : value == "confirm_success"
          ? "通过"
          : value == "confirm_fail"
              ? "未通过"
              : value;
});

Vue.filter("formatProductStatus", function (value) {
  if (!value) return "";
  return value == "unrelease"
      ? "未发布"
      : value == "cancel"
          ? "已取消"
          : value == "on_shelf"
              ? "已上架"
              : value == "off_shelf"
                  ? "已下架"
                  : value;
});

Vue.filter("formatLogisticsStatus", function (value) {
  if (!value) return "";
  return value == "cancel"
      ? "已取消"
      : value == "received"
          ? "已收货"
          : value == "delivered"
              ? "已发货"
              : value == "un_delivered"
                  ? "未发货"
                  : value == "paid"
                      ? "已付款"
                      : value == "un_paid"
                          ? "未付款"
                          : value;
});

Vue.filter("formatComplaintOrderStatus", function (value) {
  if (!value) return "";
  return value == "on_processing"
      ? "处理中"
      : value == "been_proccessed"
          ? "已处理"
          : value == "unprocessed"
              ? "未处理"
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
            error.response.data.code !== "401"
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
