<template>
  <div class="post">
      <el-row type="flex" justify="space-between">
        <!--左侧 -->
          <el-col :span="7" class="aside">
            <p>推荐城市</p>
              <!-- 图片 -->
              <div class="imgCss">
                 <img src="../../assets/images/pic_sea.jpeg">
              </div>
          </el-col>


          <!-- 右侧 -->
          <el-col :span="17">

          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  
};
</script>
<style lang="less" scoped>
.post{
    width:1000px;
    margin: 0 auto;
    .aside{
      width:260px;
      color:#333;
      .imgCss{
        padding-top:20px;
        border-top:2px solid #eee;
        margin-top:5px;
      img{
        width:260px;
        height:173px;
      }
    }
    }
    
}
</style>