<script setup lang="ts">
import { TeacherInfo } from "@/utils/process";
import { TableColumnCtx } from "element-plus/es/components";

// todo: header 要 sticky
// todo: 多级表头

const { teachers } = defineProps<{
  teachers: TeacherInfo[];
}>();

const dedupe = (arr: any[]) => Array.from(new Set(arr))

const filterableCols = ['学校', '年级']
const filterHandler = (
  value: TeacherInfo,
  row: object,
  column: TableColumnCtx<TeacherInfo>
) => {
  const property = column['property']
  return row[property] === value
}

</script>

<template>
  <el-table :data="teachers" striped v-if="teachers?.length" class="h-full" style="overflow:unset">
    <template v-for="key in Object.keys(teachers[0])">
      <el-table-column v-if="['number', 'string'].includes(typeof teachers[0][key])" sortable
        :filters="filterableCols.includes(key) ? dedupe(teachers.map(e => e[key])).map(e => ({ text: e, value: e })) : undefined"
        header-align="center" align="center" :prop="key" :label="key" label-class-name="text-center" :formatter="typeof teachers[0][key] === 'number' && !key.includes('数')
          ? (row) =>
            Number(row[key])
              .toLocaleString('zh-CN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
              .replace(/,/g, '')
          : undefined
          " :filter-method="filterableCols.includes(key) ? filterHandler : undefined" />
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