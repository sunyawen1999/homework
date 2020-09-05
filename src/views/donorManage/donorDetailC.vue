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
        <template v-if="operation !== 'add'">
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
          </el-row>
        </template>


        <el-row :gutter="20">
         <el-col :span="8">
              <el-form-item
                  label="单位名称"
                  prop="companyName"
              >
                <el-input
                    v-model="form.companyName"
                    placeholder="单位名称"
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
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>


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
          <el-col :span="8">
            <el-form-item
                label="捐赠总数"
                prop="donationSum"
            >
              <el-input
                  v-model="form.donationSum"
                  placeholder="捐赠总数"
              >
              </el-input>
            </el-form-item>
          </el-col>
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
import { UpdateDonor, GetDonorList, AddDonor } from "@/api/donor";

import { checkPhone, checkNum } from "@/utils/index";
import { parseTime } from "@/utils/index";

export default {





  data() {
    return {
      form: {
        accountId:"",
        companyName: "",
        addressId: "",
        deliveryAddressInfo: "",
        LegalPersonName:"",
        LegalPersonTel: "",
        contact: "",
        contactTel: "",
        donationSum:""
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
        donationSum	: [
          { required: true, message: "请输入捐赠总数", trigger: "blur" }
          // { validator: checkChinese, trigger: "blur" }
        ],
        contactTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]},
      operation: "",
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

    if (this.operation === "add") {
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

    getData(id) {
      const that = this;

      GetDonor(id).then(res => {
        that.form = res.data.datas[0];
      });
    },
    saveData() {
      let para = {
        companyInfo: this.form,
        loginName: "",
        password: "123456",
      };
      para.loginName = this.form.contactTel;

      this.$refs.form.validate(valid => {
        if (valid) {
          AddDonor(para).then(res => {
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
          UpdateDonor(para).then(res => {
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