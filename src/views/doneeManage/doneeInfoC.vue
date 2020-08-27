<template>
  <section>
    <el-tabs
        v-model="listQuery.productClassIds"
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
          prop="remark"
          label="备注"
          width="160"
          align="center"
      >

        <template slot-scope="scope">
          {{ scope.row.productStatus | formatProductStatus }}
        </template>
      </el-table-column>


      <el-table-column
          label="操作"
          align="center"
          min-width="200"
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
          >查看商家</el-button>
          <el-button
              type="text"
              size="small"
              @click="handelRelease(scope.row.id)"
              class="btn-text-green"
          >发布</el-button>
          <el-button
              type="text"
              size="small"
              @click="handleCancel(scope.row.id)"
              class="btn-text-red"
          >下架</el-button>
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
import {
  GetProductList,
  DeleteProduct,
  CancelProduct,
  ReleaseProduct
} from "@/api/product";
import { GetProducClassList } from "@/api/class";
import globalVar from "@/utils/globalVar.js";

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        keyName: "",
        productClassIds: "0"
      },
      list: [],
      total: 0,
      listLoading: false,
      productClassList: []
    };
  },
  mounted() {
    this.getList();
    this.getProducClassList();
  },
  methods: {
    goToDetail(operation, id) {
      this.$router.push({
        path: "/productInfo/productDetail",
        query: { operation: operation, id: id }
      });
    },
    getProducClassList() {
      GetProducClassList({ keyName: "" }).then(res => {
        this.productClassList = res.data.datas[0].content;
      });
    },
    //获取列表
    getList() {
      const that = this;

      const para = {
        ...that.listQuery,
        productClassIds:
            that.listQuery.productClassIds !== "0"
                ? that.listQuery.productClassIds
                : "",
        page: that.listQuery.page - 1
      };
      that.listLoading = true;
      GetProductList(para).then(res => {
        that.total = res.data.datas[0].totalElements;
        that.list = res.data.datas[0].content;
        that.list.map(item => {
          item.productPic = globalVar.imgPath + item.productPic;
        });
        that.listLoading = false;
      });
    },
    handleCancel(id) {
      CancelProduct({ id }).then(res => {
        if (res.data.code === "000") {
          this.$message({
            message: "下架成功",
            type: "success"
          });
          this.formVisible = false;
          this.getList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    handelRelease(id) {
      ReleaseProduct({ id }).then(res => {
        if (res.data.code === "000") {
          this.$message({
            message: "发布成功",
            type: "success"
          });
          this.formVisible = false;
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
      DeleteProduct(id).then(res => {
        if (res.data.code === "000") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.formVisible = false;
          this.getList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    handleClick(res) {
      this.listQuery.productClassIds = res.name;
      this.getList();
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 0;
}
</style>