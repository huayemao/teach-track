<script setup lang="ts">
const props = defineProps<{
  title: string;
  subTitle: string;
  canOutput: boolean
}>();
defineEmits(["outputBtnClicked", 'editBtnClicked']);
</script>
<template>
  <div class="h-48 dark:bg-muted-800 absolute start-0 top-0 w-full bg-white"></div>
  <div class="h-32 ltablet:flex-row relative flex w-full flex-col lg:h-36 lg:flex-row">
    <div class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row">
      <div class="ltablet:text-left text-center lg:text-left">
        <h2
          class="font-heading text-xl font-semibold leading-normal ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start">
          <span class="text-muted-800 dark:text-white">{{ title }}</span>
        </h2>
        <span class="text-muted-400 mb-4 block font-sans text-base"> {{ subTitle }} </span>
      </div>
    </div>
    <div
      class="gap-2 ltablet:justify-start ltablet:ms-auto ltablet:mt-0 mt-4 flex shrink-0 justify-center lg:ms-auto lg:mt-0 lg:justify-start">
      <BaseButton condensed color="primary" @click="$emit('outputBtnClicked')" :disabled="!props.canOutput">
        <span>导出</span>
        <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
      </BaseButton>
      <BaseButton condensed @click="$emit('editBtnClicked')"><span>编辑</span>
        <Icon name="lucide:edit" class="me-1 h-4 w-4" />
      </BaseButton>
    </div>
  </div>
</template>
