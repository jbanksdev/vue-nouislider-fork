<template>
  <div style="padding-top: 10%;">
    <v-nus
      :id="'test-slider'"
      :config="config"
    
      show-thumb
      :value="values"
      @update="values = $event"
    ></v-nus>
    <p style="margin-top:2rem">{{ values }}</p>
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
      values: [25, 35, 75, 90]
    };
  }
};
</script>


