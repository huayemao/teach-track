<script setup lang="ts">
const router = useRouter();
const routes = router.options.routes;
const route = useRoute()
const routeNames = routes.map(e => e.name?.toString()) as string[]


const targetRouteName = computed(() => {
    const routeName = route.name?.toString() as string
    const options = [routeName.split('-').slice(0, -1).join('-') || 'index', routeName.split('-').slice(0, -2).join('-') || 'index']
    const v = options.find(e => routeNames.includes(e))
    return v
})


const navigate = () => {
    navigateTo({
        ...route,
        name: targetRouteName.value,
    })
}
</script>

<template>
    <button v-show="targetRouteName && route.name != 'index'" @click="navigate" type="button"
        class="flex h-10 w-10 items-center justify-center -ms-3">
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