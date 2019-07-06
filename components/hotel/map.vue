<template>
  <el-row type="flex" justify="space-between">
    <div class="map-left">
      <!-- 区域 -->

      <el-row type="flex" class="area" style="display:block width:100%">
        <el-col :span="3">
          <span class="area-text">区域：</span>
        </el-col>
        <el-col :span="21">
          <el-row :class="areaStyle" :disabled="isChange" type="text">
            全部
            <nuxt-link v-for="(item,index) in defalutData" :key="index" to="#">{{item.name}}</nuxt-link>
          </el-row>
          <div>
            <i :class="areaIcon" style="color:pink" @click="changStyle"></i>
            等{{this.defalutData.length}}个区域
          </div>
        </el-col>
      </el-row>

      <!-- 攻略 -->
      <el-row type="flex" class="strategy" style="display:block;height:40px">
        <el-col :span="3">
          <span class="strategy-text">攻略：</span>
        </el-col>
        <el-col :span="21">
          <span
            class="strategy-content"
          >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
        </el-col>
      </el-row>

      <!-- 均价 -->
      <el-row type="flex" class="price" style="display:block">
        <el-col :span="3">
          <span class="strategy-text">
            攻略
            <i>?</i>:
          </span>
        </el-col>
        <el-col :span="21">
          <el-row type="flex">
            <el-col :span="5">
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>￥332
            </el-col>
            <el-col :span="5">
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>￥521
            </el-col>
            <el-col :span="5">
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>
              <i class="iconfont iconhuangguan" style="color:#f90"></i>￥768
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div id="container"></div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      defalutData: [],
      isChange: false
    };
  },

  methods: {
    changStyle() {
      this.isChange = !this.isChange;
      // console.log(1111111111111)
      // console.log(this.isChange)
    }
  },
  computed: {
    areaStyle() {
      if (this.isChange === false) {
        return "area-Acontent";
      } else {
        return "area-Bcontent";
      }
    },
    areaIcon() {
      if (this.isChange === false) {
        return "iconfo el-icon-arrow-down";
      } else {
        return "iconfo el-icon-arrow-up";
      }
    }
  },
  mounted() {
    this.defalutData = JSON.parse(
      localStorage.getItem("defalutHotelData")
    )[0].scenics;
    // console.log(1111)
    // console.log(this.defalutData);
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
    };
    var key = "5c8bf71355864e9b105e4981bdc770aa";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
.map-left {
  .area {
    width: 100%;
    margin-bottom: 30px;
    .area-text {
      width: 50px;
    }
    .area-Acontent {
      width: 100%;
      height: 50px;
      overflow: hidden;
      a {
        font-size: 14px;
        width: 100%;
        margin: 15px 10px;
        cursor: pointer;
        // display:inline-block;
        // overflow: hidden;
      }
    }
    .area-Bcontent {
      width: 100%;
      height: 70px;
      a {
        font-size: 14px;
        width: 100%;
        margin: 15px 10px;
        cursor: pointer;
        // display:inline-block;
        // overflow: hidden;
      }
    }
  }
  .strategy {
    margin-bottom: 30px;
  }
  .price {
    margin-bottom: 30px;
  }
}
#container {
  width: 420px;
  height: 260px;
}
</style>

