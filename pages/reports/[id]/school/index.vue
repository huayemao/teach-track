<script setup lang="tsx">
import { useStorageState } from "@/composables/storage";
import { DEFAULT_SUBMISSIONS } from "@/constants/index";
import { getFullReportTitle } from "@/utils/biz/report";
import { SchoolIncrement, SchoolInfo, runIncrement } from "@/utils/process";
import { getGradeResults } from "@/utils/store";
import localforage from "localforage";
import { ref, watch } from "vue";

const route = useRoute();
const report = useReport();
const { attributes: { eduStage, schoolResultConfig } } = report;
const grades = DEFAULT_SUBMISSIONS.filter((e) => e.eduStage === eduStage).map(
  (e) => e.grade
);
const { data: tableData, mutate } = useStorageState<object[] | null>("school", null);

const edit = ref(true);
const isGenerating = ref(false);
const activeTab = ref("default");

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

useToggleClass(edit, 'bg-muted-100', (v, prevV) => v && !prevV)

const output = () => {

}


onMounted(async () => {

  const resultsByGrade = (await getGradeResults(grades)) as Record<
    number,
    { schools: SchoolInfo[] }
  >;
  const predictData = (await localforage.getItem(
    [eduStage, "predict"].join("-")
  )) as { 学校: string; 目标完成总得分: string }[];
  const incrementData = (await localforage.getItem(
    [eduStage, "increment"].join("-")
  )) as SchoolIncrement[];

  const data = [];

  for (const school of predictData) {
    let base = 0;

    if (!grades.some(e => schoolResultConfig.map(c => c.key).includes(e))) {
      throw Error("配置错误");
    }

    const item: Record<string, number | undefined> = {}

    for (const grade of grades) {

      const config = schoolResultConfig.find(e => e.key == grade);
      if (!config) {
        continue
      }


      const schools = resultsByGrade[grade].schools
      const targetSchool = schools.find(
        (e) => e.学校 === school.学校
      )
      if (!targetSchool) {
        throw Error('')
      }

      const baseScore = targetSchool.综合成绩;

      item[config.label] = baseScore;

      base += baseScore * config.weight;
    }

    const increment = incrementData.find(
      (e) => e.学校 == school.学校
    )?.教学质量增量;

    item['各年级综合成绩'] = base;
    item['九年级学年末中考目标完成总得分'] = school.目标完成总得分;
    item['教学质量增量'] = increment
    item['综合成绩'] = base + school.目标完成总得分 + increment
    data.push(item);
    mutate(data);
  }
});



</script>
<template>
  <div :class="{
    'h-0 hidden': !edit,
    'transition duration-300': true,
  }">
    <div>form</div>
  </div>
  <div v-show="!edit">
    <DataHeader :title="getFullReportTitle(report)" subTitle="学校教学质量成绩" canOutput @outputBtnClicked="output"
      @editBtnClicked="() => { }"></DataHeader>
    <div class="w-full relative -top-[5.2rem] z-10">
      <BaseTabs @update:selected="s => s && (activeTab = s)" :selected="activeTab" :tabs="[
        { label: '学校教学质量成绩', value: 'default' },
      ]">
        <template #tab="{ activeValue }">
          <ResultTable v-if="tableData" :data='tableData'></ResultTable>
        </template>
      </BaseTabs>
    </div>
  </div>
</template>
