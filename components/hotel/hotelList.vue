<template>
  <div class="container">
    <div class="hotel-list">
      <div class="hotelItem" v-for="(item,index) in this.defalutDate" :key="index">
        <el-row type="flex" jusitfy="space-between">
          <!-- 图片 -->
          <el-col :span="8">
            <img :src="item.photos" />
          </el-col>

          <!-- 简介 -->
          <el-col :span="10">
            <div class="introduce">
              <h2>
                <nuxt-link :to="`/hotel/${item.id}.html`">{{item.name}}</nuxt-link>
              </h2>
              <div class="introduce-content">
                <span>{{item.alias}}</span>
                <!-- 星级 -->
                <el-rate
                  class="levels"
                  v-if="item.hotellevel?item.hotellevel.level:false "
                  v-model="item.hotellevel.level "
                  disabled
                  :icon-classes="iconClasses"
                  :disabled-void-icon-class="null"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                ></el-rate>
                <span>{{item.hoteltype.name}}</span>
              </div>
              <!-- 评分 -->
              <el-row type="flex">
                <el-col :span="10">
                  <el-rate
                    v-model="item.stars"
                    disabled
                    allow-half
                    show-score
                    text-color="#ff9900"
                    :score-template="`${item.stars}分`"
                  ></el-rate>
                </el-col>
                <el-col :span="7">
                  <el-row type="flex">
                    <span style="color:#f90">{{item.good_remarks}}</span>条评价
                  </el-row>
                </el-col>
                <el-col :span="7">
                  <el-row type="flex">
                    <span style="color:#f90">{{item.common_remarks}}</span>篇游记
                  </el-row>
                </el-col>
              </el-row>

              <div style="margin-top:10px;">
                <i
                  class="iconfont iconlocation"
                  style="font-size:14px; color:#999"
                >位于：{{item.address}}</i>
              </div>
            </div>
          </el-col>

          <!-- 携程 -->
          <el-col :span="6">
            <el-row>
              <el-table
                :data="item.products"
                :show-header="false"
                @cell-click="toNewHotel"
                style="width: 100%"
              >
                <el-table-column prop="name"></el-table-column>
                <el-table-column prop="price">
                  <template v-slot="scope">
                    <el-row type="flex" style="align-items:center;">
                      <span style="color:#f90 ">￥{{scope.row.price}}</span>起
                      <i class="el-icon-arrow-right"></i>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="space-between">
        <div></div>
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defalutDate: [],
      iconClasses: [
        "iconfont iconhuangguan",
        "iconfont iconhuangguan",
        "iconfont iconhuangguan"
      ]
      // level:0
    };
  },
  computed: {},
  methods: {
    toNewHotel() {
      // console.log(row)
      // console.log(column)
      window.open("https://hotels.ctrip.com/hotel/694679.html");
      // this.$router.go('https://hotels.ctrip.com/hotel/694679.html')
      // this.$router.resolve({
      //   url:'/hotels.ctrip.com/hotel/694679.html'
      // })
    }
  },
  mounted() {
    // console.log(this.$refs.stars.clidren.length)
    const id = this.$route.query.city - 0;
    this.$axios({
      url: `/hotels`,
      method: "GET",
      params: {
        city: id
      }
    }).then(res => {
      console.log(res);
      this.defalutDate = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.hotel-list {
  height: 2000px;
  //   flex-direction: row-reverse;
  .hotelItem {
    margin-top: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    img {
      width: 320px;
      height: 210px;
    }
    .introduce {
      padding: 0 10px;

      .introduce-content {
        font-size: 16px;
        color: #999;
        display: inline-block;
        span {
          line-height: 20px;
          height: 20px;
        }
        .levels {
          display: inline-block;
        }
      }
    }
  }
  :after {
    content: "";
    display: block;

    clear: both;
    height: 0;
  }
}
</style>


