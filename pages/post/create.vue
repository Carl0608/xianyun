<template>
  <div class="create">
    <el-row>
      <el-col :span="16">
        <div class="left">
          <h3>发表新功略</h3>
          <div class="share">分享你的个人游记，让更多人看到哦！</div>
          <el-input class="titleInput" placeholder="请输入标题" v-model="pagesTitle" clearable></el-input>
          <!-- 富文本编辑框开始 -->
          <!-- <div class="quill-editor" v-quill:myQuillEditor="editorOption">
            <div v-html="content"></div>
          </div>-->

          <div
            
            class="quill-editor"
            :content="content"
            @change="onEditorChange($event)"
            v-quill:myQuillEditor="editorOption"
          ></div>
          <!-- 富文本编辑框结束 -->
          <div class="leftMiddle">
            <span>选择城市</span>
            <el-input class="cityInput" placeholder="请搜索游玩城市" v-model="cityInput" clearable></el-input>
          </div>
          <div class="leftBottom">
            <el-button type="primary" class="btn" @click="getContent">发布</el-button>

            <el-button type="primary" class="link">草稿</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="right">
          <div>草稿箱()</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagesTitle: "",
      cityInput: "",

      // 富文本框
     content: "",
      editorOption: {
        toolbar: [
          [{ size: ["small", false, "large"] }],
          ["bold", "italic"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"]
        ]
      } //配置
    };
  },
  mounted() {
    var timerId = setTimeout(() => {
      this.$axios({
        method: "post",
        url: "/posts",
        data: {
          content: "",
          title: "",
          city: ""
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(result => {
        const { data } = result.data;
        console.log(data);
      });
    }, 100);
  },
  methods: {
    //富文本框内容改变事件
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
        this.content = html
      }
    },
    // 获得富文本框输入的内容
    getContent(){

    }
  
};
</script>


<style lang="less" scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.create {
  width: 1000px;
  margin: 0 auto;
}
.left {
  padding: 20px;
}
.left .share {
  color: #333;
  padding: 10px 0px;
  font-size: 10px;
}
.quill-editor {
  height: 350px;
}
.titleInput {
  margin-bottom: 10px;
}
.leftMiddle {
  padding-top: 10px;
}
.leftMiddle span {
  display: inlinea;
}
.leftMiddle .cityInput {
  width: 200px;
  margin-bottom: 10px;
}
.leftBottom {
  margin-left: 80px;
}
.btn {
  font-size: 13px;
  padding: 8px;
}
.link {
  font-size: 13px;
  padding: 8px;
}
.right {
  margin: 20px 30px;
  padding: 10px;
  border: 1px solid #999;
}
</style>
