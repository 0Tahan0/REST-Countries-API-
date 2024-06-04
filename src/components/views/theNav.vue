<template>
  <the-card class="py-6 dark:bg-dark2 bg-light sticky top-0 left-0 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <p class="text-md md:text-lg lg:text-xl font-medium">
        Where in the world?
      </p>
      <the-select
        class="font-meduim flex-shrink-0 text-xs sm:text-sm md:text-base capitalize flex justify-between rounded-md dark:bg-dark2 bg-light"
        optionClass="hover:bg-light2 dark:hover:bg-dark py-3 rounded capitalize text-sm font-meduim flex items-center justify-evenly"
        v-model="mode"
      >
        <div option value="dark">
          <fs-icon :icon="['far', 'moon']" class="me-2" />
          <span>dark mode</span>
        </div>
        <div option value="light">
          <fs-icon :icon="['fas', 'sun']" class="me-2" />
          <span>light mode</span>
        </div>
      </the-select>
    </div>
  </the-card>
</template>
<script>
export default {
  data() {
    return {
      mode: "",
    };
  },
  methods: {
    changeMode() {
      const html = document.querySelector(":root");
      localStorage.setItem("[resetCountries]-mode", this.mode);
      html.setAttribute("data-mode", this.mode);
    },
    setMode() {
      if (localStorage.getItem("[resetCountries]-mode")) {
        this.mode = localStorage.getItem("[resetCountries]-mode");
        // this.mode = "dark";
      } else this.mode = "light";
    },
  },
  watch: {
    mode() {
      this.changeMode();
    },
  },
  mounted() {
    this.setMode();
  },
};
</script>
