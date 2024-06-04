import { createStore } from "vuex";
const store = createStore({
  state: {
    countries: require("./data.json"),
  },
  getters: {
    getCountry: (state) => (payload) => {
      return state.countries.find(
        (country) => country[payload.key] == payload.value
      );
    },
  },
  mutations: {},
  actions: {},
});
export default store;
