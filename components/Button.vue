<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
}>();
</script>
<template>
  <button
    v-bind="$attrs"
    class="is-button rounded bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 h-8 w-full sm:w-32"
  >
    <div
      v-if="loading"
      class="nui-placeload animate-nui-placeload h-4 w-12 rounded"
    ></div>
    <span v-else> <slot></slot> </span>
  </button>
</template>
