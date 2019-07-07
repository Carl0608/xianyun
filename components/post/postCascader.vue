<template>
  <div class="postCascader">
    <div v-for="(item,index) in data" :key="index" @mouseout="handleOut">
      <div @mouseover="handleTuijian(index)" >
      <el-row class="hotCity" type="flex" >       
        <!-- <div @click="handleOver(index)"></div> -->
        <el-col :span="12" class="hot">
            <el-link
              href="javascript:;"
              target="_blank"
              class="linksty"
            >{{data[index].type}}</el-link>

        </el-col>
        <el-col :span="12" class="jiantou">
          <i class="el-icon-arrow-right"></i>
        </el-col>     
      </el-row>
    </div>

      <div class="erjiDiv" v-if="show">
      <el-row type="flex" justify="space-between" 
      v-for="(item,index2) in data[currentIndex].children" :key="index2" 
      class="erji">
        <el-col :span="2">
          <i>{{index2+1}}</i>
        </el-col>
        <el-col :span="4">
          <span>{{data[currentIndex].children[index2].city}}</span>
        </el-col>
        <el-col :span="18">
          <nuxt-link to="">{{data[currentIndex].children[index2].desc}}</nuxt-link>
        </el-col>
      </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex:0,
      show:false,
      son:"",
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {},
  methods: {
    handleTuijian(index) {
      // console.log(index);
      this.currentIndex = index;
     if(this.currentIndex == index){
       this.show = true;
     }else{
       this.show = false;
     }
    },
    handleOut(){
      this.currentIndex = -1;
      if(this.currentIndex === -1){
          this.show = false;
      }
    },

  }
};
</script>
<style lang="less" scoped>
.postCascader {
  border-top: 2px solid #eee;
  margin-bottom: 15px;
  // border-bottom:none;
}
.hotCity {
  border: 2px solid #eee;
  border-top: none;
  width: 260px;
  height: 40px;
  line-height: 36px;
  vertical-align: center;
  padding: 0 20px;
  &:hover {
    color: orange;
    border-right:none;
    .linksty {
      color: orange;
    }
    .jiantou {
      color: orange;
    }
  }
  .jiantou i{
    position: relative;
    left: 90px;
    top: 0px;
    font-size: 24px;
    color: #eee;
  }
  .linksty {
    font-size: 14px;

    &:hover {
      text-decoration: none;
      color: orange;
    }
  }
}

// 二级列表
.erjiDiv{
  border:2px solid #eee;
  position:absolute;
  left:260px;
  top:0;
  background:#fff;
  z-index:1000;
  border-left:none;
  line-height:40px;
  vertical-align: center;
  font-size:14px;
  color:#666;
  width:35%;
  .erji{
    // border-left:2px solid red;
    i{
      color:orange;
      margin-left:10px;
      font-size: 22px;
      font-style: italic;
    }
    span{
      color:orange;
      font-size: 16px;
      // font-style: italic;
    }
  }
  // display:none;
}
.yincan {
  
}
</style>