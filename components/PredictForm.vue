<script setup lang="ts">
import { JUNIOR_SCHOOLS } from "@/constants/index";

// todo: 还应包括配置参数。
type Payload = {
  fileList: FileList | null;
  byRegion: boolean;
};
const emit = defineEmits<{
  (e: "confirm", payload: Payload): void;
}>();

const props = defineProps<{
  loading: boolean;
}>();

const byRegion = ref(false);
const xslx = ref<FileList | null>(null);

const handleSubmit = () => {
  emit("confirm", {
    fileList: xslx.value,
    byRegion: byRegion.value,
  });
};

const route = useRoute();
</script>
<template>
  <div class="">
    <div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
      <div
        class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full">
        <div>
          <h2 class="font-heading text-xl font-light leading-tight text-muted-800 dark:text-white">
            <span>预测目标完成成绩</span>
          </h2>
          <p class="font-alt text-sm font-normal leading-normal">
            <span class="text-muted-500"> 导入九年级预测目标完成成绩表 </span>
          </p>
        </div>
      </div>
      <div class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start">
        <button type="button"
          class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
            class="icon h-3 w-3" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m12 19l-7-7l7-7m7 7H5"></path>
          </svg><span>取消</span>
        </button>
      </div>
    </div>
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
                    2022元谋县教学质量分析报表——预测目标完成成绩
                  </div>
                </div>
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-12">
                    <div class="relative">
                      <BaseInputFile v-model="xslx" id="xlsx" label="导入九年级预测目标完成成绩" />
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
              <div class="col-span-12" v-if="!!byRegion">
                <div class="relative w-full">
                  <div class="text-muted-500 dark:text-muted-400 mb-2 select-none font-sans text-sm">
                    学校-区域划分
                  </div>

                  <el-table :data="JUNIOR_SCHOOLS" height="200px" striped class="border w-full">
                    <el-table-column header-align="center" align="center" prop="区域类别" label="区域"
                      label-class-name="text-center" />
                    <el-table-column header-align="center" align="center" prop="学校名称" label="学校"
                      label-class-name="text-center" />
                  </el-table>
                </div>
              </div>
              <!-- <div class="ltablet:col-span-4 col-span-12 lg:col-span-4">
                <div class="relative">
                  <label
                    class="nui-label w-full pb-1 text-[0.825rem]"
                    for="ninja-input-85"
                    >Status</label
                  >
                  <div class="group/nui-select relative">
                    <select
                      id="ninja-input-85"
                      class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full cursor-pointer appearance-none border bg-white font-sans focus:shadow-lg px-2 pe-9 h-10 py-2 text-sm leading-5 px-3 pe-6 rounded px-3"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div
                      class="text-muted-400 pointer-events-none absolute end-0 top-0 flex items-center justify-center transition-transform duration-300 group-focus-within/nui-select:-rotate-180 h-10 w-10"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        class="h-4 w-4"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m6 9 6 6 6-6"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div> -->
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
  </div>
</template>
