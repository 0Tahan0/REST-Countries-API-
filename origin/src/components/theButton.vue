<template>
  <button
    :disabled="disabled"
    class="shadow-md shadow-black/25 min-w-24 px-2 py-1 capitalize text-xs md:text-sm transition-transform"
    :class="isDisabled"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDisabled() {
      if (this.disabled) {
        return "bg-gray-300 dark:bg-gray-600 text-gray-400 ";
      }
      return "bg-light dark:bg-dark2 rounded-sm  md:hover:scale-105  dark:ring-offset-dark  active:scale-90 ";
    },
  },
};
</script>
