<script setup lang="ts">
const props = defineProps<{
    title: string;
    description: string;
}>();
const emit = defineEmits<{
    (e: "cancel"): void;
}>();

</script>
<template>
    <div class="">
        <div class="mb-4 flex flex-col justify-between md:flex-row md:items-center">
            <div
                class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full">
                <div>
                    <h2 class="font-heading text-xl font-light leading-tight text-muted-800 dark:text-white">
                        <span>{{ props.title }}</span>
                    </h2>
                    <p class="font-alt text-sm font-normal leading-normal">
                        <span class="text-muted-500">
                            {{ props.description }}
                        </span>
                    </p>
                </div>
            </div>
            <div class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start">
                <BaseButton @click="() => emit('cancel')" condensed>
                    <Icon name="lucide:arrow-left" class="h-4 w-4" />
                    <span>取消</span>
                </BaseButton>
            </div>
        </div>
        <slot />
    </div>
</template>