<template>
  <el-container class="container">
    <el-aside width="200px">
      <div class="top-title">
        <span>{{ sysName_t }}</span>
      </div>
      <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          unique-opened
          router
      >
        <template
            v-for="(item, index) in $router.options.routes"
            v-if="!item.hidden && showItem(item.meta)"
        >
          <el-submenu
              :index="index + ''"
              v-bind:key="index"
              v-if="!item.leaf"
          >
            <template slot="title">
              <i :class="item.iconCls"></i>
              {{ item.name }}
            </template>
            <el-menu-item
                v-for="child in item.children"
                :index="child.path"
                :key="child.path"
                v-if="!child.hidden && showItem(child.meta)"
            >{{ child.name }}</el-menu-item>
          </el-submenu>
          <el-menu-item
              v-if="item.leaf && item.children.length > 0 && showItem(item.meta)"
              :index="item.children[0].path"
              v-bind:key="index"
          >
            <i :class="item.iconCls"></i>
            {{ item.children[0].name }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header height="140px">
        <el-row>
          <el-col
              :span="3"
              class="userinfo"
          >
            <img v-bind:src="sysUserAvatar" />
          </el-col>
          <el-col
              :span="6"
              class="userinfo"
          >{{ sysUserName }} {{ othUserName }}</el-col>
          <el-col
              :span="15"
              style="text-align:right"
              class="userinfo"
          >
            <!-- <el-button
              type="text"
              icon="el-icon-user"
              @click="userPage"
              v-show="userType !== 'super'"
            >个人主页</el-button>-->
            <!-- <el-button type="text" icon="el-icon-bell">消息中心</el-button> -->
            <el-button
                type="text"
                icon="el-icon-switch-button"
                divided
                @click.native="logout"
            >退出系统</el-button>
          </el-col>
          <el-col
              :span="24"
              class="breadcrumb-container"
          >
            <el-breadcrumb
                separator="/"
                class="breadcrumb-inner"
            >
              <el-breadcrumb-item
                  v-for="item in $route.matched"
                  :key="item.path"
              >{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col
                :span="24"
                class="content-wrapper"
            >
              <transition
                  name="fade"
                  mode="out-in"
              >
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      sysName_t: "捐赠信息管理系统",
      sysUserName: "",
      othUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      userType: "",
      userTypeRoute: "superAdmin",
      urlName: "",
      isschool: ""
    };
  },
  methods: {
    showItem(meta) {
      let show = false;
      let type = this.userTypeRoute;
      if (meta && meta.role && meta.role.length > 0) {
        if (meta.role.indexOf(type) > -1) {
          show = true;
          if (
              meta.roleName &&
              (this.isschool == "false" || this.isschool == false)
          ) {
            show = false;
          }
        }
      } else {
        show = true;
      }
      return show;
    },
    onSubmit() {
      // console.log("submit!");
    },
    handleopen() {
      // console.log("handleopen");
    },
    handleclose() {
      // console.log("handleclose");
    },
    handleselect() {
      // console.log("handleselect");
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
          .then(() => {
            sessionStorage.removeItem("user");
            _this.$router.push("/login");
          })
          .catch(() => {});
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
          "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    userPage() {
      this.$router.push({ path: "/userPage" });
    },
    resetPasswordPage() {
      this.$router.push({ path: "/resetPassword" });
    },
    getLocation() {
      this.urlName = this.$route.query.urlValue;
    }
  },
  mounted() {
    this.getLocation();
    let user = sessionStorage.getItem("user");
    let userTypeRoute;
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.realName || "";
      // this.sysUserAvatar = user.avatar || "";
      this.urlName ? (this.othUserName = "-" + this.urlName) : "";
    }
  }
};
</script>

<style lang="scss">
@import "../styles/vars.scss";

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  color: #fff;
  background-color: $light-primary !important;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
.el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
.el-menu-item:hover {
  background-color: $light-primary;
}
.el-menu-item,
.el-submenu__title {
  color: #fff;
  i {
    color: #fff;
  }
}
.el-submenu .el-menu-item {
  background-color: $color-primary;
}
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
  background-color: $light-primary;
}
.el-breadcrumb {
  font-size: 16px;
  line-height: 40px;
}
.el-breadcrumb__separator,
.el-breadcrumb__item .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-button--text {
  color: $color-primary;
  font-weight: 400;
}
// .el-table th {
//   background-color: $bg-primary;
// }
.el-button--primary,
.el-button--primary:focus,
.el-button--primary:hover {
  background: $color-primary;
  border-color: $color-primary;
}

.el-row {
  margin-bottom: 24px;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: $color-primary;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload__tip {
  font-size: 12px;
  color: #606266;
  margin: 7px 0 17px;
}
.el-card__header {
  color: $color-primary;
  font-size: 18px;
  border-bottom: 2px solid #fca53b;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.btn-text-red {
  color: #f56c6c;
}
.btn-text-red:focus,
.btn-text-red:hover {
  color: #f78989;
}
.btn-text-green {
  color: #67c23a;
}
.btn-text-green:focus,
.btn-text-green:hover {
  color: #85ce61;
}
.btn-text-yellow {
  color: #e6a23c;
}
.btn-text-yellow:focus,
.btn-text-yellow:hover {
  color: #ebb563;
}
</style>


<style scoped lang="scss">
@import "../styles/vars.scss";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  aside {
    flex: 0 0 230px;
    // width: 230px;
    // position: absolute;
    // top: 60px;
    // bottom: 0px;
    background-color: $color-primary;
    .top-title {
      box-sizing: border-box;
      border-right: solid 1px #e6e6e6;
      font-size: 22px;
      color: #fff;
      padding: 30px 0;
      text-align: center;
    }
    .el-menu {
      height: 100%;
      background-color: $color-primary;
    }
  }
  .userinfo {
    height: 100px;
    line-height: 100px;
    color: $color-primary;
    background: #fff;
    padding-right: 35px;
    img {
      height: 80px;
      border-radius: 20px;
    }
  }
  .breadcrumb-container {
    position: fixed;
    top: 100px;
    left: 230px;
    padding: 0 50px;
    height: 40px;
    background: #f8f8f8;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .title {
      width: 200px;
      color: #475669;
    }
  }
  .logo {
    //width:230px;
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
    img {
      width: 40px;
      float: left;
      margin: 10px 10px 10px 18px;
    }
    .txt {
      color: #fff;
    }
  }
  .logo-width {
    width: 230px;
  }
  .logo-collapse-width {
    width: 60px;
  }
  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>