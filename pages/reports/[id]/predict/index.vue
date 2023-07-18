<script setup lang="tsx">
import { useStorageState } from "@/composables/storage";
import {
DEFAULT_SUBMISSIONS
} from "@/constants/index";
import { getFullReportTitle } from '@/utils/biz/report';
import { runPredict } from "@/utils/process";
import { getGradeResults } from "@/utils/store";
import { ref, watch } from "vue";

const route = useRoute();
const report = useReport();
const { attributes: { eduStage } } = report

const edit = ref(true);
const isGenerating = ref(false);
const activeTab = ref("teacher");

const { data: tableData, mutate, pending } = useStorageState<object[]>(
  [eduStage, "predict"].join("-")
);

const generate = async ({ fileList }) => {
  const file = fileList[0];
  if (!file) {
    return;
  }

  const res = await runPredict(file, 9);
  tableData.value = res;
  edit.value = false;
  mutate(res);
};

watch(
  () => tableData.value,
  (v, prev) => {
    if (!!v && !prev) {
      edit.value = false;
    }
  }
);


async function getSchools() {
  const grades = DEFAULT_SUBMISSIONS.filter((e) => e.eduStage === eduStage).map(
    (e) => e.grade
  );
  const resultsByGrade = await getGradeResults(grades.slice(-1));
  const schools = Object.values(resultsByGrade)?.[0]?.schools;
  return schools;
}

onMounted(async () => {
  const schools = await getSchools();
  if (!schools) {
    ElNotification.warning("请先录入九年级中考成绩");
  }
});




</script>
<template>
  <PlaceLoad v-if="pending" />
  <template v-else>
    <div :class="{
      'h-0 hidden': !edit,
      'transition-all duration-300': true,
    }">
      <PredictForm @confirm="generate" :loading="isGenerating" />
    </div>
    <DataHeader subTitle="预测目标完成清空" canOutput @outputBtnClicked="() => { }" :title="getFullReportTitle(report)" />
    <div class=" w-full">
      <ResultTable v-if="!edit" :data="tableData" />
    </div>
  </template>
</template>
