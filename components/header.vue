<template>
  <div class="herder">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="login">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
        </nuxt-link>
      </div>

      <!-- 导航栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登入 -->
      <el-row type="flex" align="middle">
        <!--  如果用户存在-->
        <el-dropdown v-if="this.$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img
                :src="$axios.defaults.baseURL+this.$store.state.user.userInfo.user.defaultAvatar"
                alt
              >
              {{this.$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-row>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>
              <div @click="clear">退出</div>
              </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 如果用户不存在 -->
        <nuxt-link to="/user/login" v-else>登入/注册</nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    clear(){
      this.$store.commit('user/clearUserInfo')
    }
  }
};
</script>
<style lang="less" scoped>
.herder {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
  .main {
    width: 1000px;
    margin: 0 auto;
    .login {
      width: 156px;
      padding-top: 8px;
      img {
        display: block;
        width: 100%;
      }
    }
    .navs {
      flex: 1;
      margin: 0 20px;
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        &:hover,
        &:focus,
        &:active {
          border-bottom: 1px #0094ff solid;
          color: #0094ff;
        }
      }
      .nuxt-link-exact-active {
        background: #0094ff;
        color: #fff !important;
      }
    }
    .el-dropdown-link {
      margin-left: 20px;

      &:hover {
        img {
          border-color: #409eff;
        }
      }

      a {
        display: block;
      }

      img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        border: 2px #fff solid;
        border-radius: 50px;
      }
    }

    .account-link {
      font-size: 14px;
      margin-left: 10px;
      color: #666;

      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
}
</style>


