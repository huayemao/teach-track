<script setup lang="tsx">
import { fetchWithAuth } from "@/utils/fetch";
import { ref } from "vue";
const report = ref({
  title: "",
});

const handleSubmit = async () => {
  await fetchWithAuth("/reports", {
    method: "POST",
    body: {
      data: report.value,
    },
  });
};
</script>
<template>
  <main>
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
    <div class="">
      <div class="">
        <div
          class="mb-4 flex flex-col justify-between md:flex-row md:items-center"
        >
          <div
            class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full"
          >
            <div>
              <h2
                class="font-heading text-xl font-light leading-tight text-muted-800 dark:text-white"
              >
                <span>New company</span>
              </h2>
              <p
                class="font-alt text-sm font-normal leading-normal leading-normal"
              >
                <span class="text-muted-500">
                  Create a new company record
                </span>
              </p>
            </div>
          </div>
          <div
            class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start"
          >
            <button
              type="button"
              class="relative font-sans font-normal text-sm inline-flex items-center justify-center leading-5 no-underline h-8 px-3 py-2 space-x-1 border nui-focus transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:shadow-none text-muted-700 bg-white border-muted-300 dark:text-white dark:bg-muted-700 dark:border-muted-600 dark:hover:enabled:bg-muted-600 hover:enabled:bg-muted-50 dark:active:enabled:bg-muted-700/70 active:enabled:bg-muted-100 rounded-md"
            >
              <svg
                data-v-cd102a71=""
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="icon h-3 w-3"
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
                  d="m12 19l-7-7l7-7m7 7H5"
                ></path></svg
              ><span>Cancel</span>
            </button>
          </div>
        </div>
        <div
          class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md"
        >
          <form
            @submit.prevent="handleSubmit"
            action=""
            class="divide-muted-200 dark:divide-muted-700 grid divide-x sm:grid-cols-2"
          >
            <div
              shape="curved"
              class="bg-muted-50 dark:bg-muted-800/60 space-y-8 p-10"
            >
              <div class="mx-auto flex w-full max-w-[410px] flex-col">
                <div>
                  <div>
                    <div
                      class="relative mb-5 flex flex-col items-center justify-center gap-4"
                    >
                      <div>
                        <!---->
                        <div class="fixed inset-0 z-50" style="display: none">
                          <!---->
                        </div>
                      </div>
                      <div class="group/nui-file-headless relative">
                        <div class="relative h-20 w-20">
                          <!-- <img
                            src="/img/avatars/company.svg"
                            alt="Upload preview"
                            class="bg-muted-200 dark:bg-muted-700/60 h-20 w-20 rounded-full object-cover object-center dark:invert"
                          /> -->
                          <div class="absolute bottom-0 end-0 z-20">
                            <div class="relative" data-tooltip="Upload image">
                              <button
                                type="button"
                                class="disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-none false false text-muted-700 bg-white border border-muted-300 dark:text-white dark:bg-muted-700 dark:hover:bg-muted-600 dark:border-muted-600 hover:bg-muted-50 rounded-full h-8 w-8 p-1 nui-focus relative inline-flex items-center justify-center space-x-1 font-sans text-sm font-normal leading-5 no-underline outline-none transition-all duration-300"
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
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <input
                          id="ninja-input-76"
                          type="file"
                          accept="image/*"
                          class="hidden"
                        />
                      </div>
                      <!---->
                    </div>
                    <div class="grid grid-cols-12 gap-4">
                      <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                        <div class="relative">
                          <label
                            class="nui-label w-full pb-1 text-[0.825rem]"
                            for="ninja-input-77"
                            >报表名称</label
                          >
                          <div class="group/nui-input relative">
                            <input
                              v-model="report.title"
                              type="text"
                              class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 px-3 rounded"
                              placeholder="Ex: Acme Inc."
                            />
                          </div>
                        </div>
                      </div>
                      <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                        <div class="relative">
                          <label
                            class="nui-label w-full pb-1 text-[0.825rem]"
                            for="ninja-input-78"
                            >Company Email</label
                          >
                          <div class="group/nui-input relative">
                            <input
                              id="ninja-input-78"
                              type="email"
                              class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 px-3 rounded"
                              placeholder="Ex: hello@acme.co"
                            /><!----><!----><!----><!---->
                          </div>
                        </div>
                      </div>
                      <div class="col-span-12">
                        <div class="relative">
                          <label
                            class="nui-label w-full pb-1 text-[0.825rem]"
                            for="ninja-input-79"
                            >Company website</label
                          >
                          <div class="group/nui-input relative">
                            <input
                              id="ninja-input-79"
                              type="text"
                              class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-9 rounded"
                              placeholder="Ex: https://acme.co"
                            /><!----><!---->
                            <div
                              class="text-muted-400 group-focus-within/nui-input:text-primary-500 absolute start-0 top-0 flex items-center justify-center transition-colors duration-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-75 h-10 w-10"
                            >
                              <svg
                                data-v-cd102a71=""
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                class="icon h-[1.15rem] w-[1.15rem]"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path
                                    d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10z"
                                  ></path>
                                </g>
                              </svg>
                            </div>
                            <!---->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mb-6 mt-4">
                      <label class="nui-label pb-2 text-[0.825rem]">模型</label>
                      <div
                        class="ptablet:grid-cols-2 ltablet:grid-cols-3 grid gap-4 lg:grid-cols-3"
                      >
                        <div class="group/nui-radio-headless relative">
                          <!---->
                          <div class="relative">
                            <input
                              id="ninja-input-80"
                              type="radio"
                              class="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                              value="team_member_1"
                            />
                            <div
                              class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md text-muted-400 peer-checked:!border-primary-500 peer-checked:[&amp;_.child]:!text-primary-500 relative border-2 px-2 py-4 grayscale peer-checked:grayscale-0"
                            >
                              <div
                                class="flex w-full flex-col items-center gap-2 text-center"
                              >
                                <svg
                                  data-v-cd102a71=""
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  aria-hidden="true"
                                  role="img"
                                  class="icon child mx-auto h-5 w-5"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 256 256"
                                >
                                  <g fill="currentColor">
                                    <path
                                      d="M216 115.54V208a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8v-92.46a8 8 0 0 1 2.62-5.92l80-75.54a8 8 0 0 1 10.77 0l80 75.54a8 8 0 0 1 2.61 5.92Z"
                                      opacity=".2"
                                    ></path>
                                    <path
                                      d="m218.83 103.77l-80-75.48a1.14 1.14 0 0 1-.11-.11a16 16 0 0 0-21.53 0l-.11.11l-79.91 75.48A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78ZM208 208H48v-92.45l.11-.1L128 40l79.9 75.43l.11.1Z"
                                    ></path>
                                  </g>
                                </svg>
                                <div>
                                  <h4
                                    class="font-heading text-sm font-medium leading-none"
                                  >
                                    Solo
                                  </h4>
                                  <p
                                    class="font-sans text-xs font-normal leading-normal leading-normal text-muted-400"
                                  >
                                    Small company
                                  </p>
                                </div>
                                <div
                                  class="child text-muted-300 absolute right-2 top-2 ms-auto"
                                >
                                  <div
                                    class="h-2 w-2 rounded-full bg-current"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="group/nui-radio-headless relative">
                          <!---->
                          <div class="relative">
                            <input
                              id="ninja-input-81"
                              type="radio"
                              class="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                              value="team_member_2"
                            />
                            <div
                              class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md text-muted-400 peer-checked:!border-primary-500 peer-checked:[&amp;_.child]:!text-primary-500 relative border-2 px-2 py-4 grayscale peer-checked:grayscale-0"
                            >
                              <div
                                class="flex w-full flex-col items-center gap-2 text-center"
                              >
                                <svg
                                  data-v-cd102a71=""
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  aria-hidden="true"
                                  role="img"
                                  class="icon child mx-auto h-5 w-5"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 256 256"
                                >
                                  <g fill="currentColor">
                                    <path
                                      d="M224 96v16a32 32 0 0 1-64 0V96H96v16a32 32 0 0 1-64 0V96l14.34-50.2A8 8 0 0 1 54 40h148a8 8 0 0 1 7.69 5.8Z"
                                      opacity=".2"
                                    ></path>
                                    <path
                                      d="M232 96a7.89 7.89 0 0 0-.3-2.2l-14.35-50.2A16.07 16.07 0 0 0 202 32H54a16.07 16.07 0 0 0-15.35 11.6L24.31 93.8A7.89 7.89 0 0 0 24 96v16a40 40 0 0 0 16 32v64a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16v-64a40 40 0 0 0 16-32ZM54 48h148l11.42 40H42.61Zm50 56h48v8a24 24 0 0 1-48 0Zm-16 0v8a24 24 0 0 1-48 0v-8Zm112 104H56v-56.8a40.57 40.57 0 0 0 8 .8a40 40 0 0 0 32-16a40 40 0 0 0 64 0a40 40 0 0 0 32 16a40.57 40.57 0 0 0 8-.8Zm-8-72a24 24 0 0 1-24-24v-8h48v8a24 24 0 0 1-24 24Z"
                                    ></path>
                                  </g>
                                </svg>
                                <div>
                                  <h4
                                    class="font-heading text-sm font-medium leading-none"
                                  >
                                    LLC
                                  </h4>
                                  <p
                                    class="font-sans text-xs font-normal leading-normal leading-normal text-muted-400"
                                  >
                                    Medium company
                                  </p>
                                </div>
                                <div
                                  class="child text-muted-300 absolute right-2 top-2 ms-auto"
                                >
                                  <div
                                    class="h-2 w-2 rounded-full bg-current"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="group/nui-radio-headless relative">
                          <!---->
                          <div class="relative">
                            <input
                              id="ninja-input-82"
                              type="radio"
                              class="peer absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                              value="team_member_3"
                            />
                            <div
                              class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative w-full border bg-white transition-all duration-300 rounded-md text-muted-400 peer-checked:!border-primary-500 peer-checked:[&amp;_.child]:!text-primary-500 relative border-2 px-2 py-4 grayscale peer-checked:grayscale-0"
                            >
                              <div
                                class="flex w-full flex-col items-center gap-2 text-center"
                              >
                                <svg
                                  data-v-cd102a71=""
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  aria-hidden="true"
                                  role="img"
                                  class="icon child mx-auto h-5 w-5"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 256 256"
                                >
                                  <g fill="currentColor">
                                    <path
                                      d="M136 32v184H40V85.35a8 8 0 0 1 3.56-6.66l80-53.33A8 8 0 0 1 136 32Z"
                                      opacity=".2"
                                    ></path>
                                    <path
                                      d="M240 208h-16V96a16 16 0 0 0-16-16h-64V32a16 16 0 0 0-24.88-13.32L39.12 72A16 16 0 0 0 32 85.34V208H16a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16ZM208 96v112h-64V96ZM48 85.34L128 32v176H48ZM112 112v16a8 8 0 0 1-16 0v-16a8 8 0 1 1 16 0Zm-32 0v16a8 8 0 0 1-16 0v-16a8 8 0 1 1 16 0Zm0 56v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0Zm32 0v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0Z"
                                    ></path>
                                  </g>
                                </svg>
                                <div>
                                  <h4
                                    class="font-heading text-sm font-medium leading-none"
                                  >
                                    Corp
                                  </h4>
                                  <p
                                    class="font-sans text-xs font-normal leading-normal leading-normal text-muted-400"
                                  >
                                    Bigger company
                                  </p>
                                </div>
                                <div
                                  class="child text-muted-300 absolute right-2 top-2 ms-auto"
                                >
                                  <div
                                    class="h-2 w-2 rounded-full bg-current"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div shape="curved" class="w-full space-y-8 p-10">
              <div class="mx-auto w-full max-w-[410px]">
                <div class="grid grid-cols-12 gap-4">
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <div class="relative">
                      <label
                        class="nui-label w-full pb-1 text-[0.825rem]"
                        for="ninja-input-83"
                        >区域</label
                      >
                      <div class="group/nui-select relative">
                        <select
                          id="ninja-input-83"
                          class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full cursor-pointer appearance-none border bg-white font-sans focus:shadow-lg px-2 pe-9 h-10 py-2 text-sm leading-5 px-3 pe-6 rounded px-3"
                        >
                          <!---->
                          <option hidden="" value=""></option>
                          <option value="0 - 250K">0 - 250K</option>
                          <option value="250K - 500K">250K - 500K</option>
                          <option value="500K - 1M">500K - 1M</option>
                          <option value="1M - 5M">1M - 5M</option>
                          <option value="10M+">10M+</option></select
                        ><!----><!----><!---->
                        <div
                          class="text-muted-400 pointer-events-none absolute end-0 top-0 flex items-center justify-center transition-transform duration-300 group-focus-within/nui-select:-rotate-180 h-10 w-10"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            class="h-4 w-4"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m6 9 6 6 6-6"
                            ></path>
                          </svg>
                        </div>
                        <!---->
                      </div>
                    </div>
                  </div>
                  <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
                    <div class="relative">
                      <label
                        class="nui-label w-full pb-1 text-[0.825rem]"
                        for="ninja-input-84"
                        >Employees</label
                      >
                      <div class="group/nui-select relative">
                        <select
                          id="ninja-input-84"
                          class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full cursor-pointer appearance-none border bg-white font-sans focus:shadow-lg px-2 pe-9 h-10 py-2 text-sm leading-5 px-3 pe-6 rounded px-3"
                        >
                          <!---->
                          <option hidden="" value=""></option>
                          <option value="1-10 employees">1-10 employees</option>
                          <option value="10-50 employees">
                            10-50 employees
                          </option>
                          <option value="50-100 employees">
                            50-100 employees
                          </option>
                          <option value="100+ employees">
                            100+ employees
                          </option></select
                        ><!----><!----><!---->
                        <div
                          class="text-muted-400 pointer-events-none absolute end-0 top-0 flex items-center justify-center transition-transform duration-300 group-focus-within/nui-select:-rotate-180 h-10 w-10"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            class="h-4 w-4"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m6 9 6 6 6-6"
                            ></path>
                          </svg>
                        </div>
                        <!---->
                      </div>
                    </div>
                  </div>
                  <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
                    <div class="relative w-full">
                      <label
                        id="headlessui-listbox-label-16"
                        data-headlessui-state=""
                        class="nui-label pb-1 text-[0.825rem]"
                        >Manager</label
                      >
                      <div class="relative">
                        <button
                          id="headlessui-listbox-button-17"
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded="false"
                          data-headlessui-state=""
                          class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer/input relative w-full border bg-white pe-12 ps-4 font-sans text-sm leading-5 focus:shadow-lg disabled:cursor-not-allowed disabled:opacity-75 rounded"
                          aria-labelledby="headlessui-listbox-label-16 headlessui-listbox-button-17"
                        >
                          <div class="flex w-full items-center h-10">
                            <!---->
                            <div
                              class="text-muted-300 dark:text-muted-500 truncate text-left"
                            ></div>
                            <span
                              class="border-muted-300 dark:border-muted-700 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center border-l w-10"
                              ><svg
                                data-v-cd102a71=""
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                class="icon text-muted-400 transition-transform duration-300 h-4 w-4"
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
                                  d="m6 9l6 6l6-6"
                                ></path></svg></span
                            ><!---->
                          </div></button
                        ><!----><!----><!---->
                      </div>
                    </div>
                  </div>
                  <div class="ltablet:col-span-4 col-span-12 lg:col-span-4">
                    <div class="relative">
                      <label
                        class="nui-label w-full pb-1 text-[0.825rem]"
                        for="ninja-input-85"
                        >Status</label
                      >
                      <div class="group/nui-select relative">
                        <select
                          id="ninja-input-85"
                          class="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full cursor-pointer appearance-none border bg-white font-sans focus:shadow-lg px-2 pe-9 h-10 py-2 text-sm leading-5 px-3 pe-6 rounded px-3"
                        >
                          <!---->
                          <option hidden="" value=""></option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option></select
                        ><!----><!----><!---->
                        <div
                          class="text-muted-400 pointer-events-none absolute end-0 top-0 flex items-center justify-center transition-transform duration-300 group-focus-within/nui-select:-rotate-180 h-10 w-10"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            class="h-4 w-4"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m6 9 6 6 6-6"
                            ></path>
                          </svg>
                        </div>
                        <!---->
                      </div>
                    </div>
                  </div>
                  <div class="col-span-12">
                    <div class="relative">
                      <label
                        for="ninja-input-86"
                        class="nui-label pb-1 text-[0.825rem]"
                        >Company notes</label
                      >
                      <div class="group/nui-textarea relative flex flex-col">
                        <textarea
                          id="ninja-input-86"
                          class="nui-focus border-muted-300 placeholder:text-muted-300 focus:border-muted-300 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 dark:focus:shadow-muted-800/50 peer w-full border bg-white font-sans transition-all duration-300 focus:shadow-lg disabled:cursor-not-allowed disabled:opacity-75 min-h-[2.5rem] text-sm leading-[1.6] rounded resize-none p-2"
                          placeholder="Write some notes..."
                          rows="4"
                        ></textarea
                        ><!----><!----><!----><!---->
                      </div>
                    </div>
                  </div>
                  <div class="col-span-12">
                    <div
                      class="relative inline-flex items-start gap-1 text-primary-500"
                    >
                      <div
                        class="nui-focus group/nui-checkbox relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded"
                      >
                        <input
                          id="ninja-input-87"
                          true-value="true"
                          false-value="false"
                          class="peer absolute z-20 h-5 w-5 cursor-pointer opacity-0"
                          type="checkbox"
                        />
                        <div
                          class="border-muted-400 dark:border-muted-700 dark:bg-muted-700 absolute start-0 top-0 z-0 h-full w-full border-2 bg-white peer-checked:border-current peer-indeterminate:border-current peer-checked:dark:border-current peer-indeterminate:dark:border-current rounded"
                        ></div>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 17 12"
                          class="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-checked:translate-y-0 peer-checked:opacity-100 peer-indeterminate:!translate-y-6"
                        >
                          <path
                            fill="currentColor"
                            d="M16.576.414a1.386 1.386 0 0 1 0 1.996l-9.404 9.176A1.461 1.461 0 0 1 6.149 12c-.37 0-.74-.139-1.023-.414L.424 6.998a1.386 1.386 0 0 1 0-1.996 1.47 1.47 0 0 1 2.046 0l3.68 3.59L14.53.414a1.47 1.47 0 0 1 2.046 0z"
                          ></path></svg
                        ><svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          class="pointer-events-none absolute z-10 h-2.5 w-2.5 translate-y-6 fill-current opacity-0 transition duration-300 peer-indeterminate:translate-y-0 peer-indeterminate:opacity-100"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                            d="M2 12h20"
                          ></path>
                        </svg>
                      </div>
                      <div class="inline-flex flex-col">
                        <label
                          for="ninja-input-87"
                          class="text-muted-400 ms-1 cursor-pointer select-none font-sans text-sm"
                          >This record is private</label
                        ><!---->
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 flex flex-col-reverse text-right md:block md:space-x-3"
                >
                  <button
                    type="submit"
                    class="is-button rounded bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500 !h-12 w-full sm:w-40"
                  >
                    Create Company
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
