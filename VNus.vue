<template>
  <div :id="'v-nus-' + id"></div>
</template>
<script>
require("../nouislider.min.js");
require("../nouislider.min.css");
require("../nouislider-custom.css");

export default {
  props: {
    id: {
      type: String,
      default: function() {
        // stackoverflow.com/questions/10726909/
        return Math.random()
          .toString(36)
          .substr(2, 4);
      }
    },
    color: {
      type: String,
      default: "#eeeeee"
    },
    config: Object,
    value: Array,
    log: Boolean
  },
  data: function() {
    return {
      init: false
    };
  },
  created() {},
  computed: {
    slider: function() {
      return document.getElementById("v-nus-" + this.id);
    }
  },
  mounted: function() {
    var vnus = this;
    console.log(vnus);
    vnus.config.start = vnus.value;
    noUiSlider.create(vnus.slider, vnus.config);
    vnus.slider.noUiSlider.on("update", function(values, handle) {
      vnus.$emit("update", values);
      if (vnus.log) window.console.log("[vnus]<" + handle + ">" + values);
    });
    var handles = vnus.slider.getElementsByClassName("noUi-handle");

    if (this.config.connectColors) {
      var connect = vnus.slider.querySelectorAll(".noUi-connect");

      if (Array.from(connect).length == this.config.connectColors.length) {
        for (var i = 0; i < connect.length; i++) {
          this.isColorValid(this.config.connectColors[i])
            ? (connect[i].style.backgroundColor = this.config.connectColors[i])
            : connect[i].classList.add(this.config.connectColors[i]);
        }
      }
    }
    if (this.color) {
      Array.from(handles).forEach(el => {
        el.style.backgroundColor = "#eeeeee";
        this.isColorValid(this.color)
          ? ((el.style.backgroundColor = this.color),
            (el.style.borderColor = this.color))
          : el.classList.add(this.color);
      });
    }

    vnus.slider.noUiSlider.on(
      "start",
      (values, index, unencoded, tap, positions) => {
        var handle = Array.from(
          vnus.slider.getElementsByClassName("noUi-handle")
        )[index];

        handle.style.width = "20px";
        handle.style.height = "20px";
        handle.style.top = "-9px";
        handle.style.right = "-17px";
      }
    );

    vnus.slider.noUiSlider.on(
      "end",
      (values, index, unencoded, tap, positions) => {
        var handle = Array.from(
          vnus.slider.getElementsByClassName("noUi-handle")
        )[index];

        handle.style.width = "15px";
        handle.style.height = "15px";
        handle.style.top = "-6px";
        handle.style.right = "-14px";
      }
    );
  },
  methods: {
    getColorCSS(c) {
      var ele = document.createElement("div");
      ele.style.color = c;
      return ele.style.color
        .split(/\s+/)
        .join("")
        .toLowerCase();
    },
    isColorValid(c) {
      var s = this.getColorCSS(c);
      return s ? true : false;
    }
  },
  watch: {
    value: function(nv) {
      if (this.init) {
        var nus = this.slider.noUiSlider.get();
        if (!Array.isArray(nus)) nus = [nus];
        if (JSON.stringify(nus) !== JSON.stringify(nv))
          this.slider.noUiSlider.set(nv);
      } else {
        this.init = true;
      }
    }
  }
};
</script>
