<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <el-row type="flex" class="Breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>杭州市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <!-- 搜索条件 -->
    <el-row type="flex" class="search_hotel">
      <!-- 城市 -->
      <el-autocomplete
        class="inline-input"
        v-model="searchCity"
        :fetch-suggestions="querySearch"
        placeholder="请输入城市"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>

      <!-- 日期 -->
      <el-date-picker
        class="searchDate"
        v-model="searchDate"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
      ></el-date-picker>

      <!-- 人员 -->
      <el-row type="flex">
        <el-input placeholder="未输入人员" :readonly="true"></el-input>
        <el-col>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-row type="flex">
                <span>每间</span>
                <!-- 成人 -->
                <el-select v-model="value"   placeholder="请选择" class="adult-select">
                  <el-option   v-for="item in cities " :key="item.value" 
                    :label="item.value"
                   :value="item.label">
                    <span >{{ item.label}} </span>
                  </el-option>
                </el-select>
                <!-- 儿童 -->
                <el-select v-model="child_value"   placeholder="请选择" class="child-select">
                  <el-option  v-for="item in child " :key="item.value" 
                    :label="item.value"
                   :value="item.label">
                    <span >{{ item.label}} </span>
                  </el-option>
                </el-select>
              </el-row>
            </div>
            <el-button style="float: right; padding: 3px 0" type="text">确定</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
    <!-- 地图 -->
    <div class="container">
        <Map/>
    </div>
    
  </div>
</template>
<script>
import Map from '@/components/hotel/map.vue'
export default {
  data() {
    return {
      searchCity: "",
      searchDate: "",
      value:'2  成人',
      child_value:'0   儿童',
       cities: [{
          value: '1 成人',
          label: 1
        }, {
          value: '2 成人',
          label: 2
        }, {
          value: '3 成人',
          label: 3
        }, {
          value: '4 成人',
          label: 4
        }, {
          value: '5 成人',
          label: 5
        }, {
          value: '6 成人',
          label: 6
        }],
        child: [{
          value: '1 儿童',
          label: 1
        }, {
          value: '2 儿童',
          label: 2
        }, {
          value: '3 儿童',
          label: 3
        }, {
          value: '4 儿童',
          label: 4
        }, {
          value: '5 儿童',
          label: 5
        }, {
          value: '6 儿童',
          label: 6
        }],
    };
  },
  methods: {
    handleSelect() {},
    querySearch() {}
  },
  components: {
      Map,
  }
};
</script>
<style lang="less" scoped>
    .hotel{
        width: 1000px;
        margin: 0 auto;
        .Breadcrumb{
            margin: 20px auto;
            .el-icon-arrow-right{
            font-weight:normal ; 

            }
        }
        .container{
            width: 500px;
            height: 500px;
        }
    }
</style>


