<script setup lang="tsx">
import { GRADE_MAPPING } from "@/constants/index";
import { getFullReportTitle } from "@/utils/biz/report";
import { SchoolInfo, TeacherInfo, run } from "@/utils/process";
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { ref, watch } from "vue";
import XLSX from 'xlsx';

definePageMeta({
  title: '教学质量分年级数据'
})

const route = useRoute();
const report = useReport()
// todo: 渲染性能问题

onMounted(() => {
  route.meta.title = getFullReportTitle(report) + '——' + '教学质量分年级数据'
})

const edit = ref(true);
const isGenerating = ref(false);
const activeTab = ref("teachers");
const grade = Number(route.params.grade);
const gradeName = GRADE_MAPPING[grade];


const { data: teachers, mutate: setTeachers, pending } = useStorageState<TeacherInfo[]>([report.id, grade, 'teachers'].join("-"));
const { data: schools, mutate: setSchools } = useStorageState<SchoolInfo[]>([report.id, grade, 'schools'].join("-"));
const { data: students, mutate: setStudents } = useStorageState<SchoolInfo[]>([report.id, grade, 'students'].join("-"));

const excllentTeachers = computed(() => {
  const method = grade < 7 ? getElementaryExcellentT : getJuniorExcellentT
  return teachers.value?.length ? getExcellentTeachers(teachers.value, method) : null
})

const stamps = [50, 200, 300, 1000]

const goodStudentCounts = computed(() => {
  if (!students.value?.length) {
    return []
  }
  const studentsBySchools = groupBy(students.value, '学校')
  const res = map(studentsBySchools, (v, k) => {
    return Object.fromEntries(
      [['学校', k]].concat(
        stamps.map(stamp => {
          const count = v.filter(s => s.名次 <= stamp).length
          return [`前${stamp}名`, count]
        })))
  })
  return res
})

const generate = async ({ fileList }) => {
  isGenerating.value = true;
  const file = fileList[0];
  if (!file) {
    return;
  }
  try {
    const { teachers: teachersData, schools: schoolsData, students: studentsData } = await run(
      file,
      grade
    );

    setTeachers(teachersData);
    setSchools(schoolsData);
    setStudents(studentsData);
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
    const excellentTeacherSheet = XLSX.utils.json_to_sheet(excllentTeachers.value)
    XLSX.utils.book_append_sheet(workbook, teacherSheet, '教师成绩');
    XLSX.utils.book_append_sheet(workbook, schoolSheet, gradeName + '学校成绩');
    XLSX.utils.book_append_sheet(workbook, excellentTeacherSheet, gradeName + '优质教师奖');
    XLSX.writeFile(workbook, [getFullReportTitle(report), gradeName].join('-') + '.xlsx');
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
  <PlaceLoad v-if="pending" />
  <template v-else>
    <div :class="{
      'h-0 hidden': !edit,
      'transition duration-300': true,
    }">
      <FormLayout title="导入年级数据" description="导入年级学生成绩、教师、学校等数据" @cancel="handleCancel">
        <GenerateForm :title="getFullReportTitle(report)" @confirm="generate" :loading="isGenerating" :grade="grade" />
      </FormLayout>
    </div>
    <!-- 这是为了让顶端变白 -->
    <div v-show="!edit">
      <DataHeader :title="getFullReportTitle(report)" :subTitle="gradeName" canOutput @outputBtnClicked="output"
        @editBtnClicked="() => { edit = true }" />
      <div class="w-full relative -top-[5.2rem] z-10">
        <BaseTabs @update:selected="s => s && (activeTab = s)" :selected="activeTab" :tabs="[
          { label: `学生${students?.length && '（' + students?.length + '）' || ''}`, value: 'students' },
          { label: `教师${teachers?.length && '（' + teachers?.length + '）' || ''}`, value: 'teachers' },
          { label: `学校${schools?.length && '（' + schools?.length + '）' || ''}`, value: 'schools' },
          { label: `优质教师奖${excllentTeachers?.length && '（' + excllentTeachers?.length + '）' || ''}`, value: 'excllentTeachers' },
          { label: `总分优生数${goodStudentCounts?.length && '（' + goodStudentCounts?.length + '）' || ''}`, value: 'goodStudentCounts' },
        ]">
          <template #tab="{ activeValue }">
            <TeacherResultTable :teachers="(teachers as TeacherInfo[])" v-if="activeValue === 'teachers'" />
            <ExcellentTeachersTable :teachers="(excllentTeachers as TeacherInfo[])"
              v-if="activeValue === 'excllentTeachers'" />
            <ResultTable :data="(students as object[])" v-if="activeValue === 'students'"
              :filterableCols="['学校', '班级']" />
            <ResultTable :data="(goodStudentCounts as object[])" v-if="activeValue === 'goodStudentCounts'" />
            <SchoolResultTable v-if="activeValue === 'schools'" :schools="(schools as SchoolInfo[])" />
          </template>
        </BaseTabs>
      </div>
    </div>
  </template>
</template>
