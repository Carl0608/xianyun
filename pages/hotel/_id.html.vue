<template>
  <div class="contianer">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelData.big_cate}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotelData.real_city}}酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelData.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="name-info">
      <el-row align="middle">
        <h4>
          {{hotelData.name}}
          <span class="crown">
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
          </span>
        </h4>
      </el-row>
      <el-row>
        <p class="alias">{{hotelData.alias}}</p>
      </el-row>
      <el-row>
        <i class="iconfont iconlocation location"></i>
        <span class="address">{{hotelData.address}}</span>
      </el-row>
    </div>

    <div class="photo-info">
      <el-row>
        <el-col :span="15">
          <img class="bigPic" :src="imgList[this.imgIndex]" alt />
        </el-col>
        <el-col :span="9" justify="space-between">
          <el-col v-for="(item,index) in imgList" :key="index" :span="12">
            <a href="javascript:;" @click="handleChange(index)">
              <img class="smallPic" :src="item" alt />
            </a>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="price-source">
      <el-table :data="hotelData.products" style="width: 100%" @row-click="handleJump">
        <el-table-column prop="name" label="价格来源" align="center" min-width="80"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" min-width="150" align="center"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚" align="center">
          <template v-slot="scoped">
            <span class="orangeColor orange-price">￥{{scoped.row.price}}</span>
            <span>起</span>
            <span class="orangeColor el-icon-arrow-right"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="map">
      <MapHotelDetail :pois="pois" :pois2="pois2" :hotelData="hotelData" />
    </div>

    <div class="info">
      <el-row class="info-row">
        <el-col :span="4">
          <span class="info-title">基本信息</span>
        </el-col>
        <el-col :span="20">
          <el-row type="flex">
            <el-col :span="6">
              <span class="base">入住时间: 14:00之后</span>
            </el-col>
            <el-col :span="6">
              <span class="base">离店时间: 12:00之前</span>
            </el-col>
            <el-col :span="6">
              <span class="base">{{hotelData.creation_time}} / {{hotelData.renovat_time}}</span>
            </el-col>
            <el-col :span="6">
              <span class="base">酒店规模: {{hotelData.roomCount}}间客房</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4">
          <span class="info-title">主要设施</span>
        </el-col>
        <el-col :span="20">
          <span
            class="facility"
            v-for="(item,index) in hotelData.hotelassets"
            :key="index"
          >{{item.name}}</span>
        </el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4">
          <span class="info-title">停车服务</span>
        </el-col>
        <el-col :span="20">
          <span class="parking" v-if="hotelData.parking">{{hotelData.parking}}</span>
          <span v-else>-</span>
        </el-col>
      </el-row>
      <el-row class="info-row">
        <el-col :span="4">
          <span class="info-title">品牌信息</span>
          <!-- hotelbrand -->
        </el-col>
        <el-col :span="20">
          <span class="brand" v-if="hotelData.hotelbrand">{{hotelData.hotelbrand.name}}</span>
          <span v-else>-</span>
        </el-col>
      </el-row>
    </div>

    <div class="comment">
      <div class="comment-info">
        <el-row class="comment-title">
          <h4>{{comments.length}}条真实用户评论</h4>
        </el-row>
        <el-row type="flex">
          <el-col class="comment-count" :span="5">
            <el-row>总评数：{{hotelData.all_remarks}}</el-row>
            <el-row>好评数：{{hotelData.good_remarks}}</el-row>
            <el-row>差评数：{{hotelData.bad_remarks}}</el-row>
          </el-col>
          <el-col class="comment-recommend" :span="19">
            <el-col :span="7">
              <div class="star">
                <el-rate
                  class="recommend-star"
                  v-model="hotelData.stars"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
                <div class="recommend">
                  <span>推荐</span>
                </div>
              </div>
            </el-col>
            <el-col :span="17">
              <div class="circle">
                <el-progress
                  :format="format"
                  class="progress"
                  type="circle"
                  v-if="hotelData.scores"
                  :percentage="hotelData.scores.environment*10"
                  :stroke-width="2"
                  :width="75"
                ></el-progress>
                <el-progress
                  :format="format2"
                  class="progress"
                  type="circle"
                  v-if="hotelData.scores"
                  :percentage="hotelData.scores.product*10"
                  :stroke-width="2"
                  :width="75"
                ></el-progress>
                <el-progress
                  :format="format3"
                  class="progress"
                  type="circle"
                  v-if="hotelData.scores"
                  :percentage="hotelData.scores.service*10"
                  :stroke-width="2"
                  :width="75"
                ></el-progress>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="comment-component">
        <HotelComment v-for="(item,index) in comments" :key="index" :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import MapHotelDetail from "@/components/hotel/mapHotelDetail.vue";
