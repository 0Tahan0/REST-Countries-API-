<template>
  <notFound v-if="!country" />
  <div v-else class="h-fit flex flex-col" ref="countryView">
    <the-nav></the-nav>

    <div
      class="container mx-auto mt-10 flex-grow flex flex-col text-lightText dark:text-light md:px-0 px-5"
    >
      <the-button
        class="flex justify-evenly items-center max-w-20"
        @click="back()"
      >
        <fs-icon :icon="['fas', 'arrow-left']" />
        <span>Back</span>
      </the-button>
      <div class="flex md:gap-10 md:flex-row flex-col h-full mt-10 mb-5">
        <div class="md:w-1/2 flex justify-center items-center">
          <img
            :src="
              country.name.toLocaleLowerCase() === 'toilet paper'
                ? require('@/assets/images.jpg')
                : country.flags.png
            "
            :alt="country.flags.alt"
            class="object-cover w-full"
            style="max-height: 400px"
          />
        </div>
        <div class="md:w-1/2 flex-grow mt-10 md:mt-0">
          <h4 class="text-md capitalize font-bold text-lg md:text-4xl">
            {{ country.name }}
          </h4>
          <div class="flex justify-between flex-col sm:flex-row">
            <ul class="space-y-2 mt-4">
              <li class="" v-for="i in info" :key="i.key">
                <span class="capitalize text-sm md:text-base font-medium"
                  >{{ i.key }}:</span
                ><span class="md:text-base text-sm ms-2 text-lightInput">{{
                  country[i.value]
                }}</span>
              </li>
            </ul>
            <ul class="space-y-2 mt-4">
              <li class="">
                <span class="capitalize text-sm md:text-base font-medium"
                  >top level domain :</span
                ><span class="md:text-base text-sm ms-2 text-lightInput">{{
                  getDomain
                }}</span>
              </li>
              <li class="">
                <span class="capitalize text-sm md:text-base font-medium"
                  >currencies :</span
                ><span class="md:text-base text-sm ms-2 text-lightInput">{{
                  getCurrencies
                }}</span>
              </li>
              <li class="">
                <span class="capitalize text-sm md:text-base font-medium"
                  >languages :</span
                ><span class="md:text-base text-sm ms-2 text-lightInput">{{
                  getLanguages
                }}</span>
              </li>
            </ul>
          </div>
          <div class="flex gap-2 flex-wrap mt-4">
            <span
              class="capitalize text-sm md:text-base font-medium md:w-auto w-full"
              >border countries:</span
            >
            <router-link
              v-for="border in getBorderCountries"
              :key="border"
              :to="`/country/${border.name}`"
            >
              <the-button>
                {{ border.name }}
              </the-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import notFound from "./notFound.vue";
export default {
  props: ["id"],
  components: { notFound },
  data() {
    return {
      country: null,
      info: [
        {
          key: "native name",
          value: "nativeName",
        },
        {
          key: "population",
          value: "population",
        },
        {
          key: "region",
          value: "region",
        },
        {
          key: "sub region",
          value: "subregion",
        },
        {
          key: "capital",
          value: "capital",
        },
      ],
      info2: [
        {
          key: "currencies",
          value: "this.country.currencies",
        },
        {
          key: "languages",
          value: "this.country.languages",
        },
      ],
    };
  },
  created() {
    this.getData(this.id);
  },
  watch: {
    id(val) {
      this.getData(val);
    },
  },
  computed: {
    getBorderCountries() {
      if (this.country) {
        return this.country.borders
          ? this.country.borders.map((c) => {
              return (c = this.$store.getters.getCountry({
                key: "alpha3Code",
                value: c,
              }));
            })
          : "";
      }
      return "";
    },
    getDomain() {
      return this.country.topLevelDomain.join().replaceAll(",", " , ");
    },
    getCurrencies() {
      if (this.country) {
        return this.country.currencies
          ? this.country.currencies
              .map((c) => (c = c.name))
              .join()
              .replaceAll(",", " , ")
          : "unknown";
      }
      return "";
    },
    getLanguages() {
      if (this.country) {
        return this.country.languages
          ? this.country.languages
              .map((c) => (c = c.name))
              .join()
              .replaceAll(",", " , ")
          : "unknown";
      }
      return "";
    },
  },
  methods: {
    back() {
      this.$router.push({ path: "/" });
    },
    getData(id) {
      this.country = this.$store.getters.getCountry({
        key: "name",
        value: id,
      });
    },
  },
};
</script>
