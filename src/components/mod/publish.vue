<template>
  <el-container class="el-container">
    <el-form class="el-form">
      <el-tabs type="border-card" v-model="activeTab" class="demo-tabs">
        <el-tab-pane label="基本信息" name="base">
          <el-form-item label="模组名称*">
            <el-input v-model="name" />
          </el-form-item>
          <el-form-item label="模组元素*">
            <mod-flag flag="adventure" :active="flag[0]" @click="pushFlag(0)"></mod-flag>
            <mod-flag flag="magic" :active="flag[1]" @click="pushFlag(1)"></mod-flag>
            <mod-flag flag="technology" :active="flag[2]" @click="pushFlag(2)"></mod-flag>
            <mod-flag flag="agriculture" :active="flag[3]" @click="pushFlag(3)"></mod-flag>
            <mod-flag flag="library" :active="flag[4]" @click="pushFlag(4)"></mod-flag>
          </el-form-item>
          <el-form-item label="支持API版本*">
            <el-checkbox-group v-model="apiSupport">
              <el-checkbox label="1.30" name="a" />
              <el-checkbox label="1.44" name="b" />
              <el-checkbox label="1.50" name="c" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="支持SC版本*">
            <el-radio-group v-model="scVersion">
              <el-checkbox label="2.1" name="a" />
              <el-checkbox label="2.2" name="b" />
              <el-checkbox label="2.3" name="c" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相关链接">
            <div class="flex v">
              <div class="flex" v-for="(x, i) in link" :key="x">
                <el-input v-model="x.src" />
                <el-button type="primary" icon="Minus" text @click="deleteLink(i)" :data-index="i"
                  >删除</el-button
                >
              </div>
              <div>
                <el-button size="small" type="primary" text icon="Plus" @click="newLink"
                  >添加链接</el-button
                >
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">创建</el-button>
            <el-button plain>取消</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="扩展信息" name="extra">
          <el-form-item label="模组包名*">
            <el-input v-model="packageName" />
          </el-form-item>
          <el-form-item label="模组封面*">
            <el-input v-model="cover" />
          </el-form-item>
          <el-form-item label="模组介绍*">
            <el-input v-model="desc" type="textarea" />
          </el-form-item>
          <el-form-item label="模组关系*">
            <div class="flex v">
              <div class="flex" v-for="(x, i) in relation" :key="x">
                <el-select v-model="x.package" placeholder="选择模组ID">
                  <el-option label="工业时代IC(sc.industrial_craft)" value="ic" />
                </el-select>
                <el-select v-model="x.type" placeholder="选择关系">
                  <el-option label="前置" value="0" />
                  <el-option label="扩展" value="1" />
                  <el-option label="联动" value="2" />
                </el-select>
                <el-button
                  type="primary"
                  icon="Minus"
                  text
                  @click="deleteRelation(i)"
                  :data-index="i"
                  >删除</el-button
                >
              </div>
              <div>
                <el-button size="small" type="primary" text icon="Plus" @click="newRelation"
                  >添加关系</el-button
                >
              </div>
            </div>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-container>
</template>

<script lang="ts">
import ModFlag from "@/components/mod/flag"
export default {
  name: "ModPublish",
  components: {
    ModFlag,
  },
  data() {
    return {
      cover: "",
      activeTab: "base",
      name: "",
      packageName: "",
      desc: "",
      relation: [],
      apiSupport: [],
      scVersion: [],
      link: [],
      flag: [false, false, false, false, false, false, false, false, false, false],
    }
  },
  methods: {
    pushFlag(i) {
      this.flag[i] = !this.flag[i]
    },
    newLink() {
      this.link.push({ src: "" })
    },
    deleteLink(e) {
      this.link.splice(e, 1)
    },
    newRelation() {
      this.relation.push({ package: "", type: "" })
    },
    deleteRelation(e) {
      this.relation.splice(e, 1)
    },
    submit() {
      console.log(this.link)
    },
  },
}
</script>
<style scoped>
.el-form {
  width: inherit;
}

.el-container {
  width: 100%;
  margin-top: 20px;
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  padding: 5px 0;
}

.flex.v {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
