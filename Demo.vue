<template>
  <div>
    <v-nus
      :id="'test-slider'"
      :config="config"
      color="primary"
      :value="values"
      @update="values = $event"
    ></v-nus>
    <p style="margin-top:2rem">{{ values }}</p>
  </div>
</template>
<script>
import VNus from "./VNus.vue";
export default {
  components: {
    VNus
  },
  data() {
    return {
      config: {
        connect: [true, true, true],
        connectColors: ["blue", "red", "orange"],
        range: {
          min: [0],
          max: [100]
        }
      },
      values: [25, 75]
    };
  }
};
</script>
