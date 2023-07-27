<template>
  <el-container class="el-container">
    <div class="panel-left">
      <img class="img" src="../../assets/image/mod-icon.jpg" />
      <div class="update-area">
        <div class="tab">更新日志</div>
        <div class="update-log">
          <div class="version">2.33.1</div>
          <div class="date">2023-07-02</div>
        </div>
        <div class="update-log">
          <div class="version">2.33.1</div>
          <div class="date">2023-07-02</div>
        </div>
        <div class="update-log">
          <div class="version">2.33.1</div>
          <div class="date">2023-07-02</div>
        </div>
        <div class="update-log">
          <div class="version">2.33.1</div>
          <div class="date">2023-07-02</div>
        </div>
      </div>
    </div>
    <div class="panel-center">
      <div class="title-line">
        <div class="status-area">
          <div class="item left">活跃</div>
          <div class="item right">闭源</div>
        </div>
        <div class="name">[IC2]工业时代</div>
        <div class="en-name">Industrial Craft 2</div>
      </div>
      <div class="flag-area">
        <mod-flag class="flag" flag="adventure" active></mod-flag>
        <mod-flag class="flag" flag="adventure" active></mod-flag>
        <mod-flag class="flag" flag="adventure" active></mod-flag>
      </div>
      <div class="extra-area">
        <div class="item">
          <div>支持的游戏版本:</div>
          <div class="href">2.1</div>
          <div class="href">2.2</div>
          <div class="href">2.3</div>
        </div>
        <div class="item">最后编辑: 2天前</div>
        <div class="item">
          <div>Mod作者/开发团队:</div>
          <div>无</div>
        </div>
        <div class="item">相关链接:</div>
        <div class="item">
          <div class="link">
            <icon-down></icon-down>
            官方
          </div>
        </div>
        <el-tabs class="el-tabs" type="border-card">
          <el-tab-pane label="Mod介绍">
            工业2是围绕 Minecraft 生活现代化和生产自动化两个主题而展开的 Minecraft 模组，由
            IndustrialCraft2 Dev Team 开发并维护。 它在工业1的基础上发展而来，引入了名为 [EU]
            能量单元 (Energy Unit)
            的电力能源系统，以及对应的发电设备，并以此为基础添加了大量相关物品、方块以及机器。其内容涉及资源处理、矿物采集、农业等多个主题，极大地平衡和丰富了前代的游戏体验，同时还拥有许多拓展模组，进一步丰富了游戏体验，增加了新的游戏目标。
            作为最著名的 Minecraft 模组之一，其内容相对简单基础，是初次接触大型 Minecraft
            模组的玩家很好的选择。 Tips 使用 1.9.4 之后的版本请注意，IC2
            的电压机制被重新采用，当机器的输入电压过大时，机器将会爆炸！且已移除物品中部分已重新启用。
            （原文：Explosions in the EnergyNet are enabled again. If you connect a machine to an
            improper voltage, it will explode!）
          </el-tab-pane>
          <el-tab-pane label="Mod关系">Mod介绍</el-tab-pane>
          <el-tab-pane label="Mod下载">Mod介绍</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="panel-right">
      <div class="rate">
        <div class="rate-area">
          <div>5.0</div>
          <div>名扬天下</div>
        </div>
        <div class="rate-info">
          <div class="rate-line">
            <icon-hot :size="20"></icon-hot>
            <icon-hot :size="20"></icon-hot>
            <icon-hot :size="20"></icon-hot>
            <icon-hot :size="20"></icon-hot>
            <icon-hot :size="20"></icon-hot>
          </div>
          <div>总浏览:1103.5k</div>
          <div>总浏览:1103.5k</div>
        </div>
      </div>
      <div class="operate-list">
        <div class="line">
          <div class="item">
            <el-icon>
              <EditPen />
            </el-icon>
            <div>编辑模组</div>
          </div>
          <div class="item">
            <el-icon>
              <EditPen />
            </el-icon>
            <div>新建日志</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <el-icon>
              <EditPen />
            </el-icon>
            <div>编辑模组</div>
          </div>
          <div class="item">
            <el-icon>
              <EditPen />
            </el-icon>
            <div>新建日志</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <el-icon>
              <EditPen />
            </el-icon>
            <div>新建日志</div>
          </div>
          <div class="item">
            <el-icon>
              <EditPen />
            </el-icon>
            <div>新建日志</div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script lang="ts">
import ModFlag from "@/components/mod/flag.vue"
import IconDown from "@/components/icons/common/down.vue"
import IconHot from "@/components/icons/common/hot.vue"
export default {
  name: "modDetail",
  components: { IconHot, IconDown, ModFlag },
  props: {},
}
</script>
<style scoped>
.el-container {
  padding-top: 20px;
  height: inherit;
}

.el-tabs {
  flex: 1;
}

.panel-left {
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  padding: 5px 10px;
  background: #fff;
  border-radius: 5px;
}

.panel-left .tab {
  background: #eee;
}

.panel-left .update-area {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.panel-left .update-log {
  display: flex;
  flex-direction: row;
  border-bottom: 1px dashed #aaa;
}

.panel-left .update-log .version {
  flex: 1;
  color: #008ac5;
}

.panel-center {
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
}

.panel-right {
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  padding: 5px 10px;
  background: #fff;
  border-radius: 5px;
}

.flag-area {
  display: flex;
  flex-direction: row;
}

.panel-center .title-line {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 5px 0;
  line-height: initial;
}

.panel-center .title-line .name {
  font-size: 20px;
  font-weight: bolder;
  padding: 0 10px;
}

.panel-center .title-line .en-name {
  color: gray;
  font-family: "Microsoft YaHei", 微软雅黑, 宋体, sans-serif;
  font-size: 15px;
  padding-left: 10px;
}

.panel-left .img {
  width: 128px;
  height: 96px;
  border-radius: 5px;
  border: 1px solid gray;
}

.status-area {
  display: flex;
  flex-direction: row;
  font-size: 12px;
}

.status-area .item {
  background: #008ac5;
  color: #fff;
  padding: 2px 5px;
}

.status-area .item + .item {
  margin-left: 2px;
}

.status-area .item.left {
  background: #2cbe4e;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.status-area .item.right {
  background: #cb6431;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.extra-area {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding-top: 20px;
  color: gray;
  flex: 1;
}

.extra-area .item {
  padding: 5px 0;
  display: flex;
  flex-direction: row;
}

.extra-area .href {
  margin: 0 5px;
  text-decoration: underline;
}

.extra-area .href,
.extra-area .link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rate-area {
  border-radius: 5px;
  background: #545b62;
  color: #fff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  justify-content: space-around;
}

.rate-line {
  display: flex;
  flex-direction: row;
}

.rate {
  display: flex;
  flex-direction: row;
}

.rate .rate-info {
  display: flex;
  flex-direction: column;
  color: #545b62;
  padding-left: 10px;
  font-size: 12px;
}

.operate-list {
  display: flex;
  flex-direction: column;
}

.operate-list .line {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.operate-list .line .item {
  color: #212529;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: row;
}
</style>
