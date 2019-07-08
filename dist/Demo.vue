<template>
  <div style="padding-top: 10%;">
    <v-nus
      v-model="range"
      :config="config"
      show-thumb


      :disabled="disabled"
      @change="testtap()"
    ></v-nus>

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
          max: [100]
        },
        step: 1,
        tooltips: false
      },
      range: [25, 35, 75, 90]
    };
  },
  watch: {
    range(newValue, oldValue) {
      console.log(this.range);
    }
  },
  methods: {
    testtap() {
      console.log('no tappys');
    }
  },
};
</script>
