import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = "http://localhost:3001";

  return {
    provide: {
      axios,
    },
  };
});
