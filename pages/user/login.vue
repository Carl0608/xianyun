<template>
  <div class="container">
    <el-row type="flex" justify="center" class="main" align="middle">
        <!-- 主要内容 -->
      <div class="form-wrapper">
          <!-- 表头 -->
        <el-row type="flex" justify="center" class="tabs">
          <span v-for="(item,index) in ['登入','注册']"
           :key="index"
           :class="{active:currentTab===index}"
           @click="handelClick(index)">{{item}}</span>
        </el-row>

        <!-- 登入组件 -->
        <LoginFrom v-if="currentTab===0"/>

        <!-- 注册组件 -->
        <RegisterForm v-if="currentTab===1"/>
      </div>
    </el-row>
  </div>
</template>
<script>
import LoginFrom from '@/components/user/loginFrom'
import RegisterForm from '@/components/user/registerForm'
export default {
    data () {
        return {
            currentTab:0
        }
    },
    components: {
      LoginFrom,
      RegisterForm  
    },
    methods: {
        handelClick(index){
            this.currentTab=index
        }
    }
};
</script>
<style lang="less" scoped>
.container {
  background: url(http://127.0.0.1:1337/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

