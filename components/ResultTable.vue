<script setup lang="ts">
// todo: header 要 sticky

const { data } = defineProps<{
  data: Object[];
}>();
</script>
<template>
  <el-table v-if="data?.length" :data="data" striped>
    <el-table-column
      v-for="key in Object.keys(data[0])"
      sortable
      header-align="center"
      align="center"
      :prop="key"
      :label="key"
      label-class-name="text-center"
      :formatter="
        typeof data[0][key] === 'number' && !key.includes('数')
          ? (row) =>
              Number(row[key])
                .toLocaleString('zh-CN', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
                .replace(/,/g, '')
          : undefined
      "
    />
  </el-table>
</template>
