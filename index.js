import VNus from "./VNus.vue";

export default {
 install(Vue, options) {
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("v-nus", VNus);
 }
};