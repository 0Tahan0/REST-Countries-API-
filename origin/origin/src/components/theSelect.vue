<template>
  <button
    class="p-1 w-fit relative min-w-20 m-1"
    @click="open = !open"
    :style="open ? 'z-index:41 ' : ''"
  >
    <div class="flex justify-between items-center">
      <!-- <slot #title></slot> -->
      <span ref="title" class="mx-0.5">
        <span v-if="title != ''">{{ title }}</span>
        <slot v-else name="title"></slot>
      </span>
      <fs-icon
        :icon="['fas', 'angle-down']"
        class="transition"
        :class="open ? 'rotate-180' : ''"
      />
    </div>
    <transition enter-active-class="emergence" leave-active-class="shrinkage">
      <the-card
        style="border-radius: inherit"
        SELECTVUE_
        v-show="open"
        :style="maxHeight ? `max-height:${maxHeight}` : ''"
        :class="{ 'max-h-36': !maxHeight }"
        class="bg-inherit absolute left-0 -bottom-2 translate-y-full min-w-full w-fit overflow-y-auto border dark:border-gray-700 px-0.5 py-0.5 md:px-0.5 md:py-0.5 z-50"
      >
        <div ref="content">
          <slot></slot>
        </div>
      </the-card>
    </transition>
  </button>
</template>
<script>
export default {
  emits: ["change", "update:modelValue"],
  props: {
    modelValue: {},
    title: {
      type: String,
      default: "",
    },
    optionClass: {
      type: String,
      default: null,
    },
    maxHeight: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    selectItem(el) {
      const title = this.$refs.title;
      title.innerHTML = el.innerHTML;
      const val = el.attributes["value"].value;
      this.$emit("change", val);
      this.$emit("update:modelValue", val);
    },
  },
  mounted() {
    const content = this.$refs.content;
    const title = this.$refs.title;

    const options = Array.from(content.querySelectorAll("option")).concat(
      Array.from(content.querySelectorAll("[option]"))
    );

    if (options.length != 0) {
      options.forEach((op) => {
        op.className = `px-0.5 py-1 text-xs md:text-sm ${
          this.optionClass != null
            ? this.optionClass
            : "hover:bg-primary  text-black dark:text-white hover:text-white cursor-pointer"
        }`;
        op.addEventListener("click", () => this.selectItem(op));
      });
      if (title.textContent == "" && this.title == "")
        title.innerHTML = options[0].innerHTML;
    }
  },
  watch: {
    open(val) {
      if (val) {
        const element = this.$el;
        document.addEventListener("click", (event) => {
          if (!element.contains(event.target)) this.open = false;
        });
      }
    },
    modelValue(val) {
      const content = this.$refs.content;
      const options = Array.from(content.querySelectorAll("option")).concat(
        Array.from(content.querySelectorAll("[option]"))
      );
      const el = options.find((opt) => opt.attributes["value"].value === val);
      if (el) this.selectItem(el);
    },
  },
};
</script>
<style scoped>
/* [SELECTVUE_]::-webkit-scrollbar {
  width: 5px;
  height: 3px;
} */
/* [SELECTVUE_]::-webkit-scrollbar-thumb {
  background: silver;
} */
.fade {
  animation: fade 0.2s ease-in;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-out {
  animation: fade-out 0.2s ease-out;
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.emergence {
  animation: emergence 0.2s ease-out;
}
@keyframes emergence {
  0% {
    opacity: 0;
    scale: 0.9;
  }
  50% {
    opacity: 1;
    scale: 1.1;
  }
  100% {
    scale: 1;
  }
}
.shrinkage {
  animation: shrinkage 0.2s ease-out;
}
@keyframes shrinkage {
  0% {
    scale: 1;
  }
  50% {
    opacity: 0.5;
    scale: 0.9;
  }
  100% {
    opacity: 0;
    scale: 0.7;
  }
}
</style>
