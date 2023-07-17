<script setup lang="tsx">
import { GRADE_MAPPING } from "@/constants/index";
import { getFullReportTitle } from "@/utils/biz/report";
import { SchoolInfo, TeacherInfo, run } from "@/utils/process";
import { ref, watch } from "vue";
import XLSX from 'xlsx';

const route = useRoute();
const report = useReport()
// todo: 渲染性能问题

const gradeKey = Number(route.params.grade);
const gradeName = GRADE_MAPPING[gradeKey];

const edit = ref(true);
const isGenerating = ref(false);
const activeTab = ref("teachers");
const grade = Number(route.params.grade);

const { data: teachers, mutate: setTeachers, pending } = useStorageState<TeacherInfo[]>([grade, 'teachers'].join("-"));
const { data: schools, mutate: setSchools } = useStorageState<SchoolInfo[]>([grade, 'schools'].join("-"));

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
    ElNotification.success("生成完成")
    isGenerating.value = false;
    edit.value = false;
  } catch (error) {
    const message = typeof error === 'string' ? error : error?.message || '未知错误'
    ElNotification.error("解析错误：" + message);
  } finally {
    isGenerating.value = false;
  }
};

useToggleClass(edit, 'bg-muted-100', (v, prevV) => v && !prevV)

const handleCancel = () => {
  if (teachers.value) {
    edit.value = false
  }
  else {
    navigateTo({
      name: route.name?.toString().replace('-grades-grade', '')
    })
  }
}

const output = () => {
  const workbook = XLSX.utils.book_new();
  if (teachers.value && schools.value) {
    const teacherSheet = XLSX.utils.json_to_sheet(teachers.value);
    const schoolSheet = XLSX.utils.json_to_sheet(schools.value)
    XLSX.utils.book_append_sheet(workbook, teacherSheet, '教师成绩');
    XLSX.utils.book_append_sheet(workbook, schoolSheet, '年级学校成绩');
    XLSX.writeFile(workbook, 'output.xlsx');
  }

}

watch(
  () => teachers.value,
  (v, prev) => {
    if (!!v && !prev) {
      edit.value = false;
    }
  }
);

</script>
<template>
  <div v-if="pending" class="w-full h-full flex justify-center items-center">
    <BasePlaceload class=" w-full rounded h-8" />
  </div>

  <template v-else>
    <div :class="{
      'h-0 hidden': !edit,
      'transition duration-300': true,
    }">
      <GenerateForm :title="getFullReportTitle(report)" @confirm="generate" @cancel="handleCancel" :loading="isGenerating"
        :grade="grade" />
    </div>
    <!-- 这是为了让顶端变白 -->
    <div v-show="!edit">
      <div class="h-48 dark:bg-muted-800 absolute start-0 top-0 w-full bg-white"></div>
      <div class="h-32 ltablet:flex-row relative flex w-full flex-col lg:h-36 lg:flex-row">
        <div class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row">
          <div class="ltablet:text-left text-center lg:text-left">
            <h2
              class="font-heading text-xl font-semibold leading-normal ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start">
              <span class="text-muted-800 dark:text-white">{{ getFullReportTitle(report) }}</span>
            </h2>
            <span class="text-muted-400 mb-4 block font-sans text-base"> {{ gradeName }} </span>
          </div>
        </div>
        <div
          class="gap-2 ltablet:justify-start ltablet:ms-auto ltablet:mt-0 mt-4 flex shrink-0 justify-center lg:ms-auto lg:mt-0 lg:justify-start">
          <BaseButton condensed color="primary" @click="output" :disabled="!(teachers && schools)">
            <span>导出</span>
            <Icon name="lucide:arrow-right" class="me-1 h-4 w-4" />
          </BaseButton>
          <BaseButton condensed @click="() => (edit = true)"><span>编辑</span>
            <Icon name="lucide:edit" class="me-1 h-4 w-4" />
          </BaseButton>
        </div>
      </div>
      <div class="w-full relative -top-[5.2rem] z-10">
        <BaseTabs @update:selected="s => s && (activeTab = s)" :selected="activeTab" :tabs="[
          { label: '教师', value: 'teachers' },
          { label: '学校', value: 'schools' },
        ]">
          <template #tab="{ activeValue }">
            <TeacherResultTable :teachers="(teachers as TeacherInfo[])" v-show="activeValue === 'teachers'" />
            <SchoolResultTable v-show="activeValue === 'schools'" :schools="(schools as SchoolInfo[])" />
          </template>
        </BaseTabs>
      </div>
    </div>
  </template>
</template>
