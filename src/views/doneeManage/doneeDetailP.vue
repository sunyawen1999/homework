<template>
  <section>
    <el-card class="box-card">
      <el-form
          label-position="left"
          label-width="120px"
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
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                  label="受捐总数"
                  prop="donationSum"
              >
                <el-input
                    v-model="form.totalNum"
                    placeholder="受捐总数"
                    disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                  label="用户邮箱"
                  prop="email"
              >
                <el-input
                    v-model="form.email"
                    placeholder="用户邮箱"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                  label="年龄"
                  prop="personAge"
              >
                <el-input
                    v-model="form.personAge"
                    placeholder="年龄"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="用户名"
                prop="personName"
            >
              <el-input
                  v-model="form.personName"
                  placeholder="用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="受捐总数"
                prop="totalNum"
            >
              <el-input
                  v-model="form.totalNum"
                  placeholder="受捐总数"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="联系电话"
                prop="phoneNum"
            >
              <el-input
                  v-model="form.phoneNum"
                  placeholder="联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item
              label="家庭地址"
              required
          >
            <template v-if="operation == 'add'">
              <el-col :span="6">
                <el-form-item prop="customerProvince">
                  <el-select
                      v-model="form.customerProvince"
                      placeholder="省"
                      @change="getCityList"
                  >
                    <el-option
                        v-for="item in provinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="customerCity">
                  <el-select
                      v-model="form.customerCity"
                      placeholder="市"
                  >

                    <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </template>

            <el-col :span="12">
              <el-form-item prop="deliveryAddressInfo">
                <el-input
                    v-model="form.deliveryAddressInfo"
                    placeholder="详细地址"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
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
import { UpdateRecipient, GetRecipientList, AddRecipient } from "@/api/recipient";
import { checkPhone, checkNum } from "@/utils/index";
const {
  data,
  province,
  city,
  area,
  town
} = require("province-city-china/data");

export default {
  data() {
    return {
      form: {
        personName: "",
        genderType: "",
        addressID: "",
        deliveryAddressInfo: "",
        personAge: "",
        phoneNum: "",
        totalNum: "",
        email: "",
        customerProvince: "",
        customerCity: ""
      },
      formRules: {
        personName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" }
          // { validator: checkChinese, trigger: "blur" }
        ],
        genderType: [
          { required: true, message: "请输入性别", trigger: "blur" }
        ],
        deliveryAddressInfo: [
          { required: true, message: "请输入联系地址", trigger: "blur" },
        ],
        personAge: [
          { required: true, message: "请输入年龄", trigger: "blur" }
        ],
        totalNum: [
          { required: true, message: "请输入受捐总数", trigger: "blur" }
        ],
        phoneNum: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入联系邮箱", trigger: "blur" }
        ],
        customerProvince: [
          { required: true, message: "请选择省份", trigger: "blur" }
        ],
        customerCity: [
          { required: true, message: "请选择城市", trigger: "blur" }
        ]
      },
      operation: "",
      provinceList: [],
      cityList: []
    };
  },
  mounted() {
    this.operation = this.$route.query.operation;
    this.id = this.$route.query.id;
    const provinces = require("province-city-china/dist/province.json");
    this.provinceList = provinces;

    if (this.operation === "add") {
    } else if (this.operation === "detail") {
      this.getData(this.id);
      this.formRules = {};
    } else if (this.operation === "edit") {
      this.getData(this.id);
    }
  },
  methods: {
    backTo() {
      this.$router.push({
        path: "/doneeInfoP"
      });
    },
    getCityList() {
      const that = this;
      const province = this.provinceList.find(
          item => item.name === that.form.customerProvince
      );
      if(this.form.customerProvince !== province) {
        this.form.customerCity = "";
      }
      const cities = require("province-city-china/dist/city.json");
      this.cityList = cities.filter(
          item => item.province === province.province
      );
      if (!this.cityList.length) {
        this.form.customerCity = province.name;
      }
    },
    getData(id) {
      const that = this;

      GetRecipientList(id).then(res => {
        that.form = res.data.datas[0];
      });
    },
    saveData() {
      this.form.deliveryAddressInfo =
          this.form.customerProvince +
          this.form.customerCity +
          this.form.deliveryAddressInfo;
      this.form.roleType = "person";
      let para = {
        customerInfo: this.form,
        loginName: "",
        password: "123456",
        roleType: "person"
      };
      para.loginName = this.form.personName;

      this.$refs.form.validate(valid => {
        if (valid) {
          AddRecipient(para).then(res => {
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
          UpdateRecipient(para).then(res => {
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