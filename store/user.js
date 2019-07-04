export const state = () => ({
  userInfo: {
    token: "",
    user: {}
  }
});
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  //用户退出
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    };
  }
};
export const actions = {
  //用户登入
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data: data
    }).then(result => {
      const data = result.data;
      commit("setUserInfo", data);
      return Promise.resolve();
    });
  },
  //注册
  register({ commit }, data) {
    return this.$axios({
      url: "accounts/register",
      method: "POST",
      data: data
    }).then(result => {
      commit("setUserInfo", result.data);
      //  this.$router.replace('/')
      // this.$router.push({ path: "/" });
      return Promise.resolve();
    });
  },
  //手机验证  
  PhoneVerification({}, data) { 
    return this.$axios({
      url: "captchas",
      method: "POST",
      data: data
    }).then(result => {
      console.log(result);
      // commit('setUserInfo',result.data)

      return Promise.resolve(result);
    });
  }
};
