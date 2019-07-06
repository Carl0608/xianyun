<template>
  <el-row type="flex" justify="space-between">
    <div class="map-left">
      <!-- 区域 -->

      <el-row type="flex" class="area" style="display:block width:100%">
        <el-col :span="3">
          <span class="area-text">区域：</span>
        </el-col>
        <el-col :span="21">
          <span class="area-content"> <i style="background-color:#ccc; font-size:14px">全部</i> ...</span>
          <div>
            <i class="iconfo el-icon-arrow-down">等...个区域</i>
          </div>
        </el-col>
      </el-row>

      <!-- 攻略 -->
      <el-row type="flex" class="strategy" style="display:block;height:40px">
        <el-col :span="3">
          <span class="strategy-text">攻略：</span>
        </el-col>
        <el-col :span="21">
          <span class="strategy-content">...</span>
        </el-col>
      </el-row>

      <!-- 均价 -->
      <el-row type="flex" class="price" style="display:block">
        <el-col :span="3">
          <span class="strategy-text">
            攻略
            <spu>?</spu>:
          </span>
        </el-col>
        <el-col :span="21">
          <el-row type="flex">
            <el-col :span="5">
              <i class="iconfont iconhuangguan" style="color:#f90"></i>￥...
            </el-col>
            <el-col :span="5">
              <i class="iconfont iconhuangguan" style="color:#f90"></i>￥...
            </el-col>
            <el-col :span="5">
              <i class="iconfont iconhuangguan" style="color:#f90"></i>￥...
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
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
    };
    var key = "5c8bf71355864e9b105e4981bdc770aa";
    var url =
      `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
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
    width: 580px;
    margin-bottom: 30px;
    .area-text {
      width: 65px;
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

