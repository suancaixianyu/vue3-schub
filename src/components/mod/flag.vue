<template>
  <div
      class="item"
      :class="active ? 'active' : ''"
      v-if="flag === 'all'"
  >
    <Grid style="width: 18px;height: 18px"></Grid>
    <div class="name">全部{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'agriculture'"
  >
    <icon-agriculture></icon-agriculture>
    <div class="name">农业{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'adventure'"
  >
    <icon-adventure></icon-adventure>
    <div class="name">冒险{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'library'"
  >
    <icon-library></icon-library>
    <div class="name">Lib{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'magic'"
  >
    <icon-magic></icon-magic>
    <div class="name">魔法{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'technology'"
  >
    <icon-technology></icon-technology>
    <div class="name">科技{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'world'"
  >
    <sc-logo :size="18"></sc-logo>
    <div class="name">世界{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'texture'"
  >
    <sc-logo :size="18"></sc-logo>
    <div class="name">材质包{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'skin'">
    <sc-logo :size="18"></sc-logo>
    <div class="name">皮肤{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'furniture'"
  >
    <sc-logo :size="18"></sc-logo>
    <div class="name">家具包{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
    class="item"
    :class="active ? 'active' : ''"
    v-else-if="flag === 'server'"
  >
    <icon-server :size="18"></icon-server>
    <div class="name">服务器{{count>-1?('('+count+')'):''}}</div>
  </div>
  <div
      class="item"
      :class="active ? 'active' : ''"
      v-else-if="flag === ''">
    <sc-logo :size="18"></sc-logo>
    <div class="name">其它{{count>-1?('('+count+')'):''}}</div>
  </div>
</template>
<script lang="ts">
import IconAgriculture from '@comps/icons/mod/agriculture.vue'
import IconAdventure from '@comps/icons/mod/adventure.vue'
import IconLibrary from '@comps/icons/mod/library.vue'
import IconMagic from '@comps/icons/mod/magic.vue'
import IconTechnology from '@comps/icons/mod/technology.vue'
import ScLogo from '@comps/icons/ScLogo.vue'
import IconServer from '@comps/icons/mod/server.vue'
export default {
  name: 'ModFlag',
  components: {
    IconServer,
    ScLogo,
    IconTechnology,
    IconMagic,
    IconLibrary,
    IconAdventure,
    IconAgriculture,
  },
  props: {
    active: { type: Boolean },
    flag: { type: String },
    count:{type:Number,default:-1}
  },
}
</script>
<style scoped>
.item {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #909399;
  background: #f4f4f5;
  border: 1px solid #e9e9eb;
  padding: 2px 10px;
  border-radius: 5px;
  line-height: initial;
  cursor: pointer;
  margin: 5px 5px;
  transition: all 0.2s;
  fill: #909399;
  stroke: #909399;
}

.item .name {
  width: max-content;
  user-select: none;
  padding-left: 5px;
}

.item.active {
  fill: #409eff;
  stroke: #409eff;
  color: #409eff;
  background: #ecf5ff;
  border: 1px solid #d9ecff;
}
</style>
