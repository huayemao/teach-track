<script setup lang="ts">
import { TableColumnCtx } from 'element-plus';

// todo: header 要 sticky


const { data, filterableCols } = defineProps<{
  data: Object[];
  filterableCols?: string[]
}>();

const dedupe = (arr: any[]) => Array.from(new Set(arr))

const route = useRoute()

const currentPage = computed(() => {
  try {
    return Number.parseInt(route.query.page as string) || 1
  } catch { }
  return 1
})

const shouldFormat = (key: string, value: any) => {
  return (typeof value === 'number') && ['数', '名次'].every(str => !(key.includes(str)))
}

const filterHandler = (
  value: object,
  row: object,
  column: TableColumnCtx<object>
) => {
  const property = column['property']
  return row[property] === value
}

const perPage = ref(15)

</script>
<template>
  <el-table v-if="data?.length" :data="data.slice((currentPage - 1) * perPage, currentPage * perPage)" striped
    style="overflow:unset">
    <el-table-column v-for="key in Object.keys(data[0])" sortable header-align="center" align="center" :prop="key"
      :label="key" label-class-name="text-center"
      :filters="filterableCols?.includes(key) ? dedupe(data.map(e => e[key])).map(e => ({ text: e, value: e })) : undefined"
      :filter-method="filterableCols.includes(key) ? filterHandler : undefined"
      :formatter="shouldFormat(key, data[0][key]) ? (row) =>
        Number(row[key])
          .toLocaleString('zh-CN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
          .replace(/,/g, '') : undefined" />
  </el-table>
  <div class="mt-4">
    <BasePagination :item-per-page="perPage" :total-items="data?.length || 0" :current-page="currentPage"
      :max-links-displayed="5" shape="curved" />
  </div>
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