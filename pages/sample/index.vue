<script setup lang="ts">
const files = [
    "元谋县2021-2022学年末考试（八年级） .xlsx",
    "元谋县2021-2022学年末考试（二年级） .xlsx",
    "元谋县2021-2022学年末考试（九年级） .xlsx",
    "元谋县2021-2022学年末考试（六年级）.xlsx",
    "元谋县2021-2022学年末考试（七年级）.xlsx",
    "元谋县2021-2022学年末考试（三年级）.xlsx",
    "元谋县2021-2022学年末考试（四年级）.xlsx",
    "元谋县2021-2022学年末考试（五年级） .xlsx",
    "元谋县2021-2022学年末考试（一年级） .xlsx",
    "中考九年级预测目标完成情况.xlsx",
    "九年级学生入学成绩.xlsx"
].sort((a, b) => a.localeCompare(b))
</script>
<template>
    <div class="prose">
        <ul>
            <li v-for="file in files"><a :href="`/sample/${file}`">{{ file }}</a></li>
        </ul>
    </div>
</template>