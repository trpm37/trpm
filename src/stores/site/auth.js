import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "3d-auth",
  state: () => ({
    authInfo: {
      expires: "",
    }
  }),
  getters: {
    // 测试列表
    getAuthInfo: state => state.authInfo,
  },
  actions: {
    // Set setAuthInfo
    setAuthInfo(authInfo) {
      this.authInfo = authInfo;
    }
  }
});
