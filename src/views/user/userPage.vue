<template>
  <section>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="14">
          <div
              v-for="o in userInfo"
              :key="o.index"
              v-if="o.content"
              class="text-item"
          >{{ o.title }}{{ o.content }}</div>
        </el-col>
        <el-col :span="10">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>

<script>
import { GetUser } from "@/api/users";
export default {
  data() {
    return {
      imageUrl: "",
      userInfo: [
        {
          index: 1,
          title: "账号类型 ： ",
          content: ""
        },
        {
          index: 2,
          title: "企业名称 ： ",
          content: ""
        },
        {
          index: 3,
          title: "个人id： ",
          content: ""
        },
        {
          index: 4,
          title: "工号 ：",
          content: ""
        },
        {
          index: 5,
          title: "姓名 ： ",
          content: ""
        },
        {
          index: 6,
          title: "负责人 ： ",
          content: ""
        },
        {
          index: 7,
          title: "电话(账号) ： ",
          content: ""
        }
      ]
    };
  },
  methods: {
    formatAccountType(roleType) {
      return roleType === "superAdmin"
          ? "超级管理员"
          : roleType === "customer"
              ? "普通用户"
                  : roleType;
    },
    getUserMe() {
      const that = this;
      GetUser(id).then(res => {
        const result = res.data.datas[0];
        console.log(datas[0]);
      });
    },
  },
  mounted() {
    this.getUserMe();
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  padding: 50px;

  .text-item {
    line-height: 50px;
    font-size: 18px;
  }
}
</style>
