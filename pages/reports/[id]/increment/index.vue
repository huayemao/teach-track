<script setup lang="tsx">
import { useStorageState } from "@/composables/storage";
import {
DEFAULT_SUBMISSIONS
} from "@/constants/index";
import { getFullReportTitle } from "@/utils/biz/report";
import { runIncrement } from "@/utils/process";
import { getGradeResults } from "@/utils/store";
import { ref, watch } from "vue";

const route = useRoute();
const report = useReport();
const { attributes: { eduStage }, id }
  = report

const { data: tableData, mutate, pending } = useStorageState(
  [id, eduStage, "increment"].join("-"),
  null
);

const edit = ref(true);
const isGenerating = ref(false);
const activeTab = ref("teacher");

const generate = async ({ fileList }) => {
  const file = fileList[0];
  if (!file) {
    return;
  }

  const res = await runIncrement(file, 9, await getSchools());
  tableData.value = res;
  mutate(res);
  edit.value = false;
};

watch(
  () => tableData.value,
  (v, pre) => {
    if (v && !pre) {
      edit.value = false;
    }
  }
);

async function getSchools() {
  const grades = DEFAULT_SUBMISSIONS.filter((e) => e.eduStage === eduStage).map(
    (e) => e.grade
  );
  const resultsByGrade = await getGradeResults(id, grades.slice(-1));
  const schools = Object.values(resultsByGrade)?.[0]?.schools;
  return schools;
}

onMounted(async () => {
  const schools = await getSchools();

  if (!schools) {
    ElNotification.warning("请先录入九年级中考成绩");
  }

  // todo: 平均分要加一列按加分之后算的。。。
});



const handleCancel = () => {
  if (tableData.value) {
    edit.value = false
  }
  else {
    navigateTo({
      name: route.name?.toString().replace('-increment', '')
    })
  }
}

const output = () => { }

</script>
<template>
  <PlaceLoad v-if="pending" />
  <template v-else>
    <div :class="{
      'h-0 hidden': !edit,
      'transition duration-300': true,
    }">
      <FormLayout title="教学质量增量" description="导入九年级学生入学成绩，计算学校教学质量增量" @cancel="handleCancel">
        <IncrementForm @confirm="generate" :loading="isGenerating" :report="report" />
      </FormLayout>
    </div>
  </template>
  <div v-show="!edit" class="w-full">
    <DataHeader :title="getFullReportTitle(report)" subTitle="教学质量增量" canOutput @outputBtnClicked="output"
      @editBtnClicked="() => { edit = true }" />
    <ResultTable :data="tableData" />
  </div>
</template>
