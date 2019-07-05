<template>
  <div>动态路由</div>
</template>

<script>
export default {
  mounted() {
    const { id } = this.$route.params;
    this.$axios({
      url: `hotels/${id}`,
      method:"get"
    });
  },
  data() {
    return {
      id: ""
    };
  },
  method: {}
};
</script>

<style lang="less" scoped>
</style>
