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
        <el-form-item>
          <el-date-picker
              v-model="listQuery.dealTime"
              placeholder="交易日期"
              value-format="yyyy-MM-dd"
              @change="getList"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
              v-model="listQuery.deliveryTime"
              placeholder="发货日期"
              value-format="yyyy-MM-dd"
              @change="getList"
          >
          </el-date-picker>
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
          prop="donorId"
          label="捐赠者Id"
          width="100"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="donorInfoC.companyName"
          label="捐赠公司"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="recipientId"
          label="受捐者id"
          width="100"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="recipientName"
          label="受捐者"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="logisticsCom"
          label="物流公司"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="logisticsNum"
          label="物流单号"
          width="160"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="deliveryStatus"
          label="物流状态"
          width="160"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="donateItemInfos.itemName"
          label="物品名称"
          width="160"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="donateItemInfos.itemNum"
          label="物品数量"
          width="55"
          align="center"
      ></el-table-column>

      <el-table-column
          label="操作"
          align="center"
          min-width="140"
      >
        <template slot-scope="scope">
          <el-button
              type="text"
              size="small"
              @click="goToDetail('detail', scope.row.id)"
          >详情</el-button>
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
import { GetDonationRecordList} from "@/api/donationrecord";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        searchCondition: "",
      },
      deliveryTime :"",
      dealTime:"",
      startTime: "",
      endTime: "",
      list: [],
      total: 0,
      listLoading: false
    };
  },
  filters: {
    formatTime(val) {
      return val ? parseTime(val) : "";
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取列表
    getList() {
      const that = this;

      const para = {
        ...that.listQuery,
        page: that.listQuery.page - 1
      };
      that.listLoading = true;
      GetDonationRecordList(para).then(res => {
        that.total = res.data.datas[0].totalElements;
        that.list = res.data.datas[0].content;
        that.listLoading = false;
      });
    },
    goToDetail(operation, id) {
      this.$router.push({
        path: "/companyAsDonor/companyAsDonorDetail",
        query: { operation: operation, id: id }
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