<template>
  <div class="tab-head">我的帖子</div>
  <div class="tab-container">
    <el-table :data="bbs" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="views" label="浏览" width="180" />
      <el-table-column prop="comments" label="评论" width="180" />
    </el-table>
  </div>
  <div class="tab-head">我的存档</div>
  <div class="tab-container">
    <el-table :data="world" stripe style="width: 100%">
      <el-table-column prop="type_name" label="类型" width="180" />
      <el-table-column prop="file_name" label="名称" width="180" />
      <el-table-column prop="size" label="大小" />
      <el-table-column prop="create_time" label="上传日期" />
      <el-table-column prop="rate" label="评分" />
      <el-table-column prop="boutique" label="精品" />
    </el-table>
  </div>
  <div class="tab-head">我的Mod</div>
  <div class="tab-container">
    <el-table :data="mod" stripe style="width: 100%">
      <el-table-column prop="type" label="图标" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="size" label="大小" />
      <el-table-column prop="date" label="上传日期" />
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserIndexPage",
  props: {
    bbs: {
      type: Object,
      required: true,
    },
    mod: {
      type: Object,
      required: true,
    },
    world: {
      type: Object,
      required: true,
    },
  },
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
    }
  },
}
</script>
