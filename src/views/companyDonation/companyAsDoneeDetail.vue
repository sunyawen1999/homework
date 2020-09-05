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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="捐赠者Id">
              <el-input
                  v-model="form.donorId"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="捐赠公司">
              <el-input
                  v-model="form.companyName"
                  placeholder="捐赠公司名字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="受捐者Id">
              <el-input
                  v-model="form.recipientId"
                  placeholder="受捐者Id"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="受捐者">
              <el-input
                  v-model="form.recipientName"
                  placeholder="受捐者"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="物流公司">
              <el-input
                  v-model="form.logisticsCom"
                  placeholder="物流公司"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物流单号">
              <el-input
                  v-model="form.logisticsNum"
                  placeholder="服务类别"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物品名称">
              <el-input
                  v-model="form.itemName"
                  placeholder="物品名称"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="物品数量">
              <el-input
                  v-model="form.itemNum"
                  placeholder="物品数量"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-row>
            <el-col :span="8">
              <el-form-item label="物流状态" prop="deliveryStatus">
                <el-radio-group v-model="form.deliveryStatus">
                  <el-radio
                      v-for="item in deliveryStatusList"
                      :key="item.value"
                      :label="item.value"
                  >
                    {{ item.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
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
import {checkNum, checkPhone} from "@/utils";
import {AddDonationRecord, GetDonationRecordList, UpdateDonationRecord} from "@/api/donationrecord";

export default {
  data() {
    return {
      form: {
        donorId:"",
        companyName: "",
        recipientId:"",
        recipientName:"",
        deliveryAddressInfo: "",
        deliveryStatus:"",
        logisticsCom: "",
        logisticsNum: "",
        itemName: "",
        itemNum:""
      },
      formatRole: "",
      formRules: {
        companyName: [
          { required: true, message: "请输入捐赠公司的名称", trigger: "blur" }
        ],
        recipientName: [
          { required: true, message: "请输入受捐者名称", trigger: "blur" }
        ],
        deliveryAddressInfo:[
          { required: true, message: "请输入收件地址", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请输入捐赠物品名称", trigger: "blur" },
        ],
        itemNum: [
          { required: true, message: "请输入捐赠物品数量", trigger: "blur" },
        ],
        logisticsCom: [
          { required: true, message: "请输入物流公司", trigger: "blur" },
        ],
        logisticsNum: [
          { required: true, message: "请输入物流单号", trigger: "blur" },
        ],
        deliveryStatus: [
          { required: true, message: "请选择物流状态", trigger: "blur" }
        ],},
      operation:"",
      deliveryStatusList: [
        {
          label: "取消",
          value: "cancel"
        },
        {
          label: "已收到",
          value: "received"
        },
        {
          label: "已发出",
          value: "delivered"
        },
        {
          label: "未发出",
          value: "un_delivered"
        }
      ]
    };
  },
  mounted() {
    this.operation = this.$route.query.operation;
    this.id = this.$route.query.id;

    this.getData(this.id);
  },
  methods: {
    backTo() {
      this.$router.push({
        path: "/companyAsDonee",
      });
    },
    getData(id) {
      const that = this;

      GetDonationRecordList(id).then((res) => {
        that.form = res.data.datas[0];
      });
    },
    editData() {
    const para = {
      ...this.form
    };
    this.$refs.form.validate(valid => {
      if (valid) {
        UpdateDonationRecord(para).then(res => {
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
        AddDonationRecord(para).then(res => {
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