<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <el-row type="flex" class="Breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span>{{this.defalutCity}}</span>酒店预订
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <!-- 搜索条件 -->
    <el-row type="flex" class="search_hotel">
      <!-- 城市 -->
      <el-autocomplete
        class="inline-input"
        v-model="searchCity"
        :fetch-suggestions="querySearch"
        placeholder="请输入城市"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>

      <!-- 日期 -->
      <el-date-picker
        class="searchDate"
        v-model="searchDate"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
      ></el-date-picker>

      <!-- 人员 -->
      <el-row type="flex" class="man">
        <div @click="showCard" class="cartInput">
          <el-input placeholder="未输入人员" :readonly="true"></el-input>
        </div>

        <!-- 卡片 -->
        <el-card class="box-card" v-if="isShow">
          <div slot="header" class="clearfix">
            <el-row type="flex" justify="center">
              <span>每间</span>
              <!-- 成人 -->
              <el-select v-model="value" placeholder="请选择" class="adult-select">
                <el-option
                  v-for="item in cities "
                  :key="item.value"
                  :label="item.value"
                  :value="item.label"
                >
                  <span>{{ item.label}}</span>
                </el-option>
              </el-select>
              <!-- 儿童 -->
              <el-select v-model="child_value" placeholder="请选择" class="child-select">
                <el-option
                  v-for="item in child "
                  :key="item.value"
                  :label="item.value"
                  :value="item.label"
                >
                  <span>{{ item.label}}</span>
                </el-option>
              </el-select>
            </el-row>
          </div>
          <el-button class="cart-button" style="float: right; padding: 3px 0" type="primary">确定</el-button>
        </el-card>
      </el-row>

      <!-- 按钮 -->
      <el-button type="primary">查看价格</el-button>
    </el-row>
    <!-- 地图 -->
    <div class="container">
      <Map  />
    </div>

    <!-- 酒店筛选 -->
    <div class="list-filter">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <div class="filter-item">
            <el-row type="flex" justify="space-between">
              <i>价格</i>
              <span>0-4000</span>
            </el-row>
            <div class="filter-price">
              <el-slider v-model="filterPrice"></el-slider>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <el-row type="flex">
            <el-col :span="6">
              <div class="filter-item">
                <span>住宿等级</span>
                <div>
                  <el-select
                    v-model="accommodationValue"
                    value="不限"
                    placeholder="不限"
                    multiple
                    :multiple-limit="1"
                    style="height:30px"
                  >
                    <el-option
                      v-for="(item,index) in this.hotelData.levels"
                      :key="index"
                      :value="item.name"
                    >
                      <span style=" color: #8492a6; font-size: 13px">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="filter-item">
                <span>住宿类型</span>
                <div>
                  <el-select
                    v-model="typeValue"
                    value="不限"
                    placeholder="不限"
                    multiple
                    :multiple-limit="1"
                    style="height:30px"
                  >
                    <el-option
                      v-for="(item,index) in this.hotelData.types"
                      :key="index"
                      :value="item.name"
                    >
                      <span style=" color: #8492a6; font-size: 13px">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="filter-item">
                <span>酒店设施</span>
                <div>
                  <el-select
                    v-model="facilitiesValue"
                    value="不限"
                    placeholder="不限"
                    multiple
                    style="height:30px"
                  >
                    <el-option
                      v-for="(item,index) in this.hotelData.assets"
                      :key="index"
                      :value="item.name"
                    >
                      <span style=" color: #8492a6; font-size: 13px">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="filter-item">
                <span>酒店品牌</span>
                <div>
                  <el-select
                    v-model="brandValue"
                    value="不限"
                    placeholder="不限"
                    multiple
                    style="height:30px"
                  >
                    <el-option
                      v-for="(item,index) in this.hotelData.brands"
                      :key="index"
                      :value="item.name"
                    >
                      <span style=" color: #8492a6; font-size: 13px">{{ item.name }}</span>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 酒店选项 -->
    <div class="hotel-list">
      <HotelList/>
    </div>
    
  </div>
