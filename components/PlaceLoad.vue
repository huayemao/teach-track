<template>
    <div class="w-full h-full space-y-6 flex flex-col absolute right-0 bottom-0 items-center p-20 pl-32">
        <BasePlaceload v-for="item in [1, 2, 3, 4, 5, 6, 7]" class="w-full rounded flex-1 h-8" />
    </div>
</template>