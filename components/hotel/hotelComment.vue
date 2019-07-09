<template>
  <div class="hotelComment">
    <el-row style="margin-bottom:5px">
      <el-col :span="3">
        <el-row type="flex">
          <el-col style="margin-bottom:8px">
            <div class="avatar">
              <img
                src="https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90"
                alt
              />
            </div>
          </el-col>
          <el-col class="level">LV.{{data.level}}</el-col>
        </el-row>
        <el-row class="comment-date">{{data.updated_at | time}}</el-row>
      </el-col>
      <el-col :span="21" class="comment">
        <el-row class="comment-content">{{data.content}}</el-row>
        <el-row>
          <el-input
            type="textarea"
            :rows="rows"
            placeholder="请输入内容"
            v-model="textarea"
            resize="none"
            @focus="handelFocus"
            @blur="handelBlur"
            style="margin-bottom:10px"
          ></el-input>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="primary" size="mini" v-if="rows!==1">回复</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <HotelComment
        v-for="(item,index) in data.followed"
        :key="index"
        :data="item"
        style="margin-left:130px"
      />
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "HotelComment",
  methods: {
    handelFocus() {
      this.rows = 3;
    },
    handelBlur() {
      this.rows = 1;
    }
  },
  filters: {
    time(v) {
      return moment(v).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      textarea: "",
      rows: 1
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.hotelComment {
  padding: 10px 0px;
  border-top: 1px dashed #eee;
}
.comment {
  padding-bottom: 6px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffaa33;
  img {
    width: 100%;
  }
}
.level {
  font-size: 13px;
  color: #f00;
  margin-top: 5px;
}
.comment-date {
  font-size: 14px;
  color: #666;
}
.comment-content {
  color: #666;
  margin-bottom: 8px;
}
</style>
