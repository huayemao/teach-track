<script setup lang="ts">
</script>

<template>
    <button @click="$router.back()" type="button" class="flex h-10 w-10 items-center justify-center -ms-3">
        <div class="scale-90 relative h-5 w-5">
            <span
                class="-rotate-45 rtl:rotate-45 max-w-[75%] top-1 bg-primary-500 absolute block h-0.5 w-full transition-all duration-300"></span><span
                class="opacity-0 translate-x-4 bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300"></span><span
                class="rotate-45 rtl:-rotate-45 max-w-[75%] bottom-1 bg-primary-500 absolute block h-0.5 w-full transition-all duration-300"></span>
        </div>
    </button>
    <h1 class="font-heading text-2xl font-light leading-normal text-muted-800 hidden dark:text-white md:block">
        {{ $route.meta.title || '' }}
    </h1>
</template>