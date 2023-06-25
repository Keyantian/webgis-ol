<template>
  <div>
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 50px"
      @click="startLabel"
      >开始标注</a-button
    >
    <a-button class="btn-clear-drawFeature" @click="endLabel"
      >取消标注</a-button
    >

    <div id="popup" ref="popup" class="ol-popup" v-show="showlist">
      <a
        href="#"
        id="popup-closer"
        ref="popupcloser"
        class="ol-popup-closer"
        @click="closerx"
        >X</a
      >
      <div id="popup-content" ref="popupcontent" class="popup-content">
        <!-- <p v-for="(v, k, i) in layerProperty" :key="i">
          <span v-if="k != 'geom' && k != 'geometry'">
            <span style="font-weight: bolder">{{ k }}</span> ：{{ v }}
          </span>
        </p> -->
        <p>{{ featuresValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
      singleclick: null,
      featuresValue: "",
      showlist: false,
    };
  },
  methods: {
    startLabel() {
      unByKey(this.singleclick);
      this.singleclick = null;
      //   this.singleclick = map.on("singleclick", (e) => {
      //     console.log(e.coordinate);
      //     let coordinateValue = e.coordinate;
      //     let x = e.coordinate[0].toFixed(2);
      //     let y = e.coordinate[1].toFixed(2);
      //     console.log(x, y);
      //   });
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "coordinateLabel") {
          map.removeLayer(element);
        }
      });
      let container = this.$refs.popup;
      this.overlay = new Overlay({
        element: container,
        autoPan: false,
        autoPanAnimation: {
          duration: 250,
        },
      });
      window.map.addOverlay(this.overlay);
      this.singleclick = window.map.on("singleclick", (e) => {
        map.getAllLayers().forEach((element) => {
          if (element.values_.name == "coordinateLabel") {
            map.removeLayer(element);
          }
        });

        this.showlist = true;
        let coordinateValue = e.coordinate;
        let x = e.coordinate[0].toFixed(2).toString();
        let y = e.coordinate[1].toFixed(2).toString();
        this.featuresValue = `经度：${x}---纬度：${y} `;
        this.overlay.setPosition(coordinateValue);

        this.feature = new Feature({
          title: "beijing",
          geometry: new Point([e.coordinate[0], e.coordinate[1]]),
        });
        this.feature.setStyle(
          new Style({
            image: new CircleStyle({
              fill: new Fill({
                color: "red",
              }),
              radius: 4,
            }),
          })
        );
        let source = new VectorSource();
        source.addFeature(this.feature);
        let layer = new VectorLayer({
          name: "coordinateLabel",
        });
        layer.setSource(source);
        map.addLayer(layer);
      });
    },
    endLabel() {
      if (this.overlay) {
        this.overlay.setPosition(undefined);
        this.$refs.popupcloser.blur();
      }
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "coordinateLabel") {
          map.removeLayer(element);
        }
      });
      //window.map.un(this.singleclick.type, this.singleclick.listener)   //移除事件方式1
      unByKey(this.singleclick);
      this.singleclick = null;
    },
    closerx() {
      this.overlay.setPosition(undefined);
      this.$refs.popupcloser.blur();
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "coordinateLabel") {
          map.removeLayer(element);
        }
      });
    },
  },
};
</script>

<style>
.btn-color-drawFrature {
  background-color: rgba(94, 94, 94, 0.7);
  color: white;
}
.draw-feature-style {
  position: absolute;
  width: 600px;
  top: 700px;
  left: 600px;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
}
.popup-content {
  width: 200px;
  /* overflow-y: scroll; */
  height: 20px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
</style>