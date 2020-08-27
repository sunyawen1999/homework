<template>
  <section>
    <el-tabs
        v-model="listQuery.businessClassIds"
        @tab-click="handleClick"
    >
      <el-tab-pane
          label="全部"
          name="0"
      ></el-tab-pane>
      <el-tab-pane
          v-for="(item, index) in productClassList"
          :key="index"
          :label="item.className"
          :name="item.id.toString()"
      ></el-tab-pane>
    </el-tabs>
    <!--工具条-->
    <el-col
        :span="24"
        class="toolbar"
        style="padding-bottom: 0px;"
    >
      <el-form
          :inline="true"
          :model="listQuery"
      >
        <el-form-item>
          <el-input
              v-model="listQuery.keyName"
              placeholder="请输入关键字"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="getList"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="float">
          <el-button
              type="primary"
              icon="el-icon-plus"
              @click="goToDetail('add')"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table
        :data="list"
        highlight-current-row
        stripe
        v-loading="listLoading"
        style="width: 100%;"
    >
      <el-table-column
          prop="businessName"
          label="商家名称"
          width="120"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="legalPersonName"
          label="法人姓名"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="legalPersonTel"
          label="联系方式"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="legalPersonIdCard"
          label="法人身份证号码"
          width="160"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="contact"
          label="联系人"
          width="140"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="contactTel"
          label="联系人联系电话"
          width="140"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="businessAddress"
          label="商家地址"
          width="140"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="productClassInfo.className"
          label="经营类别"
          width="140"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="businessLicense"
          label="经营执照"
          width="160"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="auditStatus"
          label="审核状态"
          width="160"
          align="center"
      >
        <template slot-scope="scope">{{
            scope.row.auditStatus | formatAuditStatus
          }}</template>
      </el-table-column>
      <el-table-column
          label="操作"
          align="center"
          min-width="240"
      >
        <template slot-scope="scope">
          <el-button
              type="text"
              size="small"
              @click="goToDetail('edit', scope.row.id)"
          >编辑</el-button>
          <el-button
              type="text"
              size="small"
              @click="goToDetail('detail', scope.row.id)"
          >详情</el-button>
          <el-button
              type="text"
              size="small"
              @click="toSee(scope.row.id)"
          >查看产品</el-button>
          <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.id)"
              class="btn-text-red"
          >删除</el-button>
          <el-popconfirm
              confirmButtonText='通过'
              cancelButtonText='不通过'
              icon="el-icon-info"
              iconColor="red"
              title="是否通过审核？"
              @onConfirm="handleApprove(scope.row.id, true)"
              @onCancel="handleApprove(scope.row.id, false)"
          >
            <el-button
                type="text"
                size="small"
                slot="reference"
                class="btn-text-yellow mx-5"
                v-if="scope.row.auditStatus == 'not_revienwed'"
            >审核</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col
        :span="24"
        class="toolbar"
    >
      <el-pagination
          layout="prev, pager, next"
          @current-change="getList"
          :page-size="listQuery.size"
          :current-page.sync="listQuery.page"
          :total="total"
          style="float:right;"
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
import {
  GetBusinessList,
  DeleteBusiness,
  ApproveBusiness,
} from "@/api/business";
import { GetProducClassList } from "@/api/class";

export default {
  data() {
    return {
      user: {},
      listQuery: {
        page: 1,
        size: 10,
        keyName: "",
      },
      productClassList: [],
      list: [],
      total: 0,
      listLoading: false,
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getList();
    this.getProducClassList();
  },
  methods: {
    goToDetail(operation, id) {
      this.$router.push({
        path: "/shopsInfo/shopsDetail",
        query: { operation: operation, id: id },
      });
    },
    toSee(id) {
      this.$router.push({
        path: "/shopsInfo/shopsProducts",
        query: { id: id },
      });
    },
    getProducClassList() {
      GetProducClassList({ keyName: "" }).then((res) => {
        this.productClassList = res.data.datas[0].content;
      });
    },
    //获取列表
    getList() {
      const that = this;

      const para = {
        ...that.listQuery,
        businessClassIds:
            that.listQuery.businessClassIds != "0"
                ? that.listQuery.businessClassIds
                : "",
        page: that.listQuery.page - 1,
      };
      that.listLoading = true;
      GetBusinessList(para)
          .then((res) => {
            that.total = res.data.datas[0].totalElements;
            that.list = res.data.datas[0].content;
            that.listLoading = false;
          })
          .catch((err) => {
            that.listLoading = false;
            that.$message({
              message: "获取数据失败",
              type: "error",
            });
          });
    },
    handleApprove(id, bool = false) {
      const para = {
        authorId: this.user.id,
        isSuccess: bool,
      };
      ApproveBusiness(id, para).then((res) => {
        if (res.data.code === "000") {
          this.$message({
            message: "审核成功",
            type: "success",
          });
          this.getList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    handleDelete(id) {
      DeleteBusiness(id).then((res) => {
        if (res.data.code === "000") {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.formVisible = false;
          this.getList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    handleClick(res) {
      this.listQuery.businessClassIds = res.name;
      this.getList();
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 0;
}
</style>