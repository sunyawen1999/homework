<template>
  <section>
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
              v-model="listQuery.searchCondition"
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
          prop="accountId"
          label="账号"
          width="55"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="companyName"
          label="单位名称"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="deliveryAddressInfo"
          label="地址信息"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="LegalPersonName"
          label="单位法人"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="LegalPersonTel"
          label="法人联系电话"
          width="160"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="contact"
          label="单位联系人"
          width="160"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="contactTel"
          label="联系人电话"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="totalNum"
          label="受捐总数"
          width="140"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="remark"
          label="备注"
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
          min-width="180"
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
              @click="handleDelete(scope.row.id)"
              class="btn-text-red"
          >删除</el-button>
          <el-popconfirm
              confirmButtonText='通过'
              cancelButtonText='不通过'
              icon="el-icon-info"
              iconColor="red"
              title="是否通过审核？"
              @onConfirm="handleApprove(scope.row.id, 'confirm_success')"
              @onCancel="handleApprove(scope.row.id, 'confirm_fail')"
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
import { GetRecipientList, AddRecipient, DeleteRecipient } from "@/api/recipient";

export default {
  data() {
    return {
      user: {},
      listQuery: {
        page: 1,
        size: 10,
        searchCondition: ""
      },
      statusList: [
        {
          value: "1",
          label: "标签1"
        },
        {
          value: "2",
          label: "标签2"
        }
      ],
      list: [],
      total: 0,
      listLoading: false
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getList();
  },
  methods: {
    goToDetail(operation, id) {
      this.$router.push({
        path: "/doneeInfoC/doneeDetailC",
        query: { operation: operation, id: id }
      });
    },

    //获取列表
    getList() {
      const that = this;

      const para = {
        ...that.listQuery,
        page: that.listQuery.page - 1
      };
      that.listLoading = true;
      GetRecipientList(para).then(res => {
        that.total = res.data.datas[0].totalElements;
        that.list = res.data.datas[0].content;
        that.listLoading = false;
      });
    },
    handleApprove(id, bool = "confirm_fail") {
      const para = {
        approverId: this.user.id,
        auditStatus: bool
      };
      AddRecipient(id, para).then(res => {
        if (res.data.code === "000") {
          this.$message({
            message: "审核成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    handleDelete(id) {
      DeleteRecipient(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getList();
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 0;
}
</style>