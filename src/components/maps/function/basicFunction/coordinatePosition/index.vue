<template>
  <div class="position-box">
    经度：<a-input-number
      id="inputNumber"
      v-model="value[0].x"
      :min="0"
      :max="360"
      :step="0.01"
      style="margin-right: 30px"
    />
    纬度：<a-input-number
      id="inputNumber"
      v-model="value[1].y"
      :min="0"
      :max="360"
      :step="0.01"
      style="margin-right: 30px"
    />
    <a-button
      class="position-style"
      style="margin-right: 30px"
      @click="position"
      >定位</a-button
    >
    <a-button class="cancel-style" style="margin-right: 30px" @click="cancel"
      >取消</a-button
    >
  </div>
</template>

<script>
import coordinatePositionIcon from "../../../../../assets/img/coordinatePosition.png";
import { Vector as VectorLayer } from "ol/layer";
import { unByKey } from "ol/Observable";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import {
  Circle as CircleStyle,
  Style,
  Icon,
  Stroke,
  Fill,
  Text,
  Circle,
} from "ol/style";

import Overlay from "ol/Overlay";
import { toStringHDMS } from "ol/coordinate";
import { toLonLat } from "ol/proj";
export default {
  name: "index",
  data() {
    return {
      value: [{ x: 117.2 }, { y: 39.12 }],
    };
  },
  methods: {
    position() {
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "coordinatePosition") {
          map.removeLayer(element);
        }
      });
      let longitude = this.value[0].x;
      let latitude = this.value[1].y;
      this.feature = new Feature({
        title: "dingwei",
        geometry: new Point([longitude, latitude]),
      });
      this.feature.setStyle(
        new Style({
          // image: new CircleStyle({
          //   fill: new Fill({
          //     color: "red",
          //   }),
          //   radius: 6,
          // }),
          image: new Icon({
            anchor: [0.5, 46],
            scale: 0.6,
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: coordinatePositionIcon,
          }),
        })
      );
      let source = new VectorSource();
      source.addFeature(this.feature);
      let layer = new VectorLayer({
        name: "coordinatePosition",
      });

      layer.setSource(source);
      map.addLayer(layer);

      map.getView().animate({
        center: [longitude, latitude],
        zoom: 9,
        rotation: undefined,
        duration: 1000,
      });
    },
    cancel() {
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "coordinatePosition") {
          map.removeLayer(element);
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.position-style {
  background-color: rgba(94, 94, 94, 0.7);
  color: white;
}
.cancel-style {
  background-color: rgba(243, 166, 22, 0.7);
  color: white;
}
</style>