<template>
  <div class="postTop">
    <div class="topSearch">
      <el-input placeholder="请输入想去的地方：比如-广州" suffix-icon="el-icon-search"  class="inputSearch">
      </el-input>
    </div>
    <div class="topTui">
        推荐:
        <span ><nuxt-link to="">广州 </nuxt-link></span>
        <span><nuxt-link to="">上海 </nuxt-link></span>
        <span><nuxt-link to="">北京 </nuxt-link></span>
    </div>
    <div>
        <span  class="gonglue">推荐攻略</span>
       
        <nuxt-link to="/post/create"> 
            <el-button type="primary" icon="el-icon-edit" class="write">
              写游记
            </el-button>
        </nuxt-link>
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

  }
};
</script>
<style lang="less" scoped>
.postTop{
    .topSearch{
         margin-bottom:10px;
        .inputSearch{
           inset-inline:2px solid orange;
           border:2px solid orange;
           outline:2px solid orange;
        }

    }
    .topTui{
        margin-bottom:10px;
        color:#666;
        font-size:12px;
        span{
          &:hover{
            color:orange !important;
          }
        }
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