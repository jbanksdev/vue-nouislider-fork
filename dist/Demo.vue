<template>
  <div style="padding-top: 10%;">
    <v-nus
      v-model="range"
      :config="config"
      show-thumb
      :disabled="disabled"
      @change="testtap()"
      :log="false"
    ></v-nus>

    <v-nus v-model="range1" :config="config1" show-thumb :log="false"></v-nus>

    <button @click="updateRange">click here to add more range</button>
    <p style="margin-top:2rem">{{ range }}</p>
    <button @click="disabled = !disabled">Disable</button>
  </div>
</template>
<script>
import VNus from "../Development.vue";
export default {
  components: {
    VNus
  },
  data() {
    return {
      range: [],
      disabled: true,
      config: {
        connect: [true, true, true, false, true],
        connectColors: ["blue", "red", "orange", "purple", "green"],
        range: {
          min: [0],
          max: [5]
        },
        step: 0.1,
        tooltips: false,
        pips: {
          mode: "range",
          type: "custom",
          density: 2,
          stepped: true
        }
      },
      config1: {
        connect: [true, true, true, false, true],
        connectColors: ["blue", "red", "orange", "purple", "green"],
        range: {
          min: [0],
          max: [5]
        },
        step: 0.1,
        tooltips: false,
        pips: null
      },
      range: [0.01, 0.5, 0.9, 1.5],
      range1: [0.5, 0.7, 0.9, 1.5]
    };
  },
  watch: {},
  methods: {
    testtap() {
      console.log("no tappys");
    },
    updateRange() {
      this.config.range = {
        min: [0],
        max: [15]
      };
      console.log(this.config);
    }
  }
};
</script>
