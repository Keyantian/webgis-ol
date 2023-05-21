<template>
  <div>
    <div>
      <div class="ol-title">
        <div class="ol-image">
          <img src="@/assets/img/vector-layers.png" height="60" width="60" />
          <span
            style="
              color: white;
              font-family: Microsoft Yahei;
              font-weight: 700;
              margin-left: 10px;
              font-size: 20px;
            "
            >MapLayers</span
          >
        </div>
        <div class="ol-text">
          <div class="text-title">二维地图开发平台</div>
        </div>
        <sign-out></sign-out>
      </div>
    </div>

    <div>
      <div id="EarthMap"></div>
    </div>

    <div class="menulist-style">
      <menu-list></menu-list>
    </div>
  </div>
</template>

<script>
// import TileWMS from "ol/source/TileWMS";
import "ol/ol.css";
import Map from "ol/Map";
// import OSM from 'ol/source/OSM'
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import { ScaleLine, defaults as defaultControls } from "ol/control";

import signOut from "./signout/index.vue";
import menuList from "./function/index.vue";
// import a from '../../assets/img/ol.png'
export default {
  name: "Index",
  data() {
    return {};
  },
  components: {
    signOut,
    menuList,
  },
  methods: {
    initMap() {
      const tianMapLayer = new TileLayer({
        title: "电子地图",
        name: "电子地图",
        source: new XYZ({
          url: "http://t0.tianditu.gov.cn/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e02f7e1d1986b68a921157121a9681eb",
          projection: "EPSG:4326",
        }),
      });
      const tianMapLayer2 = new TileLayer({
        source: new XYZ({
          url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=daafafd5b7bb42922f10e3d1c06df824",
        }),
      });
      window.map = new Map({
        layers: [tianMapLayer, tianMapLayer2],
        target: "EarthMap",
        view: new View({
          center: [117.3121212, 39.242121212],
          zoom: 8,
          projection: "EPSG:4326",
        }),
        controls: defaultControls({
          zoom: false,
        }),
        //1.设置缩放级别为整数
        constrainResolution: true,
        //2.关闭无级缩放地图
        smoothResolutionConstraint: false,
      });
    },
    openNotification() {
      this.$notification.open({
        message: "登陆成功",
        description: "欢迎回来",
        icon: <a-icon type="smile" style="color: #108ee9" />,
      });
    },
  },
  mounted() {
    this.openNotification();
    this.initMap();
  },
};
</script>

<style scoped>
#EarthMap {
  height: 894px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* margin-top: 30px; */
}
.ol-title {
  height: 75px;
  display: flex;
  background-color: rgb(126, 125, 125);
}
.text-title {
  font-size: 40px;
  font-family: Microsoft Yahei;
  font-weight: 700;
  color: white;
}
.ol-image {
  display: flex;
  align-items: center;
  margin-left: 5%;
}
.ol-text {
  display: flex;
  align-items: center;
  margin-left: 500px;
}
.menulist-style {
  position: absolute;
  top: 150px;
  left: 50px;
}
</style>