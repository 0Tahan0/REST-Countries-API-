<template>
  <div class="relative dark:text-light text-lightText">
    <div class="container mx-auto">
      <div
        class="flex flex-wrap justify-between items-center mt-10 px-5 md:px-0"
      >
        <the-card
          class="rounded-md md:w-96 w-full dark:bg-dark2 bg-light p-0 px-2 md:px-2 md:p-0"
        >
          <div class="flex items-center text-lightInput">
            <fs-icon
              :icon="['fas', 'search']"
              class="w-10 text-sm md:text-base"
            />
            <input
              placeholder=" Search for a country..."
              class="outline-none py-2 flex-grow text-sm md:text-base bg-transparent"
              v-model="searchedValue"
            />
          </div>
        </the-card>

        <the-select
          title="Filter by Region"
          class="bg-light dark:bg-dark2 shadow-md rounded-md p-5 min-w-52 text-sm md:text-base mt-5 md:mt-0"
          optionClass="hover:bg-light2 dark:hover:bg-dark md:p-2 text-left capitalize rounded-md"
          maxHeight="fit-content"
          v-model="selectedRegion"
        >
          <option value="all">all</option>
          <option value="africa">africa</option>
          <option value="americas">americas</option>
          <option value="asia">asia</option>
          <option value="europe">europe</option>
          <option value="oceania">oceania</option>
        </the-select>
      </div>
      <div
        class="flex mt-10 flex-wrap gap-10 items-center justify-evenly lg:justify-between"
      >
        <transition-group
          enter-active-class="emergence"
          leave-active-class="shrinkage"
        >
          <the-card
            @click="showMoreDetails(country.name)"
            v-for="country in countries"
            :key="country.alpha3Code"
            class="h-80 w-64 py-0 px-0 md:py-0 md:px-0 overflow-hidden rounded-lg bg-light dark:bg-dark2 active:scale-95 md:hover:scale-95 transition-transform cursor-pointer"
          >
            <div class="h-1/2">
              <img
                :src="
                  isToiletPaper(country)
                    ? require('@/assets/images.jpg')
                    : country.flags.png
                "
                :alt="country.name"
                class="object-cover w-full min-full max-full h-full min-full max-full"
              />
            </div>
            <div class="p-4">
              <p class="font-bold capitalize text-md">
                {{ country.name }}
              </p>
              <div class="flex">
                <h4 class="font-medium capitalize">population:</h4>
                <p class="ms-2 text-base text-lightInput">
                  {{ country.population }}
                </p>
              </div>
              <div class="flex">
                <h4 class="font-medium capitalize">region:</h4>
                <p class="ms-2 text-base text-lightInput">
                  {{ country.region }}
                </p>
              </div>
              <div class="flex">
                <h4 class="font-medium capitalize">capital:</h4>
                <p class="ms-2 text-base text-lightInput">
                  {{ country.capital }}
                </p>
              </div>
            </div>
          </the-card>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<!-- 




 -->
<script>
export default {
  data() {
    return {
      selectedRegion: "all",
      searchedValue: "",
    };
  },
  computed: {
    countries() {
      return this.$store.state.countries
        .filter((country) =>
          this.selectedRegion != "all"
            ? country.region.toLocaleLowerCase() ==
              this.selectedRegion.toLocaleLowerCase()
            : country
        )
        .filter((country) =>
          this.searchedValue.trim() != ""
            ? country.name
                .toLocaleLowerCase()
                .match(this.searchedValue.toLocaleLowerCase())
            : country
        );
    },
  },
  methods: {
    isToiletPaper(country) {
      return country.name.toLocaleLowerCase() === "toilet paper";
    },

    showMoreDetails(key) {
      //   console.log(key);
      //   console.log(this.$route);
      if (key.toLocaleLowerCase() != "israel")
        this.$router.push({
          path: `/country/${key}`,
        });
    },
  },
};
</script>
