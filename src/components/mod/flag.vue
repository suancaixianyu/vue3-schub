<template>
  <div class="item" :class="active ? 'active' : ''" v-if="flag === 'agriculture'">
    <icon-agriculture></icon-agriculture>
    <div class="name">农业</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'adventure'">
    <icon-adventure></icon-adventure>
    <div class="name">冒险</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'library'">
    <icon-library></icon-library>
    <div class="name">Lib</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'magic'">
    <icon-magic></icon-magic>
    <div class="name">魔法</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'technology'">
    <icon-technology></icon-technology>
    <div class="name">科技</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'world'">
    <sc-logo></sc-logo>
    <div class="name">世界</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'texture'">
    <sc-logo></sc-logo>
    <div class="name">材质包</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'skin'">
    <sc-logo></sc-logo>
    <div class="name">皮肤</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'furniture'">
    <sc-logo></sc-logo>
    <div class="name">家具包</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else-if="flag === 'server'">
    <icon-server></icon-server>
    <div class="name">服务器</div>
  </div>
  <div class="item" :class="active ? 'active' : ''" v-else>
    <sc-logo></sc-logo>
    <div class="name">其它</div>
  </div>
</template>
<script lang="ts">
import IconAgriculture from "@comps/icons/mod/agriculture.vue"
import IconAdventure from "@comps/icons/mod/adventure.vue"
import IconLibrary from "@comps/icons/mod/library.vue"
import IconMagic from "@comps/icons/mod/magic.vue"
import IconTechnology from "@comps/icons/mod/technology.vue"
import ScLogo from "@comps/icons/ScLogo.vue"
import IconServer from "@comps/icons/mod/server.vue"
export default {
  name: "ModFlag",
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
  },
}
</script>
<style scoped>
.item {
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #aaa;
  padding: 0 5px;
  border-radius: 5px;
  line-height: initial;
  cursor: pointer;
  margin: 0 5px;
  transition: all .2s;
}

.item .my-icon {
  fill: #333;
}

.item .name {
  color: #333;
  user-select: none;
}

.item.active {
  fill: #fff;
  background: #008ac5;
}

.item.active .name {
  color: #fff;
}
</style>
