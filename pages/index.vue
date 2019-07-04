<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in benners" :key="index">
        <div
          class="benner-image"
          :style="`
          background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
          background-size:contain contain;
          `"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="benner-center">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for="(item,index) in option" 
          :key="index" 
          :class="{active:index===currentOption}"
          @click="handelClick(index)">
          
            <i>{{item.name}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="option[currentOption].placeholder" 
          v-model="searchValue"
          @keydown.enter="handelSearch">
          <i class="el-icon-search"
          @click="handelSearch"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      benners: [],
      currentOption: 0,
      searchValue: "",
      option: [
        { name: "攻略", placeholder: "搜索城市",pageURL:"post?city="},
        { name: "酒店", placeholder: "输入城市搜索酒店",pageURL:"hotel?city=" },
        { name: "机票", placeholder: "搜索城市",pageURL:"/air" }
      ]
    };
  },
  methods: {
    handelClick(index){
      this.currentOption=index
      const item = this.option[index]
      if(item.name === '机票'){
        console.log(item.pageURL)
        return this.$router.push(item.pageURL)
      }
    },
    handelSearch(){

      const item =this.option[this.currentOption]
      this.$router.push(item.pageURL+this.searchValue)
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(result => {
      const { data } = result.data;
      this.benners = data;
      console.log(this.benners);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  /deep/.el-carousel__container {
    height: 700px;
    /deep/.benner-image {
      width: 100%;
      height: 100%;
    }
  }
}
.benner-center {
  z-index: 9;
  width: 1000px;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  border-top: 1px transparent solid;
  .search-bar {
    width: 552px;
    margin: 0 auto;
    position: relative;
    .search-tab {
      .active{
        i{
          color:#333;
        }
        &::after{
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }
    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;
      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
