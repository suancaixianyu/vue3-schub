<template>
  <div class="tab-container">
    <el-header class="el-header">
      <div class="filter-item active">
        <el-icon>
          <Grid />
        </el-icon>
        <div>全部(0)</div>
      </div>
      <div class="filter-item">
        <icon-technology></icon-technology>
        <div>科技(0)</div>
      </div>
      <div class="filter-item">
        <icon-magic></icon-magic>
        <div>魔法(0)</div>
      </div>
      <div class="filter-item">
        <icon-adventure></icon-adventure>
        <div>冒险(0)</div>
      </div>
      <div class="filter-item">
        <icon-agriculture></icon-agriculture>
        <div>农业(0)</div>
      </div>
      <div class="filter-item">
        <icon-library></icon-library>
        <div>Lib(0)</div>
      </div>
      <div class="filter-item">
        <sc-logo size="18"></sc-logo>
        <div>世界(0)</div>
      </div>
      <div class="filter-item">
        <sc-logo size="18"></sc-logo>
        <div>方块材质(0)</div>
      </div>
      <div class="filter-item">
        <sc-logo size="18"></sc-logo>
        <div>皮肤(0)</div>
      </div>
      <div class="filter-item">
        <sc-logo size="18"></sc-logo>
        <div>家具包(0)</div>
      </div>
      <div class="filter-item">
        <icon-server size="16"></icon-server>
        <div>服务器(0)</div>
      </div>
    </el-header>
    <el-container class="el-container">
      <router-link to="/ModDetail/1">
        <div class="res-item">
          <div class="right">
            <img class="img" src="../../assets/image/mod-icon.jpg" />
          </div>
          <div class="left">
            <div class="name-line">
              <div class="flag-area">
                <mod-flag class="flag" flag="adventure" active></mod-flag>
                <mod-flag class="flag" flag="adventure" active></mod-flag>
                <mod-flag class="flag" flag="adventure" active></mod-flag>
              </div>
              <div>[工业2]工业时代(Industrial II)</div>
            </div>
            <div class="description-line">
              [h1=简介]工业2是围绕 Minecraft
              生活现代化和生产自动化两个主题而展开的 Minecraft 模组，由
              IndustrialCraft2 Dev Team
              开发并维护。它在工业1的基础上发展而来，引入了名为 [EU] 能量单元
              (Energy Unit)
              的电力能源系统，以及对应的发电设备，并以此为基础添加了大量相关物品、方块以及机器。其内容涉及资源处理、矿物采集、农业等多个主题...
            </div>
            <div class="btn-line">
              <div class="item">
                <icon-hot size="18"></icon-hot>
                <div class="hot">81.6k</div>
              </div>
              <div class="item">
                <like-icon size="24"></like-icon>
                <div class="like">2.6k</div>
              </div>
              <div class="item">
                <icon-down size="18"></icon-down>
                <div class="down">1.8k</div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Grid } from "@element-plus/icons-vue";
import IconTechnology from "@/components/icons/mod/technology";
import IconMagic from "@/components/icons/mod/magic";
import IconAdventure from "@/components/icons/mod/adventure";
import IconAgriculture from "@/components/icons/mod/agriculture";
import IconLibrary from "@/components/icons/mod/library";
import ScLogo from "@/components/icons/ScLogo";
import IconServer from "@/components/icons/mod/server";
import ModFlag from "@/components/mod/flag";
import IconHot from "@/components/icons/common/hot";
import LikeIcon from "@/components/icons/Like";
import IconDown from "@/components/icons/common/down";
export default {
  name: "ModList",
  components: {
    IconDown,
    LikeIcon,
    IconHot,
    ModFlag,
    IconServer,
    ScLogo,
    IconLibrary,
    IconAgriculture,
    IconAdventure,
    IconMagic,
    IconTechnology,
    Grid,
  },
  data() {
    return {};
  },
  methods: {
    goPublish() {},
  },
};
</script>
<style scoped>
.filter-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5px;
}

.filter-item.active {
  font-weight: bold;
}

.el-header {
  background: #fff;
  margin: 10px 0;
  border-radius: 5px;
  border-bottom: 1px solid #eee;
  align-items: center;
  display: flex;
}

.el-container {
  flex: 1;
  background: #fff;
}

.res-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
}

.res-item .name-line {
  display: flex;
  flex-direction: row;
  color: #008ac5;
}

.res-item .name-line:hover {
  color: #333;
}

.res-item .description-line {
  font-size: 10px;
}

.res-item .btn-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 10px;
  color: #98a0aa;
  align-items: center;
  font-size: 12px;
}

.res-item .left {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.res-item .right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.res-item .right .img {
  width: 128px;
  height: 96px;
}

.res-item .btn-line .hot {
  color: #e85353;
}

.res-item .btn-line .like {
  color: #98a0aa;
}

.res-item .btn-line .down {
  color: #008ac5;
}

.res-item .btn-line .item {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
}

.res-item .flag-area {
  display: flex;
  flex-direction: row;
}
</style>
