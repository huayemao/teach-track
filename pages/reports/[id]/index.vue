<script setup lang="tsx">
import { useStorageState } from "@/composables/storage";
import {
DEFAULT_SUBMISSIONS,
GRADE_MAPPING
} from "@/constants/index";
import { getFullReportTitle } from "@/utils/biz/report";
import { SchoolInfo, TeacherInfo } from "@/utils/process";
import { getGradeResults } from "@/utils/store";
import compact from 'lodash/compact';

definePageMeta({
  title: '报表详情'
})




const route = useRoute();
const report = useReport()
const { attributes: { eduStage, schoolResultConfig }, id } = report

useHead({
  title: getFullReportTitle(report),
})

onMounted(() => {
  route.meta.title += ('——' + getFullReportTitle(report))
})

const dialogOpened = ref(false)
const { data: predictData } = useStorageState([id, eduStage, "predict"].join("-"));
const { data: incrementData } = useStorageState([id, eduStage, "increment"].join("-"));

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
  description,
  status,
}: {
  name: string;
  description?: string;
  status?: string;
}) => (
  <>
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
  </>
);

const items4school = computed(() => {
  const gradeResultFinished =
    allGradeData.value &&
    Object.values(allGradeData.value).every((e) => e?.schools);

  return compact([
    {
      name: "年级教学综合成绩",
      description: gradeResultFinished
        ? "已生成"
        : "录入各年级考试成绩等数据后即可生成",
      status: gradeResultFinished ? "finished" : "",
      to: "",
    },
    {
      name: "预测完成目标",
      description: predictData.value
        ? "已生成"
        : `待录入数据：${eduStage === 'Junior' ? '九年级' : '六年级'}预测目标完成情况统计表`,
      to: { name: route.name?.toString() + "-predict" },
      status: predictData.value ? "finished" : "",
    },
    // todo: 实际要导入的是九年级入学成绩。。。
    eduStage === 'Junior' && {
      name: "教学质量增量",
      description: incrementData.value
        ? "已生成"
        : "待录入数据：九年级入学成绩",
      to: { name: route.name?.toString() + "-increment" },
      status: incrementData.value ? "finished" : "",
    },
  ]);
});


const canViewSchoolResult = computed(() => {
  return items4school.value.every((e => e.status === 'finished'))
})

onMounted(async () => {
  const grades = DEFAULT_SUBMISSIONS.filter((e) => e.eduStage === eduStage).map(
    (e) => e.grade
  );

  const resultsByGrade = await getGradeResults(id, grades);
  allGradeData.value = resultsByGrade;
});
// todo: 图片用 initial
// 汇总报告，暂无
</script>
<template>
  <div class="grid grid-cols-3 gap-6">
    <div>
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl bg-muted-200 flex h-full flex-col border-0 p-8">
        <div class="mb-5">
          <article class="prose dark:text-muted-50">
            <h2 class="font-heading text-3xl font-light leading-tight text-muted-800 mb-2 dark:text-white">
              <span>教学质量分析工具（测试版）</span>
            </h2>
            <p>
              注意事项：
            </p>
            <ul>
              <li>程序运行在本地，数据不会上传，切换设备或清空浏览器数据后，数据将丢失，请慎重保管</li>
              <li>
                暂不支持编辑参数
              </li>
              <li>现有 Excel 中“校区”有时指学校名称，有时指校区名称，混淆使用会导致解析错误，务必修正列名，学校名称统一使用“学校”，校区名称统一使用“校区”</li>
              <li>
                <NuxtLink class="dark:text-muted-50" to="/sample">导入的 Excel 数据样例</NuxtLink>
              </li>
            </ul>
          </article>
        </div>
        <!-- <div class="mb-4 mt-auto flex items-center gap-2">
          <div class="text-4xl"><span>🎉</span></div>
          <div>
            <p class="font-alt text-xs font-normal leading-normal">
              <span class="text-muted-400 mb-2">进度</span>
            </p>
            <h4 class="font-heading text-base font-light leading-tight text-muted-800 dark:text-white">
              <span>报表制作完成</span>
            </h4>
          </div>
        </div>
        <div>
          <button data-v-71bb21a6="" type="button"
            class="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 h-11 w-full">
            <span>导出完整报表</span>
          </button>
        </div> -->
      </div>
    </div>

    <div>
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl p-6">
        <div class="mb-8 flex items-center justify-between">
          <h3 class="font-heading text-base font-semibold leading-tight text-muted-800 dark:text-white">
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
          <NuxtLink class="flex items-center gap-3" v-for="submission in DEFAULT_SUBMISSIONS.filter(
            (e) => e.eduStage === eduStage
          )" :to="{
  name: $route.name?.toString() + '-grades-grade',
  params: { grade: submission.grade },
}" :key="submission.grade">
            <Item :status="allGradeData?.[submission.grade]?.teachers ? 'finished' : 'none'
              " :description="allGradeData?.[submission.grade]?.teachers
    ? '已录入'
    : '待录入数据'
    " :name="GRADE_MAPPING[submission.grade] + '数据'" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div>
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl p-6">
        <div class="mb-8 flex items-center justify-between">
          <h3 class="font-heading text-base font-semibold leading-tight text-muted-800 dark:text-white">
            <span>学校教学质量</span>
          </h3>
          <BaseButton condensed @click="() => dialogOpened = true">配置参数</BaseButton>
        </div>
        <div class="mb-2 space-y-6">
          <NuxtLink v-for="item in items4school" :class="{
            'flex items-center gap-3': true,
            'pointer-events-none': !item.to,
          }" :to="item.to">
            <Item :status="item.status" :description="item.description" :name="item.name" />
          </NuxtLink>
        </div>
        <div class="mt-4 w-full flex justify-end">
          <BaseButton v-show="canViewSchoolResult" color="primary" shadow="flat"
            :to="{ name: $route.name?.toString() + '-school' }">查看结果</BaseButton>
        </div>
      </div>
    </div>
  </div>
  <el-dialog title="教学质量计算系数" v-model="dialogOpened">
    <el-table border :data="schoolResultConfig">
      <el-table-column prop="label" header-align="center" align="center" label="项目" />
      <el-table-column prop="weight" header-align="center" align="center" label="系数" />
    </el-table>
  </el-dialog>
</template>
