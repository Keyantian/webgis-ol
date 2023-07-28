<template>
  <div>
    <a-menu
      mode="inline"
      :open-keys="openKeys"
      style="width: 256px"
      @openChange="onOpenChange"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="menu" /><span>基础功能</span></span>
        <a-menu-item key="1" @click="drawFeature"> 图形绘制 </a-menu-item>
        <a-menu-item key="2" @click="coordinateLabel"> 坐标标注 </a-menu-item>
        <a-menu-item key="3" @click="coordinatePosition">
          坐标定位
        </a-menu-item>
        <a-menu-item key="4" @click="spatialMeasure"> 空间测量 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="menu" /><span>功能</span></span>
        <a-menu-item key="5"> Option 5 </a-menu-item>
        <a-menu-item key="6"> Option 6 </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7"> Option 7 </a-menu-item>
          <a-menu-item key="8"> Option 8 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="menu" /><span>功能</span></span>
        <a-menu-item key="9"> Option 9 </a-menu-item>
        <a-menu-item key="10"> Option 10 </a-menu-item>
        <a-menu-item key="11"> Option 11 </a-menu-item>
        <a-menu-item key="12"> Option 12 </a-menu-item>
      </a-sub-menu>
    </a-menu>

    <draw-feature
      ref="drawFeature"
      class="draw-feature-style"
      v-show="drawFeatureVisibility"
    ></draw-feature>
    <coordinate-label
      ref="coordinateLabel"
      class="coordinate-label-style"
      v-show="coordinateLabelVisibility"
    ></coordinate-label>
    <coordinate-position
      ref="coordinatePosition"
      v-show="coordinatePositionVisibility"
      class="coordinate-position-style"
    ></coordinate-position>
    <spatial-measure
      ref="spatialMeasure"
      v-show="spatialMeasureVisibility"
      class="spatial-measure-style"
    ></spatial-measure>
  </div>
</template>

<script>
import drawFeature from "./basicFunction/drawFeature/index.vue";
import coordinateLabel from "./basicFunction/coordinateLabel/index.vue";
import coordinatePosition from "./basicFunction/coordinatePosition/index.vue";
import spatialMeasure from "./basicFunction/spatialMasure/index.vue";
export default {
  name: "index",
  components: {
    drawFeature,
    coordinateLabel,
    coordinatePosition,
    spatialMeasure,
  },
  data() {
    return {
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      drawFeatureVisibility: false,
      coordinateLabelVisibility: false,
      coordinatePositionVisibility: false,
      spatialMeasureVisibility:false
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    cancel() {
      this.coordinateLabelVisibility = false;
      this.drawFeatureVisibility = false;
      this.coordinatePositionVisibility = false;
      this.spatialMeasureVisibility = false
      this.$refs.drawFeature.cancel();
      this.$refs.coordinateLabel.endLabel();
      this.$refs.coordinatePosition.cancel();
      this.$refs.coordinatePosition.value = [{ x: 117.2 }, { y: 39.12 }];
      this.$refs.spatialMeasure.cancel()
    },
    drawFeature() {
      this.cancel();
      this.drawFeatureVisibility = true;
    },
    coordinateLabel() {
      this.cancel();
      this.coordinateLabelVisibility = true;
    },
    coordinatePosition() {
      this.cancel();
      this.coordinatePositionVisibility = true;
    },
    spatialMeasure(){
      this.cancel()
      this.spatialMeasureVisibility = true
    }
  },
};
</script>

<style scoped>
/deep/.ant-menu {
  background-color: rgba(92, 87, 87, 0.8);
  color: white;
}
.draw-feature-style {
  position: absolute;
  width: 600px;
  top: 700px;
  left: 600px;
}
.coordinate-label-style {
  position: absolute;
  width: 600px;
  top: 700px;
  left: 820px;
}
.coordinate-position-style {
  position: absolute;
  width: 600px;
  top: 700px;
  left: 600px;
}
.spatial-measure-style{
  position: absolute;
  width: 600px;
  top: 700px;
  left:750px;
}
</style>