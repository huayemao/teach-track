<script setup lang="ts">
import { TeacherInfo } from "@/utils/process";

// todo: header 要 sticky
// todo: 多级表头

const { teachers } = defineProps<{
  teachers: TeacherInfo[];
}>();
</script>

<template>
  <el-table :data="teachers" striped v-if="teachers?.length" class="h-full" style="overflow:unset">
    <template v-for="key in Object.keys(teachers[0])">
      <el-table-column v-if="['number', 'string'].includes(typeof teachers[0][key])" sortable header-align="center"
        align="center" :prop="key" :label="key" label-class-name="text-center" :formatter="typeof teachers[0][key] === 'number' && !key.includes('数')
          ? (row) =>
            Number(row[key])
              .toLocaleString('zh-CN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
              .replace(/,/g, '')
          : undefined
          " />
    </template>
  </el-table>
</template>

<style scoped>
:deep(.el-table__header-wrapper) {
  @apply sticky top-0 z-10 bg-muted-50 shadow-sm;
}

:deep(.el-table thead) {
  --el-table-header-text-color: var(--color-muted-600);
}

:deep(.el-table th.el-table__cell) {
  @apply !bg-muted-50 !text-muted-600;
}
</style>