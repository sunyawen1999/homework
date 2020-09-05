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
            <el-form-item label="受捐单位">
              <el-input
                  v-model="form.companyName"
                  placeholder="受捐单位名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="捐赠者">
              <el-input
                  v-model="form.donorName"
                  placeholder="捐赠者"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="物品名称">
              <el-input
                  v-model="form.itemName"
                  placeholder="物品名称"
              ></el-input>
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
              <el-form-item label="物品类型" prop="itemType">
                <el-radio-group v-model="form.itemTypeList">
                  <el-radio
                      v-for="item in itemTypeList"
                      :key="item.value"
                      :label="item.value"
                  >
                    {{ item.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="8">
            <el-form-item label="捐赠记录">
              <el-input
                  v-model="form.recordId"
                  placeholder="捐赠记录"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
      </el-form>
    </el-card>
  </section>
</template>

<script>
import {checkNum, checkPhone} from "@/utils";
import {GetDonationRecordList,UpdateDonationRecord} from "@/api/donationrecord";
import {AddDonor, UpdateDonor} from "@/api/donor";

export default {
  data() {
    return {
      form: {
        itemName: "",
        itemNum:"",
        itemType: "",
        donorName:"",
        companyName:"",
        recordId:"",
      },
      formatRole: "",
      formRules: {
        companyName: [
          { required: true, message: "请输入受捐单位的名称", trigger: "blur" }
        ],
        donorName: [
          { required: true, message: "请输入捐赠者名称", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请输入捐赠物品名称", trigger: "blur" },
        ],
        itemNum: [
          { required: true, message: "请输入捐赠物品数量", trigger: "blur" },
            ],
        recordId: [
          { required: true, message: "请输入捐助记录id", trigger: "blur" },
        ],
        itemType: [
          { required: true, message: "请选择物品类型", trigger: "blur" }
        ],},
        operation:"",
      itemTypeList: [
        {
          label: "食品",
          value: "food"
        },
        {
          label: "药品",
          value: "medical_supplies"
        },
        {
          label: "日用品",
          value: "daily_necessities"
        },
        {
          label: "衣物",
          value: "clothing"
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
        path: "/ItemDonation",
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