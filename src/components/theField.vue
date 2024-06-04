<template>
  <div
    class="inline"
    v-if="type === 'text' || type === 'number' || type === 'password'"
  >
    <div
      @click="focusInp()"
      ref="inpBox"
      class="w-full flex items-center"
      :class="isField"
      :toolTip="toolTip"
    >
      <span @click="$emit('iconClick', $event)">
        <fs-icon :icon="icon" v-if="icon" class="_Icon"> </fs-icon>
      </span>
      <input
        @focus="focusBox()"
        @input="inputModel($event.target)"
        :toolTip="toolTip"
        :value="modelValue != null ? modelValue : value"
        :type="type"
        class="flex-grow p-1 bg-transparent focus:outline-none"
        :placeholder="placeholder"
        :id="id"
      />
    </div>
    <p class="p-1 text-xs md:text-sm text-red-500">
      <span v-show="validErorr">
        {{ getValidMsg }}
      </span>
    </p>
  </div>
</template>
<script>
export default {
  emits: ["update:modelValue", "iconClick"],
  props: {
    modelValue: { type: String },
    validaion: {
      type: Object,
      default: function () {
        return { status: null };
      },
    },
    icon: {},
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: undefined,
    },
    placeholder: {},
    id: {},
  },
  data() {
    return {};
  },
  computed: {
    getValidMsg() {
      if (this.validErorr) return this.validaion.msg;
      return "";
    },
    isField() {
      let cls = "relative   ";
      if (this.icon) cls += " px-2 ";
      if (this.validErorr) cls += "  bg-red-500/10  ring-red-500 ";
      else if (this.validErorr == false)
        cls += " bg-green-500/10 ring-green-500";
      else cls += "  ring-gray-300 dark:ring-gray-700";
      return cls;
    },
    validErorr() {
      return this.validaion.status == true || this.validaion == true
        ? false
        : this.validaion.status == false || this.validaion == false
        ? true
        : null;
    },
  },
  methods: {
    focusBox() {
      try {
        const box = this.$refs.inpBox;

        box.classList.remove("ring-red-500");
        box.classList.remove("ring-green-500");
        box.classList.add("dark:ring-gray-700");
        box.classList.add("ring-gray-400");
        box.classList.remove("bg-green-500/10");
        box.classList.remove("bg-red-500/10");
      } catch (e) {
        return;
      }
    },
    focusInp() {
      this.$refs.inpBox.querySelector("input").focus();
    },
    inputModel(e) {
      this.$emit("update:modelValue", e.value);
    },

    update(e) {
      let isChecked = e.target.checked;
      let val = [...this.modelValue];
      if (isChecked) val.push(this.value);
      else val = val.filter((v) => v != this.value);
      this.$emit("update:modelValue", val);
    },
  },
};
</script>
