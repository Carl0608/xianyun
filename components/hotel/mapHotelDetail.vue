<template>
  <div class="map">
    <el-row>
      <el-col :span="16">
        <div id="container"></div>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="list">
          <el-tab-pane label="风景" name="first">
            <ul class="list-height">
              <li v-for="(item,index) in pois" :key="index" class="scenery-item">
                <a href="javascript:;">{{item.name}}</a>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second" lazy>
            <ul class="list-height">
              <li v-for="(item,index) in pois2" :key="index" class="scenery-item">
                <a href="javascript:;">{{item.name}}</a>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    pois: {
      type: Array,
      default: []
    },
    pois2: {
      type: Array,
      default: []
    },
    hotelData: {
      type: Object,
      default: {}
    }
  },
  mounted() {},
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    let timer = setTimeout(() => {
      // console.log(this.hotelData);
      window.onLoad = () => {
        let x = this.hotelData.location.longitude;
        let y = this.hotelData.location.latitude;

        var map = new AMap.Map("container", {
          zoom: 11,
          center: [x, y]
          // viewMode: "3D"
          // layers: [
          //   //使用多个图层
          //   new AMap.TileLayer.Satellite(),
          //   new AMap.TileLayer.RoadNet()
          // ]
        });
        var markerList = [];
        this.pois.forEach(v => {
          console.log(v.location.split(",").map(v2 => v2 - 0));
          var marker = new AMap.Marker({
            position: v.location.split(",").map(v2 => v2 - 0), //位置
            // content:
            //   '<div style="width:100px;height:100px;font-size:50px;font-weight:600;color:rgb(97, 97, 255)" class="iconfont icon-dingwei2"></div>',
            // title: "北京"
          });
          markerList.push(marker);
        });
        console.log(markerList);
        //   var trafficLayer = new AMap.TileLayer.Traffic({
        //     zIndex: 10
        //   });

        var points = [
          { keyword: "吉山幼儿园", city: "广州" },
          { keyword: "体育西路", city: "广州" }
        ];

        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
        // map.add(marker);

        map.add(markerList);
        //   map.add(trafficLayer); //添加图层到地图
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=ab9a8438f3ac63b6de769c5651f59d54&callback=onLoad&plugin=AMap.ToolBar";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }, 100);
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 95%;
  height: 350px;
}
.list {
  .list-height {
    height: 290px;
    overflow: auto;
    .scenery-item {
      padding: 8px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
