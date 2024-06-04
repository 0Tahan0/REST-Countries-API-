<template>
  <div class="bg-light2 dark:bg-dark h-fit overflow-x-hidden select-none">
    <!-- <transition
      enter-active-class="slide-to-right"
      leave-active-class="slide-to-left"
    > -->
    <router-view class="min-h-screen" v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.page-enter-active {
  animation: emergence 0.3s ease-out;
}
/* .page-enter-active, */
.page-leave-active {
  transition: 0.2s ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
/* .page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateX(0%);
} */
</style>
