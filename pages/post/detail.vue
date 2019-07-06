<template>
  <div class="travel_detail">
    <!-- 面包屑 -->
    <el-breadcrumb class="detail_bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="16">
        <!-- 攻略详情 -->
        <div class="detail_pages">
          <div v-html="detailTitle"></div>
        </div>
        <!-- 攻略用户功能 -->
       <div class="contentTool">
          <div>
          <i class="iconfont icon-pinglun"></i>
          <span>评论</span>
        </div>
        <div>
          <i class="iconfont icon-dianzan"></i>
          <span>点赞</span>
        </div>
        <div>
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </div>
        <div>
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </div>
       </div>
        <!-- 评论内容 -->
     
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">右</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {

  data() {
    return {
      detailTitle: "",
      // 评论内容
      commentList: ""
    };
  },
  mounted() {
    //   攻略详情内容
    this.$axios({
      url: "/posts",
      params: { id: 4 }
    }).then(result => {
      const { data } = result.data;
      console.log(data)
      this.detailTitle = data[0].content;
      //   this.benners = data;
      //   console.log(this.benners);
    });
    //   评论详情内容
    this.$axios({
      url: "/posts/comments",
      params: {
        post: 4,
        _start: 0,
        _limit: 2
      }
    }).then(result => {
      const { data } = result.data;
      console.log(data);
      console.log(this.commentList);
      this.commentList = data;
    });
  }
};
</script>

<style lang="css" scoped>
.travel_detail {
  width: 1000px;
  margin: 0 auto;
}
.detail_bread {
  padding: 15px 0;
}
.detail_pages {
  border: 1px solid pink;
}
/deep/ img {
  width: 100%;
  height: 100%;
}
.commentContent {
  margin-top: 20px;
  border: 1px solid black;
}

.contentTool{
  width:400px;
  margin: 20px auto;
}
.contentTool div{
  display: inline-block;
  margin: 0 15px
}
.contentTool div i{
  color:dodgerblue
  
}
ul {
  margin-top: 50px;
  padding-left: 20px !important;
}
</style>

