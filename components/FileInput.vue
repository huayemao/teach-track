<script setup lang="ts">
const fileInput = ref();

defineProps(["modelValue", "label"]);
const emit = defineEmits<{
  (e: "update:modelValue", fileList: FileList | null): void;
}>();

const handleFileChange = (e) => {
  emit(
    "update:modelValue",
    (fileInput.value?.files || null) as FileList | null
  );
};
</script>

<template>
  <label class="nui-label w-full pb-1 text-[0.825rem]" for="ninja-input-305">{{
    label || "导入数据"
  }}</label>
  <div class="group/nui-input-file relative">
    <label
      tabindex="0"
      class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer flex w-full cursor-pointer items-center overflow-hidden border bg-white font-sans transition-colors duration-300 focus-within:outline-1 disabled:cursor-not-allowed disabled:opacity-75 h-10 text-[0.825rem] leading-5 gap-2"
      :for="$attrs.id"
      ><div
        class="group-hover/nui-input-file:text-primary-500 bg-muted-50 border-muted-300 dark:border-muted-700 dark:bg-muted-800 text-muted-400 group-focus-within/nui-input-file:text-primary-500 pointer-events-none flex shrink-0 items-center justify-center gap-1 border border-s-0 transition-colors duration-100 group-disabled/nui-input-file:cursor-not-allowed peer-disabled:opacity-75 h-10 px-3"
      >
        <span class="text-xs">上传文件</span
        ><!---->
      </div>
      <div class="inline-flex truncate">
        {{ fileInput?.files?.[0]?.name }}
      </div>
      <input
        ref="fileInput"
        @change="handleFileChange"
        v-bind="$attrs"
        type="file"
        class="hidden"
    /></label>
  </div>
</template>
