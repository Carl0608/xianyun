<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUse(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurances(item)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :value="allPrice" >
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [{ username: "", id: "" }],
      insurances: [], //保险id
      contactName: "", //联系人名字
      contactPhone: "", //联系人电话
      invoice: false, //是否需要发票
      captcha: "", //手机验证码
      //机票信息总数据
      infoData: {
          seat_infos:{},
      },

    };
  },
  mounted() {
      this.getInfoData()
    //   console.log(this.infoData)
    // // this.$route.query = this.infoData;

    // this.$axios({
    //   url: `/airs/${this.$route.query.id}`,
    //   params: {
    //     seat_xid: this.$route.query.seat_xid
    //   }
    // }).then(res => {
    //   // console.log(res)
    //   this.infoData = res.data;
    //   // console.log(this.infoData)
    //   // const {insurances} =res.data
    //   // console.log(insurances)
    // });
  },
  computed: {
     allPrice(){
        let price=0

         price += this.infoData.seat_infos.org_settle_price

         price +=  this.infoData.airport_tax_audlet

         price += 30 * this.insurances.length

         price *= this.users.length
         
        this.$emit('setPrice',price)
        return price
    }  
  },
  methods: {
    getInfoData() {
      this.$axios({
        url: `/airs/${this.$route.query.id}`,
        params: {
          seat_xid: this.$route.query.seat_xid
        }
      }).then(res => {
        // console.log(res)
        this.infoData = res.data;
        console.log(this.infoData)
        this.$emit('setInfoData',this.infoData)
        // localStorage.setItem('infoData',JSON.stringify(this.infoData))
        // console.log(this.infoData)
        // const {insurances} =res.data
        // console.log(insurances)
      });
      
    },
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },
    // 移除乘机人
    handleDeleteUse(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha(value) {
      if (!this.contactPhone) {
        this.$confirm("手机号码不能为空", "提示", {
          comfirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.contactPhone.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          comfirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$store
        .dispatch("user/PhoneVerification", { tel: this.contactPhone })
        .then(res => {
          // console.log(res)
          const { code } = res.data;
          this.$confirm(`模拟手机验证码为${code}`, "提示", {
            comfirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        });
      //   this.$axios({
      //     url: "captchas",
      //     method: "POST",
      //     data: {
      //       tel: this.contactPhone
      //     }
      //   }).then(result => {
      //     //   console.log(result)

      //     const { code } = result.data;
      //     this.$confirm(`模拟手机验证码为${code}`, "提示", {
      //       comfirmButtonText: "确定",
      //       showCancelButton: false,
      //       type: "warning"
      //     });
      //   });
    },
    handleInsurances(item) {
      const index = this.insurances.indexOf(item.id);
      if (index === -1) {
        this.insurances.push(item.id);
      } else {
        this.insurances.splice(index, 1);
      }
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      this.$axios({
        url: "/airorders",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        this.$message.success('订单提交成功，请稍后...')
        const {data:{id}} = res.data
        this.$router.push({
            path:"/air/pay",
            query:{id}
        })
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>