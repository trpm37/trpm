import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
  id: "3d-user",
  state: () => ({
    token: "1",
    expiresAt: 0,
    userInfo: {
      name: "用户名",
      team_id: "",
      id: 0,
      phone: "",
      email: ""
    }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token) {
      this.token = token;
    },
    // Set Expires time
    setExpiresAt(expiresAt) {
      this.expiresAt = expiresAt;
    },
    // Set setUserInfo
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("3d-user")
});
