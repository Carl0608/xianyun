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
  </div>
</template>

<script>
import MapHotelDetail from "@/components/hotel/mapHotelDetail.vue";
export default {
  components: {
    MapHotelDetail
  },

  mounted() {
    const { id } = this.$route.params;
    this.init(id);
  },
  data() {
    return {
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
    handleChange(index) {
      this.imgIndex = index;
    },
    handleJump() {
      // console.log(5)
      window.location.href = "https://hotels.ctrip.com/hotel/694679.html";
    },
    async init(id) {
      let res = await this.$axios({
        url: "hotels",
        method: "get",
        params: { id }
      });
      // console.log(res);
      this.hotelData = res.data.data[0];

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
}
</style>
