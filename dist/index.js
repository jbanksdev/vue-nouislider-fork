/*!
 * vue-nouislider-fork v1.0.8
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
