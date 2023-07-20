<script setup lang="ts">

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
  return (typeof value === 'number') && ['数', '名次', '名'].every(str => !(key.includes(str)))
}

const filterer = ref((e: object) => !!e)

const filteredData = computed(() => data.filter(filterer.value))

const currentData = computed(() => {
  return filteredData.value.slice((currentPage.value - 1) * perPage.value, currentPage.value * perPage.value)
})



const perPage = ref(15)

const handleFilterChange = (obj) => {
  // todo: 不能在本页筛选，而要从整体的数据中筛选
  console.log(obj)
  filterer.value = (data) => {
    const res = []
    for (const [key, value] of Object.entries(obj)) {
      if (!value?.length) {
        res.push(true)
      }
      else {
        res.push((value as string[]).includes(data[key]))
      }
    }
    return res.every(e => !!e)
  }
}

</script>
<template>
  <el-table @filter-change="handleFilterChange" v-if="data?.length" :data="currentData" striped style="overflow:unset">
    <el-table-column v-for="key in Object.keys(data[0])" sortable header-align="center" align="center" :prop="key"
      :column-key="key" :label="key" label-class-name="text-center"
      :filters="filterableCols?.includes(key) ? dedupe(data.map(e => e[key])).map(e => ({ text: e, value: e })) : undefined"
      :formatter="shouldFormat(key, data[0][key]) ? (row) =>
        Number(row[key])
          .toLocaleString('zh-CN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
          .replace(/,/g, '') : undefined" />
  </el-table>
  <div class="mt-4">
    <BasePagination :item-per-page="perPage" :total-items="filteredData?.length || 0" :current-page="currentPage"
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