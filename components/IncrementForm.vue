<script setup lang="ts">

import { Report } from '@/constants/index';
import { getFullReportTitle } from '@/utils/biz/report';

// todo: 还应包括配置参数。
type Payload = {
  fileList: FileList | null;
  byRegion: boolean;
};
const emit = defineEmits<{
  (e: "confirm", payload: Payload): void;
}>();

const props = defineProps<{
  loading?: boolean;
  report: Report
}>();

const byRegion = ref(false);
const xslx = ref<FileList | null>(null);

const handleSubmit = () => {
  emit("confirm", {
    fileList: xslx.value,
    byRegion: byRegion.value,
  });
};

const title = getFullReportTitle(props.report)

</script>
<template>
  <div
    class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md">
    <form @submit.prevent="handleSubmit" action=""
      class="divide-muted-200 dark:divide-muted-700 grid divide-x sm:grid-cols-2">
      <div shape="curved" class="bg-muted-50 dark:bg-muted-800/60 space-y-8 p-10">
        <div class="mx-auto flex w-full max-w-[410px] flex-col">
          <div>
            <div>
              <div class="relative mb-5 flex flex-col items-center justify-center gap-4">
                <div class="relative">
                  {{ title }}——教学质量增量
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                  <div class="relative">
                    <BaseInputFile v-model="xslx" id="xlsx" label="导入九年级学生入学成绩" />
                  </div>
                </div>
              </div>
              <div class="mb-6 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div shape="curved" class="w-full space-y-8 p-10">
        <div class="mx-auto w-full max-w-[410px]">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12"></div>
          </div>
          <div class="mt-5 flex flex-col-reverse text-right md:block md:space-x-3">
            <BaseButton color="primary" type="submit" shadow="flat" :disabled="$props.loading">
              生成报表
            </BaseButton>
            <!-- <button
                type="button"
                class="is-button rounded is-button-default w-full sm:w-32"
              >
                查看结果
              </button> -->
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
