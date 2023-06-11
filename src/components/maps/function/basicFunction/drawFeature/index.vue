<template>
  <div>
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 10px"
      @click="drawVector('Point')"
      >绘制点</a-button
    >
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 10px"
      @click="drawVector('LineString')"
      >绘制线</a-button
    >
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 10px"
      @click="drawVector('Polygon')"
      >绘制面</a-button
    >
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 10px"
      @click="drawVector('Circle')"
      >绘制圆</a-button
    >
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 10px"
      @click="retract"
      >撤回</a-button
    >
    <a-button
      class="btn-color-drawFrature"
      style="margin-right: 10px"
      @click="cancel"
      >取消</a-button
    >
    <a-button class="btn-clear-drawFeature" @click="clearDrawLayer"
      >清除</a-button
    >
  </div>
</template>

<script>
import "ol/ol.css";
import { Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Draw from "ol/interaction/Draw";
import { Fill, Stroke, Style, Text, Circle } from "ol/style";
export default {
  name: "index",
  data() {
    return {
      draw: {},
      //   draw_vector: {},
      //   draw_source: new VectorSource(),
    };
  },
  mounted() {
    // console.log(this.draw_vector, "1");
    // this.addDrawLayer();
    // console.log(this.draw_vector, "2");
  },
  methods: {
    addInteraction(type) {
      this.draw_vector = new VectorLayer({
        name: "drawtest",
        source: new VectorSource(),
        style: new Style({
          fill: new Fill({
            color: "rgba(255,255,255,0.2)",
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 3,
          }),
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
        zIndex: 10,
      });

      this.draw = new Draw({
        source: this.draw_vector.getSource(),
        type,
      });
      window.map.addInteraction(this.draw);
      window.map.addLayer(this.draw_vector);
    },
    clearDrawLayer() {
      window.map.removeInteraction(this.draw);
      //   this.draw_vector.getSource().clear();
      //清空绘制图形
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "drawtest") {
          map.removeLayer(element);
        }
      });
      this.draw_vector = {};
      this.draw = {};
    },
    drawVector(type) {
      window.map.removeInteraction(this.draw);
      this.addInteraction(type);
    },
    cancel() {
      window.map.removeInteraction(this.draw);
      //   this.draw_vector.getSource().clear();
      //清空绘制图形
      map.getAllLayers().forEach((element) => {
        if (element.values_.name == "drawtest") {
          map.removeLayer(element);
        }
      });
    },
    retract() {
      window.map.removeInteraction(this.draw);
      let layers = map.getAllLayers();

      let cur = layers[layers.length - 1];
      if (cur.values_.name == "drawtest") {
        let source = cur.getSource();
        let features = source.getFeatures();
        if(features.length==1){
          map.removeLayer(cur)
        }
        console.log(features.length);
        source.removeFeature(features[features.length - 1]);
        
      }

      console.log(map.getAllLayers())
      // map.getAllLayers().forEach((element) => {
      //   if (element.values_.name == "drawtest") {
      //     // map.removeLayer(element);
      //     // element.getSource().forEachFeature((e)=>{
      //     //   element.getSource().removeFeature(e)
      //     // });
      //   }
      // });
    },
  },
};
</script>

<style>
.btn-color-drawFrature {
  background-color: rgba(94, 94, 94, 0.7);
  color: white;
}
.btn-clear-drawFeature {
  background-color: rgba(243, 166, 22, 0.7);
  color: white;
}
</style>