<template>
  <div class="articleList">
    <div v-for="(item,index) in List" :key="index"  class="articleOne">
      <h3>{{List[index].title}}</h3>
      <div v-html="List[index].summary" class="articleDiv" ></div>
      <div v-for = "(item,index2) in List[index].images" :key="index2" class="articleImg">
              <img :src="List[index].images[index2]"/>
      </div>
      <el-row>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [],
    };
  },
  mounted() {
    this.$axios({
      url: `/posts`
    }).then(res => {
      console.log(res);
      this.List = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.articleList {
      width: 705px;
    >div{
        border-top:2px solid red;
        padding:20px 0;
        >h3{
        // color:#333;
          font-weight:400;
          font-size:18px;
          padding:10px 0;
        }
    }
    .articleDiv{
        height:63px;
        overflow: hidden;
        font-size: 14px;
        color:#666;
        line-height:1.5;
        margin-bottom:10px;
    }
    .articleImg {
       img{
        width:220px;
        float:left;
        height:150px;
        border:2px solid red;
        margin:5px;
      }
    }

}
</style>