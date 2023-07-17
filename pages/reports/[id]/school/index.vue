<script setup lang="tsx">
import { useStorageState } from "@/composables/storage";
import { DEFAULT_SUBMISSIONS } from "@/constants/index";
import { SchoolIncrement, SchoolInfo, runIncrement } from "@/utils/process";
import { getGradeResults } from "@/utils/store";
import localforage from "localforage";
import type { FunctionalComponent } from "vue";
import { ref, watch } from "vue";

const route = useRoute();
const { attributes: { eduStage } } = useReport();
const grades = DEFAULT_SUBMISSIONS.filter((e) => e.eduStage === eduStage).map(
  (e) => e.grade
);
const { data: tableData, mutate } = useStorageState("school", null);

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

watch(
  () => edit.value,
  (v) => {
    if (!!v) {
      document
        .querySelector("#__nuxt")
        ?.firstElementChild?.classList.remove("bg-muted-100");
    }
  }
);

onMounted(async () => {
  const schoolsByGrade = (await getGradeResults(grades)) as Record<
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
    const config = {
      7: 0.2,
      8: 0.2,
      9: 0.6,
    };

    let base = 0;

    for (const [grade, weight] of Object.entries(config)) {
      const baseScore = schoolsByGrade[grade].schools.find(
        (e) => e.学校 === school.学校
      ).综合成绩;
      base += baseScore * weight;
    }

    const increment = incrementData.find(
      (e) => e.学校 == school.学校
    ).教学质量增量;

    data.push({
      七至九年级综合成绩: base,
      九年级学年末中考目标完成总得分: school.目标完成总得分,
      教学质量增量: increment,
      综合成绩: base + school.目标完成总得分 + increment,
    });
    mutate(data);
  }
});

/* todo: 画出结构示例 */
const tabs = [{ title: "学校教学质量", key: "teacher" }];

const handleTabChange = (v: string) => {
  activeTab.value = v;
};

const Tabs: FunctionalComponent<
  {
    activeKey: string;
    data: { title: string; key: string }[];
  },
  {
    change(key: string): void;
  }
> = ({ activeKey, data }, context) => {
  // merge
  const activeClasses =
    "!border-primary-500 !text-muted-800 !dark:text-muted-100";
  return (
    <>
      {data.map(({ title, key }) => (
        <button
          onClick={() => {
            context.emit("change", key);
          }}
          type="button"
          class={
            "inline-flex items-center justify-center border-b-2 px-4 py-3 font-sans text-sm border-transparent text-muted-400 " +
            (activeKey === key ? activeClasses : "")
          }
          key={key}
        >
          <span>{title}</span>
        </button>
      ))}
    </>
  );
};
</script>
<template>
  <div class="ltablet:h-36 ltablet:flex-row relative flex h-[290px] w-full flex-col lg:h-36 lg:flex-row">
    <div class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row">
      <div class="ltablet:text-left text-center lg:text-left">
        <h2
          class="font-heading text-xl font-semibold leading-normal ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start">
          <span class="text-muted-800 dark:text-white">元谋县</span>
        </h2>
      </div>
    </div>

    <div class="ltablet:bottom-[-30px] absolute bottom-[-48px] start-0 flex items-end gap-2 lg:bottom-[-30px]">
      <Tabs :activeKey="activeTab" :data="tabs" @change="handleTabChange"></Tabs>
    </div>
  </div>
  <div class="w-full mt-24">
    <ResultTable v-if="!edit" :data="tableData" />
  </div>
</template>
