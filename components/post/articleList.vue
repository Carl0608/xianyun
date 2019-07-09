<template>
  <div class="articleList">
    <div v-for="(item,index) in dataList" :key="index"  class="articleOne">
      <nuxt-link :to="`/post/detail?id=${dataList[index].id}`">
          <h3>{{dataList[index].title}}</h3>
      </nuxt-link>
      <div v-html="dataList[index].summary" class="articleDiv" ></div>
      <div v-for = "(item,index2) in List[index].images" :key="index2" class="articleImg">
              <img :src="dataList[index].images[index2]"/>
      </div>
      <el-row>

      </el-row>
    </div>

    <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="List.length"
          ></el-pagination>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [],
      pageIndex:1,
      pageSize:3,
      dataList:[],
    };
  },
  methods: {
    //设置数据列表从哪条开始到哪条结束，并显示对应index的数据
      setDataList(arr) {
      if (arr) {
        this.List = arr;
      }
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.List.slice(start, end);
    },
    //切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },
    //切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    }
  },
  mounted() {
    this.$axios({
      url: `/posts`
    }).then(res => {
      console.log(res);
      this.List = res.data.data;
      this.setDataList();
    });
  }
};
</script>
<style lang="less" scoped>
.articleList {
      width: 705px;
    >div{
        border-top:2px solid #eee;
        padding:20px 0;
        h3{
        // color:#333;
          font-weight:400;
          font-size:18px;
          padding:10px 0;
          &:hover{
            color:orange;
          }
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
        // border:2px solid red;
        margin:5px;
      }
    }

}
</style>