<script setup lang="ts">
import { TeacherInfo } from "@/utils/process";

// todo: header 要 sticky

const { teachers } = defineProps<{
  teachers: TeacherInfo[];
}>();

// v-if="['number', 'string'].includes(typeof teachers[0][key])"
</script>

<template>
  <el-table :data="teachers" striped v-if="teachers?.length">
    <el-table-column
      v-for="key in Object.keys(teachers[0])"
      sortable
      header-align="center"
      align="center"
      :prop="key"
      :label="key"
      label-class-name="text-center"
      :formatter="
        typeof teachers[0][key] === 'number'
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
