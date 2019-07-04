<template>
  <el-form ref="form" :rules="rules" :model="form" class="form">
    <!-- 手机号 -->
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <!-- 名字 -->
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item class="form-item" prop="checkPassword">
      <el-input type="password" placeholder="确认密码" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <!-- 注册 -->
    <el-button type="primary" class="submit" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    //确认密码
    const validatePass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkPassword: "",
        nickname: "",
        captcha: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted () {
      
  },
  methods: {
    handleSendCaptcha() {
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          comfirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          comfirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$store.dispatch('user/PhoneVerification',{tel:this.form.username}).then(res=>{
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为${code}`, "提示", {
          comfirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      })
      // this.$axios({
      //   url: "captchas",
      //   method: "POST",
      //   data: {
      //     tel: this.form.username
      //   }
      // }).then(result => {
      //   const { code } = result.data;
      //   this.$confirm(`模拟手机验证码为${code}`, "提示", {
      //     comfirmButtonText: "确定",
      //     showCancelButton: false,
      //     type: "warning"
      //   });
      // });
    },
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //   console.log(this.form)
          const { checkPassword, ...propos } = this.form;
          //   this.$axios({
          //       url:'accounts/register',
          //       method:"POST",
          //       data:prpos
          //   }).then(result=>{
            
          //      this.$store.commit('user/setUserInfo',result.data)
          //     //  this.$router.replace('/')
          //      this.$router.push({path:'/'})
          //   })
          this.$store.dispatch("user/register", propos).then(result => {
            this.$message.success("注册成功");
          });
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.submit {
  width: 100%;
}
</style>


