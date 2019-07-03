# Vue noUiSlider

a Vue component for [noUiSlider](https://github.com/leongersen/noUiSlider)

## Install

```html
npm i vue-nouislider-fork
```

## main.js

```html
import VNus from "vue-nouislider-fork";
import Vue from "vue";

Vue.use(VNus);
```

## Basic Usage

### Template

```html
<v-nus :config="config" :value="values" @update="values = $event" />
```

### JS

```javascript
data: {
  config: {
    connect: [true, true, true],
    connectColors: ["blue", "red", "orange"],
    range: {
      min: [0],
      max: [100]
    }
  },
  values: [25, 75]
}
```

## Advanced Usage


### Customize Handle/Thumb Colors

```html
Accepts HEX, RGB and classes.
<v-nus :color="red" thumb-color="red" :thumb-show="true" :config="config" :value="values" />
```

### Disable Slider

```html
Disable the slider.
<v-nus :config="config" :value="values" :disabled='true'/>
```

### Customize ID

```html
Prefixed with 'v-nus'.
<v-nus :id="custom-id" :config="config" :value="values" />
```

### Show Log

```html
<v-nus :log="true" :config="config" :value="values" />
```

## References

* Forked From [vue-nouislider (horans)](https://github.com/horans/vue-nouislider)

* Inspiration: [VueJS-noUiSlider](https://github.com/BradKriss/VueJS-noUiSlider)
* Linter: [standard](https://github.com/standard/standard)

## Change Log

