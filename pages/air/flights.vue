<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside :data="cacheFlightsData" />
      </div>
    </el-row>

    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin-top:10px;">
      <!-- size-change：切换条数时候触发 -->
      <!-- current-change：选择页数时候触发 -->
      <!-- current-page: 当前页数 -->
      <!-- page-size：当前条数 -->
      <!-- total：总条数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="flightData.total"
      ></el-pagination>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      flightData: {
        flights: [],
        info: {},
        options: {},
        total: 0
      },
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: []
    };
  },
  watch: {
    $route(){
      this.getData()
    }
  },
  mounted() {
    this.getData();
    // console.log(this.flightData)
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        method: "GET",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightData = res.data;
        // this.dataList = res.data.flights;
        //缓存一份数据
        this.cacheFlightsData = { ...res.data };
        this.setDataList();
      });
    },

    setDataList(arr) {
      if (arr) {
        this.flightData.flights = arr;
      }

      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.flightData.flights.slice(start, end);
    },
    //切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },
    //切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>