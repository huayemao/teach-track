<script setup lang="ts">
type Report = {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    eduStage: "小学" | "初中";
    year: number;
    region: string;
  };
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type Response = {
  data: Report[];
  meta: Meta;
};

// const { data } = useFetch<Response>("/reports", {
//   $fetch: fetchWithAuth,
// });

const data: Report[] = [
  {
    id: 1,
    attributes: {
      eduStage: "初中",
      title: "教学质量分析",
      year: 2021,
      region: "元谋县",
      createdAt: "111",
      publishedAt: "111",
      updatedAt: "111",
    },
  },
  {
    id: 2,
    attributes: {
      eduStage: "小学",
      title: "教学质量分析",
      year: 2021,
      region: "元谋县",
      createdAt: "111",
      publishedAt: "111",
      updatedAt: "111",
    },
  },
];
</script>
<template>
  <div>
    <div class="">
      <div>
        <div class="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <div class="flex w-full items-center gap-4 sm:w-auto">
            <div class="relative w-full sm:w-auto">
              <div class="group/nui-input relative">
                <input id="ninja-input-43" type="text"
                  class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded"
                  placeholder="搜索报表" /><!----><!---->
                <div
                  class="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10">
                  <svg data-v-cd102a71="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true" role="img" class="icon h-[1.15rem] w-[1.15rem]" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21l-4.35-4.35"></path>
                    </g>
                  </svg>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div class="flex w-full items-center justify-end gap-4 sm:w-auto">
            <!-- <button
              type="button"
              class="is-button rounded is-button-default w-full sm:w-32"
            >
              Manage</button
            > -->
            <!-- <NuxtLink
              to="/reports/new"
              type="button"
              class="is-button rounded bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 w-full sm:w-32"
            >
              <svg
                data-v-cd102a71=""
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon h-4 w-4"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7-7v14"
                ></path></svg
              ><span>创建报表</span>
            </NuxtLink> -->
          </div>
        </div>
        <div>
          <div class="space-y-2 pt-6">
            <div v-for="(item, i) in data"
              class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md relative px-2 py-6 sm:py-4">
              <div class="flex w-full flex-col sm:flex-row sm:items-center">
                <div class="relative mb-4 flex grow items-center gap-2 px-6 sm:mb-0 sm:px-2 h-10">
                  <span v-if="i == 0"
                    class="text-muted-400 absolute hidden font-sans text-xs font-medium uppercase sm:-top-10 sm:start-2 sm:block">名称</span>
                  <div
                    class="relative inline-flex shrink-0 items-center justify-center outline-none h-12 w-12 rounded-full bg-primary-500/20 text-primary-500">
                    <span>元</span>

                    <!---->
                  </div>
                  <NuxtLink :to="`reports/${item.id}`">
                    <h4 class="font-heading text-sm font-medium leading-tight text-muted-700 dark:text-muted-100">
                      <span>{{
                        item.attributes.region +
                        item.attributes.year +
                        "-" +
                        (item.attributes.year + 1) +
                        "学年" +
                        item.attributes.title +
                        `（${item.attributes.eduStage}）`
                      }}</span>
                    </h4>
                    <p class="font-alt text-xs font-normal leading-tight text-muted-500 dark:text-muted-400">
                      <span>测试数据</span>
                    </p>
                  </NuxtLink>
                </div>
                <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div
                    class="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2 w-full sm:w-40">
                    <span v-if="i == 0"
                      class="text-muted-400 absolute start-8 top-1/2 mx-auto -translate-y-1/2 text-center font-sans text-xs font-medium uppercase sm:inset-x-0 sm:-top-10 sm:translate-y-0">区域</span><span
                      class="text-muted-500 dark:text-muted-400 font-sans text-sm">元谋县</span>
                  </div>
                  <div
                    class="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2 w-full sm:w-40">
                    <span v-if="i == 0"
                      class="text-muted-400 absolute start-8 top-1/2 mx-auto -translate-y-1/2 text-center font-sans text-xs font-medium uppercase sm:inset-x-0 sm:-top-10 sm:translate-y-0">教育阶段</span><span
                      class="text-muted-500 dark:text-muted-400 font-sans text-sm">{{ item.attributes.eduStage }}</span>
                  </div>
                  <div
                    class="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2 w-full sm:w-16">
                    <span v-if="i == 0"
                      class="text-muted-400 absolute start-8 top-1/2 mx-auto -translate-y-1/2 text-center font-sans text-xs font-medium uppercase sm:inset-x-0 sm:-top-10 sm:translate-y-0">状态</span><span
                      class="whitespace-nowrap inline-block px-3 font-sans transition-shadow duration-300 py-1 text-[0.65rem] rounded-full bg-info-100 text-info-500 border-info-100 dark:border-info-500 dark:text-info-500 border dark:bg-transparent capitalize">未发布</span>
                  </div>
                  <div
                    class="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2 ptablet:hidden w-full sm:w-[160px]">
                    <span v-if="i == 0"
                      class="text-muted-400 absolute start-8 top-1/2 mx-auto -translate-y-1/2 text-center font-sans text-xs font-medium uppercase sm:inset-x-0 sm:-top-10 sm:translate-y-0">年级</span>
                    <div class="flex">
                      <div
                        class="dark:bg-muted-800 relative flex shrink-0 items-center justify-center rounded-full bg-white transition-all duration-100 ease-in h-8 w-8 hover:-ms-2 hover:me-2 focus:-ms-2 focus:me-2">
                        <div
                          class="relative inline-flex shrink-0 items-center justify-center outline-none h-8 w-8 rounded-full bg-primary-500/20 text-primary-500 !scale-90"
                          id="0" tabindex="0">
                          <div
                            class="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                            <!-- <img
                              src="/img/avatars/25.svg"
                              class="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-8 w-8"
                            /> -->
                          </div>
                        </div>
                      </div>
                      <div
                        class="dark:bg-muted-800 relative flex shrink-0 items-center justify-center rounded-full bg-white transition-all duration-100 ease-in h-8 w-8 hover:-ms-2 hover:me-2 focus:-ms-2 focus:me-2 -ms-2 hover:-ms-4 hover:me-2 focus:-ms-4 focus:me-2">
                        <div
                          class="relative inline-flex shrink-0 items-center justify-center outline-none h-8 w-8 rounded-full bg-primary-500/20 text-primary-500 !scale-90"
                          id="2" tabindex="0">
                          <div
                            class="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                            <!-- <img
                              src="/img/avatars/16.svg"
                              class="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-8 w-8"
                            /> -->
                          </div>
                        </div>
                      </div>
                      <div
                        class="dark:bg-muted-800 shrink-0 rounded-full bg-white transition-all duration-100 ease-in -ms-2 h-8 w-8">
                        <div
                          class="bg-muted-200 dark:border-muted-800 dark:bg-muted-700 relative inline-flex h-full w-full scale-90 items-center justify-center rounded-full border-white">
                          <span class="text-muted-500 dark:text-muted-300 -ms-1 font-sans font-normal uppercase text-sm">
                            +3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2">
                    <span v-if="i == 0"
                      class="text-muted-400 absolute start-8 top-1/2 mx-auto -translate-y-1/2 text-center font-sans text-xs font-medium uppercase sm:inset-x-0 sm:-top-10 sm:translate-y-0">操作</span>
                    <NuxtLink :to="`reports/${item.id}`"
                      class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-500 bg-muted-200 border-muted-200 dark:text-white dark:bg-muted-700/40 dark:border-muted-700/40 dark:hover:enabled:bg-muted-700/60 hover:enabled:bg-muted-100 dark:active:enabled:border-muted-800 dark:active:enabled:bg-muted-800 active:enabled:bg-muted-200/50 rounded-md">
                      <span>查看</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="inline-flex w-full flex-col md:flex-row md:justify-between">
              <ul
                class="border-muted-200 bg-muted-100 dark:border-muted-600 dark:bg-muted-700 mb-4 inline-flex flex-wrap gap-2 border p-1 md:mb-0 md:gap-1 rounded-xl">
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
