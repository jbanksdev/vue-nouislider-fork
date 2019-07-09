/*!
 * vue-nouislider-fork v1.0.19
 * (c) Jarrad Banks
 * Released under the MIT License.
 */
'use strict';

//
//
//
var noUiSlider = require("../nouislider.min.js");

require("../nouislider.min.css");

require("../nouislider-custom.css");

var script = {
  props: {
    id: {
      type: String,
      "default": function _default() {
        // stackoverflow.com/questions/10726909/
        return Math.random().toString(36).substr(2, 4);
      }
    },
    color: {
      type: String,
      "default": "#1867c0"
    },
    showThumb: {
      type: Boolean,
      "default": false
    },
    thumbColor: {
      type: String,
      "default": "#1867c0"
    },
    disabled: {
      type: Boolean
    },
    config: Object,
    value: Array,
    log: Boolean
  },
  data: function data() {
    return {
      init: false,
      upperHandleValue: 0,
      lowerHandleValue: 0,
      tooltips: false
    };
  },
  created: function created() {},
  computed: {
    slider: function slider() {
      return document.getElementById("v-nus-" + this.id);
    }
  },
  mounted: function mounted() {
    var _this = this;

    var vnus = this;
    vnus.config.start = vnus.value;

    if (vnus.config.tooltips == true) {
      vnus.config.tooltips = false;
      this.tooltips = true;
    }

    noUiSlider.create(vnus.slider, vnus.config);

    if (vnus.config.pips.mode == "range" && vnus.config.pips.density == 2 && vnus.config.pips.stepped == true && vnus.config.pips.type == "custom") {
      this.slider.getElementsByClassName("noUi-base")[0].appendChild(this.slider.getElementsByClassName("noUi-pips")[0]);
      this.slider.getElementsByClassName("noUi-base")[0].getElementsByClassName("noUi-pips")[0].classList.add("custom-pips");
    }

    if (!this.showThumb && this.tooltips) {
      this.slider.classList.add("noUi-hover-tooltips");
    }

    if (this.disabled) {
      this.disableSlider();
    }

    this.slider.style.marginBottom = "80px";
    this.colorConnectors(vnus); //set up custom tooltips

    var tooltipInputs = [];

    if (this.showThumb || this.tooltips) {
      for (var _i = 0; _i < vnus.config.start.length; _i++) {
        tooltipInputs.push(this.makeToolTip(_i, vnus.slider));
      }
    }

    vnus.slider.noUiSlider.on("change", function (values, handle, unencoded, tap, positions) {
      vnus.$emit("change", values);
    });
    vnus.slider.noUiSlider.on("update", function (values, handle) {
      //update custom tooltips
      if (_this.showThumb || _this.tooltips) {
        tooltipInputs[handle].innerText = Number(values[handle].toString(2));
      }

      _this.$emit("input", values);

      vnus.$emit("update", values);
      if (vnus.log) window.console.log("[vnus]<" + handle + ">" + values);
    });
    var handles = vnus.slider.getElementsByClassName("noUi-handle");

    if (this.config.connectColors) {
      var connect = vnus.slider.querySelectorAll(".noUi-connect");

      if (Array.from(connect).length == this.config.connectColors.length) {
        for (var i = 0; i < connect.length; i++) {
          this.isColorValid(this.config.connectColors[i]) ? connect[i].style.backgroundColor = this.config.connectColors[i] : connect[i].classList.add(this.config.connectColors[i]);
        }
      }
    }

    if (this.color) {
      Array.from(handles).forEach(function (el) {
        _this.isColorValid(_this.color) ? (el.style.backgroundColor = _this.color, el.style.borderColor = _this.color) : el.classList.add(_this.color);
      });
    }

    vnus.slider.noUiSlider.on("start", function (values, index, unencoded, tap, positions) {
      if (_this.showThumb == false && _this.tooltips) {
        var tooltip = Array.from(vnus.slider.getElementsByClassName("noUi-tooltip"))[index];
        tooltip.style.display = "flex";
      }

      var handle = Array.from(vnus.slider.getElementsByClassName("noUi-handle"))[index];
      handle.style.transform = "scale(0)";
    });
    vnus.slider.noUiSlider.on("end", function (values, index, unencoded, tap, positions) {
      if (_this.showThumb == false && _this.tooltips) {
        var tooltip = Array.from(vnus.slider.getElementsByClassName("noUi-tooltip"))[index];
        tooltip.style.display = "none";
      }

      var handle = Array.from(vnus.slider.getElementsByClassName("noUi-handle"))[index];
      handle.style.transform = "scale(1)";
    });
  },
  methods: {
    colorConnectors: function colorConnectors(vnus) {
      //get all connecting sliders
      var connectors = document.getElementsByClassName("noUi-connect"); //filter out non colored connectors

      var connectorColors = vnus.config.connectColors.filter(function (d, ind) {
        return vnus.config.connect[ind];
      }); //color each slider can be a class, hex, rgb etc

      for (var j = 0; j < connectors.length; j++) {
        var connector = connectors[j];
        this.isColorValid(connectorColors[j]) ? connector.style.backgroundColor = connectorColors[j] : connector.classList.add(connectorColors[j]);
      }
    },
    getColorCSS: function getColorCSS(c) {
      var ele = document.createElement("div");
      ele.style.color = c;
      return ele.style.color.split(/\s+/).join("").toLowerCase();
    },
    isColorValid: function isColorValid(c) {
      var s = this.getColorCSS(c);
      return s ? true : false;
    },
    makeToolTip: function makeToolTip(i, slider) {
      var tooltip = document.createElement("div"),
          span = document.createElement("span"),
          tooltip_overlay = document.createElement("div");
      this.isColorValid(this.color) ? (tooltip.style.backgroundColor = this.thumbColor, tooltip.style.borderColor = this.thumbColor) : tooltip.classList.add(this.thumbColor);
      tooltip_overlay.className = "noUi-handle-draggable-tooltip-overlay"; // Add the input to the tooltip

      tooltip.className = "noUi-tooltip";
      tooltip.appendChild(span); // On change, set the slider

      span.innerText = this.value;
      span.addEventListener("start", null); // Find the lower/upper slider handle and insert the tooltip

      var handles = Array.from(slider.querySelectorAll(".noUi-handle"));
      handles[i].appendChild(tooltip_overlay);
      handles[i].parentElement.appendChild(tooltip);
      return span;
    },
    disableSlider: function disableSlider() {
      var slider = document.getElementById("v-nus-" + this.id);
      this.disabled ? slider.setAttribute("disabled", this.disabled) : slider.removeAttribute("disabled");
    }
  },
  watch: {
    value: function value(nv) {
      if (this.init) {
        var nus = this.slider.noUiSlider.get();
        if (!Array.isArray(nus)) nus = [nus];
        if (JSON.stringify(nus) !== JSON.stringify(nv)) this.slider.noUiSlider.set(nv);
      } else {
        this.init = true;
      }
    },
    disabled: function disabled() {
      console.log(this.disabled);
      this.disableSlider();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": 'v-nus-' + _vm.id
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var VNus = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

var index = {
  install: function install(Vue, options) {
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("v-nus", VNus);
  }
};

module.exports = index;
