<script setup lang="tsx">
import { SchoolInfo, TeacherInfo, run } from "@/utils/process";
import type { FunctionalComponent } from "vue";
import { ref, watch } from "vue";

const route = useRoute();




const edit = ref(true);
const isGenerating = ref(false);
const activeTab = ref("teacher");
const grade = Number(route.params.grade);

const { data: teachers, mutate: setTeachers, pending } = useStorageState<TeacherInfo[]>([grade, 'teachers'].join("-"));
const { data: schools, mutate: setSchools } = useStorageState<SchoolInfo[]>([grade, 'schools'].join("-"));

const handlePreview = () => {
  edit.value = true;
};
const generate = async ({ fileList }) => {
  isGenerating.value = true;
  const file = fileList[0];
  if (!file) {
    return;
  }
  try {
    const { teachers: teachersData, schools: schoolsData } = await run(
      file,
      grade
    );

    setTeachers(teachersData);
    setSchools(schoolsData);
    console.log("生成完成")
    isGenerating.value = false;
    alert("生成完成")
    edit.value = false;
  } catch (error) {
    const message = typeof error === 'string' ? error : error?.message || '未知错误'
    alert("解析错误：" + message);
  } finally {
    isGenerating.value = false;
  }
};
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

watch(
  () => teachers.value,
  (v, prev) => {
    if (!!v && !prev) {
      edit.value = false;
    }
  }
);


/* todo: 画出结构示例 */
const tabs = [
  { title: "教师", key: "teacher" },
  { title: "学校", key: "school" },
];

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
  <div v-if="pending" class="w-full h-full flex justify-center items-center">
    <BasePlaceload class=" w-full rounded h-8" />
  </div>

  <template v-else>
    <div :class="{
      'h-0 hidden': !edit,
      'transition-all duration-300': true,
    }">
      <GenerateForm @confirm="generate" :loading="isGenerating" :grade="grade" />
    </div>

    <div v-show="!edit"
      class="ltablet:h-[256px] dark:bg-muted-800 absolute start-0 top-0 h-[420px] w-full bg-white lg:h-[256px]"></div>
    <div v-show="!edit" class="ltablet:h-36 ltablet:flex-row relative flex h-[290px] w-full flex-col lg:h-36 lg:flex-row">
      <div class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row">
        <div class="ltablet:text-left text-center lg:text-left">
          <h2
            class="font-heading text-xl font-semibold leading-normal ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start">
            <span class="text-muted-800 dark:text-white">元谋县</span>
          </h2>
          <!-- <span class="text-muted-400 mb-4 block font-sans text-base">
              七年级
            </span> -->
          <!-- <div class="mb-6 flex items-center gap-x-6">
              <div
                class="ltablet:flex-row ltablet:flex-auto flex flex-1 flex-col gap-x-2 font-sans lg:flex-auto lg:flex-row"
              >
                <span class="text-muted-800 dark:text-muted-100 font-semibold">
                  1288 </span
                ><span
                  class="text-muted-400 ltablet:text-base text-xs sm:text-sm lg:text-base"
                >
                  学生
                </span>
              </div>
              <div
                class="ltablet:flex-row ltablet:flex-auto flex flex-1 flex-col gap-x-2 font-sans lg:flex-auto lg:flex-row"
              >
                <span class="text-muted-800 dark:text-muted-100 font-semibold">
                  138 </span
                ><span
                  class="text-muted-400 ltablet:text-base text-xs sm:text-sm lg:text-base"
                >
                  教师
                </span>
              </div>
              <div
                class="ltablet:flex-row ltablet:flex-auto flex flex-1 flex-col gap-x-2 font-sans lg:flex-auto lg:flex-row"
              >
                <span class="text-muted-800 dark:text-muted-100 font-semibold">
                  329 </span
                ><span
                  class="text-muted-400 ltablet:text-base text-xs sm:text-sm lg:text-base"
                >
                  学校
                </span>
              </div>
            </div> -->
        </div>
      </div>
      <div
        class="ltablet:justify-start ltablet:ms-auto ltablet:mt-0 mt-4 flex shrink-0 justify-center lg:ms-auto lg:mt-0 lg:justify-start">
        <button @click="() => (edit = true)" type="button"
          class="is-button rounded is-button-default ltablet:w-auto ltablet:mx-0 mx-auto w-52 lg:mx-0 lg:w-auto">
          <span>编辑</span>
        </button>
      </div>
      <div class="ltablet:bottom-[-30px] absolute bottom-[-48px] start-0 flex items-end gap-2 lg:bottom-[-30px]">
        <Tabs :activeKey="activeTab" :data="tabs" @change="handleTabChange"></Tabs>
      </div>
    </div>
    <div class="w-full mt-24">
      <TeacherResultTable v-show="activeTab === 'teacher'" v-if="!edit" :teachers="(teachers as TeacherInfo[])" />
      <SchoolResultTable v-show="activeTab === 'school'" v-if="!edit" :schools="(schools as SchoolInfo[])" />
    </div>
  </template>
</template>
