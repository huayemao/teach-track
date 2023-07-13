<script setup lang="tsx">
import { SchoolInfo, TeacherInfo, run } from "@/utils/process";
import type { FunctionalComponent } from "vue";
import { ref, watch } from "vue";

const route = useRoute();

const teachers = ref<TeacherInfo[]>();
const schools = ref<SchoolInfo[]>();

const edit = ref(false);
const isGenerating = ref(false);
const activeTab = ref("teacher");

// todo: 已生成后信息用折叠面板收起来，添加编辑按钮，重新编辑后覆盖

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
      Number(route.params.grade)
    );

    teachers.value = teachersData;
    schools.value = schoolsData;
    isGenerating.value = false;
  } catch (error) {
    alert("解析错误：" + error?.message);
  } finally {
    isGenerating.value = false;
  }
};
watch(
  () => teachers.value,
  (v) => {
    if (v?.length) {
      document
        .querySelector("#__nuxt")
        ?.firstElementChild?.classList.remove("bg-muted-100");
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
  <main>
    <div
      :class="{
        'h-0 hidden': teachers?.length && !edit,
        'transition-all duration-300': true,
      }"
    >
      <GenerateForm @confirm="generate" :loading="isGenerating" />
    </div>
    <div
      :class="{
        'hidden transition-all duration-300 bg-white ltablet:h-64 ltablet:flex-row relative  h-0 w-full flex-col  lg:flex-row': true,
        'h-[460px] lg:h-64 !flex': teachers?.length && !edit,
      }"
    >
      <div
        class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row"
      >
        <div class="ltablet:text-left text-center lg:text-left">
          <h2
            class="font-heading text-xl font-semibold leading-normal ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start"
          >
            <span class="text-muted-800 dark:text-white">元谋县</span
            ><svg
              data-v-cd102a71=""
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="icon h-4 w-4 text-yellow-400"
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m9.89 17.514l-4.21 2.257l-.099.044c-.715.27-1.39.216-1.903-.242c-.482-.43-.657-1.046-.557-1.755l.704-4.86l-3.18-3.342c-.55-.56-.765-1.248-.58-1.968c.205-.799.88-1.258 1.851-1.412l4.227-.638l2.213-4.585C8.7.366 9.236-.017 9.911.001c.66.017 1.183.422 1.593 1.143l2.14 4.486l4.74.658c.753.13 1.308.522 1.53 1.176c.22.653.01 1.313-.557 1.987l-3.44 3.51l.772 4.856c.122.84-.025 1.505-.586 1.9c-.506.357-1.139.357-1.867.107l-.12-.053l-4.226-2.257Z"
              ></path>
            </svg>
          </h2>
          <span class="text-muted-400 mb-4 block font-sans text-base">
            七年级
          </span>
          <div class="mb-6 flex items-center gap-x-6">
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
          </div>
          <div
            class="prose prose-primary prose-muted dark:prose-invert prose-th:p-4 prose-td:p-4 prose-table:bg-white dark:prose-table:bg-muted-800 prose-table:border prose-table:border-muted-200 dark:prose-table:border-muted-700 ltablet:mx-0 prose-sm mx-auto mb-6 max-w-xl lg:mx-0"
          >
            <p class="line-clamp-3">按区域分类计算</p>
          </div>
        </div>
      </div>
      <div
        class="ltablet:justify-start ltablet:ms-auto ltablet:mt-0 mt-4 flex shrink-0 justify-center lg:ms-auto lg:mt-0 lg:justify-start"
      >
        <!-- todo: 编辑按钮 -->
      </div>
      <div class="absolute bottom-0 start-0 flex items-end gap-2 z-10">
        <Tabs
          :activeKey="activeTab"
          :data="tabs"
          @change="handleTabChange"
        ></Tabs>
      </div>
    </div>
    <div class="bg-muted-100 p-8">
      <TeacherResultTable
        v-show="activeTab === 'teacher'"
        v-if="isGenerating || teachers?.length"
        :teachers="(teachers as TeacherInfo[])"
      />
      <SchoolResultTable
        v-show="activeTab === 'school'"
        v-if="isGenerating || schools?.length"
        :schools="(schools as SchoolInfo[])"
      />
    </div>
  </main>
</template>
