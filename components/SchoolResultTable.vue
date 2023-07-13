<script setup lang="ts">
import { SchoolInfo } from "@/utils/process";

// todo: header 要 sticky

const { schools } = defineProps<{
  schools: SchoolInfo[];
}>();
</script>
<template>
  <el-table v-if="schools?.length" :data="schools" striped>
    <el-table-column
      v-for="key in Object.keys(schools[0])"
      sortable
      header-align="center"
      align="center"
      :prop="key"
      :label="key"
      label-class-name="text-center"
      :formatter="
        typeof schools[0][key] === 'number' && !key.includes('数')
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