import HotelComment from "@/components/hotel/hotelComment.vue";
export default {
  components: {
    MapHotelDetail,
    HotelComment
  },

  mounted() {
    const { id } = this.$route.params;
    this.init(id);
  },
  data() {
    return {
      comments: [],
      pois: [],
      pois2: [],
      id: "",
      hotelData: {},
      imgIndex: 0,
      imgList: [
        "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
      ]
    };
  },
  methods: {
    format(percentage) {
      return `环境  ${percentage / 10}`;
    },
    format2(percentage) {
      return `产品  ${percentage / 10}`;
    },
    format3(percentage) {
      return `服务  ${percentage / 10}`;
    },
    handleChange(index) {
      this.imgIndex = index;
    },
    handleJump() {
      // console.log(5)
      window.location.href = "https://hotels.ctrip.com/hotel/694679.html";
      // window.open = "https://hotels.ctrip.com/hotel/694679.html";
      // this.$router.push({ path: "https://hotels.ctrip.com/hotel/694679.html" });
    },
    async init(id) {
      let res = await this.$axios({
        url: "hotels",
        method: "get",
        params: { id }
      });
      // console.log(res);
      this.hotelData = res.data.data[0];

      const location =
        this.hotelData.location.longitude +
        "," +
        this.hotelData.location.latitude;

      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        method: "get",
        params: {
          keywords: "",
          city: this.hotelData.real_city,
          location,
          types: "风景名胜",
          output: "json",
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res2 => {
        this.pois = res2.data.pois;
      });

      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        method: "get",
        params: {
          keywords: "",
          city: this.hotelData.real_city,
          location:
            this.hotelData.location.longitude +
            "," +
            this.hotelData.location.latitude,
          types: "交通设施服务",
          output: "json",
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res3 => {
        this.pois2 = res3.data.pois;
      });

      this.$axios({
        url: "comments",
        method: "get"
      }).then(res4 => {
        // console.log(res4);
        this.comments = res4.data;
      });

      // console.log(res2.data.pois);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ tr.el-table__row {
  cursor: pointer;
}
.contianer {
  width: 1000px;
  margin: 20px auto;
  padding: 5px;
  .breadcrumb {
    padding-bottom: 20px;
  }
  .name-info {
    margin-bottom: 30px;
    h4 {
      font-size: x-large;
      font-weight: normal;
      color: #333;
    }
    .crown {
      margin-top: 3px;

      i {
        color: #ff9900;
      }
    }
    .alias {
      font-size: 14px;
      color: #666;
    }
    .address {
      font-size: 14px;
      color: #666;
    }
    .location {
      color: #666;
    }
  }
  .photo-info {
    .bigPic {
      width: 95%;
      margin-bottom: 30px;
    }
    .smallPic {
      width: 95%;
      margin-bottom: 15px;
      margin-left: -15px;
    }
  }
  .price-source {
    margin-bottom: 50px;
    .orangeColor {
      color: #ff9900;
    }
    .orange-price {
      font-size: 18px;
    }
  }
  .map {
    margin-bottom: 30px;
  }
  .info {
    margin-bottom: 50px;
    .info-row {
      padding: 25px 0px 25px 10px;
      border-bottom: 1px solid #eee;
      .parking,
      .brand,
      .base {
        font-size: 13px;
        color: #666;
      }
      .info-title {
        font-size: 14px;
      }
      .facility {
        background-color: #eee;
        padding: 6px 11px;
        border-radius: 4px;
        color: #666;
        margin-right: 10px;
        font-size: 13px;
      }
    }
  }

  .comment {
    .comment-info {
      padding-bottom: 30px;
      .comment-title {
        margin-bottom: 14px;
      }
      .comment-count {
        color: #666;
      }
      .comment-recommend {
        .star {
          position: relative;
          .recommend-star {
            position: relative;
            z-index: 5;
            margin-top: 25px;
            /deep/ i {
              font-size: 24px;
            }
          }
          .recommend {
            top: -24px;
            left: 27px;
            position: absolute;
            width: 70px;
            height: 70px;
            border: 2px solid #ffeacd;
            border-radius: 50%;
            font-size: 24px;
            text-align: center;
            line-height: 70px;
            color: #ffeacd;
            font-weight: normal;
            transform: rotateZ(-30deg);
          }
        }
        .progress {
          margin-right: 60px;
        }

        /deep/ .el-progress-circle__track {
          stroke: #fff;
        }
        /deep/ .el-progress-circle__path {
          stroke: #ff9900;
        }
        /deep/ .el-progress__text {
          font-size: 16px !important;
          color: #ff9900;
        }
      }
    }
  }
}
</style>
