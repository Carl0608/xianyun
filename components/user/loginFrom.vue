<template>
  <!-- 登入表单 -->
  <el-form ref="form" :model="form" :rules="rules" class="form" >
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名/手机号"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input type='password' v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <!-- 忘记密码 -->
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <!-- 提交按钮 -->
    <el-button type="primary" class="submit" @click="handelSubmit(form)">登入</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules:{
          userName:[
              {required:true,message:'请输入用户名',trigger:'blur'},
              { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ]
      }
    };
  },
  mounted () {
    
  },
  methods: {
      handelSubmit(){
          // console.log(form)
          this.$refs['form'].validate((valid)=>{
            if(valid){
              // this.$axios({
              //   url:'/accounts/login',
              //   method:'post',
              //   data:this.form
              // }).then(result=>{
              //   this.$message.success('登入成功')
              //   // console.log(this.$store.state.user)
              //   this.$store.commit('user/setUserInfo',result.data)
              //   this.$router.replace('/')
              //   })
              this.$store.dispatch('user/login',this.form).then(result=>{
                // console.log(555555555)
                // console.log(result)
                this.$message.success('登入成功')
              })
              setTimeout(()=>{
                this.$router.replace('/')
              },1000)
            }
          })
      }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
  .form-item {
    margin-bottom: 20px;
  }
  .form-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
  }
  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>

