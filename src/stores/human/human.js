import { defineStore } from "pinia";
// import piniaPersistConfig from "@/stores/helper/persist";

export const humanStore = defineStore({
  id: "human",
  state: () => ({
    name: 'character'
  }),
  getters: {},
  actions: {
    // Set name
    setName(name) {
      this.name = name;
    }
  },
  // persist: piniaPersistConfig("human")
});
