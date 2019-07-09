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
      activeName: "first",
      currentPois: []
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index);
    }
  },
  mounted() {
    let timer = setTimeout(() => {
      // console.log(this.hotelData);
      this.currentPois = this.pois;
      window.onLoad = () => {
        let arr = this.currentPois[0].location.split(",");
        let x = arr[0];
        let y = arr[1];

        var map = new AMap.Map("container", {
          // zoom: 14,
          center: [x, y]
        });
        var markerList = [];
        this.currentPois.forEach((v, i) => {
          // console.log(v.location.split(",").map(v2 => v2 - 0));
          var marker = new AMap.Marker({
            position: v.location.split(",").map(v2 => v2 - 0), //位置
            snippet: "1",
            //   '<div style="width:100px;height:100px;font-size:50px;font-weight:600;color:rgb(97, 97, 255)" class="iconfont icon-dingwei2"></div>',
            title: `${i}`
          });
          markerList.push(marker);
        });
        // console.log(markerList);
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
        // map.add(marker);

        map.add(markerList);
        map.setFitView();
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
