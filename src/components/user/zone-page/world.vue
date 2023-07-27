<template>
  <div class="tab-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="type" label="类型" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="size" label="大小" />
      <el-table-column prop="date" label="上传日期" />
      <el-table-column fixed="right" label="操作">
        <template #default>
          <el-button link type="primary" size="small">删除</el-button>
          <el-button link type="primary" size="small">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: "WorldPage",
  data() {
    return {
      tableData: [
        {
          type: "2016-05-03",
          name: "Mk城市",
          size: "100.1kb",
          date: "2023-07-21 11:12",
        },
        {
          type: "2016-05-03",
          name: "Tajbn",
          size: "345.99kb",
          date: "2023-07-21 11:12",
        },
      ],
    };
  },
};
</script>
