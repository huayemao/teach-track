<script setup lang="ts">
import {
DEFAULT_TEACHER_METRIC_CONFIG,
DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION,
FIELD_LABEL_MAPPING,
GRADE_MAPPING,
SCHOOLS,
} from "@/constants/index";

// todo: 还应包括配置参数。
type Payload = {
  fileList: FileList | null;
  byRegion: boolean;
};
const emit = defineEmits<{
  (e: "confirm", payload: Payload): void;
}>();

const props = defineProps<{
  title: string;
  loading: boolean;
  grade: number;
}>();

const byRegion = ref(props.grade > 6);
const enableConsolidationRate = ref(props.grade > 6);
const xslx = ref<FileList | null>(null);

const handleSubmit = () => {
  emit("confirm", {
    fileList: xslx.value,
    byRegion: byRegion.value,
  });
};

/* todo: 画出结构示例 */

const route = useRoute();
if (!route.params.grade) {
  throw Error("路由错误");
}
const gradeKey = Number(route.params.grade);
const gradeName = GRADE_MAPPING[gradeKey];
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
                <div class="text-xl font-semibold text-muted-600">
                  {{ gradeName }}
                </div>
              </div>
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                  <div class="relative">
                    <BaseInputFile v-model="xslx" :text-value='(fileList: FileList | null) => {
                      if (!fileList?.item?.length) {
                        return "未选择文件";
                      } return fileList?.item.length === 1 ? fileList.item(0)?.name
                        ?? "Invalid file selected" : `${fileList?.item?.length ?? 0} files selected`;
                    }' id="xlsx" :label="`上传${gradeName}成绩数据`" placeholder="选择文件" accept=".xlsx, .xls" />
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
            <div class="col-span-12">
              <div class="relative gap-1 text-muted-400">
                <div class="text-muted-500 dark:text-muted-400 mb-2 select-none font-sans text-sm">
                  权重配置
                </div>

                <div class="absolute top-0 right-0 inline-flex items-center gap-1 text-muted-400">
                  <BaseCheckbox label="按区域配置权重" v-model="byRegion" id="byRegion" />
                </div>
                <el-table v-if="!byRegion" :data="DEFAULT_TEACHER_METRIC_CONFIG" striped class="border">
                  <el-table-column v-for="item in Object.keys(DEFAULT_TEACHER_METRIC_CONFIG[0])" header-align="center"
                    align="center" :key="item" :prop='item' :label="FIELD_LABEL_MAPPING['METRIC_CONFIG'][item]"
                    label-class-name="text-center" />
                </el-table>
                <el-table v-if="!!byRegion" :data="DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION" striped class="border">
                  <el-table-column v-for="item in Object.keys(DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION[0])"
                    :label="FIELD_LABEL_MAPPING['METRIC_CONFIG'][item]" header-align="center" align="center" :key="item"
                    :prop='item' label-class-name="text-center" />
                </el-table>
              </div>
            </div>
            <div class="col-span-12" v-if="!!byRegion">
              <div class="relative w-full">
                <div class="text-muted-500 dark:text-muted-400 mb-2 select-none font-sans text-sm">
                  学校-区域划分
                </div>

                <el-table :data="SCHOOLS" height="200px" striped class="border w-full">
                  <el-table-column header-align="center" align="center" prop="区域类别" label="区域"
                    label-class-name="text-center" />
                  <el-table-column header-align="center" align="center" prop="学校名称" label="学校"
                    label-class-name="text-center" />
                </el-table>
              </div>
            </div>
            <div class="col-span-6">
              <BaseCheckbox label="考核学校巩固率" v-model="enableConsolidationRate" id="enableConsolidationRate" />
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
            <BaseButton color="primary" type="submit" shadow="flat" :loading="$props.loading" :disabled="$props.loading">
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
