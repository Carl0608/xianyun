<template>
  <div class="container">
    <div class="hotel-list">
      <el-row
        type="flex"
        jusitfy="space-between"
        
        v-for="(item,index) in this.defalutDate"
        :key="index"
      >
        <!-- 图片 -->
        <el-col :span="8">
          <img :src="item.photos" />
        </el-col>

        <!-- 简介 -->
        <el-col :span="8">
          <div></div>
        </el-col>

        <!-- 携程 -->
        <el-col :span="8">
          <ul>
            <li>携程</li>
            <li>艺龙</li>
            <li>Hotels.com</li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defalutDate: []
    };
  },
  mounted() {
    const id = this.$route.query.city - 0;
    this.$axios({
      url: `/hotels`,
      method: "GET",
      params: {
        city: id
      }
    }).then(res => {
      console.log(res);
      this.defalutDate = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.hotel-list {
  height:2000px;
//   flex-direction: row-reverse;
  img {
    width: 320px;
    height: 210px;
  }
}
</style>


