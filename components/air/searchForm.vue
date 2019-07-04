<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handelClick(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="querySearchDepart"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="querySearchDest"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handelDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="submitForm">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    handleReverse() {
      const { departCity, destCity, departCode, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    handelClick(index) {
      if (index == 1) {
        this.$confirm("业务暂时不提供往返", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    querySearchDepart(value, callBack) {
      if (!value) return;
      this.$axios({
        url: "/airs/city?name=" + value,
        method: "GET"
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.form.departCode =data[0].sort;
        // console.log(data)

        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        // console.log(this.departCode=newData[0].sort)
        callBack(newData);
        // console.log(newData)
      });
    },

    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    querySearchDest(value, callBack) {
      if (!value) return;
      this.$axios({
        url: "/airs/city?name=" + value,
        method: "GET"
      }).then(res => {
        const { data } = res.data;
        this.form.destCode =data[0].sort;
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        this.destCode=newData[0].sort
        callBack(newData);
      });
    },

    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    handelDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
      // console.log(this.form.departDate)
    },

    submitForm() {
      //表单验证
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请输入出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请输入到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请输入出发日期"
        }
      };

      //添加开关
      let valid = true;

      Object.keys(rules).forEach(v => {
        //只要又一个结果不正确就停止循环
        if (!valid) return;

        //如果字段为空
        if (!rules[v].value) {
          valid = false;

          this.$message.warning(rules[v].message);
          valid = false;
        }

        //不通过验证 不能往下执行
        if (!valid) return;

        if(this.form.departCode===''){
          
        }
        //保存数据到本地
        const airs = JSON.parse(localStorage.getItem('airs') || `[]`)
        airs.push(this.form)
        localStorage.setItem('airs',JSON.stringify(airs))


        this.$router.push({
          path: "/air/flights",
          query: this.form
        });

        
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>


