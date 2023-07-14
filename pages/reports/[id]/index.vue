<script setup lang="tsx">
import { useStorageState } from "@/composables/storage";
import {
DEFAULT_SUBMISSIONS,
GRADE_MAPPING,
REPORT_ID_EDU_STAGE_MAPPING,
} from "@/constants/index";
import { SchoolInfo, TeacherInfo } from "@/utils/process";
import { getGradeResults } from "@/utils/store";

const route = useRoute();

const reportId = route.params.id.toString();

const stage = REPORT_ID_EDU_STAGE_MAPPING[reportId];

const { data: predictData } = useStorageState([stage, "predict"].join("-"));
const { data: incrementData } = useStorageState([stage, "increment"].join("-"));

const allGradeData = ref<
  Record<
    number,
    {
      teachers: TeacherInfo[] | undefined;
      schools: SchoolInfo[] | undefined;
    }
  >
>();

const Item = ({
  name,
  to,
  description,
  status,
}: {
  name: string;
  to: object | string;
  description?: string;
  status?: string;
}) => (
  <NuxtLink to={to} class="flex items-center gap-3">
    <div class="nui-focus block focus-within:outline-current is-checked">
      <div
        class={
          "peer-disabled:opacity-75 w-8 h-8 " +
          (status === "finished" ? "text-success-500" : "text-muted-400")
        }
      >
        <svg viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="currentColor"
          ></circle>
          {status == "finished" && (
            <path
              fill="none"
              stroke="currentColor"
              d="m14.1 27.2 7.1 7.2 16.7-16.8"
            ></path>
          )}
        </svg>
      </div>
    </div>
    <div>
      <h4 class="font-heading text-sm font-light leading-tight text-muted-800 dark:text-white">
        <span>{name}</span>
      </h4>
      <p class="font-alt text-xs font-normal leading-normal leading-normal">
        <span class="text-muted-400">{description}</span>
      </p>
    </div>
  </NuxtLink>
);

const items4school = computed(() => {
  const gradeResultFinished =
    allGradeData.value &&
    Object.values(allGradeData.value).every((e) => e?.schools);

  return [
    {
      name: "年级教学综合成绩",
      description: gradeResultFinished
        ? "已生成"
        : "待录入数据：九年级入学成绩",
      status: gradeResultFinished ? "finished" : "",
      to: ".",
    },
    {
      name: "预测完成目标",
      description: predictData.value
        ? "已生成"
        : "待录入数据：九年级预测目标完成情况统计表",
      to: { name: route.name?.toString() + "-predict" },
      status: predictData.value ? "finished" : "",
    },
    // todo: 实际要导入的是九年级入学成绩。。。
    {
      name: "教学质量增量",
      description: incrementData.value
        ? "已生成"
        : "待录入数据：九年级入学成绩",
      to: { name: route.name?.toString() + "-increment" },
      status: incrementData.value ? "finished" : "",
    },
  ];
});

onMounted(async () => {
  const grades = DEFAULT_SUBMISSIONS.filter((e) => e.eduStage === stage).map(
    (e) => e.grade
  );

  const resultsByGrade = await getGradeResults(grades);
  allGradeData.value = resultsByGrade;
});
// todo: 图片用 initial
// 汇总报告，暂无
</script>
<template>
  <div class="grid grid-cols-3 gap-6">
    <div>
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl bg-muted-200 flex h-full flex-col border-0 p-8"
      >
        <div class="mb-5">
          <h2
            class="font-heading text-3xl font-light leading-tight text-muted-800 mb-2 dark:text-white"
          >
            <span>学校教学质量</span>
          </h2>
          <p class="font-alt text-sm font-normal leading-normal">
            <span class="text-muted-400">
              年级教学综合成绩|预测完成目标|九年级入学成绩表
            </span>
          </p>
        </div>
        <div class="mb-4 mt-auto flex items-center gap-2">
          <div class="text-4xl"><span>🎉</span></div>
          <div>
            <p class="font-alt text-xs font-normal leading-normal">
              <span class="text-muted-400 mb-2">进度</span>
            </p>
            <h4
              class="font-heading text-base font-light leading-tight text-muted-800 dark:text-white"
            >
              <span>报表制作完成</span>
            </h4>
          </div>
        </div>
        <div>
          <button
            data-v-71bb21a6=""
            type="button"
            class="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 h-11 w-full"
          >
            <span>导出完整报表</span>
          </button>
        </div>
      </div>
    </div>

    <div>
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl p-6"
      >
        <div class="mb-8 flex items-center justify-between">
          <h3
            class="font-heading text-base font-semibold leading-tight text-muted-800 dark:text-white"
          >
            <span>学科教师教学质量</span>
          </h3>
          <!-- <a
            aria-current="page"
            href="/dashboards/personal-3#"
            class="router-link-active router-link-exact-active bg-muted-100 hover:bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-900 text-primary-500 rounded-lg px-4 py-2 font-sans text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline"
          >
            View All
          </a> -->
        </div>
        <div class="mb-2 space-y-5">
          <Item
            v-for="submission in DEFAULT_SUBMISSIONS.filter(
              (e) => e.eduStage === stage
            )"
            :status="
              allGradeData?.[submission.grade]?.teachers ? 'finished' : 'none'
            "
            :description="
              allGradeData?.[submission.grade]?.teachers
                ? '已录入'
                : '待录入数据'
            "
            :name="GRADE_MAPPING[submission.grade] + '数据'"
            :to="{
              name: $route.name?.toString() + '-grades-grade',
              params: { grade: submission.grade },
            }"
          />
        </div>
      </div>
    </div>

    <div
      class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl p-6"
    >
      <div class="mb-8 flex items-center justify-between">
        <h3
          class="font-heading text-base font-semibold leading-tight text-muted-800 dark:text-white"
        >
          <span>学校教学质量</span>
        </h3>
        <NuxtLink
          :to="{
            name: $route.name?.toString() + '-school',
          }"
          class="router-link-active router-link-exact-active bg-muted-100 hover:bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-900 text-primary-500 rounded-lg px-4 py-2 font-sans text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline"
        >
          查看结果
        </NuxtLink>
      </div>
      <div class="mb-2 space-y-6">
        <Item
          v-for="item in items4school"
          :status="item.status"
          :description="item.description"
          :name="item.name"
          :to="item.to"
        />
      </div>
    </div>
  </div>
</template>
