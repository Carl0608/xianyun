<template>
  <div class="post">
    <el-row type="flex" justify="space-between">
      <!--左侧 -->
      <el-col :span="7" class="aside">
        <div class="jilian">
          <postCascader :data="city" />
        </div>
        <p>推荐城市</p>
        <!-- 图片 -->
        <div class="imgCss">
          <img src="../../assets/images/pic_sea.jpeg" />
        </div>
      </el-col>

      <!-- 右侧 -->
      <el-col :span="17">
        <postTop />
        <articleList />
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postCascader from "../../components/post/postCascader"; //引入级联插件
import articleList from "../../components/post/articleList"; //引入文章列表组件
import postTop from "../../components/post/postTop"; //引入头部搜索栏组件
export default {
  data() {
    return {
      city: [],
    };
  },
  components: {
    postCascader, //使用级联插件
    articleList, //使用文章列表组件
    postTop //使用头部搜索栏组件
  },

  mounted() {
    this.$axios({
      url: `/posts/cities`
    }).then(res => {
      console.log(res);
      this.city = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.post {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .aside {
    width: 260px;
    color: #333;
    .imgCss {
      padding-top: 20px;
      border-top: 2px solid #eee;
      margin-top: 10px;
      img {
        width: 260px;
        height: 173px;
      }
    }
  }
}
</style>