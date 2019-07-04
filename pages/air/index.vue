<template>
  <div class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国际大灰机</i>
    </h2>

    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
      <div>
        <SearchForm />
      </div>

      <!-- banner广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>

    <!-- 广告    -->
    <el-row type="flex" class="statement">
      <el-col :span="8" class>
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <h2 class="air-sale-title">
      <i class="iconfont icontejiajipiao"></i>
      <span>特价机票</span>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(item, index) in sales" :key="index">
          <nuxt-link
            :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{item.departCity}}-{{item.destCity}}</span>
              <span>￥{{item.price}}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import SearchForm from "@/components/air/searchForm";
export default {
  data() {
    return {
      sales: []
    };
  },
  mounted () {
    this.$axios({
      url:"/airs/sale",
      method:"GET",
    }).then(res=>{
      // console.log(res)
      this.sales=res.data.data
    })
  },
  components: {
    SearchForm
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title {
    margin: 20px 0;
    font-size: 20px;
    color: sandybrown;
  }
  .statement {
    margin: 25px 0;
    padding: 10px 0;
    background: #f5f5f5;
    height: 58px;
    > div {
      text-align: center;
      line-height: 38px;
      border-right: 1px #ddd solid;
      &:last-child {
        border-right: none;
      }
      * {
        vertical-align: middle;
      }
      i {
        font-size: 30px;
      }
    }
  }

  .air-sale-title {
    margin: 15px 0;
    font-size: 20px;
    color: #409eff;

    span {
      font-size: 20px;
    }
  }

  .air-sale {
    border: 1px #ddd solid;
    padding: 20px;
    margin-bottom: 50px;
    box-sizing: border-box;
    display: flex;
    .air-sale-pic{
      box-sizing: border-box;
      display: flex;

    }
  }
}
</style>


