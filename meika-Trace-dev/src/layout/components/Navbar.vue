<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div
      style="width:70%;height:70px;line-height:70px;float:left;text-align:center;margin-left:10%"
    >
      <span style="font-size:24px;color:white">镁卡车轮精准溯源平台</span>
      &nbsp;
      <!-- <span
        style="color:white"
      >Accurate Traceability Management Platform based on Moac Blockchain</span> -->
    </div>
    <!-- <div style="color:white;background-color:white">墨客精准追溯平台</div> -->
    <!-- <div
      style="width:100%;text-align:center;line-height:40px;font-size:22px;color:rgb(38, 52, 69)"
    >墨客精准追溯平台</div>
    <div
      style="width:100%;text-align:center;color:gray"
    >Accurate Traceability Management Platform based on Moac Blockchain</div>-->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="userName">
            <span style="font-size:20px;color:white">{{ userName }}</span
            >&nbsp;
            <i class="el-icon-setting" style="color:white" />
          </div>

          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" > -->
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/dashboard">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <!-- <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from "@/components/Hamburger";
import Bus from "../../utils/bus.js";

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  data() {
    return {
      userName: ""
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  mounted() {
    var vm = this;
    // 用$on事件来接收参数
    Bus.$on("user_Name", data => {
      // console.log(data)
      vm.userName = data;
    });
  },
  created() {
    this.userName = localStorage.getItem("user_Name");
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  overflow: hidden;
  position: relative;
  background: rgba(235, 84, 5, 1);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // background: url("../../assets/navBG.png");
  &-moacname {
    font-size: 26px;
    margin-left: 1rem;
    display: inline;
  }
  .userName:hover {
    cursor: pointer;
  }
  &-webname {
    line-height: 65px;
    text-align: center;
    display: inline;
    color: gray;
  }
  .hamburger-container {
    line-height: 70px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    // background: white;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
      // color: white;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 15px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
