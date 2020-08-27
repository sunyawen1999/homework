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
        <el-row
            :gutter="20"
            v-if="operation !== 'add'"
        >
          <el-col :span="8">
            <el-form-item
                label="产品状态"
                prop="officeAddressProvince"
            >
              <el-select
                  v-model="form.officeAddressProvince"
                  placeholder="产品状态"
                  disabled
              >
                <el-option
                    v-for="item in productClassList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="产品销量"
                prop="pioNum"
            >
              <el-input
                  v-model="form.pioNum"
                  placeholder="产品销量"
                  disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="产品编号"
                prop="productId"
            >
              <el-input
                  v-model="form.productId"
                  :disabled="operation !== 'add'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="产品名称"
                prop="productName"
            >
              <el-input
                  v-model="form.productName"
                  placeholder="产品名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="单价"
                prop="productPrice"
            >
              <el-input
                  v-model="form.productPrice"
                  placeholder="单价"
              >
                <template slot="append">元</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item
                label="产品介绍"
                prop="productDes"
            >
              <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="form.productDes"
                  maxlength="100"
                  show-word-limit
                  :autosize="{ minRows: 3}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="产品缩略图"
                prop="productPic"
            >
              <el-upload
                  class="avatar-uploader"
                  action="/api/file"
                  :show-file-list="false"
                  :on-success="productPicSuccess"
                  v-model="photo"
              >
                <el-image
                    v-if="photo"
                    style="width: 178px; height: 178px"
                    :src="photo"
                    fit="fill"
                ></el-image>
                <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="所属商家"
                prop="businessId"
            >
              <el-select
                  v-model="form.businessId"
                  placeholder="所属商家"
              >
                <el-option
                    v-for="item in businessList"
                    :key="item.id"
                    :label="item.businessName"
                    :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="生产厂家"
                prop="producerName"
            >
              <el-input
                  v-model="form.producerName"
                  placeholder="生产厂家"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="品牌"
                prop="productBrand"
            >
              <el-input
                  v-model="form.productBrand"
                  placeholder="品牌"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
              label="产品类别"
              prop="status"
          >
            <el-radio-group v-model="form.productClassId">
              <el-radio
                  v-for="item in productClassList"
                  :key="item.id"
                  :label="item.id"
              >
                {{ item.className }}
              </el-radio>
            </el-radio-group>
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
import { AddProduct, EditProduct, GetProductById } from "@/api/product";
import { checkPhone, checkNum } from "@/utils/index";
import { GetProducClassList } from "@/api/class";
import { GetBusinessList } from "@/api/business";
import globalVar from "@/utils/globalVar.js";

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
        productClassId: [{ required: true, message: "请选择捐赠物品类别", trigger: "blur" }
        ],
        donorStatus: [{ required: true, message: "是否为捐助者", trigger: "blur" }],
        doneeStatus: [{ required: true, message: "是否为受捐者", trigger: "blur" }]},
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
        confirm_fail: "未通过"},
      operation: "",
      productClassList: [],
    };
  },
  mounted() {
    this.operation = this.$route.query.operation;
    this.id = this.$route.query.id;
    this.getProducClassList();
    this.getBusinessList();

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
        path: "/doneeInfoC"
      });
    },
    getProducClassList() {
      GetProducClassList({ keyName: "" }).then(res => {
        this.productClassList = res.data.datas[0].content;
      });
    },
    getBusinessList() {
      GetBusinessList().then(res => {
        this.businessList = res.data.datas[0].content;
      });
    },
    getData(id) {
      const that = this;

      GetProductById(id).then(res => {
        that.form = { ...res.data.datas[0] };
        that.photo = globalVar.imgPath + that.form.productPic;
      });
    },
    productPicSuccess(res, file) {
      this.photo = URL.createObjectURL(file.raw);
      this.form.productPic = res.msg;
    },
    saveData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          AddProduct(this.form).then(res => {
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
          EditProduct(para).then(res => {
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