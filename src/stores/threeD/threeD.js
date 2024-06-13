import { defineStore } from "pinia";
// import piniaPersistConfig from "@/stores/helper/persist";

export const threeDStore = defineStore({
  id: "threeD",
  state: () => ({
    name: 'scene'
  }),
  getters: {},
  actions: {
    // Set name
    setName(name) {
      this.name = name;
    }
  },
  // persist: piniaPersistConfig("threeD")
});
