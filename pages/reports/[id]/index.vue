<script setup lang="tsx">
import { GRADE_MAPPING } from "@/constants/index";

const Item = ({ name, to }: { name: string; to: object }) => (
  <div class="flex items-center gap-3">
    <div class="border-muted-200 dark:border-muted-700 flex h-10 w-10 items-center justify-center rounded-full border">
      <span>{name.slice(0, 1)} </span>
    </div>
    <div>
      <h4 class="font-heading text-sm font-light leading-tight text-muted-800 dark:text-white">
        <NuxtLink to={to}>{name}</NuxtLink>
      </h4>
      <p class="font-alt text-xs font-normal leading-normal leading-normal">
        <span class="text-muted-400"> </span>
      </p>
    </div>
    <div class="ms-auto flex items-center">
      <NuxtLink
        to={to}
        class="disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-none false false text-muted-700 bg-white border border-muted-300 dark:text-white dark:bg-muted-700 dark:hover:bg-muted-600 dark:border-muted-600 hover:bg-muted-50 rounded-xl h-10 w-10 p-2 nui-focus relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300 scale-75"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xmlns:xlink="http://www.w3.org/1999/xlink"
          role="img"
          class="icon h-5 w-5"
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
            d="M5 12h14m-7-7l7 7l-7 7"
          ></path>
        </svg>
      </NuxtLink>
    </div>
  </div>
);

const submissions = [
  { grade: 3, eduStage: "Elementary" },
  { grade: 4, eduStage: "Elementary" },
  { grade: 5, eduStage: "Elementary" },
  { grade: 6, eduStage: "Elementary" },
  { grade: 7, eduStage: "Junior" },
  { grade: 8, eduStage: "Junior" },
  { grade: 9, eduStage: "Junior" },
];
// todo: 这个做成 tab 吧
// todo: 图片用 initial
// 汇总报告，暂无
</script>
<template>
  <!--[--><!--[-->
  <div
    class="nuxt-loading-indicator"
    style="
      position: fixed;
      top: 0px;
      right: 0px;
      left: 0px;
      pointer-events: none;
      width: auto;
      height: 3px;
      opacity: 0;
      background: var(--color-primary-500);
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 0.1s ease 0s, height 0.4s ease 0s,
        opacity 0.4s ease 0s;
      z-index: 999999;
    "
  ></div>
  <div></div>
  <div class="grid grid-cols-3 gap-6">
    <div>
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl bg-muted-200 flex h-full flex-col border-0 p-8"
      >
        <div class="mb-5">
          <h2
            class="font-heading text-3xl font-light leading-tight text-muted-800 mb-2 dark:text-white"
          >
            <span>todo：学校综合考核</span>
          </h2>
          <p class="font-alt text-sm font-normal leading-normal">
            <span class="text-muted-400">
              <!-- You have 6 interviews to conduct during this week. Your current
              progress is great. Check your schedule and don't miss any
              activity. -->
            </span>
          </p>
        </div>
        <div class="mb-4 mt-auto flex items-center gap-2">
          <div class="text-4xl"><span>🎉</span></div>
          <div>
            <p
              class="font-alt text-xs font-normal leading-normal leading-normal"
            >
              <span class="text-muted-400 mb-2">Your Progress</span>
            </p>
            <h4
              class="font-heading text-base font-light leading-tight text-muted-800 dark:text-white"
            >
              <span>Outstanding</span>
            </h4>
          </div>
        </div>
        <div>
          <button
            data-v-71bb21a6=""
            type="button"
            class="is-button rounded-xl bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 h-11 w-full"
          >
            <span>View Schedule</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="String($route.params.id) === '2'">
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl p-6"
      >
        <div class="mb-8 flex items-center justify-between">
          <h3
            class="font-heading text-base font-semibold leading-tight text-muted-800 dark:text-white"
          >
            <span>各年级成绩</span>
          </h3>
          <a
            aria-current="page"
            href="/dashboards/personal-3#"
            class="router-link-active router-link-exact-active bg-muted-100 hover:bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-900 text-primary-500 rounded-lg px-4 py-2 font-sans text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline"
          >
            View All
          </a>
        </div>
        <div class="mb-2 space-y-5">
          <Item
            :name="GRADE_MAPPING[submission.grade]"
            :to="{
              name: $route.name?.toString() + '-grades-grade',
              params: {
                grade: submission.grade,
              },
            }"
            v-for="submission in submissions.filter(
              (e) => e.eduStage === 'Elementary'
            )"
          />
        </div>
      </div>
    </div>
    <div v-if="String($route.params.id) === '1'">
      <div
        class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-xl p-6"
      >
        <div class="mb-8 flex items-center justify-between">
          <h3
            class="font-heading text-base font-semibold leading-tight text-muted-800 dark:text-white"
          >
            <span>各年级成绩</span>
          </h3>
          <a
            aria-current="page"
            href="/dashboards/personal-3#"
            class="router-link-active router-link-exact-active bg-muted-100 hover:bg-muted-200 dark:bg-muted-700 dark:hover:bg-muted-900 text-primary-500 rounded-lg px-4 py-2 font-sans text-sm font-medium underline-offset-4 transition-colors duration-300 hover:underline"
          >
            View All
          </a>
        </div>
        <div class="mb-2 space-y-5">
          <Item
            :name="GRADE_MAPPING[submission.grade]"
            :to="{
              name: $route.name?.toString() + '-grades-grade',
              params: {
                grade: submission.grade,
              },
            }"
            v-for="submission in submissions.filter(
              (e) => e.eduStage === 'Junior'
            )"
          />
        </div>
      </div>
    </div>
  </div>
</template>