</template>
<script>
import Map from "@/components/hotel/map.vue";
import HotelList from "@/components/hotel/hotelList.vue";
export default {
  data() {
    return {
      hotelData: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      //初始数据
      // defalutData:JSON.parse(localStorage.getItem('defalutHotelData')) || [],

      cityData: {},

      isShow: false,
      //默认城市
      defalutCity:'杭州市',
      //搜索默认城市
      searchCity: "杭州市",
      cityName: "",
      searchDate: "",
      filterPrice: 4000,
      accommodationValue: "",
      facilitiesValue: "",
      typeValue: "",
      brandValue: "",
      value: "2  成人",
      child_value: "0   儿童",
      cities: [
        {
          value: "1 成人",
          label: 1
        },
        {
          value: "2 成人",
          label: 2
        },
        {
          value: "3 成人",
          label: 3
        },
        {
          value: "4 成人",
          label: 4
        },
        {
          value: "5 成人",
          label: 5
        },
        {
          value: "6 成人",
          label: 6
        }
      ],
      child: [
        {
          value: "1 儿童",
          label: 1
        },
        {
          value: "2 儿童",
          label: 2
        },
        {
          value: "3 儿童",
          label: 3
        },
        {
          value: "4 儿童",
          label: 4
        },
        {
          value: "5 儿童",
          label: 5
        },
        {
          value: "6 儿童",
          label: 6
        }
      ]
    };
  },
  mounted() {
    this.searchHotel();
    // console.log(this.defalutData)
  },
  watch: {},
  methods: {
    //控制卡片
    showCard() {
      this.isShow = !this.isShow;
    },
    //条件搜索酒店
    searchHotel() {
      this.$axios({
        url: "hotels/options",
        method: "GET"
      }).then(res => {
        // consli.log(33333)
        // console.log(res);
        this.hotelData = res.data.data;
      });
    },
    handleSelect() {
      this.defalutCity = this.searchCity
      // console.log(this.$route.query.city-0)
      // console.log()


    },
    querySearch(name, cb) {
      this.$axios({
        url: `/cities`,
        method: "GET",
        params: { name: this.searchCity }
      }).then(res => {
        // console.log(res);  
        if (this.searchCity == "") return;
        const { data } = res.data;
        this.cityData = res.data.data;
        // console.log(111111111111)
        // console.log(this.cityData)

        const newData = data.map(v => {
          return {
            ...v,
            value: v.name
          };
        });
        cb(newData);
      });
    }
  },
  components: {
    Map,
    HotelList
  }
};
</script>
<style lang="less" scoped>
.hotel {
  width: 1000px;
  margin: 0 auto;
  //   position:relative
  .Breadcrumb {
    margin: 20px auto;
    .el-icon-arrow-right {
      font-weight: normal;
    }
  }
  .search_hotel {
    height: 40px;
    margin-bottom: 20px;
    .inline-input {
      margin-right: 20px;
    }
    .searchDate {
      margin-right: 10px;
    }
    .man {
      position: relative;
      .cartInput {
        margin-right: 20px;
      }
      .box-card {
        z-index: 9;
        position: absolute;
        padding: 0 20px;
        width: 320px;
        top: 50px;
        span {
          width: 60px;
          text-align: center;
          margin-top: 8px;
          margin-right: 3px;
        }
        .cart-button {
          margin-bottom: 20px;
          font-size: 12px;
          padding: 5px;
        }
      }
    }
  }
  .list-filter {
    width: 100%;
    height: 80px;
    color: #666;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    .filter-item {
      margin: 10px 0;
      padding: 5px 20px;
      font-size: 14px;
      border-right: 1px solid #ccc;
      span {
        margin-left: 15px;
      }
      /deep/.el-input__inner {
        height: 30px;
        border: none;
        background: transparent;
      }
    }
  }

  .container {
    height: 260px;
    margin-bottom: 20px;
  }
  .hotel-list{
    width: 1000px;
    height: 2440px;
    // height: 100%;
  }
}
</style>


