/*!
 * vue-nouislider-fork v1.0.0
 * (c) Jarrad Banks
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));

//
//
//
require("./nouislider.min.js");

require("./nouislider.min.css");

require("./nouislider-custom.css");

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
      "default": "#eeeeee"
    },
    config: Object,
    value: Array,
    log: Boolean
  },
  data: function data() {
    return {
      init: false
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
    console.log(vnus);
    vnus.config.start = vnus.value;
    noUiSlider.create(vnus.slider, vnus.config);
    vnus.slider.noUiSlider.on("update", function (values, handle) {
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
        el.style.backgroundColor = "#eeeeee";
        _this.isColorValid(_this.color) ? (el.style.backgroundColor = _this.color, el.style.borderColor = _this.color) : el.classList.add(_this.color);
      });
    }

    vnus.slider.noUiSlider.on("start", function (values, index, unencoded, tap, positions) {
      var handle = Array.from(vnus.slider.getElementsByClassName("noUi-handle"))[index];
      handle.style.width = "20px";
      handle.style.height = "20px";
      handle.style.top = "-9px";
      handle.style.right = "-17px";
    });
    vnus.slider.noUiSlider.on("end", function (values, index, unencoded, tap, positions) {
      var handle = Array.from(vnus.slider.getElementsByClassName("noUi-handle"))[index];
      handle.style.width = "15px";
      handle.style.height = "15px";
      handle.style.top = "-6px";
      handle.style.right = "-14px";
    });
  },
  methods: {
    getColorCSS: function getColorCSS(c) {
      var ele = document.createElement("div");
      ele.style.color = c;
      return ele.style.color.split(/\s+/).join("").toLowerCase();
    },
    isColorValid: function isColorValid(c) {
      var s = this.getColorCSS(c);
      return s ? true : false;
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
    }
  }
};

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

var VNus = __vue_normalize__({
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
