<script setup lang="ts">
defineProps(["modelValue", "label"]);
defineEmits(["update:modelValue"]);
</script>
<template>
  <div
    class="nui-focus group/nui-checkbox relative flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center overflow-hidden"
  >
    <input
      :value="modelValue"
      :true-value="true"
      :false-value="false"
      @input="$emit('update:modelValue', $event.target?.checked)"
      class="peer absolute z-20 h-4 w-4 cursor-pointer opacity-0"
      type="checkbox"
      v-bind="$attrs"
    />
    <div
      class="border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current"
    ></div>
    <svg
      aria-hidden="true"
      viewBox="0 0 17 12"
      class="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
    >
      <path
        fill="currentColor"
        d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
      ></path></svg
    ><svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      class="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
        d="M2 12h20"
      ></path>
    </svg>
  </div>
  <div class="inline-flex flex-col">
    <label
      :for="$attrs.id"
      class="text-muted-400 ms-1 cursor-pointer select-none font-sans text-sm"
      >{{ label }}</label
    >
  </div>
</template>
