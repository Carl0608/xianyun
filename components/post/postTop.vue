<template>
  <div class="postTop">
    <div class="topSearch">
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search"  id="inputSearch">
      </el-input>
    </div>
    <p class="topTui">
        推荐:
        <nuxt-link to="">广州 </nuxt-link>
        <nuxt-link to="">上海 </nuxt-link>
        <nuxt-link to="">北京 </nuxt-link>
    </p>
    <div>
        <span  class="gonglue">推荐攻略</span>
        <el-button type="primary" icon="el-icon-edit" class="write"
         @click="jump">
          写游记
        </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    jump(){
      // this.$route.push{ path: '', component: component }
    }
  }
};
</script>
<style lang="less" scoped>
.postTop{
    .topSearch{
         margin-bottom:10px;
        #inputSearch:focus{
          border:3px solid orange;
         
        }
    }
    .topTui{
        margin-bottom:10px;
        color:#666;
        font-size:12px;
    }
    .gonglue{
        color:orange;
        padding:20px 0;
        border-bottom:2px solid orange;
        width:80px;
        display: inline-block;
    }
    .write{
        float:right;
        margin-bottom:-10px;
    }
}
</style>