<template>
  <section>
    <el-card class="box-card">
      <el-form
          label-position="left"
          label-width="80px"
          :rules="formRules"
          ref="form"
          :model="form"
      >
        <template v-if="operation != 'add'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                  label="账号"
                  prop="accountId"
              >
                <el-input
                    v-model="form.accountId"
                    disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                  label="单位名称"
                  prop="companyName"
              >
                <el-input
                    v-model="form.companyName"
                    placeholder="单位名称"
                    disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item
                  label="地址id"
                  prop="addressId"
              >
                <el-input
                    v-model="form.addressId"
                    placeholder="地址id"
                    disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                  label="地址信息"
                  prop="deliveryAddressInfo"
              >
                <el-input
                    v-model="form.deliveryAddressInfo"
                    placeholder="地址信息"
                    disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="单位法人"
                prop="LegalPersonName"
            >
              <el-input
                  v-model="form.LegalPersonName"
                  placeholder="单位法人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="法人联系电话"
                prop="LegalPersonTel"
            >
              <el-input
                  v-model="form.LegalPersonTel"
                  placeholder="法人联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="单位联系人"
                prop="contact"
            >
              <el-input
                  v-model="form.contact"
                  placeholder="单位联系人"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="联系人电话"
                prop="contactTel"
            >
              <el-input
                  v-model="form.contactTel"
                  placeholder="联系人电话"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item
                label="备注"
                prop="remark"
            >
              <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.remark"
                  maxlength="100"
                  show-word-limit
                  :autosize="{ minRows: 3}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
            :gutter="20"
            v-if="operation != 'add'"
        >
          <div class="info-box">
            <span class="px-2">审核：{{ auditStatusList[form.auditStatus] }}</span>
            <span class="px-2">审核人：{{ form.confirmInfo && form.confirmInfo.auditName ? form.confirmInfo.auditName: '暂无' }}</span>
            <span class="px-2">审核账号：{{ form.confirmInfo && form.confirmInfo.auditorId ? form.confirmInfo.auditorId: '暂无' }}</span>
            <span class="px-2">审核通过时间：{{ form.confirmInfo && form.confirmInfo.auditTime ? parseTime(form.confirmInfo.auditTime): '暂无' }}</span>
          </div>
        </el-row>

      </el-form>
      <el-button
          type="primary"
          class="machine-btn"
          v-show="operation === 'add'"
          @click="saveData"
      >保存</el-button>
      <el-button
          type="primary"
          class="machine-btn"
          v-show="operation === 'edit'"
          @click="editData"
      >修改</el-button>
      <el-button
          type="danger"
          class="machine-btn"
          @click="backTo"
      >关闭</el-button>
    </el-card>
  </section>
</template>

<script>
import { EditWorker, GetWorkerById, AddWorker } from "@/api/fileManage";
import { GetRegionList } from "@/api/region";
import { GetStoreList } from "@/api/store";
import { checkPhone, checkNum } from "@/utils/index";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      form: {
        companyName: "",
        addressId: "",
        deliveryAddressInfo: "",
        LegalPersonName:"",
        LegalPersonTel: "",
        contact: "",
        contactTel: "",
      },
      formatRole: "",
      formRules: {
        companyName: [
          { required: true, message: "请输入单位名称", trigger: "blur" }
          // { validator: checkChinese, trigger: "blur" }
        ],
        deliveryAddressInfo: [
          { required: true, message: "请输入单位地址", trigger: "blur" }
          // { validator: checkChinese, trigger: "blur" }
        ],
        LegalPersonName: [
          { required: true, message: "请输入法人姓名", trigger: "blur" }
          // { validator: checkChinese, trigger: "blur" }
        ],
        LegalPersonTel: [
          { required: true, message: "请输入法人联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
          // { validator: checkChinese, trigger: "blur" }
        ],
        contactTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        donorStatus: [{ required: true, message: "是否为捐助者", trigger: "blur" }],
        doneeStatus: [{ required: true, message: "是否为受捐者", trigger: "blur" }]},
      operation: "",
      donorStatusList:[
        {
          label: "是，本单位是捐助者",
          value: "isDonorCompany"
        },
        {
          label: "否，本单位不是捐助者",
          value: "isNotDonorCompany"
        },
      ],
      doneeStatusList: [
        {
          label: "是，本单位是收捐者",
          value: "isDonorCompany"
        },
        {
          label: "否，本单位不是收捐者",
          value: "isNotDonorCompany"
        },
      ],
      auditStatusList: {
        not_revienwed: "未审核",
        confirm_success: "通过",
        confirm_fail: "未通过"
      }
    };
  },
  mounted() {
    this.operation = this.$route.query.operation;
    this.id = this.$route.query.id;
    this.getStoreList();

    if (this.operation === "add") {
      this.getRegionList();
    } else if (this.operation === "detail") {
      this.getData(this.id);
      this.formRules = {};
    } else if (this.operation === "edit") {
      this.getData(this.id);
    }
  },
  methods: {
    parseTime(val) {
      return parseTime(val);
    },
    backTo() {
      this.$router.push({
        path: "/donorInfoC"
      });
    },
    getStoreList() {
      GetStoreList().then(res => {
        this.storeList = res.data.datas[0].content;
      });
    },
    getRegionList() {
      GetRegionList().then(res => {
        this.regionList = res.data.datas[0].content;
      });
    },
    getData(id) {
      const that = this;

      GetWorkerById(id).then(res => {
        that.form = res.data.datas[0];
        that.formatRole = that.formatRoleType(that.form.roleType);
      });
    },
    formatRoleType(value) {
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
    },
    saveData() {
      let para = {
        workerInfo: this.form,
        loginName: "",
        password: "123456",
        roleType: "nurse"
      };
      para.loginName = this.form.workerTel;

      this.$refs.form.validate(valid => {
        if (valid) {
          AddWorker(para).then(res => {
            if (res.data.code === "000") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.backTo();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
                offset: 200
              });
            }
          });
        } else {
          this.$message({
            message: "信息填写有误",
            type: "error",
            offset: 200
          });
        }
      });
    },
    editData() {
      const para = {
        ...this.form
      };
      this.$refs.form.validate(valid => {
        if (valid) {
          EditWorker(para).then(res => {
            if (res.data.code === "000") {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.backTo();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
                offset: 200
              });
            }
          });
        } else {
          this.$message({
            message: "信息填写有误",
            type: "error",
            offset: 200
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 0;
}
.el-card {
  margin-bottom: 30px;
}
</style>