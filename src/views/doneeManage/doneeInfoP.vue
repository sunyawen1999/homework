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
          prop="userName"
          label="用户名"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="personName"
          label="姓名"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="DeliveryAddressInfo"
          label="联系地址"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="age"
          label="年龄"
          width="55"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="phoneNum"
          label="联系电话"
          width="140"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="totalNum"
          label="受捐总数"
          width="140"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="email"
          label="联系邮箱"
          width="140"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="des"
          label="备注"
          width="160"
          align="center"
      >
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
              @click="handleDelete(scope.row.id)"
              class="btn-text-red"
          >删除</el-button>
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
import { GetRecipientList, DeleteRecipient } from "@/api/recipient";

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        searchCondition: ""
      },
      list: [],
      total: 0,
      listLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    goToDetail(operation, id) {
      this.$router.push({
        path: "/doneeInfoP/doneeDetailP",
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