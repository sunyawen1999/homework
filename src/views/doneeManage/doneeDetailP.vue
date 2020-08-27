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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="商家名称"
                prop="businessName"
            >
              <el-input
                  v-model="form.businessName"
                  placeholder="商家名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="法人姓名"
                prop="legalPersonName"
            >
              <el-input
                  v-model="form.legalPersonName"
                  placeholder="法人姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="法人联系电话"
                prop="legalPersonTel"
            >
              <el-input
                  v-model="form.legalPersonTel"
                  placeholder="法人联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">

            <el-form-item
                label="法人身份证号码"
                prop="legalPersonIdCard"
            >
              <el-input
                  v-model="form.legalPersonIdCard"
                  placeholder="法人身份证号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="身份证正面"
                prop="idCardFront"
            >
              <el-upload
                  class="avatar-uploader"
                  action="/api/file"
                  :show-file-list="false"
                  :on-success="frontPhotoSuccess"
                  v-model="photo.front"
              >
                <el-image
                    v-if="photo.front"
                    style="width: 178px; height: 178px"
                    :src="photo.front"
                    fit="fill"
                ></el-image>
                <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="身份证反面"
                prop="idCardBack"
            >
              <el-upload
                  class="avatar-uploader"
                  action="/api/file"
                  :show-file-list="false"
                  :on-success="backPhotoSuccess"
                  v-model="photo.back"
              >
                <el-image
                    v-if="photo.back"
                    style="width: 178px; height: 178px"
                    :src="photo.back"
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
                label="商家联系人"
                prop="contact"
            >
              <el-input
                  v-model="form.contact"
                  placeholder="商家联系人"
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
          <el-form-item
              label="商家地址"
              prop="businessAddress"
          >
            <el-col :span="12">
              <el-form-item prop="businessAddress">
                <el-input
                    v-model="form.businessAddress"
                    placeholder="商家地址"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
              label="经营类别"
              prop="productClassId"
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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                label="经营执照"
                prop="businessLicense"
            >
              <el-upload
                  class="avatar-uploader"
                  action="/api/file"
                  :show-file-list="false"
                  :on-success="businessLicenseSuccess"
                  v-model="photo.license"
              >
                <el-image
                    v-if="photo.license"
                    style="width: 178px; height: 178px"
                    :src="photo.license"
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
import { AddBusiness, EditBusiness, GetBusinessById } from "@/api/business";
import { checkPhone, checkNum } from "@/utils/index";
import { GetProducClassList } from "@/api/class";
import globalVar from "@/utils/globalVar.js";

export default {
  data() {
    return {
      form: {
        businessAddress: "",
        businessLicense: "",
        businessName: "",
        contact: "",
        contactTel: "",
        idCardBack: "",
        idCardFront: "",
        legalPersonIdCard: "",
        legalPersonName: "",
        legalPersonTel: "",
        productClassId: ""
      },
      photo: {
        front: "",
        back: "",
        license: ""
      },
      formRules: {
        businessName: [
          { required: true, message: "请输入商家名称", trigger: "blur" }
        ],
        legalPersonName: [
          { required: true, message: "请输入法人姓名", trigger: "blur" }
        ],
        legalPersonTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        legalPersonIdCard: [
          { required: true, message: "请上传身份证号码", trigger: "blur" },
          { validator: checkNum, trigger: "blur" }
        ],
        idCardFront: [
          { required: true, message: "请上传身份证正面", trigger: "blur" }
        ],
        idCardBack: [
          { required: true, message: "请输入身份证反面", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请输入商家联系人", trigger: "blur" }
        ],
        contactTel: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        businessAddress: [
          { required: true, message: "请商家地址地址", trigger: "blur" }
        ],
        productClassId: [
          { required: true, message: "请选择经营类别", trigger: "blur" }
        ],
        businessLicense: [
          { required: true, message: "请上传经营执照", trigger: "blur" }
        ]
      },
      operation: "",
      productClassList: [],
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
    this.getProducClassList();

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
    getProducClassList() {
      GetProducClassList({ keyName: "" }).then(res => {
        this.productClassList = res.data.datas[0].content;
      });
    },
    getData(id) {
      const that = this;

      GetBusinessById(id).then(res => {
        that.form = { ...res.data.datas[0] };
        that.photo.front = globalVar.imgPath + that.form.idCardFront;
        that.photo.back = globalVar.imgPath + that.form.idCardBack;
        that.photo.license = globalVar.imgPath + that.form.businessLicense;
      });
    },
    frontPhotoSuccess(res, file) {
      this.photo.front = URL.createObjectURL(file.raw);
      this.form.idCardFront = res.msg;
    },
    backPhotoSuccess(res, file) {
      this.photo.back = URL.createObjectURL(file.raw);
      this.form.idCardBack = res.msg;
    },
    businessLicenseSuccess(res, file) {
      this.photo.license = URL.createObjectURL(file.raw);
      this.form.businessLicense = res.msg;
    },
    saveData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          AddBusiness(this.form).then(res => {
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
          EditBusiness(para).then(res => {
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