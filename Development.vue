<template>
  <div :id="'v-nus-' + id"></div>
</template>
<script>
require("./nouislider.min.js");
require("./nouislider.min.css");
require("./nouislider-custom.css");

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
      default: "#1867c0"
    },
    showThumb: {
      type: Boolean
    },
    thumbColor: {
      type: String,
      default: "#1867c0"
    },
    config: Object,
    value: Array,
    log: Boolean
  },
  data: function() {
    return {
      init: false,
      upperHandleValue: 0,
      lowerHandleValue: 0
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

    vnus.config.start = vnus.value;

    var showThumbs = false;

    if (vnus.config.tooltips == true) {
      vnus.config.tooltips = false;
      showThumbs = true;
    }

    noUiSlider.create(vnus.slider, vnus.config);

    //get all connecting sliders
    var connectors = document.getElementsByClassName("noUi-connect");
    //filter out non colored connectors
    var connectorColors = vnus.config.connectColors.filter(
      (d, ind) => vnus.config.connect[ind]
    );

    //color each slider can be a class, hex, rgb etc
    for (let j = 0; j < connectors.length; j++) {
      const connector = connectors[j];

      this.isColorValid(connectorColors[j])
        ? (connector.style.backgroundColor = connectorColors[j])
        : connector.classList.add(connectorColors[j]);
    }

    //set up custom tooltips
    var tooltipInputs = [];

    //only if they use showthumb prop!
    if (this.showThumb || showThumbs) {
      for (let i = 0; i < vnus.config.start.length; i++) {
        tooltipInputs.push(this.makeToolTip(i, vnus.slider));
      }
    }

    vnus.slider.noUiSlider.on("update", (values, handle) => {
      //update custom tooltips
      if (this.showThumb || showThumbs) {
        tooltipInputs[handle].innerText = Math.round(values[handle]);
      }
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

        if (!this.showThumb) {
          handle.style.width = "20px";
          handle.style.height = "20px";
          handle.style.top = "-9.5px";
          handle.style.right = "-17px";
        } else {
          handle.style.transform = "scale(0)";
        }
      }
    );

    vnus.slider.noUiSlider.on(
      "end",
      (values, index, unencoded, tap, positions) => {
        var handle = Array.from(
          vnus.slider.getElementsByClassName("noUi-handle")
        )[index];
        if (!this.showThumb) {
          handle.style.width = "15px";
          handle.style.height = "15px";
          handle.style.top = "-6.5px";
          handle.style.right = "-14px";
        } else {
          handle.style.transform = "scale(1)";
        }
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
    },
    makeToolTip(i, slider) {
      var tooltip = document.createElement("div"),
        span = document.createElement("span"),
        tooltip_overlay = document.createElement("div");

      this.isColorValid(this.color)
        ? ((tooltip.style.backgroundColor = this.thumbColor),
          (tooltip.style.borderColor = this.thumbColor))
        : tooltip.classList.add(this.thumbColor);

      tooltip_overlay.className = "noUi-handle-draggable-tooltip-overlay";

      // Add the input to the tooltip
      tooltip.className = "noUi-tooltip";
      tooltip.appendChild(span);

      // On change, set the slider
      span.innerText = this.value;

      span.addEventListener("start", null);
      // Find the lower/upper slider handle and insert the tooltip
      var handles = Array.from(slider.querySelectorAll(".noUi-handle"));

      handles[i].appendChild(tooltip_overlay);

      handles[i].parentElement.appendChild(tooltip);

      return span;
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
