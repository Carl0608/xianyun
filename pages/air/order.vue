<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm @setInfoData="setInfoData" @setPrice="setPrice"/>

      <!-- 侧边栏 -->
      <div class="aside">
       <OrderAside :data="infoData" :price="price"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm'
import OrderAside from '@/components/air/orderAside'
export default {
  data () {
    return {
      infoData:{
        seat_infos:{},
      },
      price:0
    }
  },
  mounted () {
    
    // console.log(this.infoData)
  },
  methods: {
    setPrice(price){
      this.price=price
    },
    setInfoData(data){
      this.infoData = data
    }
  },
  components: {
    OrderForm,
    OrderAside
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>