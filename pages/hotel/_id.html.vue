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
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" width="180"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" width="180"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const { id } = this.$route.params;
    this.$axios({
      url: "hotels",
      method: "get",
      params: { id }
    }).then(res => {
      // console.log(res);
      this.hotelData = res.data.data[0];
    });
  },
  data() {
    return {
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
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleChange(index) {
      this.imgIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
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
}
</style>
